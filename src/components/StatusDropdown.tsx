"use client";

import { TodoStatus } from "@/types/todo";
import { useRef, useEffect, useState } from "react";

const statusOptions = [
    { value: "PENDING", label: "⏳ 대기 중" },
    { value: "IN_PROGRESS", label: "▶️ 진행 중" },
    { value: "ON_HOLD", label: "⏸️ 보류" },
    { value: "REVISION_REQUESTED", label: "🔄 수정 요청" },
    { value: "COMPLETED", label: "✅ 완료" },
    { value: "CANCELED", label: "❌ 취소됨" },
];

interface Props {
    value: TodoStatus;
    onChange: (value: TodoStatus) => void;
}

export default function StatusDropdown({ value, onChange }: Props) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedLabel =
        statusOptions.find((opt) => opt.value === value)?.label || "상태 선택";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center px-3 py-2 bg-white text-[#111827] border border-[#d1d5db] rounded hover:bg-[#f9fafb] text-sm"
            >
                {selectedLabel}
                <span className="ml-2">⌄</span>
            </button>

            {open && (
                <div className="absolute z-10 mt-2 w-44 bg-white text-[#111827] border border-[#d1d5db] rounded shadow text-sm">
                    {statusOptions.map((option) => (
                        <div
                            key={option.value}
                            className="px-4 py-2 hover:bg-[#f3f4f6] cursor-pointer"
                            onClick={() => {
                                onChange(option.value as TodoStatus);
                                setOpen(false);
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
