import React, { useState, useEffect } from "react";
import axios from "axios";
import CookingSessionListItem from "../components/CookingSessionListItem";

const CookingSessionList = () => {
  const [cookingSessions, setCookingSessions] = useState(null);

  useEffect(() => {
    // Fetch data from the API endpoint using Axios
    // console.log('useEffect in action');

    axios.get("/api/cooking-sessions")
      .then((response) => {
        // console.log(`Chegou!`);
        setCookingSessions(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Conditionally render based on whether cookingSession is available
  if (cookingSessions === null) {
    // If cookingSession is still null, you can render a loading state or return null
    return <p>Loading...</p>;
  }

  // Get the current date
  const currentDate = new Date();

  // Filter upcoming and expired sessions
  const upcomingSessions = cookingSessions.length === 0 ? [] : cookingSessions.filter((session) => new Date(session.session_datetime) > currentDate);
  const expiredSessions = cookingSessions.length === 0 ? [] : cookingSessions.filter((session) => new Date(session.session_datetime) <= currentDate);



  return (
    <div>
      <h1>Cooking Sessions</h1>
      <h2>Upcoming Sessions</h2>
      {upcomingSessions.length === 0 ?
        <div><p>You don&apost have an upcoming cooking session, yet! Invite your friends!!</p></div>
        :
        <ul>
          {upcomingSessions.map((cookingSession) => (
            <CookingSessionListItem key={cookingSession.id} cookingSession={cookingSession} showInfoButton={true} />
          ))}
        </ul>
      }
      <h2>Expired Sessions</h2>
      {expiredSessions.length === 0 ?
        <div><p>Have you never cooked with your friends before? Invite them!!</p></div>
        :
        <ul>
          {expiredSessions.map((cookingSession) => (
            <CookingSessionListItem key={cookingSession.id} cookingSession={cookingSession} showInfoButton={true} />
          ))}
        </ul>
      }
    </div>
  );
};

export default CookingSessionList;
