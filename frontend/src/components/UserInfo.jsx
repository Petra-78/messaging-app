import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

export default function UserInfo({ onClose }) {
  const { user, token, setUser } = useAuth();

  const [disabled, setDisabled] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [originalUser, setOriginalUser] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setOriginalUser({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  async function handleSave() {
    setError(null);
    setSaving(true);

    try {
      debugger;
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
        throw new Error(data.message || "Failed to update profile");
      }

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      setOriginalUser({ username, email });
      setDisabled(true);
    } catch (err) {
      if (originalUser) {
        setUsername(originalUser.username);
        setEmail(originalUser.email);
      }
      setError(err.message);
      setDisabled(true);
    } finally {
      setSaving(false);
    }
  }

  function handleEditToggle() {
    if (disabled) {
      setDisabled(false);
    } else {
      handleSave();
    }
  }

  if (!user) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h1>User Profile</h1>

        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={disabled || saving}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={disabled || saving}
          />

          <button type="button" onClick={handleEditToggle} disabled={saving}>
            {saving ? "Saving..." : disabled ? "Edit" : "Save"}
          </button>
          {!disabled && (
            <button
              type="button"
              onClick={() => {
                if (originalUser) {
                  setUsername(originalUser.username);
                  setEmail(originalUser.email);
                }
                setError(null);
                setDisabled(true);
              }}
              disabled={saving}
            >
              Cancel
            </button>
          )}

          <button type="button" onClick={onClose}>
            Close
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
