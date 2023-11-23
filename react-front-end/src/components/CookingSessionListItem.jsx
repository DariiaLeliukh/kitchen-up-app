import React from 'react';
import { Link } from 'react-router-dom';

const CookingSessionListItem = ({ item, showInfoButton }) => (
  <li>
    <strong>Host: {item.hostName}</strong>
    <br />
    <strong>Recipe: {item.recipeName}</strong>
    <br />
    <span>Date: {item.date}</span>
    <br />
    <span>Time: {item.time}</span>
    <br />
    {showInfoButton && (
      <Link to={`/cooking-session/${item.id}`}>
        <button>View Info</button>
      </Link>
    )}
    <hr />
  </li>
);

export default CookingSessionListItem;
