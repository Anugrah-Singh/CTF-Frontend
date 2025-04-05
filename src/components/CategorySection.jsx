// src/components/CategorySection.jsx
import React from 'react';
import ChallengeCard from './ChallengeCard';

function CategorySection({ title, challenges, onCardClick }) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 border-l-4 border-blue-500 pl-3">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            onClick={onCardClick} // Pass the handler down
          />
        ))}
      </div>
    </section>
  );
}

export default CategorySection;