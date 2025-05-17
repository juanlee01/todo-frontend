// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function GroupCreatePage() {
//     const [title, setTitle] = useState("");
//     const [error, setError] = useState("");
//     const router = useRouter();

//     const handleCreate = async () => {
//         if (!title.trim()) {
//             setError("그룹 이름을 입력하세요.");
//             return;
//         }

//         try {
//             const token = localStorage.getItem("token");
//             const res = await fetch(
//                 `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/groups`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                     body: JSON.stringify({ title }),
//                 }
//             );

//             if (!res.ok) {
//                 const msg = await res.text();
//                 throw new Error(msg);
//             }

//             alert("그룹이 생성되었습니다!");
//             router.push("/todo"); // 그룹 생성 후 이동할 페이지
//         } catch (err) {
//             console.error("그룹 생성 실패:", err);
//             setError("그룹 생성에 실패했습니다.");
//         }
//     };

//     return (
//         <main className="flex flex-col items-center justify-start min-h-screen pt-16 px-4 bg-white text-[#111827]">
//             <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
//                 <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
//                     그룹 생성
//                 </h1>

//                 <input
//                     type="text"
//                     placeholder="그룹 이름"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-[#111827] placeholder:text-gray-500"
//                 />

//                 {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//                 <button
//                     onClick={handleCreate}
//                     className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//                 >
//                     생성하기
//                 </button>
//             </div>
//         </main>
//     );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/api/api-client";

export default function GroupCreatePage() {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleCreate = async () => {
        if (!title.trim()) {
            setError("그룹 이름을 입력하세요.");
            return;
        }

        try {
            await apiFetch("/api/groups", {
                method: "POST",
                body: JSON.stringify({ title }),
            });

            alert("그룹이 생성되었습니다!");
            router.push("/todo");
        } catch (err) {
            console.error("그룹 생성 실패:", err);
            setError("그룹 생성에 실패했습니다.");
        }
    };

    return (
        <main className="flex flex-col items-center justify-start min-h-screen pt-16 px-4 bg-white text-[#111827]">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
                <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
                    그룹 생성
                </h1>

                <input
                    type="text"
                    placeholder="그룹 이름"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-[#111827] placeholder:text-gray-500"
                />

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <button
                    onClick={handleCreate}
                    className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    생성하기
                </button>
            </div>
        </main>
    );
}
