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

export async function putComment(commentId: number, content: string) {
    return await apiFetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
    });
}

export async function deleteComment(commentId: number) {
    return await apiFetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    });
}
