import ChatRoom from "@/components/ChatRoom";
//import { useGroupStore } from "@/store/groupStore";

export default async function ChatPage({}: //params,
{
    params: { groupId: string };
}) {
    //const groupId = parseInt(params.groupId);

    // 🧠 서버 컴포넌트에서는 zustand 사용 불가, 대신 클라이언트에서 초기화해둬야 함
    // 이 부분은 Sidebar 등에서 group 선택 시 setSelectedGroupId(id) 수행한다고 가정

    return <ChatRoom />;
}
