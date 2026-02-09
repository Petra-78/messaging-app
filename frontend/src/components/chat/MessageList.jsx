import MessageItem from "./MessageItem";
import DateDivider from "./DateDivider";

export default function MessageList({
  messages,
  currentUser,
  loading,
  endRef,
}) {
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto mb-4 flex flex-col gap-4">
      {messages.length === 0 && (
        <div className="text-gray-500 text-sm text-center mt-4">
          No messages yet.
        </div>
      )}

      {messages.map((msg, i) => {
        const prev = messages[i - 1];
        const showDate =
          !prev ||
          new Date(prev.createdAt).toDateString() !==
            new Date(msg.createdAt).toDateString();

        return (
          <div key={msg.id}>
            {showDate && <DateDivider date={msg.createdAt} />}
            <MessageItem message={msg} currentUser={currentUser} />
          </div>
        );
      })}

      <div ref={endRef} />
    </div>
  );
}
