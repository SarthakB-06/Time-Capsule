import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateCapsule = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [media, setMedia] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setMedia(e.target.files[0]); // Store selected file
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("unlockDate", unlockDate);
      if (media) {
        formData.append("media", media);
      }

      await axios.post("http://localhost:8000/api/v1/capsules/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating capsule", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create a New Capsule</h1>
      <form onSubmit={handleCreate} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={unlockDate}
          onChange={(e) => setUnlockDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Capsule
        </button>
      </form>
    </div>
  );
};

export default CreateCapsule;
