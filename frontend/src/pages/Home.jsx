import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <div>
        <Sidebar
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <Chat selectedUser={selectedUser} />
      </div>
    </>
  );
}
