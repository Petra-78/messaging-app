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
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-800">User Profile</h1>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="mb-1 text-gray-700 font-medium text-left"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={disabled || saving}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-1 text-gray-700 font-medium text-left"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={disabled || saving}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
            <button
              type="button"
              onClick={handleEditToggle}
              disabled={saving}
              className={`px-4 py-2 rounded-lg text-white ${
                disabled
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-green-500 hover:bg-green-600"
              } transition`}
            >
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
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
            >
              Close
            </button>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
