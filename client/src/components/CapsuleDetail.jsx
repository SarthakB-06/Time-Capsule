import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CapsuleDetail = () => {
  const { id } = useParams();
  const [capsule, setCapsule] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/api/v1/capsules/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCapsule(response.data);
        calculateTimeLeft(response.data.unlockDate);
      } catch (error) {
        console.error("Error fetching capsule", error);
      }
    };

    fetchCapsule();
  }, [id]);

  const calculateTimeLeft = (unlockDate) => {
    const unlockTime = new Date(unlockDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeDifference = unlockTime - now;

      if (timeDifference <= 0) {
        clearInterval(interval);
        setTimeLeft(null);
        setIsUnlocked(true);

        // Auto-refresh capsule data after unlock
        setTimeout(() => {
          refreshCapsuleData();
        }, 1000); // Small delay to avoid race conditions
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
  };

  const refreshCapsuleData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8000/api/v1/capsules/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCapsule(response.data);
    } catch (error) {
      console.error("Error refreshing capsule data", error);
    }
  };

  return (
    <div className="p-6">
      {capsule ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold">{capsule.title}</h1>
          <p>{capsule.description}</p>

          {/* Countdown Timer */}
          {!isUnlocked ? (
            <p className="text-yellow-400 text-lg font-semibold mt-2">Unlocks in: {timeLeft}</p>
          ) : (
            <p className="text-green-500 text-lg font-semibold mt-2">Unlocked! 🎉</p>
          )}

          {/* Show Image/Video ONLY if Unlocked */}
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

          {/* Unlock Button (Disabled if Locked) */}
          {!isUnlocked && (
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" disabled>
              Locked 🔒
            </button>
          )}
        </div>
      ) : (
        <p>Loading capsule details...</p>
      )}
    </div>
  );
};

export default CapsuleDetail;
