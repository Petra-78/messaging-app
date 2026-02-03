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
    <div>
      <h2>Users</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
        disabled={loading}
      />

      {loading && <p>Loading...</p>}

      {!loading && error && <p>{error}</p>}

      {!loading && !error && filteredUsers.length === 0 && (
        <p>No users found</p>
      )}

      {!loading && !error && filteredUsers.length > 0 && (
        <ul>
          {filteredUsers.map((u) => (
            <li key={u.id}>
              <button
                onClick={() =>
                  setSelectedUser({ id: u.id, username: u.username })
                }
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
