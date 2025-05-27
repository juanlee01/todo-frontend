// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useUserStore } from "@/store/userStore";
// import { useGroupStore } from "@/store/groupStore";
// import { useGroupMembershipStore } from "@/store/groupMembershipStore";
// import { ChatMessage } from "@/types/chat";
// import { ChatSocket } from "@/api/socket";
// import { fetchChatMessages } from "@/api/chat";

// export default function ChatRoom() {
//     const [messages, setMessages] = useState<ChatMessage[]>([]);
//     const [input, setInput] = useState("");
//     const socketRef = useRef<ChatSocket | null>(null);
//     const scrollRef = useRef<HTMLDivElement | null>(null);

//     const user = useUserStore((state) => state.user);
//     const groupId = useGroupStore((state) => state.selectedGroupId);
//     const memberships = useGroupMembershipStore((state) => state.memberships);
//     const bottomRef = useRef<HTMLDivElement | null>(null);
//     const prevLengthRef = useRef(0);

//     // 초기 메시지 + 소켓 연결
//     useEffect(() => {
//         if (!user || !groupId) return;

//         fetchChatMessages(groupId, 0)
//             .then((msgs) => {
//                 setMessages(msgs.reverse());
//                 setTimeout(() => {
//                     scrollRef.current?.scrollIntoView({ behavior: "auto" });
//                 }, 100);
//             })
//             .catch((err) => {
//                 console.error("초기 채팅 불러오기 실패:", err);
//             });

//         const socket = new ChatSocket({
//             groupId,
//             onMessage: (msg) => {
//                 setMessages((prev) => [...prev, msg]);
//                 setTimeout(() => {
//                     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//                 }, 100);
//             },
//         });

//         socketRef.current = socket;
//         return () => socket.disconnect();
//     }, [groupId, user]);

//     // 메시지 변경 감지
//     useEffect(() => {
//         const lastMessage = messages[messages.length - 1];
//         const isNewMessageFromSelf =
//             lastMessage && lastMessage.senderId === user?.id;
//         const isInitialLoad = prevLengthRef.current === 0;

//         if (isNewMessageFromSelf || isInitialLoad) {
//             bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//         }

//         prevLengthRef.current = messages.length;
//     }, [messages, user]);

//     const sendMessage = () => {
//         if (!user || !groupId || !input.trim()) return;

//         const membership = memberships.find(
//             (m) => m.userId === user.id && m.groupId === groupId
//         );

//         const message: ChatMessage = {
//             groupId,
//             senderId: user.id,
//             senderName: membership?.nickname || user.username,
//             senderRole: membership?.role || "MEMBER",
//             content: input,
//         };

//         socketRef.current?.sendMessage(message);
//         setInput("");
//     };

//     return (
//         <div className="flex flex-col h-full w-full items-center bg-gray-50">
//             {/* 둥근 카드 */}
//             <div className="flex flex-col w-full max-w-7xl h-full bg-white rounded-2xl shadow-md overflow-hidden">
//                 {/* 상단: 그룹 채팅 제목 */}
//                 <div className="px-6 py-4 bg-indigo-100 border-b text-lg font-semibold">
//                     그룹 채팅
//                 </div>

//                 {/* 중단: 메시지 영역 */}
//                 <div className="flex-1 overflow-y-auto px-6 py-4">
//                     <div className="grid grid-cols-12 gap-y-2">
//                         {messages.map((msg, index) => {
//                             const isMine = msg.senderId === user?.id;
//                             return (
//                                 <div
//                                     key={index}
//                                     className={`p-1 ${
//                                         isMine
//                                             ? "col-start-6 col-end-13"
//                                             : "col-start-1 col-end-8"
//                                     }`}
//                                 >
//                                     <div
//                                         className={`flex ${
//                                             isMine
//                                                 ? "justify-end"
//                                                 : "justify-start"
//                                         }`}
//                                     >
//                                         <div className="text-sm bg-gray-200 py-2 px-4 rounded-xl shadow relative">
//                                             <div>{msg.content}</div>
//                                             <div className="text-xs text-gray-500 mt-1 text-right">
//                                                 {msg.senderName} (
//                                                 {msg.senderRole}){" "}
//                                                 {msg.timestamp &&
//                                                     new Date(
//                                                         msg.timestamp
//                                                     ).toLocaleTimeString()}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                         <div ref={bottomRef} />
//                     </div>
//                 </div>

