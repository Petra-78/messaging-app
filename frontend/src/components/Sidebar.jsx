import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

export default function Sidebar() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

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

      {error && <p>{error}</p>}

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />

      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((u) => <li key={u.id}>{u.username}</li>)
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
}
