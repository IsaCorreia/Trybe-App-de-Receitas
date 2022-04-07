const favoriteRecipe = (ID) => {
  const previousLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!previousLocalStorage?.some((recipe) => recipe.id === ID)) {
    if (previousLocalStorage) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...previousLocalStorage, {
        id: ID,
      },
      ]));
      return true;
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: ID,
    },
    ]));
    return true;
  }
  const newLocalStorage = previousLocalStorage.filter((recipe) => recipe.id !== ID);
  localStorage.setItem('favoriteRecipes', JSON.stringify([...newLocalStorage]));
  return false;
};

export default favoriteRecipe;
