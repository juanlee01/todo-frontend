// api/comment.ts
import { apiFetch } from "./api-client";
import { CommentDto } from "@/types/comment"; // 경로는 프로젝트에 맞게 수정

export async function getCommentsByTodoId(
    todoId: number
): Promise<CommentDto[]> {
    return await apiFetch<CommentDto[]>(`/api/comments/todo/${todoId}`);
}

/** 댓글 작성 */
export async function postComment(todoId: number, content: string) {
    return await apiFetch(`/api/comments`, {
        method: "POST",
        body: JSON.stringify({ todoId, content }),
    });
}
