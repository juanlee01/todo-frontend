// src/components/storecomponent/UserGroupMembershipInitializer.tsx

"use client";

import { useEffect } from "react";
import { useGroupMembershipStore } from "@/store/groupMembershipStore";
import { GroupMember } from "@/types/user";
import { apiFetch } from "@/api/api-client";

export default function UserGroupMembershipInitializer() {
    const setMemberships = useGroupMembershipStore(
        (state) => state.setMemberships
    );

    useEffect(() => {
        async function fetchMemberships() {
            try {
                const res = await apiFetch<GroupMember[]>(
                    "/api/users/me/groups",
                    {
                        method: "GET",
                    }
                );
                setMemberships(res);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.warn(
                        "그룹 멤버십 정보를 불러올 수 없습니다:",
                        err.message
                    );
                } else {
                    console.warn("알 수 없는 에러가 발생했습니다.");
                }
            }
        }

        fetchMemberships();
    }, [setMemberships]);

    return null;
}
