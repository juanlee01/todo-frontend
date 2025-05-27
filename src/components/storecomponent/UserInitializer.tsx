// src/components/UserInitializer.tsx

"use client";

import { useEffect } from "react";
import { fetchMyProfile } from "@/api/user";
import { useUserStore } from "@/store/userStore";

export default function UserInitializer() {
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        fetchMyProfile()
            .then(setUser)
            .catch((err) => {
                console.warn("유저 정보를 불러올 수 없습니다:", err.message);
            });
    }, [setUser]);

    return null; // 렌더링할 UI 없음
}
