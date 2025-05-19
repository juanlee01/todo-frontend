"use client";

import { FC } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface TagChartProps {
    tags: Record<string, number>;
}

// const TagChart: FC<TagChartProps> = ({ tags }) => {
//     const labels = Object.keys(tags);
//     const values = Object.values(tags);

//     if (labels.length === 0) {
//         return (
//             <section className="bg-white p-4 rounded-lg shadow text-[#111827]">
//                 <h2 className="text-lg font-semibold mb-3">
//                     태그별 할 일 분포
//                 </h2>
//                 <p className="text-sm text-gray-500">데이터가 없습니다.</p>
//             </section>
//         );
//     }

//     const data = {
//         labels,
//         datasets: [
//             {
//                 label: "태그별 할 일 수",
//                 data: values,
//                 backgroundColor: "rgba(59, 130, 246, 0.6)", // blue-500
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: { display: false },
//         },
//         scales: {
//             y: { beginAtZero: true },
//         },
//     };

//     return (
//         <section className="bg-white p-4 rounded-lg shadow text-[#111827]">
//             <h2 className="text-lg font-semibold mb-3">태그별 할 일 분포</h2>
//             <Bar data={data} options={options} />
//         </section>
//     );
// };

//

const TagChart: FC<TagChartProps> = ({ tags = {} }) => {
    const labels = Object.keys(tags);
    const values = Object.values(tags);

    if (labels.length === 0) {
        return (
            <section className="bg-white p-4 rounded-lg shadow text-[#111827]">
                <h2 className="text-lg font-semibold mb-3">태그별 Todo 분포</h2>
                <p className="text-sm text-gray-500">데이터가 없습니다.</p>
            </section>
        );
    }

    const data = {
        labels,
        datasets: [
            {
                label: "태그별  Todo 수",
                data: values,
                backgroundColor: "rgba(59, 130, 246, 0.6)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    return (
        <section className="bg-white p-4 rounded-lg shadow text-[#111827]">
            <h2 className="text-lg font-semibold mb-3">태그별 Todo 분포</h2>
            <Bar data={data} options={options} />
        </section>
    );
};

export default TagChart;
