import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const CookingSessionListItem = ({ cookingSession, showInfoButton }) => (
  <li>
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
    <span>Invitation: {cookingSession.status}</span>
    <br />
    {showInfoButton && (
      <Link to={`/cooking-session/${cookingSession.id}`}>
        <button>View Info</button>
      </Link>
    )}
    <hr />
  </li>
);

export default CookingSessionListItem;
