import React from "react";

const IngredientList = ({ ingredients }) => {
  return (
    <ul className="ingredient-list">
      {ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient.original}</li>
      ))}
    </ul>
  );
};

export default IngredientList;
