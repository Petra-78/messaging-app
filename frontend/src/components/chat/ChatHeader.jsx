export default function ChatHeader({ user }) {
  return (
    <div className="flex justify-center items-center gap-4 border-b border-gray-300 pb-2 mb-4">
      {user === "global" ? (
        <>
          <img
            className="h-8 w-8 rounded-full object-cover"
            src={"/global-chat.png"}
            alt=""
          />
          <h2 className="text-lg font-semibold text-gray-800">Global Chat</h2>
        </>
      ) : (
        <>
          <img
            className="h-8 w-8 rounded-full object-cover"
            src={user.avatarUrl || "/placeholder.png"}
            alt=""
          />
          <h2 className="text-lg font-semibold text-gray-800">
            {user.username}
          </h2>
        </>
      )}
    </div>
  );
}
