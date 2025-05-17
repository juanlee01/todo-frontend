// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import {
//     fetchGroupMembers,
//     fetchMyGroupInfo,
//     changeMemberRole,
// } from "@/api/group";
// import { GroupMember } from "@/types/user";

// export default function GroupSettingsPage() {
//     const { groupId } = useParams();
//     const [members, setMembers] = useState<GroupMember[]>([]);
//     const [myInfo, setMyInfo] = useState<GroupMember | null>(null);

//     useEffect(() => {
//         const load = async () => {
//             try {
//                 const data = await fetchGroupMembers(Number(groupId));
//                 setMembers(data);
//             } catch (err) {
//                 console.error("그룹 멤버 불러오기 실패", err);
//             }
//         };
//         load();
//     }, [groupId]);

//     useEffect(() => {
//         const loadMe = async () => {
//             try {
//                 const data = await fetchMyGroupInfo(Number(groupId));
//                 setMyInfo(data);
//             } catch (err) {
//                 console.error("그룹 내 내 정보 불러오기 실패", err);
//             }
//         };
//         loadMe();
//     }, [groupId]);

//     return (
//         <main className="p-6 max-w-3xl mx-auto bg-white text-[#111827]">
//             <h1 className="text-2xl font-bold mb-6">그룹 설정</h1>

//             <section>
//                 <h2 className="font-semibold text-lg mb-2">멤버 목록</h2>
//                 <ul className="space-y-2">
//                     {(members ?? []).map((member) => (
//                         <li
//                             key={member.userId}
//                             className="flex justify-between items-center border px-4 py-2 rounded bg-[#f9fafb]"
//                         >
//                             <span>
//                                 {member.username} ({member.role})
//                             </span>

//                             {myInfo?.role === "LEADER" &&
//                                 myInfo.userId !== member.userId && (
//                                     <button
//                                         onClick={async () => {
//                                             const nextRole =
//                                                 member.role === "GUEST"
//                                                     ? "MEMBER"
//                                                     : "GUEST";

//                                             try {
//                                                 await changeMemberRole(
//                                                     Number(groupId),
//                                                     member.userId,
//                                                     nextRole
//                                                 );

//                                                 setMembers((prev) =>
//                                                     prev.map((m) =>
//                                                         m.userId ===
//                                                         member.userId
//                                                             ? {
//                                                                   ...m,
//                                                                   role: nextRole,
//                                                               }
//                                                             : m
//                                                     )
//                                                 );
//                                             } catch (err) {
//                                                 console.error(
//                                                     "역할 변경 실패",
//                                                     err
//                                                 );
//                                                 alert(
//                                                     "역할 변경에 실패했습니다."
//                                                 );
//                                             }
//                                         }}
//                                         className="text-blue-600 hover:underline text-sm"
//                                     >
//                                         {member.role === "GUEST"
//                                             ? "승급"
//                                             : "강등"}
//                                     </button>
//                                 )}
//                         </li>
//                     ))}
//                 </ul>
//             </section>
//         </main>
//     );
// }
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { fetchGroupMembers, fetchMyGroupInfo } from "@/api/group";
// import { GroupMember, GroupInfo } from "@/types/user";
// import InviteForm from "@/components/group/InviteForm";
// import MemberMenu from "@/components/group/MemberActionsMenu";
// import LeaveGroupButton from "@/components/group/LeaveGroupButton";
// import EditableGroupTitle from "@/components/group/EditGroupTitleForm";

// export default function GroupSettingsPage() {
//     const { groupId } = useParams();
//     const groupIdNumber = Number(groupId);

//     const [members, setMembers] = useState<GroupMember[]>([]);
//     const [myInfo, setMyInfo] = useState<GroupInfo | null>(null);

//     useEffect(() => {
//         if (!groupIdNumber) return;

//         const loadMembers = async () => {
//             try {
//                 const data = await fetchGroupMembers(groupIdNumber);
//                 setMembers(data);
//             } catch (err) {
//                 console.error("❌ 그룹 멤버 불러오기 실패:", err);
//             }
//         };

//         loadMembers();
//     }, [groupIdNumber]);

//     useEffect(() => {
//         if (!groupIdNumber) return;

//         const loadMyInfo = async () => {
//             try {
//                 const data = await fetchMyGroupInfo(groupIdNumber);
//                 setMyInfo(data);
//             } catch (err) {
//                 console.error("❌ 내 그룹 정보 불러오기 실패:", err);
//             }
//         };

//         loadMyInfo();
//     }, [groupIdNumber]);

