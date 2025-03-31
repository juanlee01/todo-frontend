export default function Sidebar() {
    return (
        <aside className="w-48 bg-white text-gray-800 p-4 h-[calc(100vh-4rem)] border-r">
            <div className="space-y-4">
                <a href="/" className="block hover:text-blue-400">
                    🧑‍💻 홈
                </a>
                <a href="/todo" className="block hover:text-blue-400">
                    📝 할 일
                </a>
                <a href="/login" className="block hover:text-blue-400">
                    🔑 로그인
                </a>
            </div>
        </aside>
    );
}
