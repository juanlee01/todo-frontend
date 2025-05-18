export type TodoStatus =
    | "PENDING"
    | "IN_PROGRESS"
    | "ON_HOLD"
    | "REVISION_REQUESTED"
    | "COMPLETED"
    | "CANCELED";

export interface UserInfo {
    id: number;
    username: string;
}

export interface Todo {
    id: number;
    title: string;
    body?: string;
    status: TodoStatus;
    tag?: string;
    createdAt?: string;
    createdBy?: UserInfo;
    assignedTo?: UserInfo;
    dueDate?: string;
}
