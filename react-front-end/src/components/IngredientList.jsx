import React from "react";
import IngredientListItem from "./IngredientListItem";

const IngredientList = ({ ingredients }) => {
  return (
    <ul>
      {ingredients.map((ingredient, index) => (
        <IngredientListItem key={index} ingredient={ingredient.original}/>
      ))}
    </ul>
  );
};

export default IngredientList;