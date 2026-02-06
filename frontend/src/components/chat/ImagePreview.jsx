export default function ImagePreview({ src, onRemove }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <img src={src} className="h-24 rounded-lg object-cover" />
      <button onClick={onRemove} className="text-sm text-red-500">
        Remove
      </button>
    </div>
  );
}
