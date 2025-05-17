"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { updateGroupTitle } from "@/api/group";

interface Props {
    currentTitle: string;
    onTitleChange?: (newTitle: string) => void;
}

export default function EditableGroupTitle({
    currentTitle,
    onTitleChange,
}: Props) {
    const { groupId } = useParams();
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(currentTitle);
    const [inputValue, setInputValue] = useState(currentTitle);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // 외부에서 currentTitle이 바뀔 때 반영
    useEffect(() => {
        setTitle(currentTitle);
        setInputValue(currentTitle);
    }, [currentTitle]);

    // 편집 모드일 때 입력창에 자동 포커스
    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    const startEdit = () => {
        setEditing(true);
        setMessage(null);
        setError(null);
    };

    const cancelEdit = () => {
        setInputValue(title);
        setEditing(false);
        setError(null);
        setMessage(null);
    };

    const handleSave = async () => {
        if (!inputValue.trim()) {
            setError("그룹 이름을 입력해주세요.");
            return;
        }

        if (inputValue.trim() === title) {
            setEditing(false);
            return;
        }

        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const msg = await updateGroupTitle(
                Number(groupId),
                inputValue.trim()
            );
            setTitle(inputValue.trim());
            onTitleChange?.(inputValue.trim());
            setMessage(msg);
            setEditing(false);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("알 수 없는 오류가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-6">
            {!editing ? (
                <div className="flex items-center gap-2">
                    {/* <h2 className="text-xl font-bold text-[#111827]">
                        {title}
                    </h2> */}
                    <h2 className="text-xl font-bold text-[#111827]">
                        {title || "제목 없음"}
                    </h2>
                    <button
                        onClick={startEdit}
                        className="text-gray-500 hover:text-gray-700"
                        title="이름 수정"
                    >
                        ✏️
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                        <input
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="px-3 py-1 border rounded border-gray-300 text-[#111827] bg-white"
                            disabled={loading}
                        />
                        <button
                            onClick={handleSave}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
                            disabled={loading}
                        >
                            저장
                        </button>
                        <button
                            onClick={cancelEdit}
                            className="px-3 py-1 text-gray-600 hover:underline"
                            disabled={loading}
                        >
                            취소
                        </button>
                    </div>
                    {error && (
                        <p className="text-sm text-red-600 mt-1">{error}</p>
                    )}
                    {!error && message && (
                        <p className="text-sm text-green-600 mt-1">{message}</p>
                    )}
                </div>
            )}
        </div>
    );
}
