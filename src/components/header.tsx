// "use client";

// import Link from "next/link";
// import GroupDropdown from "./GroupDropdown";

// export default function Header() {
//     return (
//         <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
//             <div className="flex items-center space-x-6">
//                 <Link href="/">
//                     <span className="text-xl font-bold text-blue-600">
//                         ToDoTogether
//                     </span>
//                 </Link>

//                 <GroupDropdown />

//                 <Link
//                     href="/groups/create"
//                     className="text-sm px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                 >
//                     + 그룹 추가
//                 </Link>
//             </div>
//             <nav className="space-x-4">
//                 {/* <a href="/" className="text-gray-700 hover:text-blue-600">
//                     홈
//                 </a> */}
//                 <a href="/login" className="text-gray-700 hover:text-blue-600">
//                     로그인
//                 </a>
//                 {/* <a href="/todo" className="text-gray-700 hover:text-blue-600">
//                     할 일
//                 </a> */}
//             </nav>
//         </header>
//     );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import GroupDropdown from "./GroupDropdown";
//import { fetchMe } from "@/api/auth";
//import { UserInfo } from "@/types/user";
import { UserProfile } from "@/types/user";
import { fetchMyProfile } from "@/api/user";

export default function Header() {
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const me = await fetchMyProfile();
                console.log("로그인된 사용자:", me);
                setUser(me);
            } catch (err) {
                console.error("사용자 정보 불러오기 실패:", err);
                setUser(null);
            }
        };
        loadUser();
    }, []);

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
                {user ? (
                    <Link
                        href="/me/setting"
                        className="text-gray-700 hover:text-blue-600"
                    >
                        {user.username}
                    </Link>
                ) : (
                    <Link
                        href="/login"
                        className="text-gray-700 hover:text-blue-600"
                    >
                        로그인
                    </Link>
                )}
            </nav>
        </header>
    );
}
