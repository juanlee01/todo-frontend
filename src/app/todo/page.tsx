// "use client";

// import { useState, useEffect } from "react";
// import StatusDropdown from "@/components/StatusDropdown";
// import { createTodo, fetchTodos } from "@/api/todo";
// import { Todo, TodoStatus } from "@/types/todo";

// const statusOptions: { value: TodoStatus; label: string }[] = [
//     { value: "PENDING", label: "⏳ 대기 중" },
//     { value: "IN_PROGRESS", label: "▶️ 진행 중" },
//     { value: "ON_HOLD", label: "⏸️ 보류" },
//     { value: "REVISION_REQUESTED", label: "🔄 수정 요청" },
//     { value: "COMPLETED", label: "✅ 완료" },
//     { value: "CANCELED", label: "❌ 취소됨" },
// ];

// // ✅ 임시 사용자 id (로그인 구현 후 대체)
// const DEFAULT_USER_ID = 1;

// export default function Home() {
//     const [todos, setTodos] = useState<Todo[]>([]);
//     const [title, setTitle] = useState("");
//     const [tag, setTag] = useState("");
//     const [body, setBody] = useState("");
//     const [status, setStatus] = useState<TodoStatus>("PENDING");
//     const [isComposing, setIsComposing] = useState(false);

//     const addTodo = async () => {
//         if (!title.trim()) return;

//         try {
//             const created = await createTodo(
//                 title,
//                 status,
//                 DEFAULT_USER_ID,
//                 tag,
//                 body
//             );
//             setTodos((prev) => [...prev, created]);
//             setTitle("");
//             setBody("");
//         } catch (err) {
//             console.error("할 일 추가 실패", err);
//             alert("할 일을 추가할 수 없습니다.");
//         }
//     };

//     const removeTodo = (id: number) => {
//         setTodos((prev) => prev.filter((todo) => todo.id !== id));
//     };

//     useEffect(() => {
//         const loadTodos = async () => {
//             try {
//                 const result = await fetchTodos();
//                 console.log("받은 todos 목록:", result);
//                 setTodos(result ?? []);
//             } catch (err) {
//                 console.error("할 일 목록 불러오기 실패", err);
//                 setTodos([]); // ✅ 실패 시에도 비워주기
//             }
//         };

//         loadTodos();
//     }, []);

//     return (
//         <main className="flex flex-col items-center justify-start min-h-screen pt-16 px-4">
//             <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6">
//                 <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
//                     📝 TODO 리스트
//                 </h1>

//                 <div className="flex gap-2 mb-4">
//                     <StatusDropdown value={status} onChange={setStatus} />
//                     <input
//                         type="text"
//                         className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         placeholder="제목을 입력하세요"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         onCompositionStart={() => setIsComposing(true)}
//                         onCompositionEnd={() => setIsComposing(false)}
//                         onKeyDown={(e) => {
//                             if (e.key === "Enter" && !isComposing) addTodo();
//                         }}
//                     />
//                     <button
//                         onClick={addTodo}
//                         className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
//                     >
//                         추가
//                     </button>
//                 </div>

//                 {/* 내용과 태그 입력 (선택 사항) */}
//                 <div className="mb-4 flex gap-2">
//                     <input
//                         type="text"
//                         className="w-40 px-4 py-2 border rounded-xl"
//                         placeholder="#태그"
//                         value={tag}
//                         onChange={(e) => setTag(e.target.value)}
//                     />
//                     <input
//                         type="text"
//                         className="flex-1 px-4 py-2 border rounded-xl"
//                         placeholder="내용 (선택)"
//                         value={body}
//                         onChange={(e) => setBody(e.target.value)}
//                     />
//                 </div>

//                 <ul className="space-y-2">
//                     {(todos ?? []).map((todo) => (
//                         <li
//                             key={todo.id}
//                             className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-xl"
//                         >
//                             <div>
//                                 <span className="text-sm text-gray-500 mr-2">
//                                     {
//                                         statusOptions.find(
//                                             (s) => s.value === todo.status
//                                         )?.label
//                                     }
//                                 </span>
//                                 <span className="font-semibold">
//                                     {todo.title}
//                                 </span>
//                                 {todo.tag && (
//                                     <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
//                                         #{todo.tag}
//                                     </span>
//                                 )}
//                             </div>
//                             <button
//                                 onClick={() => removeTodo(todo.id)}
//                                 className="text-red-500 hover:text-red-700"
//                             >
//                                 삭제
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </main>
//     );
// }
"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import StatusDropdown from "@/components/StatusDropdown";
import {
    createTodo,
    fetchTodos,
    fetchGroupTodos,
    fetchPersonalTodos,
} from "@/api/todo";
import { Todo, TodoStatus } from "@/types/todo";
import { useGroupStore } from "@/store/groupStore";
import { updateTodo, deleteTodo } from "@/api/todo";

