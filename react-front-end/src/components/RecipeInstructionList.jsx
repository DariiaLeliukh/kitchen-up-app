import React from "react";
import RecipeInstructionListItem from "./RecipeInstructionListItem";

const RecipeInstructionList = ({ instructions }) => {
  return (
    <section className="form">
      <ol>
        {instructions.map((instruction) => (
          <RecipeInstructionListItem key={instruction.number} number={instruction.number} description={instruction.step}/>
        ))}
      </ol>
    </section>
  );
};

export default RecipeInstructionList;
