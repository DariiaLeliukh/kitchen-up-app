import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CookingSessionListItem from '../components/CookingSessionListItem';

const CookingSessionList = () => {
  const [cookingSessions, setCookingSessions] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint using Axios
    axios.get('/api/cooking_sessions')
      .then((response) => setCookingSessions(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Get the current date
  const currentDate = new Date();

  // Filter upcoming and expired sessions
  const upcomingSessions = cookingSessions.filter((session) => new Date(`${session.date} ${session.time}`) > currentDate);
  const expiredSessions = cookingSessions.filter((session) => new Date(`${session.date} ${session.time}`) <= currentDate);

  return (
    <div>
      <h2>Upcoming Cooking Sessions</h2>
      <ul>
        {upcomingSessions.map((cookingSession) => (
          <CookingSessionListItem key={cookingSession.id} cookingSession={cookingSession} showInfoButton={true} />
        ))}
      </ul>

      <h2>Expired Cooking Sessions</h2>
      <ul>
        {expiredSessions.map((cookingSession) => (
          <CookingSessionListItem key={cookingSession.id} cookingSession={cookingSession} showInfoButton={true} />
        ))}
      </ul>
    </div>
  );
};

export default CookingSessionList;
