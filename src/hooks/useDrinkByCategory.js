import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

const useDrinksByCategory = (endpoint, setRecipe, recipe) => {
  const { currentFilter, isFilterByCategoryOn } = useContext(RecipesContext);

  useEffect(() => {
    if (currentFilter !== 'All' && isFilterByCategoryOn) {
      const initialRequest = async () => {
        const category = await
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${currentFilter}`)
          .then(((response) => response.json()));
        setRecipe(category[recipe]);
      };
      initialRequest();
    }
    if (currentFilter === 'All' && isFilterByCategoryOn) {
      let selectedRecipe = recipe;
      const initialRequest = async () => {
        selectedRecipe = await fetch(endpoint).then(((response) => response.json()));
        const type = Object.keys(selectedRecipe);
        setRecipe(selectedRecipe[type]);
      };
      initialRequest();
    }
  }, [currentFilter, endpoint, recipe, setRecipe, isFilterByCategoryOn]);
};

export default useDrinksByCategory;
