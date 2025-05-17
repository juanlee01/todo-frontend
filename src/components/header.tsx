"use client";

import Link from "next/link";
import GroupDropdown from "./GroupDropdown";

export default function Header() {
    return (
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-6">
                <Link href="/">
                    <span className="text-xl font-bold text-blue-600">
                        ToDoTogether
                    </span>
                </Link>

                <GroupDropdown />

                <Link
                    href="/groups/create"
                    className="text-sm px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    + 그룹 추가
                </Link>
            </div>
            <nav className="space-x-4">
                {/* <a href="/" className="text-gray-700 hover:text-blue-600">
                    홈
                </a> */}
                <a href="/login" className="text-gray-700 hover:text-blue-600">
                    로그인
                </a>
                {/* <a href="/todo" className="text-gray-700 hover:text-blue-600">
                    할 일
                </a> */}
            </nav>
        </header>
    );
}
