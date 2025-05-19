// import { create } from "zustand";

// type GroupStore = {
//     selectedGroupId: number | null;
//     setSelectedGroupId: (id: number) => void;
// };

// export const useGroupStore = create<GroupStore>((set) => ({
//     selectedGroupId: null,
//     setSelectedGroupId: (id: number) => set({ selectedGroupId: id }),
// }));

// src/store/groupStore.ts
// store/groupStore.ts
import { create } from "zustand";

type GroupStore = {
    selectedGroupId: number | null;
    setSelectedGroupId: (id: number) => void;
};

export const useGroupStore = create<GroupStore>((set) => ({
    selectedGroupId: null,
    setSelectedGroupId: (id: number) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("selectedGroupId", id.toString());
        }
        set({ selectedGroupId: id });
    },
}));
