// "use client";

// import { useState, useEffect, useRef } from "react";
// import { changeMemberRole, transferLeadership, kickMember } from "@/api/group";
// import { GroupMember } from "@/types/user";
// import { useParams } from "next/navigation";

// interface MemberMenuProps {
//     member: GroupMember;
//     myInfo: GroupMember;
//     onRoleChange?: (userId: number, newRole: "GUEST" | "MEMBER") => void;
//     onKick?: (userId: number) => void;
// }

// export default function MemberMenu({
//     member,
//     myInfo,
//     onRoleChange,
//     onKick,
// }: MemberMenuProps) {
//     const { groupId } = useParams();
//     const [open, setOpen] = useState(false);
//     const menuRef = useRef<HTMLDivElement>(null);

//     // 외부 클릭 시 메뉴 닫기
//     useEffect(() => {
//         const handleClickOutside = (e: MouseEvent) => {
//             if (
//                 menuRef.current &&
//                 !menuRef.current.contains(e.target as Node)
//             ) {
//                 setOpen(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () =>
//             document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const handleChangeRole = async () => {
//         const nextRole = member.role === "GUEST" ? "MEMBER" : "GUEST";
//         try {
//             await changeMemberRole(Number(groupId), member.userId, nextRole);
//             onRoleChange?.(member.userId, nextRole);
//         } catch (err) {
//             console.error("역할 변경 실패", err);
//             alert("역할 변경에 실패했습니다.");
//         }
//     };

//     const handleTransferLeadership = async (userId: number) => {
//         if (
//             confirm(
//                 `"${member.username}"님에게 리더를 위임하시겠습니까? 이 작업은 되돌릴 수 없습니다.`
//             )
//         ) {
//             try {
//                 await transferLeadership(Number(groupId), userId);
//                 alert("리더가 성공적으로 변경되었습니다.");
//                 // 리더가 변경되면 페이지 새로고침 또는 myInfo 상태 재요청
//                 window.location.reload(); // 또는 loadMe()
//             } catch (err) {
//                 console.error("리더 위임 실패", err);
//                 alert("리더 위임에 실패했습니다.");
//             }
//         }
//     };

//     const handleKick = async () => {
//         if (
//             confirm(
//                 `"${member.username}"님을 그룹에서 추방하시겠습니까? 이 작업은 되돌릴 수 없습니다.`
//             )
//         ) {
//             try {
//                 await kickMember(Number(groupId), member.userId);
//                 onKick?.(member.userId);
//             } catch (err) {
//                 console.error("추방 실패", err);
//                 alert("그룹원 추방에 실패했습니다.");
//             }
//         }
//     };

//     if (myInfo.role !== "LEADER" || myInfo.userId === member.userId)
//         return null;

//     return (
//         <div ref={menuRef} className="relative">
//             <button
//                 onClick={() => setOpen((prev) => !prev)}
//                 className="text-gray-500 hover:text-gray-700"
//                 title="설정"
//             >
//                 <svg
//                     width="20"
//                     height="20"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                 >
//                     <path d="M5 10a2 2 0 100 4 2 2 0 000-4zm7 0a2 2 0 100 4 2 2 0 000-4zm5 2a2 2 0 114 0 2 2 0 01-4 0z" />
//                 </svg>
//             </button>
//             {open && (
//                 <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10 text-sm text-gray-800">
//                     {/* 승급 / 강등 */}
//                     <button
//                         onClick={handleChangeRole}
//                         className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     >
//                         {member.role === "GUEST" ? "승급" : "강등"}
//                     </button>

//                     {/* 리더 위임 */}
//                     {member.role === "MEMBER" && (
//                         <button
//                             onClick={() =>
//                                 handleTransferLeadership(member.userId)
//                             }
//                             className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                         >
//                             리더 위임
//                         </button>
//                     )}

//                     {/* 추방 */}
//                     {member.role !== "LEADER" && (
//                         <button
//                             onClick={() => handleKick()}
//                             className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
//                         >
//                             추방
//                         </button>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { changeMemberRole, transferLeadership, kickMember } from "@/api/group";
// import { GroupMember } from "@/types/user";
// import { useParams } from "next/navigation";

// interface MemberMenuProps {
//     member: GroupMember;
//     myRole: "LEADER" | "MEMBER" | "GUEST"; // ✅ 단일 역할 전달
//     myUserId: number; // ✅ 내 ID만 전달
//     onRoleChange?: (userId: number, newRole: "GUEST" | "MEMBER") => void;
//     onKick?: (userId: number) => void;
// }

// export default function MemberMenu({
//     member,
//     myRole,
//     myUserId,
//     onRoleChange,
//     onKick,
// }: MemberMenuProps) {
//     const { groupId } = useParams();
//     const [open, setOpen] = useState(false);
//     const menuRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handleClickOutside = (e: MouseEvent) => {
//             if (
//                 menuRef.current &&
//                 !menuRef.current.contains(e.target as Node)
//             ) {
//                 setOpen(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () =>
//             document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const handleChangeRole = async () => {
//         const nextRole = member.role === "GUEST" ? "MEMBER" : "GUEST";
//         try {
//             await changeMemberRole(Number(groupId), member.userId, nextRole);
//             onRoleChange?.(member.userId, nextRole);
//         } catch (err) {
//             console.error("역할 변경 실패", err);
//             alert("역할 변경에 실패했습니다.");
//         }
//     };

