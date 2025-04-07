"use client";

import { useState } from "react";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const { accessToken } = await login(username, password);
            localStorage.setItem("token", accessToken);
            router.push("/");
        } catch (err) {
            console.error(err);
            setError("로그인에 실패했어요. 아이디/비밀번호를 확인해주세요.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-12">
            <h1 className="text-2xl font-bold mb-4 text-center">로그인</h1>

            <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-3 px-4 py-2 border rounded"
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 px-4 py-2 border rounded"
            />

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
                onClick={handleLogin}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                로그인
            </button>
        </div>
    );
}
