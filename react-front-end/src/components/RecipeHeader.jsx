import React from "react";

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
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.original}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeHeader;
