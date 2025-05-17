"use client";

import { useEffect, useState } from "react";
import {
    fetchMyInvites,
    acceptInvite,
    rejectInvite,
    Invite,
} from "@/api/group-invite";

export default function InvitePage() {
    const [invites, setInvites] = useState<Invite[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const loadInvites = async () => {
        try {
            const data = await fetchMyInvites();
            setInvites(data);
        } catch {
            setError("초대 목록을 불러오는 데 실패했습니다.");
        }
    };

    const handleAction = async (
        inviteId: number,
        action: "accept" | "reject"
    ) => {
        setLoading(true);
        setMessage(null);
        setError(null);
        try {
            const msg =
                action === "accept"
                    ? await acceptInvite(inviteId)
                    : await rejectInvite(inviteId);
            setMessage(msg);
            await loadInvites();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("처리에 실패했습니다.");
            }
        }
    };

    useEffect(() => {
        loadInvites();
    }, []);

    return (
        <main className="p-6 max-w-3xl mx-auto bg-white text-[#111827]">
            <h1 className="text-2xl font-bold mb-6">받은 초대</h1>

            {message && <p className="text-green-600 mb-4">{message}</p>}
            {error ? (
                <p className="text-red-600 mb-4">{error}</p>
            ) : invites.length === 0 ? (
                <p>받은 초대가 없습니다.</p>
            ) : (
                <ul className="space-y-3">
                    {invites.map((invite) => (
                        <li
                            key={invite.inviteId}
                            className="p-4 border rounded bg-[#f9fafb] flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">
                                    {invite.groupTitle}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {invite.senderUsername} 님이 초대하셨습니다
                                    ·{" "}
                                    {new Date(
                                        invite.createdAt
                                    ).toLocaleString()}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        handleAction(invite.inviteId, "accept")
                                    }
                                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                    disabled={loading}
                                >
                                    수락
                                </button>
                                <button
                                    onClick={() =>
                                        handleAction(invite.inviteId, "reject")
                                    }
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    disabled={loading}
                                >
                                    거절
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
