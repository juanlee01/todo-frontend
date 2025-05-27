import { UserRole } from "@/types/user";

export interface ChatMessage {
    groupId: number;
    senderId: number;
    senderName: string;
    senderRole: UserRole; // 예: "LEADER", "MEMBER"
    content: string;
    timestamp?: string;
    type?: "CHAT" | "SYSTEM";
}
