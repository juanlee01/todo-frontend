// src/components/dashboard/OverviewCards.tsx

"use client";

import React from "react";

interface OverviewProps {
    totalTodos: number;
    completionRate: number;
}

export default function OverviewCards({
    totalTodos,
    completionRate,
}: OverviewProps) {
    return (
        <div className="grid grid-cols-2 gap-4 text-[#111827]">
            <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-sm font-semibold mb-2">전체 할 일</h2>
                <p className="text-2xl font-bold">{totalTodos}</p>
            </div>

            <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-sm font-semibold mb-2">완료율</h2>
                <p className="text-2xl font-bold">
                    {completionRate.toFixed(1)}%
                </p>
            </div>
        </div>
    );
}
