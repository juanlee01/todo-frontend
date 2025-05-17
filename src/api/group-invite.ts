import { apiFetch } from "./api-client";

export interface Invite {
    inviteId: number;
    groupTitle: string;
    senderUsername: string;
    createdAt: string;
}

// 🔹 받은 초대 목록 조회
export async function fetchMyInvites(): Promise<Invite[]> {
    return apiFetch<Invite[]>("/api/groups/invites");
}

// 🔹 초대 수락
export async function acceptInvite(inviteId: number): Promise<string> {
    const res = await apiFetch<{ message: string }>(
        `/api/groups/invites/${inviteId}/accept`,
        { method: "POST" }
    );
    return res.message;
}

// 🔹 초대 거절
export async function rejectInvite(inviteId: number): Promise<string> {
    const res = await apiFetch<{ message: string }>(
        `/api/groups/invites/${inviteId}/reject`,
        { method: "POST" }
    );
    return res.message;
}
