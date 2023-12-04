import React, { useState, useEffect } from "react";
import axios from "axios";
import CookingSessionListItem from "../components/CookingSessionListItem";
import "../styles/css/cooking-sessions.css";
import Loading from "../components/Loading";

const CookingSessionList = () => {
  const [cookingSessions, setCookingSessions] = useState(null);

  useEffect(() => {
    // Fetch data from the API endpoint using Axios
    // console.log('useEffect in action');

    axios
      .get("/api/cooking-sessions")
      .then((response) => {
        // console.log(`Chegou!`);
        setCookingSessions(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Conditionally render based on whether cookingSession is available
  if (cookingSessions === null) {
    // If cookingSession is still null, you can render a loading state or return null
    return <Loading />;
  }

  // Get the current date
  const currentDate = new Date();
  // A cooking session is available if it's schedule for the next 30 minutes or for the last two hours
  const earlyAttendance = new Date(currentDate.getTime() + 30 * 60000); // 30 minutes in milliseconds
  const lateAtttendance = new Date(currentDate.getTime() - 2 * 3600000); // 2 hours in milliseconds

  // Filter upcoming, expired, and sessions that are available to join
  const upcomingSessions =
    cookingSessions.length === 0
      ? []
      : cookingSessions.filter(
        (session) => new Date(session.session_datetime) > earlyAttendance
      );
  const expiredSessions =
    cookingSessions.length === 0
      ? []
      : cookingSessions.filter(
        (session) => new Date(session.session_datetime) < lateAtttendance
      );
  const availableSessions =
    cookingSessions.length === 0
      ? []
      : cookingSessions.filter((session) => {
        const plannedDateTime = new Date(session.session_datetime);
        return (
          plannedDateTime >= lateAtttendance && plannedDateTime <= earlyAttendance
        );
      });

  return (
    <div className="container cooking-session-list">
      <h1>Cooking Sessions</h1>
      {availableSessions.length > 0 && (
        <>
          <h2>Available Sessions to Join</h2>
          <div className="available-sessions sessions-container row ">
            {availableSessions.map((cookingSession) => (
              <CookingSessionListItem
                key={cookingSession.id}
                cookingSession={cookingSession}
                showInfoButton={true}
                styleClasses="col-12 col-md-6 col-lg-4 mb-3"
              />
            ))}
          </div>
        </>
      )}

      <h2>Upcoming Sessions</h2>
      {upcomingSessions.length === 0 ? (
        <div>
          <p>
            You don&apost have an upcoming cooking session, yet! Invite your
            friends!!
          </p>
        </div>
      ) : (
        <div className="upcoming-sessions sessions-container row ">
          {upcomingSessions.map((cookingSession) => (
            <CookingSessionListItem
              key={cookingSession.id}
              cookingSession={cookingSession}
              showInfoButton={true}
              styleClasses="col-12 col-md-6 col-lg-4 mb-3"
            />
          ))}
        </div>
      )}
      <h2>Expired Sessions</h2>
      {expiredSessions.length === 0 ? (
        <div>
          <p>Have you never cooked with your friends before? You&aposre missing all the fun!!</p>
        </div>
      ) : (
        <div className="expired-sessions sessions-container row">
          {expiredSessions.map((cookingSession) => (
            <CookingSessionListItem
              key={cookingSession.id}
              cookingSession={cookingSession}
              showInfoButton={true}
              styleClasses="col-12 col-md-6 col-lg-4 mb-3"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CookingSessionList;
