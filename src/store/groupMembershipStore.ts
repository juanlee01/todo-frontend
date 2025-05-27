// src/store/groupMembershipStore.ts
import { create } from "zustand";
import { GroupMember } from "@/types/user";
import { devtools } from "zustand/middleware";

interface GroupMembershipState {
    memberships: GroupMember[];
    setMemberships: (data: GroupMember[]) => void;
}

// export const useGroupMembershipStore = create<GroupMembershipState>((set) => ({
//     memberships: [],
//     setMemberships: (data) => {
//         // 로컬스토리지에 저장
//         localStorage.setItem("groupMemberships", JSON.stringify(data));
//         set({ memberships: data });
//     },
// }));

export const useGroupMembershipStore = create<GroupMembershipState>()(
    devtools(
        (set) => ({
            memberships: [],
            setMemberships: (data) => {
                localStorage.setItem("groupMemberships", JSON.stringify(data));
                set({ memberships: data });
            },
        }),
        { name: "GroupMembershipStore" }
    )
);