//     const handleRoleChange = (userId: number, newRole: "GUEST" | "MEMBER") => {
//         setMembers((prev) =>
//             prev.map((m) => (m.userId === userId ? { ...m, role: newRole } : m))
//         );
//     };

//     const handleKick = (userId: number) => {
//         setMembers((prev) => prev.filter((m) => m.userId !== userId));
//     };

//     return (
//         <main className="p-6 max-w-3xl mx-auto bg-white text-[#111827]">
//             <h1 className="text-2xl font-bold mb-6">그룹 설정</h1>

//             {myInfo && (
//                 <EditableGroupTitle
//                     currentTitle={myInfo.title}
//                     onTitleChange={(newTitle) =>
//                         setMyInfo(
//                             (prev) => prev && { ...prev, title: newTitle }
//                         )
//                     }
//                 />
//             )}

//             <InviteForm />

//             <section>
//                 <h2 className="font-semibold text-lg mb-2">멤버 목록</h2>
//                 <ul className="space-y-2">
//                     {members.map((member) => (
//                         <li
//                             key={member.userId}
//                             className="flex justify-between items-center border px-4 py-2 rounded bg-[#f9fafb]"
//                         >
//                             <span>
//                                 {member.username} ({member.role})
//                             </span>

//                             {myInfo && (
//                                 <MemberMenu
//                                     member={member}
//                                     myRole={myInfo.role}
//                                     myUserId={myInfo.id} // GroupInfo에 포함된 내 ID
//                                     onRoleChange={handleRoleChange}
//                                     onKick={handleKick}
//                                 />
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </section>
//             <LeaveGroupButton />
//         </main>
//     );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchGroupMembers, fetchMyGroupInfo } from "@/api/group";
import { GroupMember } from "@/types/user";
import { GroupInfo } from "@/api/group";
import InviteForm from "@/components/group/InviteForm";
import MemberMenu from "@/components/group/MemberActionsMenu";
import LeaveGroupButton from "@/components/group/LeaveGroupButton";
import EditableGroupTitle from "@/components/group/EditGroupTitleForm";

export default function GroupSettingsPage() {
    const { groupId } = useParams();
    const groupIdNumber = Number(groupId);

    const [members, setMembers] = useState<GroupMember[]>([]);
    const [myInfo, setMyInfo] = useState<GroupInfo | null>(null);

    useEffect(() => {
        if (!groupIdNumber) return;

        const loadMembers = async () => {
            try {
                const data = await fetchGroupMembers(groupIdNumber);
                setMembers(data);
            } catch (err) {
                console.error("❌ 그룹 멤버 불러오기 실패:", err);
            }
        };

        loadMembers();
    }, [groupIdNumber]);

    useEffect(() => {
        if (!groupIdNumber) return;

        const loadMyInfo = async () => {
            try {
                const data = await fetchMyGroupInfo(groupIdNumber);
                setMyInfo(data);
            } catch (err) {
                console.error("❌ 내 그룹 정보 불러오기 실패:", err);
            }
        };

        loadMyInfo();
    }, [groupIdNumber]);

    const handleRoleChange = (userId: number, newRole: "GUEST" | "MEMBER") => {
        setMembers((prev) =>
            prev.map((m) => (m.userId === userId ? { ...m, role: newRole } : m))
        );
    };

    const handleKick = (userId: number) => {
        setMembers((prev) => prev.filter((m) => m.userId !== userId));
    };

    return (
        <main className="p-6 max-w-3xl mx-auto bg-white text-[#111827]">
            <h1 className="text-2xl font-bold mb-6">그룹 설정</h1>

            {myInfo && (
                <EditableGroupTitle
                    currentTitle={myInfo.groupTitle}
                    onTitleChange={(newTitle) =>
                        setMyInfo(
                            (prev) => prev && { ...prev, title: newTitle }
                        )
                    }
                />
            )}

            {myInfo?.role === "LEADER" && <InviteForm />}

            <section>
                <h2 className="font-semibold text-lg mb-2">멤버 목록</h2>
                <ul className="space-y-2">
                    {members.map((member) => (
                        <li
                            key={member.userId}
                            className="flex justify-between items-center border px-4 py-2 rounded bg-[#f9fafb]"
                        >
                            <span>
                                {member.username} ({member.role})
                            </span>

                            {myInfo && (
                                <MemberMenu
                                    member={member}
                                    myRole={myInfo.role}
                                    myUserId={myInfo.userId} // ✅ 수정된 부분
                                    onRoleChange={handleRoleChange}
                                    onKick={handleKick}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </section>

            {myInfo?.role !== "LEADER" && <LeaveGroupButton />}
        </main>
    );
}
