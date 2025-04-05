// src/pages/HomePage.jsx
import React, { useState, useMemo } from 'react';
import CategorySection from '../components/CategorySection';
import ChallengeModal from '../components/ChallengeModal';
import { challenges, getCategories } from '../data/challenges'; // Import mock data

function HomePage() {
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const categories = useMemo(() => getCategories(), []); // Get unique categories once

  const handleCardClick = (challenge) => {
    setSelectedChallenge(challenge);
  };

  const handleCloseModal = () => {
    setSelectedChallenge(null);
  };

  // Placeholder for actual flag submission logic (e.g., API call)
  const handleSubmitFlag = (challengeId, flag) => {
    console.log(`Submitting flag for challenge ${challengeId}: ${flag}`);
    // Here you would typically make an API call to verify the flag
    // For now, the modal handles basic feedback.
    // After successful API response, you might want to update challenge status, etc.
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Capture The Flag
      </h1>

      {categories.map((category) => {
        // Filter challenges for the current category
        const categoryChallenges = challenges.filter(
          (c) => c.category === category
        );
        return (
          <CategorySection
            key={category}
            title={category}
            challenges={categoryChallenges}
            onCardClick={handleCardClick}
          />
        );
      })}

      {/* Render Modal conditionally */}
      <ChallengeModal
        challenge={selectedChallenge}
        onClose={handleCloseModal}
        onSubmitFlag={handleSubmitFlag} // Pass the submission handler
      />
    </div>
  );
}

export default HomePage;