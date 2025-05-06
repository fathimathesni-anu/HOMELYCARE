import React from 'react';
import useFeedback from '../../hooks/User/useFeedback';

const FeedbackPage = () => {
  const { feedback, setFeedback, submitFeedback, message, isLoading } = useFeedback();

  return (
    <div>
      <h1>Submit Feedback</h1>
      
      {/* Feedback textarea */}
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Provide your feedback here..."
        rows="4"
        cols="50"
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
      />

      {/* Submit button */}
      <button
        onClick={submitFeedback}
        disabled={isLoading}  // Disable button when loading
        style={{
          backgroundColor: isLoading ? '#ccc' : '#007bff',  // Change button color when loading
          color: '#fff',
          padding: '10px 20px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
      >
        {isLoading ? 'Submitting...' : 'Submit Feedback'}
      </button>

      {/* Feedback message */}
      {message && <p style={{ marginTop: '10px', color: isLoading ? 'gray' : 'black' }}>{message}</p>}
    </div>
  );
};

export default FeedbackPage;


