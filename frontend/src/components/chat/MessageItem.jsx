export default function MessageItem({ message, currentUser }) {
  const isMine = message.senderId === currentUser.id;

  return (
    <div className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}>
      {message.content && (
        <div
          className={`p-2 rounded-lg max-w-xs ${
            isMine ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          <p className="text-sm">{message.content}</p>
        </div>
      )}

      {message.imageUrl && (
        <img
          src={message.imageUrl}
          className="rounded-lg max-w-xs max-h-64 object-cover"
          alt=""
        />
      )}

      <span className="text-xs text-gray-500 mt-1">
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
}
