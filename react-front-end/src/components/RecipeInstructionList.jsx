import React, { useState } from "react";
import RecipeInstructionListItem from "./RecipeInstructionListItem";
import "../styles/css/forms.css";
import "../styles/css/styles.css";

const RecipeInstructionList = ({ instructions, positions, onClickHandler }) => {
  const [userStep, setUserStep] = useState(positions ? 1 : 0);

  const defineNewStep = (step) => {
    setUserStep(step);
    onClickHandler(step);
  };

  return (
    <div className="container">
      <div>
        {instructions && instructions.length > 0 ? (
          <section className="form">
            <ol>
              {instructions[0].steps.map((instruction) => (
                <RecipeInstructionListItem
                  key={instruction.number}
                  number={instruction.number}
                  description={instruction.step}
                  usersInStep={positions ? positions[instruction.number] : null}
                  onClickHandler={onClickHandler ? defineNewStep : null}
                  isCurrentStep={instruction.number === userStep}
                />
              ))}
            </ol>
          </section>
        ) : (
          <p>No instructions available.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeInstructionList;
