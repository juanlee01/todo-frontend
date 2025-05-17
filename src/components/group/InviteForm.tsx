// "use client";

// import { useState } from "react";
// import { useGroupStore } from "@/store/groupStore";
// import { inviteMember } from "@/api/group";

// export default function InviteForm() {
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);

//     const selectedGroupId = useGroupStore((state) => state.selectedGroupId);

//     const handleInvite = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage(null);

//         if (!selectedGroupId) {
//             setMessage("그룹이 선택되지 않았습니다.");
//             setLoading(false);
//             return;
//         }

//         try {
//             const msg = await inviteMember(selectedGroupId, email);
//             setMessage(msg);
//             setEmail("");
//         } catch (err: unknown) {
//             if (err instanceof Error) {
//                 setMessage(err.message);
//             } else {
//                 setMessage("오류가 발생했습니다.");
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <section className="mb-6">
//             <h2 className="font-semibold text-lg mb-2">초대하기</h2>

//             <form onSubmit={handleInvite} className="flex gap-2 items-start">
//                 <input
//                     type="email"
//                     placeholder="이메일 입력"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="flex-1 px-4 py-2 border rounded bg-white text-[#111827] border-gray-300 placeholder-gray-400"
//                 />
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
//                 >
//                     {loading ? "전송 중..." : "초대 전송"}
//                 </button>
//             </form>

//             {message && (
//                 <p className="mt-2 text-sm text-[#111827]">{message}</p>
//             )}
//         </section>
//     );
// }

"use client";

import { useState } from "react";
import { useGroupStore } from "@/store/groupStore";
import { inviteMember } from "@/api/group";

export default function InviteForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState(false); // ✅ 메시지 유형 추적
    const [loading, setLoading] = useState(false);

    const selectedGroupId = useGroupStore((state) => state.selectedGroupId);
    const errorMessageMap: Record<string, string> = {
        "그룹을 찾을 수 없습니다.":
            "선택한 그룹이 존재하지 않거나 삭제되었습니다.",
        "초대 발신자를 찾을 수 없습니다.":
            "로그인된 사용자 정보를 불러올 수 없습니다.",
        "해당 이메일에 해당하는 사용자가 존재하지 않습니다.":
            "해당 이메일을 가진 사용자를 찾을 수 없습니다.",
        "본인을 초대할 수 없습니다.": "자기 자신을 초대할 수 없습니다.",
        "해당 사용자는 이미 그룹에 속해 있습니다.":
            "이미 그룹에 가입된 사용자입니다.",
        "이미 초대가 전송된 사용자입니다.": "이미 초대가 보낸 사용자입니다.",
    };

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setIsError(false);

        if (
            !selectedGroupId ||
            isNaN(selectedGroupId) ||
            selectedGroupId <= 0
        ) {
            setMessage("유효한 그룹이 선택되지 않았습니다.");
            setIsError(true);
            setLoading(false);
            return;
        }

        try {
            const msg = await inviteMember(selectedGroupId, email);
            setMessage(msg);
            setIsError(false); // ✅ 성공
            setEmail("");
        } catch (err: unknown) {
            if (err instanceof Error) {
                const original = err.message;
                const friendly = errorMessageMap[original] || original; // 매핑된 메시지 사용
                setMessage(friendly);
                console.error("원본 메시지:", original);
            } else {
                setMessage("알 수 없는 오류가 발생했습니다.");
            }
            setIsError(true);
        } finally {
            //onsole.log("✅ 초대 요청 완료됨 — loading false 처리");
            setLoading(false);
        }
    };

    return (
        <section className="mb-6">
            <h2 className="font-semibold text-lg mb-2">초대하기</h2>

            <form onSubmit={handleInvite} className="flex gap-2 items-start">
                <input
                    type="email"
                    placeholder="이메일 입력"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-2 border rounded bg-white text-[#111827] border-gray-300 placeholder-gray-400"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
                >
                    {loading ? "전송 중..." : "초대 전송"}
                </button>
            </form>

            {message && (
                <p
                    className={`mt-2 text-sm ${
                        isError ? "text-red-600" : "text-green-600"
                    }`}
                >
                    {message}
                </p>
            )}
        </section>
    );
}
