// // components/CommentSection.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { getCommentsByTodoId, postComment } from "@/api/comment";
// import { CommentDto } from "@/types/comment";

// interface CommentSectionProps {
//     todoId: number;
// }

// export default function CommentSection({ todoId }: CommentSectionProps) {
//     const [comments, setComments] = useState<CommentDto[]>([]);
//     const [newComment, setNewComment] = useState("");
//     //const [showComments, setShowComments] = useState(false);

//     const fetchComments = async () => {
//         const data = await getCommentsByTodoId(todoId);
//         setComments(data);
//     };

//     const handleCreateComment = async () => {
//         if (!newComment.trim()) return;
//         await postComment(todoId, newComment);
//         setNewComment("");
//         fetchComments();
//     };

//     useEffect(() => {
//         fetchComments();
//     }, []);

//     return (
//         <div className="border p-2 rounded-xl">
//             {/* <button
//                 className="underline text-sm text-blue-500 mb-2"
//                 onClick={() => setShowComments(!showComments)}
//             >
//                 {showComments ? "댓글 숨기기" : "댓글 보기"}
//             </button>

//             {showComments && (
//                 <div>
//                     <div className="space-y-2">
//                         {comments.map((comment) => (
//                             <div
//                                 key={comment.id}
//                                 className="border rounded p-2"
//                             >
//                                 <div className="text-sm font-semibold">
//                                     {comment.authorName}
//                                 </div>
//                                 <div className="text-gray-800">
//                                     {comment.content}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                     {new Date(
//                                         comment.createdAt
//                                     ).toLocaleString()}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="mt-4 flex gap-2">
//                         <input
//                             type="text"
//                             className="border rounded px-2 py-1 flex-grow"
//                             value={newComment}
//                             onChange={(e) => setNewComment(e.target.value)}
//                             placeholder="댓글을 입력하세요"
//                         />
//                         <button
//                             onClick={handleCreateComment}
//                             className="bg-blue-500 text-white px-4 py-1 rounded"
//                         >
//                             등록
//                         </button>
//                     </div>
//                 </div>
//             )} */}
//             <div className="space-y-2">
//                 {comments.map((comment) => (
//                     <div key={comment.id} className="border rounded p-2">
//                         <div className="text-sm font-semibold">
//                             {comment.authorName}
//                         </div>
//                         <div className="text-gray-800">{comment.content}</div>
//                         <div className="text-xs text-gray-500">
//                             {new Date(comment.createdAt).toLocaleString()}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <div className="mt-4 flex gap-2">
//                 <input
//                     type="text"
//                     className="border rounded px-2 py-1 flex-grow"
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     placeholder="댓글을 입력하세요"
//                 />
//                 <button
//                     onClick={handleCreateComment}
//                     className="bg-blue-500 text-white px-4 py-1 rounded"
//                 >
//                     등록
//                 </button>
//             </div>
//         </div>
//     );
// // }

// // components/CommentSection.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { getCommentsByTodoId, postComment } from "@/api/comment";

// interface CommentDto {
//     id: number;
//     todoId: number;
//     authorName: string;
//     content: string;
//     createdAt: string;
// }

// interface CommentSectionProps {
//     todoId: number;
// }

// export default function CommentSection({ todoId }: CommentSectionProps) {
//     const [comments, setComments] = useState<CommentDto[]>([]);
//     const [newComment, setNewComment] = useState("");
//     const [editingId, setEditingId] = useState<number | null>(null);
//     const [editContent, setEditContent] = useState("");

//     const fetchComments = async () => {
//         const data = await getCommentsByTodoId(todoId);
//         setComments(data);
//     };

//     const handleCreateComment = async () => {
//         if (!newComment.trim()) return;
//         await postComment(todoId, newComment);
//         setNewComment("");
//         fetchComments();
//     };

//     const handleEditComment = (id: number, content: string) => {
//         setEditingId(id);
//         setEditContent(content);
//     };

//     const handleCancelEdit = () => {
//         setEditingId(null);
//         setEditContent("");
//     };

//     const handleSaveEdit = async (id: number) => {
//         await fetch(`/api/comments/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ content: editContent }),
//         });
//         setEditingId(null);
//         setEditContent("");
//         fetchComments();
//     };

//     const handleDeleteComment = async (id: number) => {
//         if (!confirm("정말 삭제하시겠습니까?")) return;
//         await fetch(`/api/comments/${id}`, { method: "DELETE" });
//         fetchComments();
//     };

//     useEffect(() => {
//         fetchComments();
//     }, []);

