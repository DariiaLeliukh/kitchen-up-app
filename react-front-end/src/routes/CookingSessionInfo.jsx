import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import axios from "axios";
import CookingSessionListItem from "../components/CookingSessionListItem";
import InvitationList from "../components/InvitationList";

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
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, marginRight: "20px" }}>
          <CookingSessionListItem
            cookingSession={cookingSession}
            showInfoButton={false}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Link to={`/cooking-sessions/${id}/join`}>
            <button>Join Session</button>
          </Link>
          <Link to={`/recipe/${cookingSession.api_recipe_id}`}>
            <button>View Recipe</button>
          </Link>
          <button onClick={() => console.log("Add To Grocery List")}>
            Add To Grocery List
          </button>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{ flex: 1, marginRight: "20px" }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(cookingSession.api_recipe_summary),
          }}
        ></div>
        <div style={{ flex: 1 }}>
          <h3>Who is coming</h3>
          <InvitationList cookingSessionId={id}></InvitationList>
        </div>
      </div>
    </div>
  );
};

export default CookingSessionInfo;
