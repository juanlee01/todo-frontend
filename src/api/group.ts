import { apiFetch } from "./api-client";

export async function fetchGroupMembers(groupId: number) {
    const result = await apiFetch(`/api/groups/${groupId}/members`);
    return result ?? [];
}
export async function changeMemberRole(
    groupId: number,
    targetUserId: number,
    newRole: "MEMBER" | "GUEST"
) {
    return apiFetch(
        `/api/groups/${groupId}/members/${targetUserId}/role?newRole=${newRole}`,
        {
            method: "PUT",
        }
    );
}

export async function fetchMyGroupInfo(groupId: number) {
    return apiFetch(`/api/groups/${groupId}/me`);
}
