// "use client";

// import React from "react";

// interface StatusCounts {
//     PENDING?: number;
//     IN_PROGRESS?: number;
//     ON_HOLD?: number;
//     REVISION_REQUESTED?: number;
//     COMPLETED?: number;
//     CANCELED?: number;
// }

// interface Props {
//     statusCounts: StatusCounts;
// }

// const labelMap: { [key in keyof StatusCounts]: string } = {
//     PENDING: "⏳ 대기 중",
//     IN_PROGRESS: "▶️ 진행 중",
//     ON_HOLD: "⏸️ 보류",
//     REVISION_REQUESTED: "🔄 수정 요청",
//     COMPLETED: "✅ 완료",
//     CANCELED: "❌ 취소됨",
// };

// export default function StatusDistribution({ statusCounts }: Props) {
//     const total = Object.values(statusCounts).reduce(
//         (sum, count) => sum + (count ?? 0),
//         0
//     );

//     const getPercent = (count: number = 0) =>
//         total === 0 ? "0.0" : ((count / total) * 100).toFixed(1);

//     return (
//         <div className="bg-white shadow rounded-lg p-4 text-[#111827]">
//             <h2 className="text-sm font-semibold mb-2">상태별  Todo 분포</h2>
//             <ul className="space-y-1 text-sm text-[#374151]">
//                 {(Object.keys(labelMap) as (keyof StatusCounts)[]).map(
//                     (key) => (
//                         <li key={key} className="flex justify-between">
//                             <span>{labelMap[key]}</span>
//                             <span>
//                                 {statusCounts[key] ?? 0}건 (
//                                 {getPercent(statusCounts[key])}%)
//                             </span>
//                         </li>
//                     )
//                 )}
//             </ul>
//         </div>
//     );
// }

// "use client";

// import React from "react";

// interface StatusCounts {
//     PENDING?: number;
//     IN_PROGRESS?: number;
//     ON_HOLD?: number;
//     REVISION_REQUESTED?: number;
//     COMPLETED?: number;
//     CANCELED?: number;
// }

// interface Props {
//     statusCounts: StatusCounts;
// }

// const labelMap: { [key in keyof StatusCounts]: string } = {
//     PENDING: "대기 중",
//     IN_PROGRESS: "진행 중",
//     ON_HOLD: "보류",
//     REVISION_REQUESTED: "수정 요청",
//     COMPLETED: "완료",
//     CANCELED: "취소됨",
// };

// const colorMap: { [key in keyof StatusCounts]: string } = {
//     PENDING: "bg-yellow-400",
//     IN_PROGRESS: "bg-orange-500",
//     ON_HOLD: "bg-gray-400",
//     REVISION_REQUESTED: "bg-purple-400",
//     COMPLETED: "bg-green-500",
//     CANCELED: "bg-red-500",
// };

// export default function StatusDistribution({ statusCounts }: Props) {
//     const total = Object.values(statusCounts).reduce(
//         (sum, count) => sum + (count ?? 0),
//         0
//     );

//     return (
//         <section className="bg-white p-4 rounded-lg shadow text-[#111827]">
//             <h2 className="text-lg font-semibold mb-3">
//                 상태별 Todo 분포 (100% 기준)
//             </h2>

//             {/* 그래프 막대 */}
//             <div className="flex h-6 w-full overflow-hidden rounded bg-gray-100 border">
//                 {(Object.keys(labelMap) as (keyof StatusCounts)[])
//                     .filter((key) => statusCounts[key])
//                     .map((key) => {
//                         const count = statusCounts[key] ?? 0;
//                         const widthPercent =
//                             total === 0 ? 0 : (count / total) * 100;
//                         return (
//                             <div
//                                 key={key}
//                                 className={`${colorMap[key]} h-full`}
//                                 style={{ width: `${widthPercent}%` }}
//                                 title={`${labelMap[key]}: ${count}건`}
//                             />
//                         );
//                     })}
//             </div>

//             {/* 범례 */}
//             <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-700">
//                 {(Object.keys(labelMap) as (keyof StatusCounts)[])
//                     .filter((key) => statusCounts[key])
//                     .map((key) => (
//                         <div key={key} className="flex items-center gap-2">
//                             <span
//                                 className={`w-4 h-4 inline-block rounded ${colorMap[key]}`}
//                             />
//                             <span>{labelMap[key]}</span>
//                         </div>
//                     ))}
//             </div>
//         </section>
//     );
// }

"use client";

import React from "react";

interface StatusCounts {
    PENDING?: number;
    IN_PROGRESS?: number;
    ON_HOLD?: number;
    REVISION_REQUESTED?: number;
    COMPLETED?: number;
    CANCELED?: number;
}

interface Props {
    statusCounts: StatusCounts;
}

const labelMap: { [key in keyof StatusCounts]: string } = {
    PENDING: "대기 중",
    IN_PROGRESS: "진행 중",
    ON_HOLD: "보류",
    REVISION_REQUESTED: "수정 요청",
    COMPLETED: "완료",
    CANCELED: "취소됨",
};

const colorMap: { [key in keyof StatusCounts]: string } = {
    PENDING: "bg-yellow-400",
    IN_PROGRESS: "bg-orange-500",
    ON_HOLD: "bg-gray-400",
    REVISION_REQUESTED: "bg-purple-400",
    COMPLETED: "bg-green-500",
    CANCELED: "bg-red-500",
};

export default function StatusDistribution({ statusCounts }: Props) {
    const total = Object.values(statusCounts).reduce(
        (sum, count) => sum + (count ?? 0),
        0
    );

    const getPercent = (count: number = 0) =>
        total === 0 ? "0.0" : ((count / total) * 100).toFixed(1);

    return (
        <section className="bg-white p-4 rounded-lg shadow text-[#111827]">
            <h2 className="text-lg font-semibold mb-3">
                상태별 Todo 분포 (100% 기준)
            </h2>

            {/* 그래프 막대 */}
            <div className="flex h-6 w-full overflow-hidden rounded bg-gray-100 border">
                {(Object.keys(labelMap) as (keyof StatusCounts)[])
                    .filter((key) => statusCounts[key])
                    .map((key) => {
                        const count = statusCounts[key] ?? 0;
                        const widthPercent =
                            total === 0 ? 0 : (count / total) * 100;
                        return (
                            <div
                                key={key}
                                className={`${colorMap[key]} h-full`}
                                style={{ width: `${widthPercent}%` }}
                                title={`${
                                    labelMap[key]
                                }: ${count}건 (${getPercent(count)}%)`}
                            />
                        );
                    })}
            </div>

            {/* 범례 */}
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-700">
                {(Object.keys(labelMap) as (keyof StatusCounts)[])
                    .filter((key) => statusCounts[key])
                    .map((key) => {
                        const count = statusCounts[key] ?? 0;
                        const percent = getPercent(count);
                        return (
                            <div key={key} className="flex items-center gap-2">
                                <span
                                    className={`w-4 h-4 inline-block rounded ${colorMap[key]}`}
                                />
                                <span>
                                    {labelMap[key]} ({percent}%)
                                </span>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
}
