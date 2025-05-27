// src/api/socket.ts

import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { ChatMessage } from "@/types/chat";

export interface ChatSocketOptions {
    groupId: number;
    onMessage: (message: ChatMessage) => void;
    onConnect?: () => void;
    onDisconnect?: () => void;
}

export class ChatSocket {
    private client: Client;
    private groupId: number;

    constructor({
        groupId,
        onMessage,
        onConnect,
        onDisconnect,
    }: ChatSocketOptions) {
        this.groupId = groupId;

        const token =
            typeof window !== "undefined"
                ? localStorage.getItem("token")
                : null;

        this.client = new Client({
            webSocketFactory: () =>
                // new SockJS("https://todotogether.xyz/ws/chat"),
                new SockJS("http://localhost:8080/ws/chat"),
            connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
            onConnect: () => {
                console.log("✅ WebSocket 연결 성공");

                this.client.subscribe(
                    `/topic/chat/${groupId}`,
                    (msg: IMessage) => {
                        const payload: ChatMessage = JSON.parse(msg.body);
                        onMessage(payload);
                    }
                );

                onConnect?.();
            },
            onDisconnect: () => {
                console.log("🔌 WebSocket 연결 종료");
                onDisconnect?.();
            },
            debug: () => {}, // 로그 숨김
        });

        this.client.activate(); // 🚀 연결 시작
    }

    public sendMessage(message: ChatMessage) {
        if (this.client.connected) {
            this.client.publish({
                destination: `/app/chat/${this.groupId}`,
                body: JSON.stringify(message),
            });
        }
    }

    public disconnect() {
        if (this.client.active) {
            this.client.deactivate();
        }
    }
}
