import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import axios from "axios";
import CookingSessionListItem from "../components/CookingSessionListItem";
import InvitationList from "../components/InvitationList";
import Loading from "../components/Loading";

const CookingSessionInfo = () => {
  const [cookingSession, setCookingSession] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch data for the specific cooking session using the id from the URL params
    axios
      .get(`/api/cooking-sessions/${id}`)
      .then((response) => setCookingSession(response.data))
      .catch((error) =>
        console.error("Error fetching cooking session details:", error)
      );
  }, []);

  // Conditionally render based on whether cookingSession is available
  if (cookingSession === null) {
    // If cookingSession is still null, you can render a loading state or return null
    return (
      <div className="container">
        <Loading />
      </div>
    );
  }

  // Get the current date
  const currentDate = new Date();
  // A cooking session is available if it's schedule for the next 30 minutes or for the last two hours
  const earlyAttendance = new Date(currentDate.getTime() + 30 * 60000); // 30 minutes in milliseconds
  const lateAtttendance = new Date(currentDate.getTime() - 2 * 3600000); // 2 hours in milliseconds

  // check if the cooking session is in the available time window
  const plannedDateTime = new Date(cookingSession.session_datetime);
  const isAvailableToJoin = plannedDateTime >= lateAtttendance && plannedDateTime <= earlyAttendance;

  // check if the cooking session scheduled time has passed
  const isNotExpired = plannedDateTime >= lateAtttendance;

  return (
    <div className="container cooking-session-page">
      <div className="row mb-5">
        <div className="col-12 col-md-8">
          <CookingSessionListItem
            cookingSession={cookingSession}
            showInfoButton={false}
            styleClasses=""
          />
        </div>
        <div className="col-12 col-md-4 align-self-center session-actions">
          {isAvailableToJoin && (
            <Link to={`/cooking-sessions/${id}/join`}>
              <button>Join Session</button>
            </Link>
          )}
          <Link to={`/recipes/${cookingSession.api_recipe_id}`}>
            <button>View Recipe</button>
          </Link>
          {/* <button onClick={() => console.log("Add To Grocery List")}>
            Add To Grocery List
          </button> */}
        </div>
      </div>
      <div>
        <div className="guest-list">
          <h3>Who {isNotExpired ? "is coming" : "was invited"}</h3>
          <InvitationList
            cookingSessionId={id}
            isNotExpired={isNotExpired}
          ></InvitationList>
        </div>
        <div className="recipe-summary"
          //injecting the HTML coming from the string
          dangerouslySetInnerHTML={{
            //cleaning any possible malicious code
            __html: DOMPurify.sanitize(cookingSession.api_recipe_summary),
          }}
        ></div>
      </div>
    </div>
  );
};

export default CookingSessionInfo;
