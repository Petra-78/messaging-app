import Sidebar from "../components/Sidebar";
import Chat from "../components/chat/Chat";
import { useAuth } from "../context/authContext";
import { Navigate, useOutletContext } from "react-router-dom";
import UserInfo from "../components/UserInfo";

export default function Home() {
  const { user, authLoading } = useAuth();
  const { selectedUser, setSelectedUser, showUserInfo, setShowUserInfo } =
    useOutletContext();

  if (authLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="h-dvh flex flex-col bg-gray-100 overflow-hidden p-1">
      {showUserInfo && (
        <div className="fixed inset-0 z-50">
          <UserInfo onClose={() => setShowUserInfo(false)} />
        </div>
      )}

      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div className="flex flex-1 max-w-7xl mx-auto min-h-0">
          <div className="flex-none w-30 sm:w-56 md:w-72 bg-white md:p-2">
            <Sidebar
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </div>

          <div className="flex flex-1 min-h-0">
            <Chat selectedUser={selectedUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
