// src/components/dashboard/AssigneeChart.tsx
"use client";

import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    data: {
        [username: string]: number;
    };
}

export default function AssigneeChart({ data }: Props) {
    const usernames = Object.keys(data);
    const counts = Object.values(data);

    const chartData = {
        labels: usernames,
        datasets: [
            {
                label: "담당자별 할 일 수",
                data: counts,
                backgroundColor: "rgba(59, 130, 246, 0.7)", // blue-500
                borderRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
        },
    };

    return (
        <section className="mb-6">
            <h2 className="text-lg font-bold mb-2 text-[#111827]">
                담당자별 할 일 분포
            </h2>
            <Bar data={chartData} options={options} />
        </section>
    );
}
