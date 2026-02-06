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
      className="relative flex items-center gap-2 border-t border-gray-300 pt-3"
    >
      <div className="relative flex-1">
        <ImageUploader onSelect={onImageSelect} disabled={sending} />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Message..."
          disabled={sending}
          className={`w-full pl-12 pr-3 py-2 border rounded-full focus:outline-none ${
            sending ? "border-gray-400 bg-gray-100" : "border-gray-300 bg-white"
          }`}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="px-4 py-2 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
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
