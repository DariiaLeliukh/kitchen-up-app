import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CookingSessionListItem from '../components/CookingSessionListItem';

const CookingSessionInfo = ({ match }) => {
  const [cookingSession, setCookingSession] = useState(null);

  useEffect(() => {
    // Fetch data for the specific cooking session using the id from the URL params
    const cookingSessionId = match.params.id;

    axios.get(`/api/cooking_sessions/${cookingSessionId}`)
      .then((response) => setCookingSession(response.data))
      .catch((error) => console.error('Error fetching cooking session details:', error));
  }, [match.params.id]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        {cookingSession && <CookingSessionListItem cookingSession={cookingSession} showInfoButton={false} />}
      </div>
      <div style={{ flex: 1 }}>
        <h3>Actions</h3>
        <button onClick={() => console.log('Start Session')}>Start Session</button>
        <button onClick={() => console.log('View Recipe')}>View Recipe</button>
        <button onClick={() => console.log('Add To Grocery List')}>Add To Grocery List</button>
      </div>
    </div>
  );
};

export default CookingSessionInfo;
