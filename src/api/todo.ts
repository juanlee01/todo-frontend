// import { apiFetch } from "./api-client";
// import { TodoStatus, Todo } from "@/types/todo";
// import { PersonalDashboardResponse } from "@/types/dashboard";

// export async function fetchTodos(): Promise<Todo[]> {
//     const result = await apiFetch("/api/todos");
//     return result ?? [];
// }

// export async function fetchPersonalTodos(): Promise<Todo[]> {
//     const result = await apiFetch("/api/todos/personal");
//     return result ?? [];
// }

// export async function fetchGroupTodos(groupId: number): Promise<Todo[]> {
//     const result = await apiFetch(`/api/todos/group/${groupId}`);
//     return result ?? [];
// }

// export async function fetchMyDashboardData(): Promise<PersonalDashboardResponse> {
//     return apiFetch("/api/todos/me/dashboard");
// }

// /**
//  * 할 일을 생성합니다.
//  * @param title 제목
//  * @param status 상태 (PENDING, IN_PROGRESS 등)
//  * @param assignedTo 담당자 ID (ex: 자기 자신 또는 다른 유저)
//  * @param tag 태그 (기본값: "일반")
//  * @param body 내용 (optional)
//  * @param groupId 그룹 ID (optional)
//  */

// export async function createTodo(
//     title: string,
//     status: TodoStatus,
//     tag: string = "일반",
//     body?: string,
//     groupId?: number | null
// ): Promise<Todo> {
//     return apiFetch("/api/todos", {
//         method: "POST",
//         body: JSON.stringify({
//             title,
//             body,
//             status,
//             tag,
//             groupId,
//         }),
//     });
// }

// export async function updateTodo(
//     id: number,
//     data: {
//         title: string;
//         body?: string;
//         status: TodoStatus;
//         tag: string;
//         assignedTo: number;
//     }
// ): Promise<Todo> {
//     return apiFetch(`/api/todos/${id}`, {
//         method: "PUT",
//         body: JSON.stringify(data),
//     });
// }

import { apiFetch } from "./api-client";
import { Todo, TodoStatus } from "@/types/todo";
import { PersonalDashboardResponse } from "@/types/dashboard";

// 🔹 전체 Todo 조회
export async function fetchTodos(): Promise<Todo[]> {
    const result = await apiFetch<Todo[]>("/api/todos");
    return result ?? [];
}

// 🔹 개인 Todo만 조회
export async function fetchPersonalTodos(): Promise<Todo[]> {
    const result = await apiFetch<Todo[]>("/api/todos/personal");
    return result ?? [];
}

// 🔹 그룹 Todo 조회
export async function fetchGroupTodos(groupId: number): Promise<Todo[]> {
    const result = await apiFetch<Todo[]>(`/api/todos/group/${groupId}`);
    return result ?? [];
}

// 🔹 개인 대시보드 통계 데이터
export async function fetchMyDashboardData(): Promise<PersonalDashboardResponse> {
    return apiFetch<PersonalDashboardResponse>("/api/todos/me/dashboard");
}

// 🔹 할 일 생성
export async function createTodo(
    title: string,
    status: TodoStatus,
    tag: string = "일반",
    body?: string,
    groupId?: number | null
): Promise<Todo> {
    return apiFetch<Todo>("/api/todos", {
        method: "POST",
        body: JSON.stringify({
            title,
            body,
            status,
            tag,
            groupId,
        }),
    });
}

// 🔹 할 일 수정
export async function updateTodo(
    id: number,
    data: {
        title: string;
        body?: string;
        status: TodoStatus;
        tag: string;
        assignedTo: number;
    }
): Promise<Todo> {
    return apiFetch<Todo>(`/api/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}
