import { apiFetch } from "./api-client";

export async function login(username: string, password: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        }
    );

    if (!res.ok) {
        const text = await res.text();
        console.error("로그인 실패 응답:", res.status, text);
        throw new Error("로그인 실패");
    }

    const result = await res.json(); // ✅ 본문이 항상 존재해야 함
    return result;
}

export async function signup(
    username: string,
    password: string,
    email: string
) {
    return apiFetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ username, password, email }),
    });
}

export async function checkUsername(username: string) {
    const result = await apiFetch(
        `/api/auth/check-username?username=${encodeURIComponent(username)}`
    );
    return result ?? { available: false }; // ✅ fallback
}

export async function checkEmail(email: string) {
    const result = await apiFetch(
        `/api/auth/check-email?email=${encodeURIComponent(email)}`
    );
    return result ?? { available: false }; // ✅ fallback
}

export async function fetchMe(): Promise<{
    userId: number;
    username: string;
    email: string;
    role?: string;
} | null> {
    const result = await apiFetch("/api/auth/me");
    return result ?? null;
}
