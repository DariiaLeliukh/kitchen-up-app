import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import "../styles/css/cooking-sessions.css";

const CookingSessionListItem = ({ cookingSession, showInfoButton, styleClasses }) => (
  <div className={styleClasses}>
    <div className="single-session-card h-100">
      <div className="">
        <p className="hosted-by">
          Hosted by {cookingSession.host_name}
        </p>
        <strong>Recipe: {cookingSession.api_recipe_name}</strong>
        <br />
        <span>
          Date:{" "}
          {format(new Date(cookingSession.session_datetime), "dd MMM yyyy")}
        </span>
        <br />
        <span>
          Time: {format(new Date(cookingSession.session_datetime), "HH:mm")}
        </span>
        <br />
        {showInfoButton && (
          <>
            <span>Invitation: {cookingSession.status}</span>
          </>
        )}
      </div>
      {showInfoButton && (
        <div className="mt-auto">
          <Link
            to={`/cooking-sessions/${cookingSession.id}`}
            className="button"
          >
            View Info
          </Link>
        </div>
      )}
    </div>
  </div>
);

export default CookingSessionListItem;
