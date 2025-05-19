"use client";

import { useEffect, useState } from "react";
import {
    fetchMyProfile,
    updateMyProfile,
    changePassword,
    deleteMyAccount,
} from "@/api/user";

export default function ProfileEditPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    //const [message, setMessage] = useState<string | null>(null);
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
    });
    const passwordsMatch = passwords.newPassword === confirmNewPassword;

    const [passwordValid, setPasswordValid] = useState({
        hasLetter: false,
        hasNumber: false,
        minLength: false,
    });

    useEffect(() => {
        const load = async () => {
            try {
                const profile = await fetchMyProfile();
                setEmail(profile.email);
                setUsername(profile.username);
            } catch {
                setError("사용자 정보를 불러오는 데 실패했습니다.");
            }
        };
        load();
    }, []);

    const handleSave = async () => {
        try {
            await updateMyProfile({ email });
            setSuccess("정보가 성공적으로 수정되었습니다.");
            setError("");
        } catch {
            // if (err instanceof Error) {
            //     setMessage(err.message);
            // } else {
            //     setMessage("알 수 없는 오류가 발생했습니다.");
            // }
        }
    };

    const handleNewPasswordChange = (value: string) => {
        setPasswords((prev) => ({ ...prev, newPassword: value }));
        setPasswordValid({
            hasLetter: /[A-Za-z]/.test(value),
            hasNumber: /\d/.test(value),
            minLength: value.length >= 8,
        });
    };

    const isPasswordChangeValid =
        passwordValid.hasLetter &&
        passwordValid.hasNumber &&
        passwordValid.minLength &&
        passwords.oldPassword.length > 0 &&
        passwordsMatch;

    const handleChangePassword = async () => {
        if (!isPasswordChangeValid) {
            setError("비밀번호 조건을 충족해주세요.");
            return;
        }
        try {
            await changePassword(passwords);
            setSuccess("비밀번호가 변경되었습니다.");
            setError("");
            setPasswords({ oldPassword: "", newPassword: "" });
            setConfirmNewPassword("");
            setPasswordValid({
                hasLetter: false,
                hasNumber: false,
                minLength: false,
            });
        } catch {
            setError("비밀번호 변경에 실패했습니다.");
            setSuccess("");
        }
    };

    const handleDelete = async () => {
        if (confirm("정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
            try {
                await deleteMyAccount();
                alert("탈퇴 완료! 홈페이지로 이동합니다.");
                window.location.href = "/";
            } catch {
                setError("회원 탈퇴에 실패했습니다.");
            }
        }
    };

    return (
        <main className="flex flex-col items-center justify-start min-h-screen pt-16 px-4 bg-[#f9fafb] text-[#111827]">
            <div className="w-full max-w-md bg-[#ffffff] rounded-2xl shadow-md p-6 space-y-6">
                <h1 className="text-2xl font-bold text-center text-[#2563eb]">
                    개인정보 설정
                </h1>

                {/* 아이디 (읽기 전용) */}
                <div>
                    <label className="text-sm text-gray-500">아이디</label>
                    <input
                        type="text"
                        value={username}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-100 text-[#111827] cursor-not-allowed"
                    />
                </div>

                {/* 이메일 */}
                <div>
                    <label className="text-sm text-gray-500">이메일</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#60a5fa]"
                    />
                </div>

                <button
                    onClick={handleSave}
                    className="w-full py-2 bg-[#3b82f6] text-white rounded-xl hover:bg-[#2563eb]"
                >
                    이메일 변경하기
                </button>

                {/* 비밀번호 변경 */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                    <label className="text-sm text-gray-500">
                        비밀번호 변경
                    </label>
                    <input
                        type="password"
                        placeholder="현재 비밀번호"
                        value={passwords.oldPassword}
                        onChange={(e) =>
                            setPasswords((prev) => ({
                                ...prev,
                                oldPassword: e.target.value,
                            }))
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white"
                    />
                    <input
                        type="password"
                        placeholder="새 비밀번호"
                        value={passwords.newPassword}
                        onChange={(e) =>
                            handleNewPasswordChange(e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white"
                    />
                    <input
                        type="password"
                        placeholder="새 비밀번호 확인"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white"
                    />

                    <div className="text-sm text-center">
                        <span
                            className={
                                passwordsMatch
                                    ? "text-green-600"
                                    : "text-red-500"
                            }
                        >
                            비밀번호 {passwordsMatch ? "일치" : "불일치"}
                        </span>
                    </div>
                    {/* 조건 시각화 */}
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

                    <button
                        onClick={handleChangePassword}
                        disabled={!isPasswordChangeValid}
                        className={`w-full py-2 rounded-xl transition ${
                            isPasswordChangeValid
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-[#d1d5db] text-[#6b7280] cursor-not-allowed"
                        }`}
                    >
                        비밀번호 변경
                    </button>
                </div>

                {/* 메시지 출력 */}
                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                {success && (
                    <p className="text-green-600 text-sm text-center">
                        {success}
                    </p>
                )}

                {/* 회원 탈퇴 */}
                <button
                    onClick={handleDelete}
                    className="text-red-600 text-sm underline pt-4"
                >
                    회원 탈퇴
                </button>
            </div>
        </main>
    );
}
