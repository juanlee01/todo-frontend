// components/CommentSection.tsx
"use client";

import { useEffect, useState } from "react";
import { getCommentsByTodoId, postComment } from "@/api/comment";
import { CommentDto } from "@/types/comment";

interface CommentSectionProps {
    todoId: number;
}

export default function CommentSection({ todoId }: CommentSectionProps) {
    const [comments, setComments] = useState<CommentDto[]>([]);
    const [newComment, setNewComment] = useState("");
    //const [showComments, setShowComments] = useState(false);

    const fetchComments = async () => {
        const data = await getCommentsByTodoId(todoId);
        setComments(data);
    };

    const handleCreateComment = async () => {
        if (!newComment.trim()) return;
        await postComment(todoId, newComment);
        setNewComment("");
        fetchComments();
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <div className="border p-2 rounded-xl">
            {/* <button
                className="underline text-sm text-blue-500 mb-2"
                onClick={() => setShowComments(!showComments)}
            >
                {showComments ? "댓글 숨기기" : "댓글 보기"}
            </button>

            {showComments && (
                <div>
                    <div className="space-y-2">
                        {comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="border rounded p-2"
                            >
                                <div className="text-sm font-semibold">
                                    {comment.authorName}
                                </div>
                                <div className="text-gray-800">
                                    {comment.content}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {new Date(
                                        comment.createdAt
                                    ).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex gap-2">
                        <input
                            type="text"
                            className="border rounded px-2 py-1 flex-grow"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="댓글을 입력하세요"
                        />
                        <button
                            onClick={handleCreateComment}
                            className="bg-blue-500 text-white px-4 py-1 rounded"
                        >
                            등록
                        </button>
                    </div>
                </div>
            )} */}
            <div className="space-y-2">
                {comments.map((comment) => (
                    <div key={comment.id} className="border rounded p-2">
                        <div className="text-sm font-semibold">
                            {comment.authorName}
                        </div>
                        <div className="text-gray-800">{comment.content}</div>
                        <div className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex gap-2">
                <input
                    type="text"
                    className="border rounded px-2 py-1 flex-grow"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요"
                />
                <button
                    onClick={handleCreateComment}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                    등록
                </button>
            </div>
        </div>
    );
}
