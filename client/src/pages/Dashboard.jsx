import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";

const Dashboard = () => {
  const [capsules, setCapsules] = useState([]);
  const capsulesRef = useRef(null);
  const [sentiments, setSentiments] = useState({}); 
  

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const token = localStorage.getItem("token"); // Get JWT
        const response = await axios.get("http://localhost:8000/api/v1/capsules/my-capsules", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCapsules(response.data);
      } catch (error) {
        console.error("Error fetching capsules", error);
      }
    };

    fetchCapsules();
  }, []);

  useEffect(() => {
    if (capsules.length > 0) {
      gsap.fromTo(
        capsulesRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.3, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [capsules]);

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Your Capsules</h1>
        <Link to="/create" className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md transition">
          + Create Capsule
        </Link>
      </div>

      <div ref={capsulesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capsules.length > 0 ? (
          capsules.map((capsule) => {
            const isUnlocked = new Date() >= new Date(capsule.unlockDate);

            return (
              <div key={capsule._id} className="bg-gray-800 p-4 rounded-lg shadow-lg text-white transition-transform transform hover:scale-105">
                <h2 className="text-xl font-semibold text-yellow-400">{capsule.title}</h2>
                <p className="text-gray-300">{capsule.description}</p>
                <p className="text-sm text-gray-400">
                  Unlocks on: {new Date(capsule.unlockDate).toLocaleDateString()}
                </p>

                {/* Lock Status */}
                {!isUnlocked ? (
                  <p className="text-red-500 font-bold mt-2">🔒 Locked</p>
                ) : (
                  <p className="text-green-500 font-bold mt-2">✅ Unlocked</p>
                )}

                {/* Show Image/Video if exists */}
                {capsule.media && (
                  <div className="mt-2">
                    {capsule.media.endsWith(".mp4") ? (
                      <video controls className="w-full h-40 object-cover rounded-md">
                        <source src={capsule.media} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={capsule.media}
                        alt="Capsule"
                        className="w-full h-40 object-cover rounded-md"
                      />
                    )}
                  </div>
                )}

                <Link
                  to={`/capsule/${capsule._id}`}
                  className="mt-2 inline-block text-cyan-400 font-semibold hover:text-cyan-300 transition"
                >
                  View Capsule →
                </Link>
              </div>
            );
          })
        ) : (
          <p className="text-gray-300">No capsules found. Create one!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;