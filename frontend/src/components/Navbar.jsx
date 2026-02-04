import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export default function Navbar({ selectedUser, setSelectedUser }) {
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
            <div>{user.username}</div>
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
