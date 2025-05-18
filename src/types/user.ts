export type UserRole = "LEADER" | "MEMBER" | "GUEST";

export interface User {
    userId: number;
    username: string;
    email?: string;
    role: UserRole;
}

export interface GroupMember {
    userId: number;
    username: string;
    email?: string;
    role: "LEADER" | "MEMBER" | "GUEST";
}

export interface UserInfo {
    userId: number;
    username: string;
    email: string;
    createdAt: string;
    //role?: string;
}

export interface UserProfile {
    id: number;
    username: string;
    email: string;
    createdAt: string; // LocalDateTime → 문자열로 전송됨
}

// export interface GroupInfo {
//     id: number;
//     title: string;
//     role: "LEADER" | "MEMBER" | "GUEST";
// }
