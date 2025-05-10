"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    fetchGroupMembers,
    fetchMyGroupInfo,
    changeMemberRole,
} from "@/api/group";
import { GroupMember } from "@/types/user";

export default function GroupSettingsPage() {
    const { groupId } = useParams();
    const [members, setMembers] = useState<GroupMember[]>([]);
    const [myInfo, setMyInfo] = useState<GroupMember | null>(null);

    // 그룹 멤버 목록
    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchGroupMembers(Number(groupId));
                setMembers(data);
            } catch (err) {
                console.error("그룹 멤버 불러오기 실패", err);
            }
        };
        load();
    }, [groupId]);

    // 그룹 내 내 역할 조회
    useEffect(() => {
        const loadMe = async () => {
            try {
                const data = await fetchMyGroupInfo(Number(groupId));
                setMyInfo(data);
            } catch (err) {
                console.error("그룹 내 내 정보 불러오기 실패", err);
            }
        };
        loadMe();
    }, [groupId]);

    return (
        <main className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-black">그룹 설정</h1>

            <section>
                <h2 className="font-semibold text-lg mb-2">멤버 목록</h2>
                <ul className="space-y-2">
                    {(members ?? []).map((member) => (
                        <li
                            key={member.userId}
                            className="flex justify-between items-center border px-4 py-2 rounded"
                        >
                            <span>
                                {member.username} ({member.role})
                            </span>

                            {myInfo?.role === "LEADER" &&
                                myInfo.userId !== member.userId && (
                                    <button
                                        onClick={async () => {
                                            const nextRole =
                                                member.role === "GUEST"
                                                    ? "MEMBER"
                                                    : "GUEST";

                                            try {
                                                await changeMemberRole(
                                                    Number(groupId),
                                                    member.userId,
                                                    nextRole
                                                );

                                                // UI 업데이트
                                                setMembers((prev) =>
                                                    prev.map((m) =>
                                                        m.userId ===
                                                        member.userId
                                                            ? {
                                                                  ...m,
                                                                  role: nextRole,
                                                              }
                                                            : m
                                                    )
                                                );
                                            } catch (err) {
                                                console.error(
                                                    "역할 변경 실패",
                                                    err
                                                );
                                                alert(
                                                    "역할 변경에 실패했습니다."
                                                );
                                            }
                                        }}
                                        className="text-blue-500 hover:underline text-sm"
                                    >
                                        {member.role === "GUEST"
                                            ? "승급"
                                            : "강등"}
                                    </button>
                                )}
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
