import React from "react";
import RecipeInstructionListItem from "./RecipeInstructionListItem";

const RecipeInstructionList = ({ instructions, positions }) => {
  return (
    <section className="form">
      <ol>
        {instructions.map((instruction) => (
          <RecipeInstructionListItem
            key={instruction.number}
            number={instruction.number}
            description={instruction.step}
            usersInStep={positions[instruction.number]}
          />
        ))}
      </ol>
    </section>
  );
};

export default RecipeInstructionList;
