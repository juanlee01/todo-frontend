import { apiFetch } from "./api-client";

export async function login(username: string, password: string) {
    const result = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
    });

    console.log("상태 코드: 200"); // apiFetch에서 이미 실패하면 throw 되므로 여기는 성공
    console.log("응답 내용:", result);

    return result; // { accessToken: string }
}

export async function fetchMe() {
    return apiFetch("/api/auth/me"); // token 자동으로 포함됨
}
