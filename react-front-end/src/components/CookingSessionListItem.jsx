import React from 'react';
import { Link } from 'react-router-dom';

const CookingSessionListItem = ({ cookingSession, showInfoButton }) => (
  <li>
    <strong>Host: {cookingSession.host_name}</strong>
    <br />
    <strong>Recipe: {cookingSession.api_recipe_name}</strong>
    <br />
    <span>Date: {cookingSession.session_date}</span>
    <br />
    <span>Time: {cookingSession.session_time}</span>
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