//     return (
//         <div className="border p-2 rounded-xl">
//             <div className="space-y-2">
//                 {comments.map((comment) => (
//                     <div key={comment.id} className="border rounded p-2">
//                         <div className="text-sm font-semibold">
//                             {comment.authorName}
//                         </div>
//                         {editingId === comment.id ? (
//                             <div className="space-y-2">
//                                 <textarea
//                                     className="w-full border px-2 py-1 rounded"
//                                     value={editContent}
//                                     onChange={(e) =>
//                                         setEditContent(e.target.value)
//                                     }
//                                 />
//                                 <div className="flex gap-2">
//                                     <button
//                                         onClick={() =>
//                                             handleSaveEdit(comment.id)
//                                         }
//                                         className="text-sm text-white bg-green-500 px-3 py-1 rounded hover:bg-green-600"
//                                     >
//                                         저장
//                                     </button>
//                                     <button
//                                         onClick={handleCancelEdit}
//                                         className="text-sm text-gray-600 border px-3 py-1 rounded hover:bg-gray-100"
//                                     >
//                                         취소
//                                     </button>
//                                 </div>
//                             </div>
//                         ) : (
//                             <>
//                                 <div className="text-gray-800 whitespace-pre-wrap">
//                                     {comment.content}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                     {new Date(
//                                         comment.createdAt
//                                     ).toLocaleString()}
//                                 </div>
//                                 <div className="mt-2 flex gap-2">
//                                     <button
//                                         onClick={() =>
//                                             handleEditComment(
//                                                 comment.id,
//                                                 comment.content
//                                             )
//                                         }
//                                         className="text-xs text-blue-600 hover:underline"
//                                     >
//                                         수정
//                                     </button>
//                                     <button
//                                         onClick={() =>
//                                             handleDeleteComment(comment.id)
//                                         }
//                                         className="text-xs text-red-500 hover:underline"
//                                     >
//                                         삭제
//                                     </button>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 ))}
//             </div>

//             <div className="mt-4 flex gap-2">
//                 <input
//                     type="text"
//                     className="border rounded px-2 py-1 flex-grow"
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     placeholder="댓글을 입력하세요"
//                 />
//                 <button
//                     onClick={handleCreateComment}
//                     className="bg-blue-500 text-white px-4 py-1 rounded"
//                 >
//                     등록
//                 </button>
//             </div>
//         </div>
//     );
// }
// components/CommentSection.tsx
"use client";

import { useEffect, useState } from "react";
import { getCommentsByTodoId, postComment } from "@/api/comment";
import { useUserStore } from "@/store/userStore";
import { useGroupMembershipStore } from "@/store/groupMembershipStore";
import { useGroupStore } from "@/store/groupStore";
import { CommentDto } from "@/types/comment";
import { putComment, deleteComment } from "@/api/comment";

interface CommentSectionProps {
    todoId: number;
}

export default function CommentSection({ todoId }: CommentSectionProps) {
    const [comments, setComments] = useState<CommentDto[]>([]);
    const [newComment, setNewComment] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState("");

    const { user } = useUserStore();
    const { selectedGroupId } = useGroupStore();
    const memberships = useGroupMembershipStore((state) => state.memberships);

    const currentUserId = user?.id;
    const currentUserRole = memberships.find(
        (m) => m.groupId === selectedGroupId
    )?.role;

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

    const handleEditComment = (id: number, content: string) => {
        setEditingId(id);
        setEditContent(content);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditContent("");
    };

    // 댓글 수정
    const handleSaveEdit = async (id: number) => {
        await putComment(id, editContent);
        setEditingId(null);
        setEditContent("");
        fetchComments();
    };

    // 댓글 삭제
    const handleDeleteComment = async (id: number) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        await deleteComment(id);
        fetchComments();
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <>
            <div className="space-y-2">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="border rounded-xl p-2 bg-white text-black"
                    >
                        <div className="text-sm font-semibold">
                            {comment.groupNickname ??
                                `User#${comment.createdId}`}
                        </div>
                        {editingId === comment.id ? (
                            <div className="space-y-2">
                                <textarea
                                    className="w-full border px-2 py-1 rounded text-black bg-gray-200"
                                    value={editContent}
                                    onChange={(e) =>
                                        setEditContent(e.target.value)
                                    }
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={() =>
                                            handleSaveEdit(comment.id)
                                        }
                                        className="text-sm text-white bg-green-500 px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        저장
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="text-sm text-gray-600 border px-3 py-1 rounded hover:bg-gray-100"
                                    >
                                        취소
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="text-gray-800 whitespace-pre-wrap">
                                    {comment.content}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {new Date(
                                        comment.createdAt
                                    ).toLocaleString()}
                                </div>
                                <div className="mt-2 flex gap-2">
                                    {comment.createdId === currentUserId && (
                                        <button
                                            onClick={() =>
                                                handleEditComment(
                                                    comment.id,
                                                    comment.content
                                                )
                                            }
                                            className="text-xs text-blue-600 hover:underline"
                                        >
                                            수정
                                        </button>
                                    )}
                                    {(comment.createdId === currentUserId ||
                                        currentUserRole === "LEADER") && (
                                        <button
                                            onClick={() =>
                                                handleDeleteComment(comment.id)
                                            }
                                            className="text-xs text-red-500 hover:underline"
                                        >
                                            삭제
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-4 flex gap-2">
                <input
                    type="text"
                    className="border rounded px-2 py-1 flex-grow text-black bg-white"
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
        </>
    );
}
