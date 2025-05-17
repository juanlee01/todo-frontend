"use client";

import { useEffect, useState } from "react";
import { fetchMyDashboardData } from "@/api/todo";
import { PersonalDashboardResponse } from "@/types/dashboard";
import OverviewCards from "@/components/dashboard/OverviewCards";
import StatusDistribution from "@/components/dashboard/StatusDistribution";
import TagChart from "@/components/dashboard/TagChart";

export default function MyDashboardPage() {
    const [data, setData] = useState<PersonalDashboardResponse | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetchMyDashboardData();
                setData(res);
            } catch (err) {
                console.error("개인 대시보드 데이터 로딩 실패", err);
            }
        };
        load();
    }, []);

    if (!data) {
        return (
            <div className="text-center text-gray-500 mt-10">
                개인 대시보드 데이터를 불러오는 중...
            </div>
        );
    }

    return (
        <main className="p-6 max-w-4xl mx-auto text-[#111827]">
            <h1 className="text-2xl font-bold mb-6">📋 내 할 일 대시보드</h1>

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
                    }}
                />

                <TagChart tags={data.tagCounts} />
            </div>
        </main>
    );
}