//                 {/* 하단: 입력 영역 */}
//                 <div className="px-6 py-4 border-t flex items-center gap-2">
//                     <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                         className="flex-1 border rounded-xl px-4 h-10 focus:outline-none focus:border-indigo-300"
//                         placeholder="메시지를 입력하세요..."
//                     />
//                     <button
//                         onClick={sendMessage}
//                         className="bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600"
//                     >
//                         전송
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useUserStore } from "@/store/userStore";
// import { useGroupStore } from "@/store/groupStore";
// import { useGroupMembershipStore } from "@/store/groupMembershipStore";
// import { ChatMessage } from "@/types/chat";
// import { ChatSocket } from "@/api/socket";
// import { fetchChatMessages } from "@/api/chat";

// export default function ChatRoom() {
//     const [messages, setMessages] = useState<ChatMessage[]>([]);
//     const [input, setInput] = useState("");
//     const [page, setPage] = useState(0);
//     const [hasMore, setHasMore] = useState(true);
//     const scrollContainerRef = useRef<HTMLDivElement | null>(null);
//     const topRef = useRef<HTMLDivElement | null>(null);
//     const bottomRef = useRef<HTMLDivElement | null>(null);
//     const isFetchingRef = useRef(false);

//     const socketRef = useRef<ChatSocket | null>(null);
//     const user = useUserStore((state) => state.user);
//     const groupId = useGroupStore((state) => state.selectedGroupId);
//     const memberships = useGroupMembershipStore((state) => state.memberships);

//     // 메시지 불러오기
//     // 메시지 불러오기
//     const loadMessages = async (nextPage: number) => {
//         if (!groupId || isFetchingRef.current || !hasMore) return;
//         isFetchingRef.current = true;

//         try {
//             const newMessages = await fetchChatMessages(groupId, nextPage);

//             if (newMessages.length < 20) setHasMore(false);

//             // ✅ 최신순으로 온 메시지를 reverse해서 오래된 순으로 정렬 후 추가
//             setMessages((prev) => [...newMessages.reverse(), ...prev]);
//             setPage(nextPage);
//         } catch (e) {
//             console.error("이전 채팅 불러오기 실패:", e);
//         } finally {
//             isFetchingRef.current = false;
//         }
//     };

//     // 초기 메시지 및 소켓 설정
//     useEffect(() => {
//         if (!user || !groupId) return;

//         loadMessages(0).then(() => {
//             setTimeout(
//                 () => bottomRef.current?.scrollIntoView({ behavior: "auto" }),
//                 100
//             );
//         });

//         const socket = new ChatSocket({
//             groupId,
//             onMessage: (msg) => {
//                 setMessages((prev) => [...prev, msg]);
//                 setTimeout(
//                     () =>
//                         bottomRef.current?.scrollIntoView({
//                             behavior: "smooth",
//                         }),
//                     100
//                 );
//             },
//         });

//         socketRef.current = socket;
//         return () => socket.disconnect();
//     }, [user, groupId]);

//     // 스크롤 감지
//     const handleScroll = () => {
//         const container = scrollContainerRef.current;
//         if (!container) return;

//         if (container.scrollTop < 50 && hasMore) {
//             const currentHeight = container.scrollHeight;
//             loadMessages(page + 1).then(() => {
//                 setTimeout(() => {
//                     const newHeight = container.scrollHeight;
//                     container.scrollTop = newHeight - currentHeight;
//                 }, 50);
//             });
//         }
//     };

//     const sendMessage = () => {
//         if (!user || !groupId || !input.trim()) return;

//         const membership = memberships.find(
//             (m) => m.userId === user.id && m.groupId === groupId
//         );

//         const message: ChatMessage = {
//             groupId,
//             senderId: user.id,
//             senderName: membership?.nickname || user.username,
//             senderRole: membership?.role || "MEMBER",
//             content: input,
//         };

//         socketRef.current?.sendMessage(message);
//         setInput("");
//     };

//     return (
//         <div className="flex flex-col h-full w-full items-center bg-gray-50 px-2 py-2">
//             <div className="flex flex-col w-full max-w-7xl h-full bg-white rounded-2xl shadow-md overflow-hidden">
//                 <div className="px-6 py-4 bg-indigo-100 border-b text-lg font-semibold">
//                     {}그룹 채팅
//                 </div>

