// "use client";

// import { useRef, useEffect, useState } from "react";

// export default function GroupDropdown() {
//     const [groups, setGroups] = useState(["전체보기", "개인", "팀1", "스터디"]);
//     const [selected, setSelected] = useState("전체보기");
//     const [open, setOpen] = useState(false);

//     const dropdownRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (
//                 dropdownRef.current &&
//                 !dropdownRef.current.contains(event.target as Node)
//             ) {
//                 setOpen(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     const selectGroup = (group: string) => {
//         setSelected(group);
//         setOpen(false);
//         // TODO: group별 todo 불러오기
//     };

//     return (
//         <div className="relative inline-block text-left" ref={dropdownRef}>
//             <button
//                 onClick={() => setOpen(!open)}
//                 className="inline-flex items-center px-3 py-2 bg-white border rounded hover:bg-gray-50 text-black"
//             >
//                 {selected}
//                 <span className="ml-2">⌄</span>
//             </button>

//             {open && (
//                 <div className="absolute z-10 mt-2 w-40 bg-white border rounded shadow text-black">
//                     {groups.map((group) => (
//                         <div
//                             key={group}
//                             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                             onClick={() => selectGroup(group)}
//                         >
//                             {group}
//                         </div>
//                     ))}
//                     <div
//                         className="px-4 py-2 text-blue-500 hover:bg-gray-100 cursor-pointer"
//                         onClick={() => {
//                             const name = prompt("새 그룹 이름을 입력하세요");
//                             if (name) setGroups([...groups, name]);
//                         }}
//                     >
//                         + 새 그룹 만들기
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { fetchMyGroups } from "@/api/group";

// type Props = {
//     onChange: (groupId: number) => void;
// };

// export default function GroupDropdown({ onChange }: Props) {
//     const [groups, setGroups] = useState<{ id: number; title: string }[]>([]);
//     const [selected, setSelected] = useState<number | null>(null);
//     const [open, setOpen] = useState(false);
//     const defaultOptions = [
//         { id: -1, title: "ALL Todo" },
//         { id: 0, title: "Personal Todo" },
//     ];

//     useEffect(() => {
//         fetchMyGroups().then((res) => {
//             const fullList = [...defaultOptions, ...res];
//             setGroups(fullList);
//             setSelected(-1); // 전체보기 기본 선택
//             onChange(-1);
//         });
//     }, []);

//     const selectGroup = (id: number) => {
//         setSelected(id);
//         setOpen(false);
//         onChange(id);
//     };

//     return (
//         <div className="relative inline-block text-left">
//             <button
//                 onClick={() => setOpen(!open)}
//                 className="inline-flex items-center px-3 py-2 bg-white border rounded hover:bg-gray-50"
//             >
//                 {groups.find((g) => g.id === selected)?.title ?? "그룹 선택"}
//                 <span className="ml-2">⌄</span>
//             </button>

//             {open && (
//                 <div className="absolute z-10 mt-2 w-40 bg-white border rounded shadow">
//                     {groups.map((group) => (
//                         <div
//                             key={group.id}
//                             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                             onClick={() => selectGroup(group.id)}
//                         >
//                             {group.title}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import { fetchMyGroups } from "@/api/group";
import { useGroupStore } from "@/store/groupStore";

const defaultOptions = [
    { id: -1, title: "All Todo" },
    { id: 0, title: "Personal Todo" },
];

export default function GroupDropdown() {
    const { selectedGroupId, setSelectedGroupId } = useGroupStore();
    const [groups, setGroups] = useState<{ id: number; title: string }[]>([]);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchMyGroups().then((res) => {
            const fullList = [...defaultOptions, ...res];
            setGroups(fullList);
            if (selectedGroupId === null && fullList.length > 0) {
                setSelectedGroupId(fullList[0].id);
            }
        });
    }, []);

    // ✅ 외부 클릭 감지
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

    const handleSelect = (id: number) => {
        setSelectedGroupId(id);
        setOpen(false);
    };

    const selectedTitle = groups.find((g) => g.id === selectedGroupId)?.title;

    return (
        <div
            className="relative inline-block text-left"
            ref={dropdownRef} // ✅ ref 연결
        >
            <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center px-3 py-2 bg-white text-[#111827] border border-[#d1d5db] rounded hover:bg-[#f9fafb]"
            >
                {selectedTitle ?? "그룹 선택"}
                <span className="ml-2">⌄</span>
            </button>

            {open && (
                <div className="absolute z-10 mt-2 w-40 bg-white text-[#111827] border border-[#d1d5db] rounded shadow">
                    {groups.map((group) => (
                        <div
                            key={group.id}
                            className="px-4 py-2 hover:bg-[#f3f4f6] cursor-pointer"
                            onClick={() => handleSelect(group.id)}
                        >
                            {group.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
