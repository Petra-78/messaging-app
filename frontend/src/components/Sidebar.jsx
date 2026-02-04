import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

export default function Sidebar({ selectedUser, setSelectedUser }) {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(
          "https://messaging-app-production-2362.up.railway.app/users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Forbidden or failed to fetch users");
        }

        const data = await res.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }

    if (token) fetchUsers();
  }, [token]);

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-64 bg-white shadow-md rounded-lg p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Users</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        disabled={loading}
        className="mb-4 px-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      />

      {loading && <p className="text-gray-500 text-sm mb-2">Loading...</p>}
      {!loading && error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}
      {!loading && !error && filteredUsers.length === 0 && (
        <p className="text-gray-500 text-sm mb-2">No users found</p>
      )}

      {!loading && !error && filteredUsers.length > 0 && (
        <ul className="flex flex-col gap-2 overflow-y-auto max-h-80">
          {filteredUsers.map((u) => (
            <li key={u.id}>
              <button
                onClick={() =>
                  setSelectedUser({ id: u.id, username: u.username })
                }
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                {u.username}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
