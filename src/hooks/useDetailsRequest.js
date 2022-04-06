import { useEffect } from 'react';

const MAX_INGREDIENTS = 20;

const reduceIngredients = (ingredients) => {
  const reducedIngredients = ingredients.reduce((acc, curr) => {
    const ingredient = {};
    for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
      if (curr[`strIngredient${i}`]) {
        const INGREDIENT_STRING = `strIngredient${i}`;
        const measure = curr[`strMeasure${i}`];

        const ingredientName = curr[INGREDIENT_STRING];
        ingredient[INGREDIENT_STRING] = {
        };
        ingredient[INGREDIENT_STRING][ingredientName] = measure;
      }
    }
    return ingredient;
  },
  []);
  return reducedIngredients;
};

const useDetailsRequest = (endpoint, setRecipe, recipe) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(endpoint);
      const data = await response.json();
      const detailsObject = {
        ...data[recipe][0],
        ingredients: reduceIngredients(data[recipe]),
      };
      setRecipe(detailsObject);
    };
    fetchData();
  }, [endpoint, setRecipe, recipe]);
};

export default useDetailsRequest;
