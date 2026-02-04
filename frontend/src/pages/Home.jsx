import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { user, authLoading } = useAuth();

  debugger;

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
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
