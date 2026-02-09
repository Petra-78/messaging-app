import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

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
      <div className="flex gap-2 items-center">
        <img className="h-8 w-8" src="/earth.png" alt="Earth logo" />
        <Link
          to="/"
          onClick={() => setSelectedUser(null)}
          className="md:text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
        >
          World Talk
        </Link>
      </div>

      <div className="flex gap-5">
        {user ? (
          <>
            <button
              onClick={() => setShowUserInfo(!showUserInfo)}
              className="flex items-center gap-4 px-2 py-1 md:px-4 md:py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <img
                className="w-8 h-8 object-cover rounded-full"
                src={user.avatarUrl || "/placeholder.png"}
                alt="User profile"
              />
              {user.username}
            </button>

            <button
              onClick={handleLogout}
              className="px-2 md:px-4 md:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
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
