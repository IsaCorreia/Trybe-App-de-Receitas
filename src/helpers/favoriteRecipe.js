const favoriteRecipe = (ID) => {
  const previousLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (previousLocalStorage) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...previousLocalStorage, {
      id: ID,
    },
    ]));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: ID,
    },
    ]));
  }
};

export default favoriteRecipe;
