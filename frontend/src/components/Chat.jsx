import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

export default function Chat({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    if (selectedUser) {
      async function getMessages() {
        const res = await fetch(
          `https://messaging-app-production-2362.up.railway.app/messages/${selectedUser.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data);
        }

        console.log(data);
        setMessages(data);
        return data;
      }
      if (token) getMessages();
    }
  }, [selectedUser]);

  return (
    <>
      <div>
        <div>{selectedUser.username}</div>
        {selectedUser && messages && messages.length === 0 && (
          <div>
            <h3>No messages yet.</h3>
          </div>
        )}
        <form action="POST" onSubmit={() => handlesubmit}>
          <input type="text" placeholder="Send message..." name="content" />
          <button type="submit">Send</button>
        </form>
      </div>

      {!selectedUser && <div>Select a user to chat</div>}
    </>
  );
}