//     const handleTransferLeadership = async (userId: number) => {
//         if (
//             confirm(
//                 `"${member.username}"님에게 리더를 위임하시겠습니까? 이 작업은 되돌릴 수 없습니다.`
//             )
//         ) {
//             try {
//                 await transferLeadership(Number(groupId), userId);
//                 alert("리더가 성공적으로 변경되었습니다.");
//                 window.location.reload();
//             } catch (err) {
//                 console.error("리더 위임 실패", err);
//                 alert("리더 위임에 실패했습니다.");
//             }
//         }
//     };

//     const handleKick = async () => {
//         if (
//             confirm(
//                 `"${member.username}"님을 그룹에서 추방하시겠습니까? 이 작업은 되돌릴 수 없습니다.`
//             )
//         ) {
//             try {
//                 await kickMember(Number(groupId), member.userId);
//                 onKick?.(member.userId);
//             } catch (err) {
//                 console.error("추방 실패", err);
//                 alert("그룹원 추방에 실패했습니다.");
//             }
//         }
//     };

//     if (myRole !== "LEADER" || myUserId === member.userId) return null;

//     return (
//         <div ref={menuRef} className="relative">
//             <button
//                 onClick={() => setOpen((prev) => !prev)}
//                 className="text-gray-500 hover:text-gray-700"
//                 title="설정"
//             >
//                 <svg
//                     width="20"
//                     height="20"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                 >
//                     <path d="M5 10a2 2 0 100 4 2 2 0 000-4zm7 0a2 2 0 100 4 2 2 0 000-4zm5 2a2 2 0 114 0 2 2 0 01-4 0z" />
//                 </svg>
//             </button>
//             {open && (
//                 <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10 text-sm text-gray-800">
//                     <button
//                         onClick={handleChangeRole}
//                         className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     >
//                         {member.role === "GUEST" ? "승급" : "강등"}
//                     </button>

//                     {member.role === "MEMBER" && (
//                         <button
//                             onClick={() =>
//                                 handleTransferLeadership(member.userId)
//                             }
//                             className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                         >
//                             리더 위임
//                         </button>
//                     )}

//                     {member.role !== "LEADER" && (
//                         <button
//                             onClick={handleKick}
//                             className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
//                         >
//                             추방
//                         </button>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { changeMemberRole, transferLeadership, kickMember } from "@/api/group";
import { GroupMember } from "@/types/user";
import { useParams } from "next/navigation";

interface MemberMenuProps {
    member: GroupMember;
    myRole: "LEADER" | "MEMBER" | "GUEST"; // ✅ 단일 역할 전달
    myUserId: number; // ✅ 내 ID만 전달
    onRoleChange?: (userId: number, newRole: "GUEST" | "MEMBER") => void;
    onKick?: (userId: number) => void;
}

export default function MemberMenu({
    member,
    myRole,
    myUserId,
    onRoleChange,
    onKick,
}: MemberMenuProps) {
    const { groupId } = useParams();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChangeRole = async () => {
        const nextRole = member.role === "GUEST" ? "MEMBER" : "GUEST";
        try {
            await changeMemberRole(Number(groupId), member.userId, nextRole);
            onRoleChange?.(member.userId, nextRole);
        } catch (err) {
            console.error("역할 변경 실패", err);
            alert("역할 변경에 실패했습니다.");
        }
    };

    const handleTransferLeadership = async (userId: number) => {
        if (
            confirm(
                `"${member.username}"님에게 리더를 위임하시겠습니까? 이 작업은 되돌릴 수 없습니다.`
            )
        ) {
            try {
                await transferLeadership(Number(groupId), userId);
                alert("리더가 성공적으로 변경되었습니다.");
                window.location.reload();
            } catch (err) {
                console.error("리더 위임 실패", err);
                alert("리더 위임에 실패했습니다.");
            }
        }
    };

    const handleKick = async () => {
        if (
            confirm(
                `"${member.username}"님을 그룹에서 추방하시겠습니까? 이 작업은 되돌릴 수 없습니다.`
            )
        ) {
            try {
                await kickMember(Number(groupId), member.userId);
                onKick?.(member.userId);
            } catch (err) {
                console.error("추방 실패", err);
                alert("그룹원 추방에 실패했습니다.");
            }
        }
    };

    if (myRole !== "LEADER" || myUserId === member.userId) return null;

    return (
        <div ref={menuRef} className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="text-gray-500 hover:text-gray-700"
                title="설정"
            >
                <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M5 10a2 2 0 100 4 2 2 0 000-4zm7 0a2 2 0 100 4 2 2 0 000-4zm5 2a2 2 0 114 0 2 2 0 01-4 0z" />
                </svg>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10 text-sm text-gray-800">
                    <button
                        onClick={handleChangeRole}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        {member.role === "GUEST" ? "승급" : "강등"}
                    </button>

                    {member.role === "MEMBER" && (
                        <button
                            onClick={() =>
                                handleTransferLeadership(member.userId)
                            }
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            리더 위임
                        </button>
                    )}

                    {member.role !== "LEADER" && (
                        <button
                            onClick={handleKick}
                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                        >
                            추방
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
