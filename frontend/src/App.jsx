import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar
          setSelectedUser={setSelectedUser}
          setShowUserInfo={setShowUserInfo}
          showUserInfo={showUserInfo}
        />
        <Outlet
          className="flex-1 min-h-0 overflow-hidden"
          context={{
            selectedUser,
            setSelectedUser,
            showUserInfo,
            setShowUserInfo,
          }}
        />
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default App;
