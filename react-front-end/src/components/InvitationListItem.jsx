import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const InvitationListItem = ({ invitation, isNotExpired }) => {
  const { auth } = useAuth();
  const [status, setStatus] = useState(invitation.status);

  const handleStatusClick = async (newStatus) => {
    try {
      //Make a POST request to update the invitation status
      await axios.post(`/api/invitations/${invitation.id}`, {
        status: newStatus,
      });

      setStatus(newStatus);

      // Handle success, e.g., show a message or update the UI
      //console.log(`Invitation status changed to: ${newStatus}`);
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error updating the invitation status:", error.message);
    }
  };

  const profileImageStyle = {
    width: "40px", // Set your desired width
    height: "40px", // Set your desired height
    borderRadius: "50%", // Make it round
    objectFit: "cover", // Maintain aspect ratio while covering the container
    border: "1px solid #fff", // Optional: Add a border
    display: "flex",
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
  };

  return (
    <li className="guest row">
      <div className="col-12 col-md-1">
        {invitation.profile_picture_url ? (
          <img
            style={profileImageStyle}
            src={invitation.profile_picture_url}
            alt={`${invitation.first_name} ${invitation.last_name}'s profile picture`}
          />
        ) : (
          <div
            style={profileImageStyle}
          >{`${invitation.first_name[0]} ${invitation.last_name[0]}`}</div>
        )}
      </div>
      <div className="col-12 col-md-3">
        {invitation.first_name} {invitation.last_name}
        {invitation.is_host && " (host)"}
      </div>
      <div className="col-12 col-md-1">{status} </div>
      {isNotExpired && (
        <div className="col-12 col-md-7 flex-row">
          {auth.userId === invitation.guest_id && status !== "Accepted" && (
            <button onClick={() => handleStatusClick("Accepted")}>
              Accept
            </button>
          )}
          {auth.userId === invitation.guest_id && status !== "Declined" && (
            <button onClick={() => handleStatusClick("Declined")}>
              Decline
            </button>
          )}
        </div>
      )}
    </li>
  );
};

export default InvitationListItem;
