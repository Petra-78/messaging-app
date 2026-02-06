import { useState, useRef } from "react";
import { useAuth } from "../context/authContext";

export function Avatar() {
  const { user, token, setUser } = useAuth();
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const inputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleCancel() {
    setPreview(null);
    setSelectedFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function handleSave() {
    debugger;
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    setUploading(true);

    try {
      const res = await fetch(
        "https://messaging-app-production-2362.up.railway.app/user/avatar",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to upload avatar");
      }

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      setPreview(null);
      setSelectedFile(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative group w-40 h-40 cursor-pointer">
        <img
          src={preview || user.avatarUrl || "/placeholder.png"}
          alt="User avatar"
          className="w-40 h-40 rounded-full object-cover"
        />

        <label
          className="absolute inset-0 rounded-full bg-black/40 
                     opacity-0 group-hover:opacity-100 
                     flex items-center justify-center 
                     transition-opacity duration-200 text-white cursor-pointer"
        >
          Select
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {preview && (
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            onClick={handleCancel}
            disabled={uploading}
          >
            X
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            onClick={handleSave}
            disabled={uploading}
          >
            {uploading ? "Saving..." : "Save"}
          </button>
        </div>
      )}
    </div>
  );
}
