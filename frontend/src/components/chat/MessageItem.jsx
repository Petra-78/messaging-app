export default function MessageItem({ message, currentUser }) {
  const isMine = message.senderId === currentUser.id;
  return (
    <div
      className={`flex flex-col gap-1 ${isMine ? "items-end" : "items-start"}`}
    >
      {message.content && (
        <div
          className={`
          px-3 py-2 rounded-lg
        max-w-40 md:max-w-100
          wrap-break-word whitespace-pre-wrap
          ${isMine ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}
        `}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
      )}

      {message.imageUrl && (
        <img
          src={message.imageUrl}
          alt=""
          className="
          rounded-lg
          max-w-[85%] sm:max-w-[60%]
          max-h-64
          object-cover
        "
        />
      )}

      <span className="text-xs text-gray-500">
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
}
