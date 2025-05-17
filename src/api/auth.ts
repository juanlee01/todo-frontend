// import { apiFetch } from "./api-client";

// export async function login(username: string, password: string) {
//     const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
//         {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username, password }),
//         }
//     );

//     if (!res.ok) {
//         const text = await res.text();
//         console.error("로그인 실패 응답:", res.status, text);
//         throw new Error("로그인 실패");
//     }

//     const result = await res.json(); // ✅ 본문이 항상 존재해야 함
//     return result;
// }

// export async function signup(
//     username: string,
//     password: string,
//     email: string
// ) {
//     return apiFetch("/api/auth/signup", {
//         method: "POST",
//         body: JSON.stringify({ username, password, email }),
//     });
// }

// export async function checkUsername(username: string) {
//     const result = await apiFetch(
//         `/api/auth/check-username?username=${encodeURIComponent(username)}`
//     );
//     return result ?? { available: false }; // ✅ fallback
// }

// export async function checkEmail(email: string) {
//     const result = await apiFetch(
//         `/api/auth/check-email?email=${encodeURIComponent(email)}`
//     );
//     return result ?? { available: false }; // ✅ fallback
// }

// export async function fetchMe(): Promise<{
//     userId: number;
//     username: string;
//     email: string;
//     role?: string;
// } | null> {
//     const result = await apiFetch("/api/auth/me");
//     return result ?? null;
// }
import { apiFetch } from "./api-client";

interface AuthResponse {
    accessToken: string;
    refreshToken?: string;
}

interface CheckAvailableResponse {
    available: boolean;
}

interface UserInfo {
    userId: number;
    username: string;
    email: string;
    role?: string;
}

// 🔹 로그인
export async function login(
    username: string,
    password: string
): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
    });
}

// 🔹 회원가입
export async function signup(
    username: string,
    password: string,
    email: string
): Promise<{ message: string }> {
    return apiFetch<{ message: string }>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ username, password, email }),
    });
}

// 🔹 아이디 중복 확인
export async function checkUsername(
    username: string
): Promise<CheckAvailableResponse> {
    const result = await apiFetch<CheckAvailableResponse>(
        `/api/auth/check-username?username=${encodeURIComponent(username)}`
    );
    return result ?? { available: false };
}

// 🔹 이메일 중복 확인
export async function checkEmail(
    email: string
): Promise<CheckAvailableResponse> {
    const result = await apiFetch<CheckAvailableResponse>(
        `/api/auth/check-email?email=${encodeURIComponent(email)}`
    );
    return result ?? { available: false };
}

// 🔹 현재 로그인된 사용자 정보 조회
export async function fetchMe(): Promise<UserInfo | null> {
    const result = await apiFetch<UserInfo>("/api/auth/me");
    return result ?? null;
}
