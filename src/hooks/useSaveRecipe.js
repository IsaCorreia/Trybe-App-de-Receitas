import { useEffect } from 'react';

const useSaveRecipe = (ID, state, setState) => {
  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setState(inProgressRecipes);
    }
  }, [ID, setState]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(state));
  }, [state, setState]);
};

export default useSaveRecipe;
