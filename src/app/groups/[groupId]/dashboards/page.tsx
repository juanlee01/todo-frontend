// src/app/groups/[groupId]/dashboards/page.tsx
"use client";

import { useEffect, useState } from "react";
//import { useParams } from "next/navigation";
import { fetchDashboardData } from "@/api/group";
import { DashboardResponse } from "@/types/dashboard";
import { useGroupStore } from "@/store/groupStore";
import OverviewCards from "@/components/dashboard/OverviewCards";
import StatusDistribution from "@/components/dashboard/StatusDistribution";
import TagChart from "@/components/dashboard/TagChart";
import AssigneeChart from "@/components/dashboard/AssigneeChart";

export default function DashboardPage() {
    //const { groupId } = useParams();
    const [data, setData] = useState<DashboardResponse | null>(null);
    const { selectedGroupId } = useGroupStore();

    useEffect(() => {
        if (selectedGroupId == null) return;

        const load = async () => {
            try {
                const res = await fetchDashboardData(selectedGroupId);
                setData(res);
            } catch {
                //console.error("대시보드 데이터 불러오기 실패", err);
            }
        };

        if (selectedGroupId) load();
    }, [selectedGroupId]);

    if (!data) {
        return (
            <div className="text-center text-gray-500 mt-10">
                대시보드 데이터를 불러오는 중...
            </div>
        );
    }

    return (
        <main className="p-6 max-w-4xl mx-auto text-[#111827]">
            <h1 className="text-2xl font-bold mb-6">
                📊 {data.groupTitle} 대시보드
            </h1>

            <div className="space-y-6">
                <OverviewCards
                    totalTodos={data.totalTodos}
                    completionRate={data.completionRate}
                />

                <StatusDistribution
                    statusCounts={{
                        PENDING: data.statusCounts.PENDING ?? 0,
                        IN_PROGRESS: data.statusCounts.IN_PROGRESS ?? 0,
                        COMPLETED: data.statusCounts.COMPLETED ?? 0,
                        ON_HOLD: data.statusCounts.ON_HOLD ?? 0,
                        REVISION_REQUESTED:
                            data.statusCounts.REVISION_REQUESTED ?? 0,
                        CANCELED: data.statusCounts.CANCELED ?? 0,
                    }}
                />

                <TagChart tags={data.tagCounts} />

                <AssigneeChart data={data.todosPerAssignee} />
            </div>
        </main>
    );
}
