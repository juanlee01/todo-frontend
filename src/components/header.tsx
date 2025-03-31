import { GraphHelpers } from "next/dist/compiled/webpack/webpack";
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
            </div>
            <nav className="space-x-4">
                <a href="/" className="text-gray-700 hover:text-blue-600">
                    홈
                </a>
                <a href="/login" className="text-gray-700 hover:text-blue-600">
                    로그인
                </a>
                <a href="/todo" className="text-gray-700 hover:text-blue-600">
                    할 일
                </a>
            </nav>
        </header>
    );
}
