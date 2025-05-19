import { useEffect, useRef, useState } from "react";
//import { TodoStatus } from "@/types/todo";

type SortOption = "createdAt" | "dueDate" | "status";

interface SortDropdownProps {
    selected: SortOption;
    onChange: (option: SortOption) => void;
}

export default function SortDropdown({
    selected,
    onChange,
}: SortDropdownProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const options: { value: SortOption; label: string }[] = [
        { value: "createdAt", label: "📌 등록순" },
        { value: "dueDate", label: "🗓️ 마감일순" },
        { value: "status", label: "🚦 진행상태순" },
    ];

    const selectedLabel = options.find((opt) => opt.value === selected)?.label;

    const handleSelect = (value: SortOption) => {
        onChange(value);
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left mb-4" ref={dropdownRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="inline-flex items-center px-3 py-2 bg-white text-[#111827] border border-[#d1d5db] rounded hover:bg-[#f9fafb]"
            >
                {selectedLabel}
                <span className="ml-2">⌄</span>
            </button>

            {open && (
                <div className="absolute z-10 mt-2 w-40 bg-white text-[#111827] border border-[#d1d5db] rounded shadow">
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            className={`px-4 py-2 hover:bg-[#f3f4f6] cursor-pointer ${
                                selected === opt.value
                                    ? "font-semibold bg-[#f3f4f6]"
                                    : ""
                            }`}
                            onClick={() => handleSelect(opt.value)}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
