const objectConstructor = (recipe, recipeDetails) => {
  switch (recipe) {
  case 'food':
    return {
      id: recipeDetails.idMeal,
      type: recipe,
      nationality: recipeDetails.strArea,
      category: recipeDetails.strCategory,
      alcoholicOrNot: '',
      name: recipeDetails.strMeal,
      image: recipeDetails.strMealThumb,
    };
  case 'drink':
    return {
      id: recipeDetails.idDrink,
      type: recipe,
      nationality: '',
      category: recipeDetails.strCategory,
      alcoholicOrNot: recipeDetails.strAlcoholic,
      name: recipeDetails.strDrink,
      image: recipeDetails.strDrinkThumb,
    };
  default:
    break;
  }
};

export default objectConstructor;
