import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  return (
    <>
      <div>
        <Navbar
          setSelectedUser={setSelectedUser}
          setShowUserInfo={setShowUserInfo}
          showUserInfo={showUserInfo}
        />
        <Outlet
          context={{
            selectedUser,
            setSelectedUser,
            showUserInfo,
            setShowUserInfo,
          }}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
