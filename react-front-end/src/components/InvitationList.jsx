import React, { useState, useEffect } from "react";
import axios from "axios";
import InvitationListItem from "./InvitationListItem";
import Loading from "../components/Loading";

const InvitationList = ({ cookingSessionId, isNotExpired }) => {
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
    return <Loading />;
  }

  return (
    <div>
      <ul>
        {attendance.map((item) => (
          <InvitationListItem
            key={item.id}
            isNotExpired={isNotExpired}
            invitation={item}
          ></InvitationListItem>
        ))}
      </ul>
    </div>
  );
};

export default InvitationList;
