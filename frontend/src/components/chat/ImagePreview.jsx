export default function ImagePreview({ src, onRemove }) {
  return (
    <div className="mb-2 flex items-start gap-2 w-full sm:w-auto">
      <div className="relative w-auto shrink-0">
        <img
          src={src}
          className="max-h-20 w-auto object-cover rounded-lg"
          alt="preview"
        />
        <button
          onClick={onRemove}
          className="absolute top-1 -right-7 bg-red-500 text-white rounded-full px-2 py-1 text-sm hover:bg-red-600"
        >
          ×
        </button>
      </div>
    </div>
  );
}
