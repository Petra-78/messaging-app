import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

export default function Chat({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (!selectedUser || !token) return;

    async function getMessages() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://messaging-app-production-2362.up.railway.app/messages/${selectedUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load messages");
        }

        setMessages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getMessages();
  }, [selectedUser, token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  function formatDate(timestamp) {
    const msgDate = new Date(timestamp);
    const now = new Date();

    if (msgDate.toDateString() === now.toDateString()) return "Today";

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (msgDate.toDateString() === yesterday.toDateString()) return "Yesterday";

    if (msgDate.getFullYear() === now.getFullYear()) {
      return msgDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    } else {
      return msgDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  }

  if (!selectedUser) {
    return (
      <div className="flex flex-1 items-center justify-center text-center bg-gray-50 rounded-lg shadow-md p-4 text-gray-600 text-lg">
        Select a user to chat
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-center bg-gray-50 rounded-lg shadow-md p-4 text-gray-500 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-50 rounded-lg shadow-md p-4 h-full">
      <div className=" flex justify-center items-center gap-4 border-b border-gray-300 pb-2 mb-4">
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={selectedUser.avatarUrl || "/placeholder.png"}
          alt=""
        />
        <h2 className="text-lg font-semibold text-gray-800">
          {selectedUser.username}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 flex flex-col gap-2">
        {messages.length === 0 ? (
          <div className="text-gray-500 text-sm text-center mt-4">
            No messages yet.
          </div>
        ) : (
          messages.map((m, i) => {
            const prevMsg = messages[i - 1];
            const showDate =
              !prevMsg ||
              new Date(prevMsg.createdAt).toDateString() !==
                new Date(m.createdAt).toDateString();

            return (
              <div key={m.id} className="flex flex-col gap-1">
                {showDate && (
                  <div className="text-center text-gray-400 my-2 text-sm">
                    {formatDate(m.createdAt)}
                  </div>
                )}
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.senderId === user.id ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg max-w-xs wrap-break-word ${
                      m.senderId === user.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{m.content}</p>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(m.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-gray-300 pt-2"
      >
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Send message..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}
