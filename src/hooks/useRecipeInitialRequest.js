import { useEffect } from 'react';

const useRecipesInitialRequest = (endpoint, setRecipe, recipe) => {
  useEffect(() => {
    let selectedRecipe = recipe;
    const initialRequest = async () => {
      selectedRecipe = await fetch(endpoint).then(((response) => response.json()));
      const type = Object.keys(selectedRecipe);
      setRecipe(selectedRecipe[type]);
    };
    initialRequest();
  }, [endpoint, setRecipe, recipe]);
};

export default useRecipesInitialRequest;
