"use client";

import Link from "next/link";
import { useGroupStore } from "@/store/groupStore";

export default function Sidebar() {
    const { selectedGroupId } = useGroupStore();
    const dashboardHref =
        selectedGroupId === 0
            ? "/me/dashboard"
            : selectedGroupId && selectedGroupId > 0
            ? `/groups/${selectedGroupId}/dashboards`
            : "#";

    return (
        <aside className="w-48 bg-white text-gray-800 p-4 h-full border-r overflow-y-auto">
            <div className="space-y-4">
                <Link href="/todo" className="block hover:text-blue-400">
                    할 일
                </Link>
                {selectedGroupId !== null && (
                    <Link
                        href={dashboardHref}
                        className="block hover:text-blue-400"
                    >
                        대시보드
                    </Link>
                )}
                {typeof selectedGroupId === "number" && selectedGroupId > 0 && (
                    <Link
                        href={`/groups/${selectedGroupId}/chat`}
                        className="block hover:text-blue-400"
                    >
                        그룹채팅
                    </Link>
                )}
                {typeof selectedGroupId === "number" && selectedGroupId > 0 && (
                    <Link
                        href={`/groups/${selectedGroupId}/settings`}
                        className="block hover:text-blue-400"
                    >
                        ⚙ 그룹설정
                    </Link>
                )}
            </div>
        </aside>
    );
}
