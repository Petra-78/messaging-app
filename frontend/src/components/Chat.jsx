import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

export default function Chat({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
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

  async function handleSubmit(e) {
    e.preventDefault();

    if (!content || !selectedUser) return;

    try {
      const res = await fetch(
        "https://messaging-app-production-2362.up.railway.app/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: content,
            receiverId: selectedUser.id,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setMessages((prev) => [...prev, data]);
      setContent("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {selectedUser ? (
        <div>
          <h2>{selectedUser.username}</h2>

          {messages.length === 0 ? (
            <div>No messages yet.</div>
          ) : (
            messages.map((m) => (
              <div key={m.id}>
                <p>{m.content}</p>
              </div>
            ))
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Send message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <div>Select a user to chat</div>
      )}
    </>
  );
}
