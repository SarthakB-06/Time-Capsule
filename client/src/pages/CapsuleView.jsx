import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Lock } from 'react-feather';

const CapsuleView = ({ capsule }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (capsule) {
      gsap.fromTo(
        ".capsule-container",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, [capsule]);

  if (!capsule) return <p className="text-white text-center">Loading...</p>;

  // Check if capsule is unlocked
  const isUnlocked = new Date() >= new Date(capsule.unlockDate);

  return (
    <div
      className="p-6 bg-gray-900 min-h-screen text-white flex flex-col items-center"
      style={{
        backgroundImage: 'url(/assets/background.jpg)', // Add your background image here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="capsule-container bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-yellow-400 text-center">{capsule.title}</h1>
        <p className="text-gray-300 text-lg mt-4">{capsule.description}</p>
        <p className="text-lg mt-2 text-cyan-300 font-semibold">
          Unlock Date:{" "}
          <span className="text-yellow-300 animate-pulse">
            {new Date(capsule.unlockDate).toLocaleDateString()}
          </span>
        </p>

        {/* Media Section with Lock Effect */}
        <div className="relative mt-6 w-full max-w-lg mx-auto">
          {capsule.mediaUrl ? (
            isUnlocked ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {capsule.mediaUrl.endsWith(".mp4") ? (
                  <video controls className="w-full h-64 object-cover rounded">
                    <source src={capsule.mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={capsule.mediaUrl} alt="Capsule" className="w-64 h-64 object-cover rounded" />
                )}
              </motion.div>
            ) : (
              <div className="w-full h-64 bg-gray-800 rounded flex justify-center items-center relative">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                >
                  <Lock size={48} className="text-gray-500" />
                </motion.div>
                <div className="absolute inset-0 bg-black bg-opacity-60 rounded"></div>
              </div>
            )
          ) : (
            <p className="text-gray-500">No media available</p>
          )}
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 w-full text-center py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-all"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CapsuleView;