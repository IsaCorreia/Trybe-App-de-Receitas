export const fetchFoodByIngredient = async (ingredient) => {
  const URL_ENDPOINT_BY_INGREDIENT = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL_ENDPOINT_BY_INGREDIENT);
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data.meals;
};

export const fetchFoodByName = async (name) => {
  const URL_ENDPOINT_BY_NAME = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(URL_ENDPOINT_BY_NAME);
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data.meals;
};

export const fetchFoodByFirstLetter = async (firstLetter) => {
  const URL_ENDPOINT_BY_FIRSTLETTER = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(URL_ENDPOINT_BY_FIRSTLETTER);
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data.meals;
};
