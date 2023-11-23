// load .env data into process.env
require("dotenv").config();

/*
  URL Router object to support the get requests to the API.
  
  For authentication purposes, the parameter apiKey must be included in the query string
  providing the environment variable value. 

  An account must be created first, and the API must contain a valid value.

  All the other search parameters can be combined with the apiKey.
*/

const recipeApiUrl = {
  /*
  GET https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2
  Use res.data.result for the desired dataset

  Use the following parameters for pagination:
    - offset	number	0	  The number of results to skip (between 0 and 900).
    - number	number	10	The number of expected results (between 1 and 100).

  Setting instructionsRequired=true, once only recipes containing the steps are valid for this project
  */
  getRecipesByNaturalLanguage: (query) => {
    return `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.RECIPE_API_KEY}&instructionsRequired=true&query=${query}`;
  },

  /*
  GET https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2
  Use res.data for the desired dataset
  */
  getRecipesByIngredient: (ingredientsArray) => {
    return `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${
      process.env.RECIPE_API_KEY
    }&ingredients=${ingredientsArray.join(",+")}`;
  },

  /*
  GET https://api.spoonacular.com/recipes/716429/information?includeNutrition=false
  Use res.data for the desired dataset
  */
  getRecipeInformation: (recipeId) => {
    return `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.RECIPE_API_KEY}`;
  },

  /*
  GET https://api.spoonacular.com/recipes/informationBulk?ids=715538,716429
  Use res.data for the desired dataset
  */
  getRecipeInformationBulk: (recipeIdsArray) => {
    return `https://api.spoonacular.com/recipes/informationBulk?apiKey=${
      process.env.RECIPE_API_KEY
    }&ids=${recipeIdsArray.join(",")}`;
  },

  /*
  GET https://api.spoonacular.com/recipes/324694/analyzedInstructions
  Use res.data for the desired dataset
  */
  getAnalyzedRecipeInstructions: (recipeId) => {
    return `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${process.env.RECIPE_API_KEY}&`;
  },
};

module.exports = recipeApiUrl;
