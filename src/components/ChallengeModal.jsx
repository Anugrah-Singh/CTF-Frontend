// src/components/ChallengeModal.jsx
import React, { useState, useEffect } from 'react';
import { submitFlag as apiSubmitFlag } from '../services/api'; // Import the API function
// Remove useAuth if not needed directly here, submission should work via interceptor


function ChallengeModal({ challenge, onClose, onSubmitFlag }) {
    const [flagInput, setFlagInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    useEffect(() => {
      setFlagInput('');
      setFeedback('');
      setIsSubmitting(false);
    }, [challenge]);
  
    if (!challenge) return null;
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!flagInput || isSubmitting) return;
  
      setIsSubmitting(true);
      setFeedback(''); // Clear previous feedback
  
      try {
        // Use the imported API function. Auth token is added by the interceptor.
        const result = await apiSubmitFlag(challenge.id, flagInput);
  
        if (result.success) { // Assuming backend returns { success: boolean, message: string }
          setFeedback(`Correct Flag! 🎉 ${result.message || ''}`);
           // Maybe update UI to show challenge as solved, then close
           setTimeout(onClose, 2000); // Close after showing success message
        } else {
          setFeedback(`Incorrect Flag. ${result.message || 'Keep trying!'}`);
        }
      } catch (error) {
        // Handle specific errors if needed (e.g., 401 Unauthorized means token issue)
        if (error.response?.status === 401) {
           setFeedback('Authentication error. Please log in again.');
           // Consider redirecting to login or showing a login prompt
        } else {
            setFeedback(error.message || 'An error occurred during submission.');
        }
        console.error("Submission error:", error);
      } finally {
        setIsSubmitting(false);
         setFlagInput(''); // Clear input after attempt
      }
    };

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
      onClick={onClose} // Close modal if clicking outside the content
    >
      {/* Modal Content */}
      <div
        className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg relative border border-gray-600"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content
      >
        
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold"
          onClick={onClose}
        >
          &times; {/* HTML entity for 'X' */}
        </button>

        {/* Challenge Details */}
        <h2 className="text-2xl font-bold text-blue-400 mb-3">{challenge.title}</h2>
        <p className="text-gray-300 mb-4">{challenge.description}</p>

        {/* Points and Hint */}
        <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-green-400 font-semibold">{challenge.points} Points</span>
            {challenge.hint && (
                <span className="text-yellow-500 italic">Hint: {challenge.hint}</span>
            )}
        </div>


        {/* Flag Submission Form */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="flag" className="block text-sm font-medium text-gray-300 mb-1">
            Enter Flag:
          </label>
          <input
            type="text"
            id="flag"
            name="flag"
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
            placeholder="flag{...}"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Flag'}
          </button>
        </form>

         {/* Feedback Area */}
         {feedback && (
            <p className={`mt-3 text-center font-semibold ${feedback.includes('Correct') ? 'text-green-500' : (feedback.includes('Incorrect') || feedback.includes('error')) ? 'text-red-500' : 'text-yellow-500'}`}>
                {feedback}
            </p>
         )}
      </div>
    </div>
  );
}

export default ChallengeModal;