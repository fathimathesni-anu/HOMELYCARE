import { useState } from 'react';
import axiosinstance from '../../api/axiosInstance';

const useFeedback = () => {
  const [feedback, setFeedback] = useState(''); // State to hold the feedback text
  const [message, setMessage] = useState(''); // State to hold status messages
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  // Submit the feedback to the backend
  const submitFeedback = async () => {
    if (feedback.trim() === '') {
      setMessage('Feedback cannot be empty.');
      return;
    }

    setIsLoading(true); // Set loading to true when the feedback is being submitted
    setMessage(''); // Clear previous messages

    try {
      const response = await axiosinstance.post('/feedback/create', { feedback });
      if (response.status === 200) {
        setMessage('Feedback submitted successfully!');
        setFeedback(''); // Reset feedback input after successful submission
      } else {
        setMessage('Failed to submit feedback. Please try again later.');
      }
    } catch (error) {
      // Handle error based on error type
      if (error.response) {
        // Server responded with an error status
        setMessage(`Error: ${error.response.data.message || 'Something went wrong.'}`);
      } else if (error.request) {
        // The request was made, but no response was received
        setMessage('Error: No response from server. Please check your network.');
      } else {
        // Something else went wrong while setting up the request
        setMessage('Error submitting feedback. Please try again later.');
      }
    } finally {
      setIsLoading(false); // Reset loading state after request completion
    }
  };

  return {
    feedback,
    setFeedback,
    submitFeedback,
    message,
    isLoading, // Expose loading state to the component
  };
};

export default useFeedback;



