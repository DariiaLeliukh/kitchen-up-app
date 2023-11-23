import React from 'react';
import { Link } from 'react-router-dom';

const CookingSessionListItem = ({ cookingSession, showInfoButton }) => (
  <li>
    <strong>Host: {cookingSession.hostName}</strong>
    <br />
    <strong>Recipe: {cookingSession.recipeName}</strong>
    <br />
    <span>Date: {cookingSession.date}</span>
    <br />
    <span>Time: {cookingSession.time}</span>
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
