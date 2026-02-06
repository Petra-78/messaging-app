import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

export default function ImagePicker({ onSelect }) {
  const inputRef = useRef(null);

  if (inputRef.current) {
    inputRef.current.value = "";
  }

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="absolute left-3 text-gray-500 hover:text-blue-600"
      >
        <FontAwesomeIcon icon={faImage} size="lg" />
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          if (e.target.files[0]) {
            onSelect(e.target.files[0]);
          }
        }}
      />
    </>
  );
}
