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
