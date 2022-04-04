import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

const useFilterByCategory = () => {
  const { currentFilter } = useContext(RecipesContext);

  useEffect(() => {
    const initialRequest = async () => {
      const category = await
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${currentFilter}`)
        .then(((response) => response.json()));
      console.log(category);
    };
    initialRequest();
  }, [currentFilter]);
};

export default useFilterByCategory;
