export async function fetchFoodByIngredient(ingredient) {
  const URL_ENDPOINT_BY_INGREDIENT = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL_ENDPOINT_BY_INGREDIENT);
  const data = await response.json();
  return data.meals;
}

export async function fetchFoodByName(name) {
  const URL_ENDPOINT_BY_NAME = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`;
  const response = await fetch(URL_ENDPOINT_BY_NAME);
  const data = await response.json();
  return data.meals;
}

export async function fetchFoodByFirstLetter(firstLetter) {
  const URL_ENDPOINT_BY_FIRSTLETTER = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${firstLetter}`;
  const response = await fetch(URL_ENDPOINT_BY_FIRSTLETTER);
  const data = await response.json();
  return data.meals;
}
