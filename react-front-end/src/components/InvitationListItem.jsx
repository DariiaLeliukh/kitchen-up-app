import React, { useState } from "react";
import { Link } from "react-router-dom";

const InvitationListItem = ({ invitation, isNotExpired }) => {
  const { status, setStatus } = useState(invitation.status);
  console.log(invitation);
  const profileImageStyle = {
    width: '40px', // Set your desired width
    height: '40px', // Set your desired height
    borderRadius: '50%', // Make it round
    objectFit: 'cover', // Maintain aspect ratio while covering the container
    border: '1px solid #fff', // Optional: Add a border
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  };

  return (
    <li style={{ display: "flex", flexDirection: "row" }}>
      <div>
        {invitation.profile_picture_url ?
          <img
            style={profileImageStyle}
            src={invitation.profile_picture_url}
            alt={`${invitation.first_name} ${invitation.last_name}'s profile picture`}
          />
          :
          <div style={profileImageStyle}>{`${invitation.first_name[0]} ${invitation.last_name[0]}`}</div>
        }
      </div>
      <div>{`${invitation.first_name} ${invitation.last_name}${invitation.is_host && ' (host)'}`}</div>
      <div>{status} </div>
        <div>
          <button>Accept</button>
          <button>Decline</button>
        </div>
      
    </li >
  );
};

export default InvitationListItem;
