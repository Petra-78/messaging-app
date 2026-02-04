import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export default function Navbar({
  setSelectedUser,
  setShowUserInfo,
  showUserInfo,
}) {
  const { logout, user } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <div>
        <div>
          <Link to={"/"} onClick={() => setSelectedUser(null)}>
            <h1>ChatApp</h1>
          </Link>
        </div>
        {user ? (
          <>
            <Link onClick={() => setShowUserInfo(!showUserInfo)}>
              {" "}
              <div>{user.username}</div>
            </Link>

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </>
  );
}
