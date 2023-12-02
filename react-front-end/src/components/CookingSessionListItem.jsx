import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import "../styles/css/cooking-sessions.css";

const CookingSessionListItem = ({ cookingSession, showInfoButton }) => (
  <div className="single-session-card col-12 col-md-6 col-lg-4">
    <h2>{cookingSession.is_host ? "Hosting" : cookingSession.host_name}</h2>
    <strong>Recipe: {cookingSession.api_recipe_name}</strong>
    <br />
    <span>
      Date: {format(new Date(cookingSession.session_datetime), "dd MMM yyyy")}
    </span>
    <br />
    <span>
      Time: {format(new Date(cookingSession.session_datetime), "HH:mm")}
    </span>
    <br />
    {showInfoButton && (
      <>
        <span>Invitation: {cookingSession.status}</span>
        <br />
        <Link to={`/cooking-sessions/${cookingSession.id}`}>
          <button>View Info</button>
        </Link>
      </>
    )}
  </div>
);

export default CookingSessionListItem;
