// src/api/api-client.ts

// export async function apiFetch(path: string, options: RequestInit = {}) {
//     const token = localStorage.getItem("token");

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
//         ...options,
//         headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }),
//             ...options.headers,
//         },
//     });

//     if (!res.ok) throw new Error(`API 요청 실패: ${res.status}`);
//     return res.json();
// }

export async function apiFetch(path: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    });

    if (!res.ok) {
        const text = await res.text();
        console.error("응답 실패:", res.status, text);
        throw new Error(`API 요청 실패: ${res.status}`);
    }

    const text = await res.text();
    if (!text) return null;

    try {
        return JSON.parse(text);
    } catch (err) {
        console.warn("JSON 파싱 실패", text, err);
        return null;
    }
}
