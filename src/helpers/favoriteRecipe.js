const favoriteRecipe = (recipeDetails, ID) => {
  const previousLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!previousLocalStorage?.some((item) => item.id === ID)) {
    if (previousLocalStorage) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...previousLocalStorage, {
        ...recipeDetails,
      },
      ]));
      return true;
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      ...recipeDetails,
    },
    ]));
    return true;
  }
  const newLocalStorage = previousLocalStorage.filter((item) => item.id !== ID);
  localStorage.setItem('favoriteRecipes', JSON.stringify([...newLocalStorage]));
  return false;
};

export default favoriteRecipe;
