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
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div>
        <Link
          to="/"
          onClick={() => setSelectedUser(null)}
          className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
        >
          ChatApp
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <button
              onClick={() => setShowUserInfo(!showUserInfo)}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              {user.username}
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
