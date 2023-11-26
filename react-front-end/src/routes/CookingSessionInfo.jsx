import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import axios from "axios";
import CookingSessionListItem from "../components/CookingSessionListItem";

const CookingSessionInfo = () => {
  const [cookingSession, setCookingSession] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    // Fetch data for the specific cooking session using the id from the URL params
    console.log('Connecting to: ' + `/api/cooking-sessions/${id}`);
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
      <div>
        <div>
          <CookingSessionListItem cookingSession={cookingSession} showInfoButton={false} />
        </div>
        <div>
          <button onClick={() => console.log("Start Session")}>
            Start Session
          </button>
          <button onClick={() => console.log("View Recipe")}>
            View Recipe
          </button>
          <button onClick={() => console.log("Add To Grocery List")}>
            Add To Grocery List
          </button>
        </div>
      </div>
      <div>
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(cookingSession.api_recipe_summary) }}></div>
        <div></div>
      </div>
    </div>
  );
};

export default CookingSessionInfo;
