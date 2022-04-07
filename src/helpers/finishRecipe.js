const finishRecipe = (ID, history, recipeDetails) => {
  const previousLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  if (previousLocalStorage) {
    localStorage.setItem('doneRecipes', JSON.stringify([...previousLocalStorage, {
      recipeDetails,
    },
    ]));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([{
      recipeDetails,
    },
    ]));
  }
  history.push('/done-recipes');
};

export default finishRecipe;
