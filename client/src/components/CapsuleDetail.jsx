import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CapsuleDetail = () => {
  const { id } = useParams();
  const [capsule, setCapsule] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/api/v1/capsules/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCapsule(response.data);
      } catch (error) {
        console.error("Error fetching capsule", error);
      }
    };

    fetchCapsule();
  }, [id]);

  const handleUnlock = async () => {
    try {
      const unlockDate = new Date(capsule.unlockDate);
      const currentDate = new Date();

      // ✅ Prevent unlocking before unlock date
      if (currentDate < unlockDate) {
        setMessage(`🔒 This capsule will unlock on ${unlockDate.toLocaleDateString()}`);
        return;
      }

      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:8000/api/v1/capsules/unlock/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsUnlocked(true);
      setMessage("✅ Capsule unlocked successfully!");
    } catch (error) {
      console.error("Error unlocking capsule", error);
      setMessage("❌ Failed to unlock capsule. Please try again.");
    }
  };

  if (!capsule) return <p>Loading...</p>;

  const isUnlockable = new Date() >= new Date(capsule.unlockDate);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{capsule.title}</h1>
      <p>{capsule.description}</p>

      {/* Show Media if Unlocked */}
      {isUnlocked && capsule.mediaUrl && (
        <div className="mt-4">
          {capsule.mediaUrl.endsWith(".mp4") ? (
            <video controls className="w-full h-40 object-cover">
              <source src={capsule.mediaUrl} type="video/mp4" />
            </video>
          ) : (
            <img src={capsule.mediaUrl} alt="Capsule" className="w-full h-40 object-cover rounded" />
          )}
        </div>
      )}

      {/* Unlock Button */}
      <button
        onClick={handleUnlock}
        disabled={!isUnlockable}
        className={`mt-4 px-4 py-2 rounded ${
          isUnlockable ? "bg-green-500 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
      >
        {isUnlockable ? "🔓 Unlock Capsule" : `🔒 Unlocks on ${new Date(capsule.unlockDate).toLocaleDateString()}`}
      </button>

      {/* Display Messages */}
      {message && <p className="mt-2 text-sm text-gray-500">{message}</p>}
    </div>
  );
};

export default CapsuleDetail;
