import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const formDataJsonString = new URLSearchParams(location.search).get('formData');
  
  // Parse the JSON string back into an object
  const formData = JSON.parse(formDataJsonString);

  // Function to navigate back to the form page
  const goBackToForm = () => {
    navigate('/form', { formData }); // Pass formData as state
  };

  // Map over the object's keys and values to render them
  const formDataEntries = Object.entries(formData).map(([key, value]) => (
    <div key={key}>
      <strong>{key}:</strong> {value}
    </div>
  ));

  return (
    <div>
      <h1>Review Page</h1>
      {/* Display each element on a new line */}
      {formDataEntries}
      <button onClick={goBackToForm}>Back to Form</button>
    </div>
  );
}

export default ReviewPage;