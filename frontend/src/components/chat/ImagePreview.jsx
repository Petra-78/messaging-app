export default function ImagePreview({ src, onRemove }) {
  return (
    <div className="mb-2 flex items-start gap-2">
      <img src={src} className="h-24 rounded-lg object-cover" />
      <button
        onClick={onRemove}
        className="text-lg text-red-500 hover:text-zinc-700"
      >
        x
      </button>
    </div>
  );
}
