import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const InvitationList = ({ cookingSessionId }) => {
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    // Fetch data for the specific cooking session using the id from the URL params
    axios
      .get(`/api/cooking-sessions/${cookingSessionId}/invitations`)
      .then((response) => setAttendance(response.data))
      .catch((error) =>
        console.error("Error fetching cooking session's invitations: ", error)
      );
  }, []);

  // Conditionally render based on whether cookingSession is available
  if (attendance === null) {
    // If cookingSession is still null, you can render a loading state or return null
    return <p>Loading...</p>;
  }

  return (<div><ul>{attendance.map((item) => `${item.first_name} ${item.last_name} - ${item.status}`) }</ul></div>);
};

export default InvitationList;
