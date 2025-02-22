// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Dashboard = () => {
//   const [capsules, setCapsules] = useState([]);

//   useEffect(() => {
//     const fetchCapsules = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Get JWT
//         const response = await axios.get("http://localhost:8000/api/v1/capsules/my-capsules", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCapsules(response.data);
//       } catch (error) {
//         console.error("Error fetching capsules", error);
//       }
//     };

//     fetchCapsules();
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Your Capsules</h1>
//         <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded">
//           + Create Capsule
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {capsules.length > 0 ? (
//           capsules.map((capsule) => (
//             <div key={capsule._id} className="bg-gray-800 p-4 rounded-lg shadow">
//               <h2 className="text-xl font-semibold">{capsule.title}</h2>
//               <p>{capsule.description}</p>
//               <p className="text-sm text-gray-400">
//                 Unlocks on: {new Date(capsule.unlockDate).toLocaleDateString()}
//               </p>

//               {/* Show Image/Video if exists */}
//               {capsule.media && (
//                 <div className="mt-2">
//                   {capsule.media.endsWith(".mp4") ? (
//                     <video controls className="w-full h-40 object-cover">
//                       <source src={capsule.media} type="video/mp4" />
//                       Your browser does not support the video tag.
//                     </video>
//                   ) : (
//                     <img
//                       src={capsule.media}
//                       alt="Capsule"
//                       className="w-full h-40 object-cover rounded"
//                     />
//                   )}
//                 </div>
//               )}

//               <Link to={`/capsule/${capsule._id}`} className="mt-2 inline-block text-blue-400">
//                 View Capsule →
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p>No capsules found. Create one!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [capsules, setCapsules] = useState([]);

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-black">Your Capsules</h1>
        <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded">
          + Create Capsule
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {capsules.length > 0 ? (
          capsules.map((capsule) => {
            const isUnlocked = new Date() >= new Date(capsule.unlockDate);

            return (
              <div key={capsule._id} className="bg-gray-800 p-4 rounded-lg shadow text-white">
                <h2 className="text-xl font-semibold">{capsule.title}</h2>
                <p>{capsule.description}</p>
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
                      <video controls className="w-full h-40 object-cover rounded">
                        <source src={capsule.media} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={capsule.media}
                        alt="Capsule"
                        className="w-full h-40 object-cover rounded"
                      />
                    )}
                  </div>
                )}

                <Link
                  to={`/capsule/${capsule._id}`}
                  className="mt-2 inline-block text-blue-400 font-semibold"
                >
                  View Capsule →
                </Link>
              </div>
            );
          })
        ) : (
          <p className="text-white">No capsules found. Create one!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

