import { ChatMessage } from "@/types/chat";
import { apiFetch } from "./api-client";

/**
 * 그룹 채팅 메시지를 페이지 단위로 불러옵니다.
 * @param groupId - 그룹 ID
 * @param page - 페이지 번호 (0부터 시작)
 * @param size - 페이지 크기 (기본값 20)
 * @returns ChatMessage[] 배열 (최신순 정렬)
 */
export async function fetchChatMessages(
    groupId: number,
    page: number,
    size = 20
): Promise<ChatMessage[]> {
    return await apiFetch<ChatMessage[]>(
        `/api/chat/${groupId}/messages?page=${page}&size=${size}`
    );
}
