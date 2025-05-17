"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { leaveGroup } from "@/api/group";

export default function LeaveGroupButton() {
    const { groupId } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLeave = async () => {
        const confirmMsg =
            "정말 이 그룹에서 탈퇴하시겠습니까?\n탈퇴 후 되돌릴 수 없습니다.";
        if (!confirm(confirmMsg)) return;

        setLoading(true);
        setError(null);

        try {
            const message = await leaveGroup(Number(groupId));
            alert(message);
            router.push("/groups");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("그룹 탈퇴 중 알 수 없는 오류가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8">
            <button
                onClick={handleLeave}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-60"
            >
                {loading ? "탈퇴 중..." : "그룹 탈퇴"}
            </button>
            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>
    );
}
