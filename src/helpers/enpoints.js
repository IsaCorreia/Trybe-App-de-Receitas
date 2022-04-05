export const MEALS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const DRINKS_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const MEALS_FILTER_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const DRINKS_FILTER_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
export const MEALS_INGREDIENTS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
export const MEALS_IMG_ENDPOINT_START = 'https://www.themealdb.com/images/ingredients/';
export const DRINKS_INGREDIENTS_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
export const DRINKS_IMG_ENDPOINT_START = 'https://www.thecocktaildb.com/images/ingredients/';

export const RECIPE_DETAILS_ENDPOINT = (id) => `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
