export const MEALS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const DRINKS_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const MEALS_FILTER_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const DRINKS_FILTER_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const RECIPE_DETAILS_ENDPOINT = (id) => `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
export const DRINKS_DETAILS_ENDPOINT = (id) => `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
