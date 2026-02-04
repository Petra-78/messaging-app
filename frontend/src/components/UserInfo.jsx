import { useState } from "react";
import { useAuth } from "../context/authContext";

export default function UserInfo({ onClose }) {
  const { user, token } = useAuth();

  const [disabled, setDisabled] = useState(true);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "https://messaging-app-production-2362.up.railway.app/user",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username, email }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setUsername(user.username);
        setEmail(user.email);
        throw new Error(data.message || "Update failed");
      }

      setDisabled(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>User Profile</h2>

        <form>
          <label>Username</label>
          <input
            value={username}
            disabled={disabled}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            disabled={disabled}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <div className="actions">
            <button
              type="button"
              onClick={() => {
                if (disabled) {
                  setDisabled(false);
                } else {
                  handleSave(event);
                }
              }}
              disabled={loading}
            >
              {disabled ? "Edit" : "Save"}
            </button>

            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
