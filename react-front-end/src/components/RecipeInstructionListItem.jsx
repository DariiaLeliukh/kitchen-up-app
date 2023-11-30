import React from "react";

const RecipeInstructionListItem = ({ number, description }) => {
  return (
    <li>
      <p>{`STEP ${number}: ${description}`}</p>
    </li>
  );
};

export default RecipeInstructionListItem;
