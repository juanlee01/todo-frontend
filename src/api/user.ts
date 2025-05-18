// src/api/user.ts

import { apiFetch } from "./api-client";
import { UserProfile } from "@/types/user";

// export interface UserProfile {
//     username: string;
//     email: string;
// }

// 1. 내 정보 조회
export async function fetchMyProfile(): Promise<UserProfile> {
    return apiFetch<UserProfile>("/api/users/me");
}

// 2. 내 정보 수정
export async function updateMyProfile(data: {
    email: string;
}): Promise<string> {
    const res = await apiFetch<{ message: string }>("/api/users/me", {
        method: "PUT",
        body: JSON.stringify(data),
    });
    return res.message;
}

// 3. 비밀번호 변경
export async function changePassword(data: {
    oldPassword: string;
    newPassword: string;
}): Promise<string> {
    const res = await apiFetch<{ message: string }>("/api/users/me/password", {
        method: "PUT",
        body: JSON.stringify(data),
    });
    return res.message;
}

// 4. 회원 탈퇴
export async function deleteMyAccount(): Promise<string> {
    const res = await apiFetch<{ message: string }>("/api/users/me", {
        method: "DELETE",
    });
    return res.message;
}
