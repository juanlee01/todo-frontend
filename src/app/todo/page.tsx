"use client";

import { useState } from "react";

export default function Home() {
    const [todos, setTodos] = useState<string[]>([]);
    const [input, setInput] = useState("");
    const [isComposing, setIsComposing] = useState(false);

    const addTodo = () => {
        if (!input.trim()) return;
        setTodos([...todos, input]);
        setInput("");
    };

    const removeTodo = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <main className="flex flex-col items-center justify-start min-h-screen pt-16 px-4">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6">
                <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
                    📝 TODO 리스트
                </h1>

                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="할 일을 입력하세요"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onCompositionStart={() => setIsComposing(true)} // 한글 조합 시작
                        onCompositionEnd={() => setIsComposing(false)} // 한글 조합 끝남
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !isComposing) {
                                addTodo();
                            }
                        }}
                    />
                    <button
                        onClick={addTodo}
                        className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
                    >
                        추가
                    </button>
                </div>

                <ul className="space-y-2">
                    {todos.map((todo, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-xl"
                        >
                            <span className="text-gray-800 text-base">
                                {todo}
                            </span>
                            <button
                                onClick={() => removeTodo(index)}
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
