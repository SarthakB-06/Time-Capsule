import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CapsuleDetail = () => {
  const { id } = useParams();
  const [capsule, setCapsule] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const response = await axios.get(`/api/v1/capsules/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCapsule(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      }
    };

    fetchCapsule();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!capsule) {
    return <div>Loading...</div>;
  }

  console.log("Capsule data:", capsule); // Log the capsule data to verify mediaUrl

  return (
    <div>
      <h1>{capsule.title}</h1>
      <p>{capsule.description}</p>
      {capsule.mediaUrl && <img src={capsule.mediaUrl} alt="Capsule Media" style={{ maxWidth: '100%' }} />}
      {/* Render other capsule details here */}
    </div>
  );
};

export default CapsuleDetail;