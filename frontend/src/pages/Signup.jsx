import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateUsername = (value) => {
    if (value.trim().length < 3)
      return "Username must be at least 3 characters";
    return "";
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Invalid email address";
    return "";
  };

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{6,}$/;
    if (!passwordRegex.test(value))
      return "Password must be at least 6 characters long and include one uppercase letter and one special character";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(
        "https://messaging-app-production-2362.up.railway.app/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      if (data.token) {
        login(data.token, data.user);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div>
      <div>
        <h2>Sign Up</h2>

        {error && <p>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onBlur={(e) => setUsernameError(validateUsername(e.target.value))}
              required
            />
            {usernameError && <p className="error">{usernameError}</p>}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onBlur={(e) => setEmailError(validateEmail(e.target.value))}
              required
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onBlur={(e) => setPasswordError(validatePassword(e.target.value))}
              required
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>

          <button
            type="submit"
            disabled={
              usernameError ||
              emailError ||
              passwordError ||
              !username ||
              !email ||
              !password
            }
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
