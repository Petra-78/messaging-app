export default function MessageItem({ message, currentUser }) {
  const isMine = message.senderId === currentUser.id;

  return (
    <div className={`flex gap-2 ${isMine ? "justify-end" : "justify-start"}`}>
      {!isMine && (
        <img
          src={message.sender?.avatarUrl || "/placeholder.png"}
          alt={message.sender?.username}
          className="h-5 w-5 md:h-8 md:w-8 rounded-full object-cover mt-1 shrink-0"
        />
      )}

      <div
        className={`flex flex-col gap-1 ${
          isMine ? "items-end" : "items-start"
        }`}
      >
        {!isMine && (
          <span className="text-xs text-gray-600 font-medium">
            {message.sender?.username}
          </span>
        )}

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
              max-h-100
              object-cover
            "
          />
        )}

        <span className="text-[8px] text-gray-500">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
