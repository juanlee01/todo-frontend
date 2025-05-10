import { apiFetch } from "./api-client";
import { TodoStatus, Todo } from "@/types/todo";

export async function fetchTodos(): Promise<Todo[]> {
    const result = await apiFetch("/api/todos");
    return result ?? [];
}

export async function createTodo(
    title: string,
    status: TodoStatus,
    assignedTo: number,
    tag: string = "일반",
    body?: string
): Promise<Todo> {
    return apiFetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({
            title,
            body,
            status,
            assignedTo,
            tag,
        }),
    });
}
