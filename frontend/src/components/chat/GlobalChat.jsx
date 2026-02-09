export default function GlobalChat({ setSelectedUser }) {
  return (
    <>
      <li key={1} className="flex">
        <button
          onClick={() => setSelectedUser("global")}
          className="flex items-center justify-start gap-2 sm:gap-4 w-full text-left px-2 sm:px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors truncate"
        >
          <img
            src={"/global-chat.png"}
            alt="User profile"
            className="h-6 w-6 sm:h-8 sm:w-8 rounded-full object-cover shrink-0"
          />
          <span className="truncate">Global Chat</span>
        </button>
      </li>
    </>
  );
}
