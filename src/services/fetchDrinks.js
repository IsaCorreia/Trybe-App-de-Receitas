export const fetchDrinkByIngredient = async (ingredient) => {
  const URL_DRINK_ENDPOINT_BY_INGREDIENT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL_DRINK_ENDPOINT_BY_INGREDIENT);
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data.drinks;
};

export const fetchDrinkByName = async (name) => {
  const URL_DRINK_ENDPOINT_BY_NAME = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(URL_DRINK_ENDPOINT_BY_NAME);
  const data = await response.json();
  console.log(data);
  return data.drinks;
};

export const fetchDrinkByFirstLetter = async (firstLetter) => {
  const URL_DRINK_ENDPOINT_BY_FIRSTLETTER = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(URL_DRINK_ENDPOINT_BY_FIRSTLETTER);
  const data = await response.json();
  console.log(data);
  return data.drinks;
};
