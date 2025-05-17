import { create } from "zustand";

type GroupStore = {
    selectedGroupId: number | null;
    setSelectedGroupId: (id: number) => void;
};

export const useGroupStore = create<GroupStore>((set) => ({
    selectedGroupId: null,
    setSelectedGroupId: (id: number) => set({ selectedGroupId: id }),
}));
