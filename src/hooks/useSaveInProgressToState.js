const useSaveInProgress = (state, ID) => {
  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setStateIngredient(inProgressRecipes);
    }
  }, [ID]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(stateIngredient));
  }, [state]);
};

export default useSaveInProgress;
