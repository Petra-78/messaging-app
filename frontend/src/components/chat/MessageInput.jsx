import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ImageUploader from "./ImageUploader.jsx";

export default function MessageInput({
  content,
  setContent,
  onSubmit,
  onImageSelect,
  sending,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex px-2 items-center bg-zinc-100 rounded-full shadow-sm border border-zinc-200 "
    >
      <div className="flex items-center gap-1 pl-1">
        <ImageUploader onSelect={onImageSelect} disabled={sending} />
      </div>

      <div className="flex-1 px-1">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          disabled={sending}
          className={`w-full px-3 py-2 border rounded-full focus:outline-none ${
            sending ? "border-gray-400 bg-gray-100" : "border-gray-300 bg-white"
          }`}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className=" p-3 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
      >
        {sending ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <FontAwesomeIcon icon={faPaperPlane} />
        )}
      </button>
    </form>
  );
}
