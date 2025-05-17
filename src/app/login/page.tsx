"use client";

import { useState } from "react";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        <main className="flex flex-col items-center justify-start min-h-screen pt-16 px-4 bg-[#f9fafb] text-[#111827]">
            <div className="w-full max-w-md bg-[#ffffff] rounded-2xl shadow-md p-6">
                <h1 className="text-2xl font-bold text-center mb-6 text-[#2563eb]">
                    로그인
                </h1>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="아이디 (username)"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-[#d1d5db] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#60a5fa] bg-[#ffffff] text-[#111827]"
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-[#d1d5db] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#60a5fa] bg-[#ffffff] text-[#111827]"
                    />

                    {error && (
                        <p className="text-[#ef4444] text-sm text-center">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleLogin}
                        className="w-full bg-[#3b82f6] text-white py-2 rounded-xl hover:bg-[#2563eb] transition"
                    >
                        로그인
                    </button>

                    <p className="text-center text-sm text-[#6b7280] mt-4">
                        아직 계정이 없나요?{" "}
                        <Link
                            href="/signup"
                            className="text-[#3b82f6] hover:underline"
                        >
                            회원가입
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
