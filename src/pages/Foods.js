import React, { useContext } from 'react';
import ExploreRecipeCard from '../components/ExploreRecipeCards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../context/RecipesContext';
import { MEALS_ENDPOINT } from '../helpers/enpoints';
import useRecipeInitialRequest from '../hooks/useRecipeInitialRequest';

const Foods = () => {
  const { setFoodInitialRequest, foodInitialRequest } = useContext(RecipesContext);

  useRecipeInitialRequest(MEALS_ENDPOINT, setFoodInitialRequest, 'foods');
  return (
    <>
      <Header currentPage="Foods" disableSearch={ false } />
      <SearchBar />
      {foodInitialRequest.length > 0 && (
        <ExploreRecipeCard info={ foodInitialRequest[0] } />
      )}

      <Footer />
    </>
  );
};

export default Foods;