//                 <div
//                     ref={scrollContainerRef}
//                     onScroll={handleScroll}
//                     className="flex-1 overflow-y-auto px-6 py-4"
//                 >
//                     <div ref={topRef}></div>
//                     <div className="grid grid-cols-12 gap-y-2">
//                         {messages.map((msg, index) => {
//                             const isMine = msg.senderId === user?.id;
//                             return (
//                                 <div
//                                     key={index}
//                                     className={`p-1 ${
//                                         isMine
//                                             ? "col-start-6 col-end-13"
//                                             : "col-start-1 col-end-8"
//                                     }`}
//                                 >
//                                     <div
//                                         className={`flex ${
//                                             isMine
//                                                 ? "justify-end"
//                                                 : "justify-start"
//                                         }`}
//                                     >
//                                         <div className="text-sm bg-gray-200 py-2 px-4 rounded-xl shadow relative">
//                                             <div>{msg.content}</div>
//                                             <div className="text-xs text-gray-500 mt-1 text-right">
//                                                 {msg.senderName} (
//                                                 {msg.senderRole}){" "}
//                                                 {/* {msg.timestamp &&
//                                                     new Date(
//                                                         msg.timestamp
//                                                     ).toLocaleTimeString()} */}
//                                                 {msg.timestamp &&
//                                                     new Date(
//                                                         msg.timestamp
//                                                     ).toLocaleString("ko-KR", {
//                                                         year: "numeric",
//                                                         month: "2-digit",
//                                                         day: "2-digit",
//                                                         hour: "2-digit",
//                                                         minute: "2-digit",
//                                                     })}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                         <div ref={bottomRef} />
//                     </div>
//                 </div>

//                 <div className="px-6 py-4 border-t flex items-center gap-2">
//                     <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                         className="flex-1 border rounded-xl px-4 h-10 focus:outline-none focus:border-indigo-300"
//                         placeholder="메시지를 입력하세요..."
//                     />
//                     <button
//                         onClick={sendMessage}
//                         className="bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600"
//                     >
//                         전송
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useGroupStore } from "@/store/groupStore";
import { useGroupMembershipStore } from "@/store/groupMembershipStore";
import { ChatMessage } from "@/types/chat";
import { ChatSocket } from "@/api/socket";
import { fetchChatMessages } from "@/api/chat";

