export interface CommentDto {
    id: number;
    todoId: number;
    groupNickname?: string; // 그룹 닉네임
    createdId?: number;
    content: string;
    createdAt: string;
}
