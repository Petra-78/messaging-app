import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { useAuth } from "../context/authContext";
import { Navigate, useOutletContext } from "react-router-dom";
import UserInfo from "../components/UserInfo";

export default function Home() {
  const { user, authLoading } = useAuth();

  const { selectedUser, setSelectedUser, showUserInfo, setShowUserInfo } =
    useOutletContext();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {showUserInfo && <UserInfo onClose={() => setShowUserInfo(false)} />}
      {user && (
        <div className="flex flex-1 bg-gray-100">
          <div className="w-full max-w-325 mx-auto flex gap-8 p-10">
            <div className="flex-none">
              <Sidebar
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            </div>

            <div className="flex-1 flex justify-center">
              <Chat selectedUser={selectedUser} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
