import React from "react";
import IngredientList from "./IngredientList";

const RecipeHeader = ({ title, imageUrl, ingredients }) => {
  
  //stilyng the header image. TODO: remove with the proper CSS
  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    objectPosition: 'center middle',
  };

  return (
    <div>
      <img src={imageUrl} alt={title} style={imageStyle}/>
      <h2>{title}</h2>
      <h3>Ingredients</h3>
      <IngredientList ingredients={ingredients}/>
    </div>
  );
};

export default RecipeHeader;