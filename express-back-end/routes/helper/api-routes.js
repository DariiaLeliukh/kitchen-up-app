/*
  URL Router object to support the get requests to the API.
  
  For authentication purposes, the parameter apiKey must be included in the query string
  providing the environment variable value. 

  An account must be created first, and the API must contain a valid value.

  All the other search parameters can be combined with the apiKey.
*/

const apiUrl = {
  //GET https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2
  getRecipesByNaturalLanguage: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=`,
  //GET https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2
  getRecipesByIngredient: `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.API_KEY}&ingredients=`,
  //GET https://api.spoonacular.com/recipes/716429/information?includeNutrition=false
  getRecipeInformation: `https://api.spoonacular.com/recipes/{id}/information?apiKey=${process.env.API_KEY}`,
  //GET https://api.spoonacular.com/recipes/informationBulk?ids=715538,716429
  getRecipeInformationBulk: `https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.API_KEY}&ids=`,
  //GET https://api.spoonacular.com/recipes/324694/analyzedInstructions
  getAnalyzedRecipeInstructions: `https://api.spoonacular.com/recipes/{id}/analyzedInstructions?apiKey=${process.env.API_KEY}&`,
};

export default apiUrl;
