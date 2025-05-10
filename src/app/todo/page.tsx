"use client";

import { useState, useEffect } from "react";
import StatusDropdown from "@/components/StatusDropdown";
import { createTodo, fetchTodos } from "@/api/todo";
import { Todo, TodoStatus } from "@/types/todo";

const statusOptions: { value: TodoStatus; label: string }[] = [
    { value: "PENDING", label: "⏳ 대기 중" },
    { value: "IN_PROGRESS", label: "▶️ 진행 중" },
    { value: "ON_HOLD", label: "⏸️ 보류" },
    { value: "REVISION_REQUESTED", label: "🔄 수정 요청" },
    { value: "COMPLETED", label: "✅ 완료" },
    { value: "CANCELED", label: "❌ 취소됨" },
];

// ✅ 임시 사용자 id (로그인 구현 후 대체)
const DEFAULT_USER_ID = 1;

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [body, setBody] = useState("");
    const [status, setStatus] = useState<TodoStatus>("PENDING");
    const [isComposing, setIsComposing] = useState(false);

    const addTodo = async () => {
        if (!title.trim()) return;

        try {
            const created = await createTodo(
                title,
                status,
                DEFAULT_USER_ID,
                tag,
                body
            );
            setTodos((prev) => [...prev, created]);
            setTitle("");
            setBody("");
        } catch (err) {
            console.error("할 일 추가 실패", err);
            alert("할 일을 추가할 수 없습니다.");
        }
    };

    const removeTodo = (id: number) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const result = await fetchTodos();
                console.log("받은 todos 목록:", result);
                setTodos(result ?? []);
            } catch (err) {
                console.error("할 일 목록 불러오기 실패", err);
                setTodos([]); // ✅ 실패 시에도 비워주기
            }
        };

        loadTodos();
    }, []);

    return (
        <main className="flex flex-col items-center justify-start min-h-screen pt-16 px-4">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6">
                <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
                    📝 TODO 리스트
                </h1>

                <div className="flex gap-2 mb-4">
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
                    <button
                        onClick={addTodo}
                        className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
                    >
                        추가
                    </button>
                </div>

                {/* 내용과 태그 입력 (선택 사항) */}
                <div className="mb-4 flex gap-2">
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
                </div>

                <ul className="space-y-2">
                    {(todos ?? []).map((todo) => (
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
                            <button
                                onClick={() => removeTodo(todo.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
