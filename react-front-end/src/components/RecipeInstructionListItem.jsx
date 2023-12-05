import React from "react";
import "../styles/css/session-steps.css";

const RecipeInstructionListItem = ({
  number,
  description,
  usersInStep,
  onClickHandler,
}) => {


  return (
    <div className="session-step"
      onClick={onClickHandler && (() => onClickHandler(number))}
    >

      <div className="step-number row">
        <div className="col-6 col-md-4">
          <p>{`STEP ${number}`}</p>
        </div>
        {usersInStep && (
          <div className="col-6 col-md-8">
            {usersInStep.map((profilePicture, index) =>
              profilePicture.length !== 3 ? (
                //An URL is set as the user's profile picture
                <img
                  key={index}
                  src={profilePicture}
                  alt={`User's profile picture`}
                />
              ) : (
                //The user's initials are set as their profile picture
                <div className="img-replacement" key={index} >
                  {profilePicture}
                </div>
              )
            )}
          </div>
        )}
      </div>
      <div className="step-action">
        <p>{`${description}`}</p>
      </div>
    </div >
  );
};

export default RecipeInstructionListItem;
