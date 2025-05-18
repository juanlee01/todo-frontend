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

//     if (!res.ok) {
//         const text = await res.text();
//         console.error("응답 실패:", res.status, text);
//         throw new Error(`API 요청 실패: ${res.status}`);
//     }

//     const text = await res.text();
//     if (!text) return null;

//     try {
//         return JSON.parse(text);
//     } catch (err) {
//         console.warn("JSON 파싱 실패", text, err);
//         return null;
//     }
// }

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

//     const text = await res.text();
//     if (!res.ok) {
//         try {
//             const json = JSON.parse(text);
//             throw new Error(json.message || `API 요청 실패: ${res.status}`);
//         } catch {
//             throw new Error(`API 요청 실패: ${res.status}`);
//         }
//     }
//     if (!res.ok) {
//         const text = await res.text();
//         try {
//             const json = JSON.parse(text);
//             console.error("❌ API 오류 메시지:", json.message); // ← 여기!
//             throw new Error(json.message || `API 요청 실패: ${res.status}`);
//         } catch {
//             console.error("❌ API 오류 (텍스트):", text);
//             throw new Error(`API 요청 실패: ${res.status}`);
//         }
//     }

//     if (!text) return null;

//     try {
//         return JSON.parse(text);
//     } catch (err) {
//         console.warn("JSON 파싱 실패", text, err);
//         return null;
//     }
// }

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

//     let text = "";
//     try {
//         text = await res.text();
//     } catch {
//         // 응답 body가 없을 경우도 대비
//         text = "";
//     }

//     if (!res.ok) {
//         try {
//             const json = JSON.parse(text);
//             throw new Error(json.message || `API 요청 실패: ${res.status}`);
//         } catch {
//             throw new Error(`API 요청 실패: ${res.status}`);
//         }
//     }

//     if (!text) return null;

//     try {
//         return JSON.parse(text);
//     } catch {
//         return null;
//     }
// }

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

//     let data = null;

//     try {
//         data = await res.json(); // ✅ JSON으로 바로 파싱
//     } catch (err) {
//         console.warn("⚠️ JSON 파싱 실패", err);
//     }

//     if (!res.ok) {
//         const message = data?.message || `API 요청 실패: ${res.status}`;
//         console.error("❌ 서버 에러 메시지:", message);
//         throw new Error(message);
//     }

//     return data;
// }

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

//     let data: any;
//     try {
//         data = await res.json();
//     } catch (err) {
//         console.warn("⚠️ JSON 파싱 실패:", err);
//         data = null;
//     }

//     if (!res.ok) {
//         const errorMessage = data?.message || `API 요청 실패: ${res.status}`;
//         throw new Error(errorMessage); // ✅ 무조건 던짐
//     }

//     return data;
// }

const API_BASE_URL = "http://localhost:8080";
//const API_BASE_URL = "https://www.todotogether.xyz";

function isErrorResponse(data: unknown): data is { message: string } {
    return (
        typeof data === "object" &&
        data !== null &&
        Object.prototype.hasOwnProperty.call(data, "message") &&
        typeof (data as Record<string, unknown>).message === "string"
    );
}

// export async function apiFetch<T = unknown>(
//     path: string,
//     options: RequestInit = {}
// ): Promise<T> {
//     const token = localStorage.getItem("token");

//     // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
//     const res = await fetch(`${API_BASE_URL}${path}`, {
//         ...options,
//         headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }),
//             ...options.headers,
//         },
//     });

//     let data: unknown;
//     try {
//         data = await res.json();
//     } catch (err) {
//         console.warn("⚠️ JSON 파싱 실패:", err);
//         data = null;
//     }

//     if (!res.ok) {
//         const errorMessage = isErrorResponse(data)
//             ? data.message
//             : `API 요청 실패: ${res.status}`;
//         throw new Error(errorMessage);
//     }

//     return data as T;
// }

export async function apiFetch<T = unknown>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    });

    const text = await res.text();

    let data: unknown = null;
    if (text) {
        try {
            data = JSON.parse(text);
        } catch (err) {
            console.warn("JSON 파싱 실패:", err);
        }
    }

    if (!res.ok) {
        const errorMessage = isErrorResponse(data)
            ? data.message
            : `API 요청 실패: ${res.status}`;
        throw new Error(errorMessage);
    }

    return data as T;
}
