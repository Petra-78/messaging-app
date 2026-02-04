import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserInfo from "../components/UserInfo";

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar
        setSelectedUser={setSelectedUser}
        setShowUserInfo={setShowUserInfo}
        showUserInfo={showUserInfo}
      />
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
