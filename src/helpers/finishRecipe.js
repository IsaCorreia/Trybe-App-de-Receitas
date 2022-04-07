const finishRecipe = (ID, history) => {
  const previousLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  if (previousLocalStorage) {
    localStorage.setItem('doneRecipes', JSON.stringify([...previousLocalStorage, {
      id: ID,
    },
    ]));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([{
      id: ID,
    },
    ]));
  }
  history.push('/done-recipes');
};

export default finishRecipe;
