"use client";

import { useState } from "react";
import { signup, checkUsername, checkEmail } from "@/api/auth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [usernameChecked, setUsernameChecked] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const [passwordConfirmValid, setPasswordConfirmValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState({
        hasLetter: false,
        hasNumber: false,
        minLength: false,
    });

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        setPasswordValid({
            hasLetter: /[A-Za-z]/.test(value),
            hasNumber: /\d/.test(value),
            minLength: value.length >= 8,
        });
    };

    const handlePasswordConfirmChange = (value: string) => {
        setPasswordConfirm(value);
        setPasswordConfirmValid(password === value);
    };

    const handleSignup = async () => {
        if (!usernameChecked || !emailChecked) {
            setError("아이디와 이메일 중복확인을 해주세요.");
            return;
        }
        if (!username.trim() || !password.trim() || !email.trim()) {
            setError("아이디, 이메일, 비밀번호를 모두 입력해주세요.");
            return;
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            setError(
                "비밀번호는 최소 8자 이상, 영어와 숫자를 포함해야 합니다."
            );
            return;
        }
        if (password !== passwordConfirm) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            await signup(username, password, email);
            alert("회원가입이 완료되었습니다! 로그인 해주세요.");
            router.push("/login");
        } catch (err) {
            console.error("회원가입 실패", err);
            setError("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleCheckUsername = async () => {
        try {
            const res = await checkUsername(username);
            alert(
                res.available
                    ? "사용 가능한 아이디입니다!"
                    : "이미 사용 중인 아이디입니다."
            );
            setUsernameChecked(res.available);
        } catch {
            setUsernameChecked(false);
        }
    };

    const handleCheckEmail = async () => {
        try {
            const res = await checkEmail(email);
            alert(
                res.available
                    ? "사용 가능한 이메일입니다!"
                    : "이미 사용 중인 이메일입니다."
            );
            setEmailChecked(res.available);
        } catch {
            setEmailChecked(false);
        }
    };

    const isSignupEnabled =
        passwordValid.hasLetter &&
        passwordValid.hasNumber &&
        passwordValid.minLength &&
        passwordConfirmValid &&
        usernameChecked &&
        emailChecked;

    return (
        <main className="flex flex-col items-center justify-start min-h-screen pt-16 px-4 bg-[#f9fafb] text-[#111827]">
            <div className="w-full max-w-md bg-[#ffffff] rounded-2xl shadow-md p-6">
                <h1 className="text-2xl font-bold text-center mb-6 text-[#2563eb]">
                    회원가입
                </h1>

                <div className="space-y-4">
                    {/* 아이디 */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="아이디"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setUsernameChecked(false);
                            }}
                            className="flex-1 px-4 py-2 border border-[#d1d5db] rounded-xl bg-[#ffffff] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#60a5fa]"
                        />
                        <button
                            onClick={handleCheckUsername}
                            className="px-3 py-2 bg-[#e5e7eb] rounded-xl text-sm text-[#111827] hover:bg-[#d1d5db]"
                        >
                            중복확인
                        </button>
                    </div>

                    {/* 이메일 */}
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="이메일"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailChecked(false);
                            }}
                            className="flex-1 px-4 py-2 border border-[#d1d5db] rounded-xl bg-[#ffffff] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#60a5fa]"
                        />
                        <button
                            onClick={handleCheckEmail}
                            className="px-3 py-2 bg-[#e5e7eb] rounded-xl text-sm text-[#111827] hover:bg-[#d1d5db]"
                        >
                            중복확인
                        </button>
                    </div>

                    {/* 비밀번호 */}
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        className="w-full px-4 py-2 border border-[#d1d5db] rounded-xl bg-[#ffffff] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#60a5fa]"
                    />

                    {/* 조건 */}
                    <div className="flex flex-wrap gap-4 text-sm justify-center">
                        <div
                            className={
                                passwordValid.hasLetter
                                    ? "text-green-600"
                                    : "text-red-500"
                            }
                        >
                            알파벳 포함
                        </div>
                        <div
                            className={
                                passwordValid.hasNumber
                                    ? "text-green-600"
                                    : "text-red-500"
                            }
                        >
                            숫자 포함
                        </div>
                        <div
                            className={
                                passwordValid.minLength
                                    ? "text-green-600"
                                    : "text-red-500"
                            }
                        >
                            8자 이상
                        </div>
                    </div>

                    {/* 비밀번호 확인 */}
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={passwordConfirm}
                        onChange={(e) =>
                            handlePasswordConfirmChange(e.target.value)
                        }
                        className="w-full px-4 py-2 border border-[#d1d5db] rounded-xl bg-[#ffffff] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#60a5fa]"
                    />
                    <div className="text-sm text-center">
                        <span
                            className={
                                passwordConfirmValid
                                    ? "text-green-600"
                                    : "text-red-500"
                            }
                        >
                            비밀번호 {passwordConfirmValid ? "일치" : "불일치"}
                        </span>
                    </div>

                    {/* 에러 메시지 */}
                    {error && (
                        <p className="text-[#ef4444] text-sm text-center">
                            {error}
                        </p>
                    )}

                    {/* 가입하기 버튼 */}
                    <button
                        onClick={handleSignup}
                        disabled={!isSignupEnabled}
                        className={`w-full py-2 rounded-xl transition ${
                            isSignupEnabled
                                ? "bg-[#3b82f6] text-white hover:bg-[#2563eb]"
                                : "bg-[#d1d5db] text-[#6b7280] cursor-not-allowed"
                        }`}
                    >
                        가입하기
                    </button>
                </div>
            </div>
        </main>
    );
}