const statusOptions: { value: TodoStatus; label: string }[] = [
    { value: "PENDING", label: "⏳ 대기 중" },
    { value: "IN_PROGRESS", label: "▶️ 진행 중" },
    { value: "ON_HOLD", label: "⏸️ 보류" },
    { value: "REVISION_REQUESTED", label: "🔄 수정 요청" },
    { value: "COMPLETED", label: "✅ 완료" },
    { value: "CANCELED", label: "❌ 취소됨" },
];

export default function TodoPage() {
    const { selectedGroupId } = useGroupStore();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [body, setBody] = useState("");
    const [status, setStatus] = useState<TodoStatus>("PENDING");
    const [isComposing, setIsComposing] = useState(false);
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
    const [assignedTo, setAssignedTo] = useState<number>(1); // 기본값 로그인 유저 ID
    const [editMode, setEditMode] = useState(false);
    //const [dueDate, setDueDate] = useState<string | null>(null);
    const [dueDate, setDueDate] = useState<Date | null>(null);

    const handleEdit = (todo: Todo) => {
        setEditMode(true);
        setEditingTodoId(todo.id);
        setTitle(todo.title);
        setBody(todo.body ?? "");
        setTag(todo.tag ?? "");
        setStatus(todo.status);
        setAssignedTo(todo.assignedTo?.id ?? 1);
        setDueDate(todo.dueDate ? new Date(todo.dueDate) : null);
    };

    const handleUpdate = async () => {
        if (!editingTodoId || !title.trim()) return;

        try {
            const updated = await updateTodo(editingTodoId, {
                title,
                body,
                status,
                tag,
                assignedTo,
                dueDate: dueDate ? dueDate.toISOString().split("T")[0] : null,
            });

            setTodos((prev) =>
                prev.map((todo) => (todo.id === editingTodoId ? updated : todo))
            );

            // 상태 초기화
            setEditMode(false);
            setEditingTodoId(null);
            setTitle("");
            setBody("");
        } catch (err) {
            console.error("할 일 수정 실패", err);
            alert("할 일을 수정할 수 없습니다.");
        }
    };

    const addTodo = async () => {
        if (!title.trim() || selectedGroupId === null) return;

        try {
            const created = await createTodo(
                title,
                status,
                tag, // tag는 기본값도 있지만 명시 가능
                body, // body는 optional
                selectedGroupId === -1 || selectedGroupId === 0
                    ? null
                    : selectedGroupId,
                dueDate ? dueDate.toISOString().split("T")[0] : null // → "2025-05-21"
            );
            setTodos((prev) => [...prev, created]);
            setTitle("");
            setBody("");
        } catch (err) {
            console.error("할 일 추가 실패", err);
            alert("할 일을 추가할 수 없습니다.");
        }
    };

    useEffect(() => {
        const loadTodos = async () => {
            try {
                let result: Todo[] = [];

                if (selectedGroupId === -1) {
                    result = await fetchTodos(); // 전체 보기
                } else if (selectedGroupId === 0) {
                    result = await fetchPersonalTodos(); // 개인 보기
                } else if (typeof selectedGroupId === "number") {
                    result = await fetchGroupTodos(selectedGroupId); // 그룹 보기
                }

                setTodos(result ?? []);
            } catch (err) {
                console.error("할 일 목록 불러오기 실패", err);
                setTodos([]);
            }
        };

        if (selectedGroupId !== null) {
            loadTodos();
        }
    }, [selectedGroupId]);

    return (
        <main className="flex flex-col items-center justify-start min-h-screen pt-16 px-4">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6">
                <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
                    📝 TODO 리스트
                </h1>

                {/* <div className="flex gap-2 mb-4">
                    <StatusDropdown value={status} onChange={setStatus} />
                    <input
                        type="text"
                        className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onCompositionStart={() => setIsComposing(true)}
                        onCompositionEnd={() => setIsComposing(false)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !isComposing) addTodo();
                        }}
                    />
                    {editMode ? (
                        <button
                            onClick={handleUpdate}
                            className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                        >
                            수정 완료
                        </button>
                    ) : (
                        <button
                            onClick={addTodo}
                            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
                        >
                            추가
                        </button>
                    )}
                </div> */}

                <div className="flex gap-2 mb-4">
                    <StatusDropdown value={status} onChange={setStatus} />

                    <input
                        type="text"
                        className="flex-1 px-4 py-2 border border-[#d1d5db] bg-white text-[#111827] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onCompositionStart={() => setIsComposing(true)}
                        onCompositionEnd={() => setIsComposing(false)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !isComposing) addTodo();
                        }}
                    />

                    {editMode ? (
                        <button
                            onClick={handleUpdate}
                            className="px-4 py-2 bg-[#22c55e] text-white rounded-xl hover:bg-[#16a34a] transition"
                        >
                            수정 완료
                        </button>
                    ) : (
                        <button
                            onClick={addTodo}
                            className="px-4 py-2 bg-[#3b82f6] text-white rounded-xl hover:bg-[#2563eb] transition"
                        >
                            추가
                        </button>
                    )}
                </div>

                {/* <div className="mb-4 flex gap-2">
                    <input
                        type="text"
                        className="w-40 px-4 py-2 border rounded-xl"
                        placeholder="#태그"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                    <input
                        type="text"
                        className="flex-1 px-4 py-2 border rounded-xl"
                        placeholder="내용 (선택)"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div> */}

                <div className="mb-4 flex gap-2">
                    <input
                        type="text"
                        className="w-40 px-4 py-2 border border-[#d1d5db] bg-white text-[#111827] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                        placeholder="#태그"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                    {/* <input
                        type="text"
                        className="flex-1 px-4 py-2 border border-[#d1d5db] bg-white text-[#111827] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                        placeholder="내용 (선택)"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    /> */}
                    <DatePicker
                        selected={dueDate}
                        onChange={(date: Date | null) => setDueDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="마감일 선택"
                        className="px-4 py-2 border border-[#d1d5db] rounded-xl bg-white text-[#111827] w-40"
                    />
                </div>
                {/* <div className="mb-4 flex gap-2 items-center">
                    <DatePicker
                        selected={dueDate}
                        onChange={(date: Date | null) => setDueDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="마감일 선택"
                        className="px-4 py-2 border border-[#d1d5db] rounded-xl bg-white text-[#111827] w-40"
                    />
                </div> */}

                {/* <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-xl"
                        >
                            <div>
                                <span className="text-sm text-gray-500 mr-2">
                                    {
                                        statusOptions.find(
                                            (s) => s.value === todo.status
                                        )?.label
                                    }
                                </span>
                                <span className="font-semibold">
                                    {todo.title}
                                </span>
                                {todo.tag && (
                                    <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                        #{todo.tag}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(todo)}
                                    className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition"
                                    title="수정"
                                >
                                    <span className="text-lg">⚙️</span>
                                </button>

                                <button
                                    onClick={() =>
                                        setTodos((prev) =>
                                            prev.filter((t) => t.id !== todo.id)
                                        )
                                    }
                                    className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
                                    title="삭제"
                                >
                                    <span className="text-lg">🗑️</span>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul> */}
                <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex justify-between items-center bg-[#f3f4f6] px-4 py-2 rounded-xl"
                        >
                            <div>
                                <span className="text-sm text-[#6b7280] mr-2">
                                    {
                                        statusOptions.find(
                                            (s) => s.value === todo.status
                                        )?.label
                                    }
                                </span>
                                <span className="font-semibold text-[#111827]">
                                    {todo.title}
                                </span>
                                {todo.dueDate && (
                                    <div className="text-xs text-gray-500 mt-1">
                                        마감일:{" "}
                                        {new Date(
                                            todo.dueDate
                                        ).toLocaleDateString()}
                                    </div>
                                )}

                                {todo.tag && (
                                    <span className="ml-2 text-xs bg-[#dbeafe] text-[#2563eb] px-2 py-1 rounded">
                                        #{todo.tag}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(todo)}
                                    className="p-2 rounded-full bg-[#e0f2fe] text-[#0284c7] hover:bg-[#bae6fd] transition"
                                    title="수정"
                                >
                                    <span className="text-lg">⚙️</span>
                                </button>

                                <button
                                    onClick={async () => {
                                        try {
                                            await deleteTodo(todo.id); // 서버 삭제 요청
                                            setTodos((prev) =>
                                                prev.filter(
                                                    (t) => t.id !== todo.id
                                                )
                                            ); // 상태 업데이트
                                        } catch (err) {
                                            console.error("삭제 실패:", err);
                                            alert("삭제에 실패했습니다.");
                                        }
                                    }}
                                    className="p-2 rounded-full bg-[#fee2e2] text-[#dc2626] hover:bg-[#fecaca] transition"
                                    title="삭제"
                                >
                                    <span className="text-lg">🗑️</span>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
