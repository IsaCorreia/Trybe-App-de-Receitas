import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

// limpa estado quando desmonta componente
const useClearState = () => {
  const { setCurrentFilter } = useContext(RecipesContext);
  useEffect(() => {
    setCurrentFilter('All');
  },
  [setCurrentFilter]);
};

export default useClearState;
