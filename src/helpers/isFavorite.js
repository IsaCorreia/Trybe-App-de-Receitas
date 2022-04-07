const isFavorite = (ID) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favorites?.some((recipe) => recipe.id === ID)) {
    return true;
  }
  return false;
};

export default isFavorite;
