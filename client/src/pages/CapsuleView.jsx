import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CapsuleView = () => {
    const { id } = useParams();
    const [capsule, setCapsule] = useState(null);

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
    
      if (!capsule) return <p>Loading...</p>;
  
  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold">{capsule.title}</h1>
    <p>{capsule.description}</p>
    <p>Unlock Date: {new Date(capsule.unlockDate).toLocaleDateString()}</p>
  </div>
  )
}

export default CapsuleView
