export interface DashboardStats {
    totalTodos: number;
    completedCount: number;
    inProgressCount: number;
    pendingCount: number;
    onHoldCount: number;
    completionRate: number;
    todosPerAssignee: Record<string, number>;
    tags: Record<string, number>;
}

// src/types/dashboard.ts

export interface DashboardResponse {
    groupTitle: string;
    totalTodos: number;
    completionRate: number;
    statusCounts: {
        PENDING?: number;
        IN_PROGRESS?: number;
        ON_HOLD?: number;
        REVISION_REQUESTED?: number;
        COMPLETED?: number;
        CANCELED?: number;
    };
    todosPerAssignee: { [username: string]: number };
    tags: { [tag: string]: number };
}

export interface PersonalDashboardResponse {
    totalTodos: number;
    statusCounts: {
        PENDING?: number;
        IN_PROGRESS?: number;
        COMPLETED?: number;
    };
    completionRate: number;
    tagCounts: {
        [tag: string]: number;
    };
}
