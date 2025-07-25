import React, { useState } from "react";
import api from "../../api/axios";

const MediaUploadForm = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    try {
      await api.post("/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage("Media uploaded successfully!");
      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl mb-2">Upload Media</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} className="mb-2" required />
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Upload</button>
      {message && <div className="mt-2 text-blue-600">{message}</div>}
    </form>
  );
};

export default MediaUploadForm;