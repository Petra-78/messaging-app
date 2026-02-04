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
        <div>
          <Sidebar
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
          <Chat selectedUser={selectedUser} />
        </div>
      )}
    </>
  );
}
