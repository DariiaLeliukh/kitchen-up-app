import React, { useState, useEffect } from "react";
import axios from "axios";
import CookingSessionListItem from "../components/CookingSessionListItem";

const CookingSessionList = () => {
  const [cookingSessions, setCookingSessions] = useState([]);

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

  // console.log(
  //   `# Records: ${cookingSessions.length}, First: ${cookingSessions[0]}`
  // );
  
  // Get the current date
  const currentDate = new Date();

  // Filter upcoming and expired sessions
  const upcomingSessions = cookingSessions.length === 0 ? [] : cookingSessions.filter((session) => new Date(`${session.session_date.split('T')[0]} ${session.session_time}`) > currentDate);
  const expiredSessions = cookingSessions.length === 0 ? [] : cookingSessions.filter((session) => new Date(`${session.session_date.split('T')[0]} ${session.session_time}`) <= currentDate);

  // console.log(`#Records: ${cookingSessions.length}, #Upcoming: ${upcomingSessions.length}, #Passed: ${expiredSessions.length}, `)
  
  return (
    <div>
      <h2>Upcoming Cooking Sessions</h2>
      {upcomingSessions.length === 0 ?
        <div><p>You don&apost have an upcoming cooking session, yet! Invite your friends!!</p></div>
        :
        <ul>
          {upcomingSessions.map((cookingSession) => (
            <CookingSessionListItem key={cookingSession.id} cookingSession={cookingSession} showInfoButton={true} />
          ))}
        </ul>
      }
      <h2>Expired Cooking Sessions</h2>
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