export default function ChatRoom() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const topRef = useRef<HTMLDivElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const isFetchingRef = useRef(false);

    const socketRef = useRef<ChatSocket | null>(null);
    const user = useUserStore((state) => state.user);
    const groupId = useGroupStore((state) => state.selectedGroupId);
    const memberships = useGroupMembershipStore((state) => state.memberships);

    const group = memberships.find((m) => m.groupId === groupId);
    const groupTitle = group?.groupTitle || "그룹 채팅";

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    // 메시지 불러오기
    const loadMessages = async (nextPage: number) => {
        if (!groupId || isFetchingRef.current || !hasMore) return;
        isFetchingRef.current = true;

        try {
            const newMessages = await fetchChatMessages(groupId, nextPage);
            if (newMessages.length < 20) setHasMore(false);

            setMessages((prev) =>
                [...newMessages, ...prev].sort(
                    (a, b) =>
                        new Date(a.timestamp!).getTime() -
                        new Date(b.timestamp!).getTime()
                )
            );
            setPage(nextPage);
        } catch (e) {
            console.error("이전 채팅 불러오기 실패:", e);
        } finally {
            isFetchingRef.current = false;
        }
    };

    // 초기 메시지 및 소켓 설정
    useEffect(() => {
        if (!user || !groupId) return;

        loadMessages(0).then(() => {
            setTimeout(
                () => bottomRef.current?.scrollIntoView({ behavior: "auto" }),
                100
            );
        });

        const socket = new ChatSocket({
            groupId,
            onMessage: (msg) => {
                setMessages((prev) =>
                    [...prev, msg].sort(
                        (a, b) =>
                            new Date(a.timestamp!).getTime() -
                            new Date(b.timestamp!).getTime()
                    )
                );
                setTimeout(
                    () =>
                        bottomRef.current?.scrollIntoView({
                            behavior: "smooth",
                        }),
                    100
                );
            },
        });

        socketRef.current = socket;

        const membership = memberships.find(
            (m) => m.userId === user.id && m.groupId === groupId
        );
        const joinMessage: ChatMessage = {
            groupId,
            senderId: user.id,
            senderName: membership?.nickname || user.username,
            senderRole: membership?.role || "MEMBER",
            content: `${
                membership?.nickname || user.username
            } 님이 입장하였습니다.`,
            type: "SYSTEM",
        };

        socket.sendMessage(joinMessage);
        return () => socket.disconnect();
    }, [user, groupId]);

    // 스크롤 감지
    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        if (container.scrollTop < 50 && hasMore) {
            const currentHeight = container.scrollHeight;
            loadMessages(page + 1).then(() => {
                setTimeout(() => {
                    const newHeight = container.scrollHeight;
                    container.scrollTop = newHeight - currentHeight;
                }, 50);
            });
        }
    };

    // 메시지 전송
    const sendMessage = () => {
        if (!user || !groupId || !input.trim()) return;

        const membership = memberships.find(
            (m) => m.userId === user.id && m.groupId === groupId
        );

        const message: ChatMessage = {
            groupId,
            senderId: user.id,
            senderName: membership?.nickname || user.username,
            senderRole: membership?.role || "MEMBER",
            content: input,
            type: "CHAT",
        };

        socketRef.current?.sendMessage(message);
        setInput("");
    };

    return (
        <div className="flex flex-col h-full w-full items-center bg-gray-50 px-2 py-2">
            <div className="flex flex-col w-full max-w-7xl h-full bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="px-6 py-4 bg-indigo-100 border-b text-lg font-semibold">
                    {groupTitle} 채팅
                </div>

                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto px-6 py-4"
                >
                    <div ref={topRef}></div>
                    {/* <div className="grid grid-cols-12 gap-y-2">
                        {messages.map((msg, index) => {
                            const isMine = msg.senderId === user?.id;
                            return (
                                <div
                                    key={index}
                                    className={`p-1 ${
                                        isMine
                                            ? "col-start-6 col-end-13"
                                            : "col-start-1 col-end-8"
                                    }`}
                                >
                                    <div
                                        className={`flex ${
                                            isMine
                                                ? "justify-end"
                                                : "justify-start"
                                        }`}
                                    >
                                        <div className="text-sm bg-gray-200 py-2 px-4 rounded-xl shadow relative">
                                            <div>{msg.content}</div>
                                            <div className="text-xs text-gray-500 mt-1 text-right">
                                                {msg.senderName} (
                                                {msg.senderRole}){" "}
                                                {msg.timestamp &&
                                                    new Date(
                                                        msg.timestamp
                                                    ).toLocaleString("ko-KR", {
                                                        // year: "numeric",
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={bottomRef} />
                    </div> */}
                    <div className="grid grid-cols-12 gap-y-2">
                        {messages.map((msg, index) => {
                            const isMine = msg.senderId === user?.id;
                            const currentDate = formatDate(msg.timestamp!);
                            const prevDate =
                                index > 0
                                    ? formatDate(messages[index - 1].timestamp!)
                                    : null;

                            const showDateDivider =
                                index === 0 || currentDate !== prevDate;

                            return (
                                <div key={index} className="col-span-12">
                                    {showDateDivider && (
                                        <div className="text-center text-gray-400 text-sm my-2">
                                            {currentDate}
                                        </div>
                                    )}
                                    <div
                                        className={`p-1 ${
                                            isMine
                                                ? "col-start-6 col-end-13"
                                                : "col-start-1 col-end-8"
                                        }`}
                                    >
                                        <div
                                            className={`flex ${
                                                isMine
                                                    ? "justify-end"
                                                    : "justify-start"
                                            }`}
                                        >
                                            <div className="text-sm bg-gray-200 py-2 px-4 rounded-xl shadow relative">
                                                <div>{msg.content}</div>
                                                <div className="text-xs text-gray-500 mt-1 text-right">
                                                    {msg.senderName} (
                                                    {msg.senderRole}){" "}
                                                    {msg.timestamp &&
                                                        new Date(
                                                            msg.timestamp
                                                        ).toLocaleString(
                                                            "ko-KR",
                                                            {
                                                                // year: "numeric",
                                                                month: "2-digit",
                                                                day: "2-digit",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={bottomRef} />
                    </div>
                </div>

                <div className="px-6 py-4 border-t flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        className="flex-1 border rounded-xl px-4 h-10 focus:outline-none focus:border-indigo-300"
                        placeholder="메시지를 입력하세요..."
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600"
                    >
                        전송
                    </button>
                </div>
            </div>
        </div>
    );
}
