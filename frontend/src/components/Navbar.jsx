import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export default function Navbar() {
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
          <h1>ChatApp</h1>
        </div>
        {user ? (
          <div>{user.username}</div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}

        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}
