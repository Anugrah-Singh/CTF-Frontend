// src/components/ChallengeCard.jsx
import React from 'react';

function ChallengeCard({ challenge, onClick }) {
  return (
    <div
      className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg hover:border-blue-500 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[150px]"
      onClick={() => onClick(challenge)} // Pass the whole challenge object
    >
      <div>
        <h3 className="text-xl font-semibold text-blue-400 mb-2">{challenge.title}</h3>
        <p className="text-sm text-gray-400 line-clamp-2">{challenge.description}</p>
      </div>
      <div className="mt-3 text-right">
        <span className="text-green-400 font-bold">{challenge.points} pts</span>
      </div>
    </div>
  );
}

export default ChallengeCard;