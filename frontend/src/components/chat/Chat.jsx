import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/authContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ImagePreview from "./ImagePreview";

export default function Chat({ selectedUser }) {
  const { token, user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    debugger;
    if (!selectedUser || !token) return;
    let URL = `https://messaging-app-production-2362.up.railway.app/messages/${selectedUser.id}`;
    if (selectedUser === "global") {
      URL = `https://messaging-app-production-2362.up.railway.app/messages/${selectedUser}`;
    }

    async function getMessages() {
      setLoading(true);
      try {
        const res = await fetch(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
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
    if ((!content && !imageFile) || !selectedUser) return;
    setSending(true);

    try {
      const formData = new FormData();
      if (selectedUser === "global") {
        formData.append("receiverId", selectedUser);
      } else {
        formData.append("receiverId", selectedUser.id);
      }

      if (content) formData.append("content", content);
      if (imageFile) formData.append("file", imageFile);

      const res = await fetch(
        "https://messaging-app-production-2362.up.railway.app/messages",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessages((prev) => [...prev, data]);
      setContent("");
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      toast.error(err.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  }

  if (!selectedUser)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-gray-500">
        <span className="text-lg font-medium">
          Choose a user to start chatting
        </span>
      </div>
    );

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-gray-50 rounded-lg shadow-md p-2 sm:p-4">
      <ChatHeader user={selectedUser} />

      <MessageList
        messages={messages}
        currentUser={user}
        loading={loading}
        endRef={messagesEndRef}
        className="flex-1 min-h-0 overflow-y-auto px-2 sm:px-4 py-2 space-y-2"
      />

      {imagePreview && (
        <ImagePreview
          src={imagePreview}
          onRemove={() => {
            setImageFile(null);
            setImagePreview(null);
          }}
        />
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <MessageInput
        content={content}
        setContent={setContent}
        onSubmit={handleSubmit}
        onImageSelect={(file) => {
          setImageFile(file);
          setImagePreview(URL.createObjectURL(file));
        }}
        sending={sending}
        className="flex items-center gap-2 p-2 sm:p-3 border-t bg-white shrink-0"
      />
    </div>
  );
}
