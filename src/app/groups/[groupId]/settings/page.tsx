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
        // <main className="p-6 max-w-3xl mx-auto bg-white text-[#111827]">
        //     <h1 className="text-2xl font-bold mb-6">그룹 설정</h1>

        //     {myInfo && (
        //         <EditableGroupTitle
        //             currentTitle={myInfo.groupTitle}
        //             onTitleChange={(newTitle) =>
        //                 setMyInfo(
        //                     (prev) => prev && { ...prev, title: newTitle }
        //                 )
        //             }
        //         />
        //     )}

        //     {myInfo?.role === "LEADER" && <InviteForm />}

        //     <section>
        //         <h2 className="font-semibold text-lg mb-2">멤버 목록</h2>
        //         <ul className="space-y-2">
        //             {members.map((member) => (
        //                 <li
        //                     key={member.userId}
        //                     className="flex justify-between items-center border px-4 py-2 rounded bg-[#f9fafb]"
        //                 >
        //                     <span>
        //                         {member.username} ({member.role})
        //                     </span>

        //                     {myInfo && (
        //                         <MemberMenu
        //                             member={member}
        //                             myRole={myInfo.role}
        //                             myUserId={myInfo.userId} // ✅ 수정된 부분
        //                             onRoleChange={handleRoleChange}
        //                             onKick={handleKick}
        //                         />
        //                     )}
        //                 </li>
        //             ))}
        //         </ul>
        //     </section>

        //     {myInfo?.role !== "LEADER" && <LeaveGroupButton />}
        // </main>

        <main className="p-6 max-w-7xl mx-auto bg-gray-50 text-[#111827]">
            <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow">
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
                                        myUserId={myInfo.userId}
                                        onRoleChange={handleRoleChange}
                                        onKick={handleKick}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </section>

                {myInfo?.role !== "LEADER" && <LeaveGroupButton />}
            </div>
        </main>
    );
}
