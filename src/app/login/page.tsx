export default function LoginPage() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">로그인</h2>
            <form className="space-y-4">
                <input
                    type="text"
                    placeholder="아이디"
                    className="w-full px-4 py-2 border rounded-xl"
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    className="w-full px-4 py-2 border rounded-xl"
                />
                <button className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600">
                    로그인
                </button>
            </form>
        </div>
    );
}
