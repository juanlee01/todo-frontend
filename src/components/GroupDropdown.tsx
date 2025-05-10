"use client";

import { useRef, useEffect, useState } from "react";

export default function GroupDropdown() {
    const [groups, setGroups] = useState(["전체보기", "개인", "팀1", "스터디"]);
    const [selected, setSelected] = useState("전체보기");
    const [open, setOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

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
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectGroup = (group: string) => {
        setSelected(group);
        setOpen(false);
        // TODO: group별 todo 불러오기
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center px-3 py-2 bg-white border rounded hover:bg-gray-50 text-black"
            >
                {selected}
                <span className="ml-2">⌄</span>
            </button>

            {open && (
                <div className="absolute z-10 mt-2 w-40 bg-white border rounded shadow text-black">
                    {groups.map((group) => (
                        <div
                            key={group}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => selectGroup(group)}
                        >
                            {group}
                        </div>
                    ))}
                    <div
                        className="px-4 py-2 text-blue-500 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                            const name = prompt("새 그룹 이름을 입력하세요");
                            if (name) setGroups([...groups, name]);
                        }}
                    >
                        + 새 그룹 만들기
                    </div>
                </div>
            )}
        </div>
    );
}
