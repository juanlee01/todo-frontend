// import { apiFetch } from "./api-client";
// import { DashboardResponse } from "@/types/dashboard";

// export async function fetchGroupMembers(groupId: number) {
//     const result = await apiFetch(`/api/groups/${groupId}/members`);
//     return result ?? [];
// }

// export async function changeMemberRole(
//     groupId: number,
//     targetUserId: number,
//     newRole: "MEMBER" | "GUEST"
// ) {
//     return apiFetch(
//         `/api/groups/${groupId}/members/${targetUserId}/role?newRole=${newRole}`,
//         {
//             method: "PUT",
//         }
//     );
// }

// export async function fetchMyGroupInfo(groupId: number) {
//     return apiFetch(`/api/groups/${groupId}/me`);
// }

// export async function fetchMyGroups(): Promise<
//     { id: number; title: string }[]
// > {
//     const result = await apiFetch("/api/groups/my");
//     return result ?? [];
// }
// export async function fetchDashboardData(
//     groupId: number
// ): Promise<DashboardResponse> {
//     return apiFetch(`/api/groups/${groupId}/dashboard`);
// }

// // 리더 위임
// export async function transferLeadership(
//     groupId: number,
//     newLeaderUserId: number
// ) {
//     return apiFetch(`/api/groups/${groupId}/leader/${newLeaderUserId}`, {
//         method: "PUT",
//     });
// }

// // 멤버 추방
// export async function kickMember(
//     groupId: number,
//     userId: number
// ): Promise<void> {
//     await apiFetch(`/api/groups/${groupId}/members/${userId}`, {
//         method: "DELETE",
//     });
// }

// // 맴버 초대
// // 초대할 이메일을 받아서 초대 요청을 보냅니다.
// // 성공 시 초대 메시지를 반환합니다.
// export async function inviteMember(
//     groupId: number,
//     email: string
// ): Promise<string> {
//     const result = await apiFetch(`/api/groups/${groupId}/invite`, {
//         method: "POST",
//         body: JSON.stringify({ email }),
//     });

//     // 응답이 null인 경우를 대비한 처리
//     if (!result || !result.message) {
//         throw new Error("초대 응답이 올바르지 않습니다.");
//     }

//     return result.message;
// }

import { apiFetch } from "./api-client";
import { DashboardResponse } from "@/types/dashboard";
import { GroupMember } from "@/types/user";

// 📌 공통 타입
// export interface GroupMember {
//     userId: number;
//     username: string;
//     role: "LEADER" | "MEMBER" | "GUEST";
// }

export interface GroupInfo {
    groupId: number;
    userId: number; // 사용자 ID
    groupTitle: string;
    role: "LEADER" | "MEMBER" | "GUEST";
}

export interface SimpleGroup {
    id: number;
    title: string;
}

// 그룹 멤버 조회
export async function fetchGroupMembers(
    groupId: number
): Promise<GroupMember[]> {
    const result = await apiFetch<GroupMember[]>(
        `/api/groups/${groupId}/members`
    );
    return result ?? [];
}

// 멤버 역할 변경
export async function changeMemberRole(
    groupId: number,
    targetUserId: number,
    newRole: "MEMBER" | "GUEST"
): Promise<{ message: string }> {
    return apiFetch<{ message: string }>(
        `/api/groups/${groupId}/members/${targetUserId}/role?newRole=${newRole}`,
        { method: "PUT" }
    );
}

// 내 그룹 내 역할/정보 조회
export async function fetchMyGroupInfo(groupId: number): Promise<GroupInfo> {
    return apiFetch<GroupInfo>(`/api/groups/${groupId}/me`);
}

// 내가 속한 모든 그룹 목록
export async function fetchMyGroups(): Promise<SimpleGroup[]> {
    const result = await apiFetch<SimpleGroup[]>(`/api/groups/my`);
    return result ?? [];
}

// 대시보드 데이터
export async function fetchDashboardData(
    groupId: number
): Promise<DashboardResponse> {
    return apiFetch<DashboardResponse>(`/api/groups/${groupId}/dashboard`);
}

// 리더 위임
export async function transferLeadership(
    groupId: number,
    newLeaderUserId: number
): Promise<{ message: string }> {
    return apiFetch<{ message: string }>(
        `/api/groups/${groupId}/leader/${newLeaderUserId}`,
        { method: "PUT" }
    );
}

// 멤버 추방
export async function kickMember(
    groupId: number,
    userId: number
): Promise<void> {
    await apiFetch<void>(`/api/groups/${groupId}/members/${userId}`, {
        method: "DELETE",
    });
}

// 멤버 초대
export async function inviteMember(
    groupId: number,
    email: string
): Promise<string> {
    const result = await apiFetch<{ message: string }>(
        `/api/groups/${groupId}/invite`,
        {
            method: "POST",
            body: JSON.stringify({ email }),
        }
    );

    if (!result || !result.message) {
        throw new Error("초대 응답이 올바르지 않습니다.");
    }

    return result.message;
}

// 그룹 탈퇴
export async function leaveGroup(groupId: number): Promise<string> {
    try {
        const res = await apiFetch<{ message: string }>(
            `/api/groups/${groupId}/leave`,
            {
                method: "DELETE",
            }
        );
        return res.message;
    } catch (err: unknown) {
        if (err instanceof Error) {
            const msg = err.message;

            // ✅ 리더 탈퇴 차단
            if (
                msg.includes("LEADER") &&
                (msg.includes("탈퇴") || msg.includes("LEADER"))
            ) {
                throw new Error(
                    "리더는 탈퇴할 수 없습니다. 리더를 위임해주세요."
                );
            }

            // ✅ 기타 서버 메시지를 그대로 전달
            throw new Error(msg);
        }

        throw new Error("그룹 탈퇴 중 알 수 없는 오류가 발생했습니다.");
    }
}

// 그룹 제목 수정
// 그룹 제목을 수정하는 API 요청을 보냅니다.
// 성공 시 수정된 제목을 반환합니다.
// 실패 시 에러 메시지를 반환합니다.

export async function updateGroupTitle(
    groupId: number,
    newTitle: string
): Promise<string> {
    const res = await apiFetch<{ message: string }>(
        `/api/groups/${groupId}/title`,
        {
            method: "PUT",
            body: JSON.stringify({ title: newTitle }),
        }
    );
    return res.message;
}
