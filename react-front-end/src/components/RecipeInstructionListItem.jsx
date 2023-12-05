import React from "react";

const RecipeInstructionListItem = ({
  number,
  description,
  usersInStep,
  isCurrentStep,
  onClickHandler,
}) => {
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
    <li
      style={{ display: "flex", flexDirection: "row" }}
      onClick={onClickHandler && (() => onClickHandler(number))}
    >
      {usersInStep && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {usersInStep.map((profilePicture, index) =>
            profilePicture.length !== 3 ? (
              //An URL is set as the user's profile picture
              <img
                key={index}
                style={profileImageStyle}
                src={profilePicture}
                alt={`User's profile picture`}
              />
            ) : (
              //The user's initials are set as their profile picture
              <div key={index} style={profileImageStyle}>
                {profilePicture}
              </div>
            )
          )}
        </div>
      )}
      {/*TODO: Switch this conditional render by testing isCurrentStep and assigning the proper css class*/}
      <div style={isCurrentStep ? { fontWeight: "bold" } : {}}>
        <p>{`STEP ${number}: ${description}`}</p>
      </div>
    </li>
  );
};

export default RecipeInstructionListItem;
