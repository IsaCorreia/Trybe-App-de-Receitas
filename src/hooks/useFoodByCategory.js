import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

const useFoodByCategory = (endpoint, setRecipe, recipe) => {
  const { currentFilter, isFilterByCategoryOn } = useContext(RecipesContext);

  useEffect(() => {
    if (currentFilter !== 'All' && isFilterByCategoryOn) {
      const initialRequest = async () => {
        const category = await
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${currentFilter}`)
          .then(((response) => response.json()));
        setRecipe(category.meals);
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

export default useFoodByCategory;
