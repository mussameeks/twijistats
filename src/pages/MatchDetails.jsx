
import React from 'react';
import { useParams } from 'react-router-dom';

const MatchDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Match Details</h1>
      <p className="text-lg">Details for match ID: {id}</p>
      {/* Add actual match data rendering here */}
    </div>
  );
};

export default MatchDetails;
