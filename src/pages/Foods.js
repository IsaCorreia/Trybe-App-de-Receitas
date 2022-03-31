import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { MEALS_ENDPOINT } from '../helpers/enpoints';
import useRecipeInitialRequest from '../hooks/useRecipeInitialRequest';
import ExploreRecipeCard from '../components/ExploreRecipeCards';

const Foods = () => {
  const { setFoodInitialRequest, foodInitialRequest } = useContext(RecipesContext);

  useRecipeInitialRequest(MEALS_ENDPOINT, setFoodInitialRequest, 'foods');
  return (
    <>
      <Header currentPage="Foods" />
      <ExploreRecipeCard info={ foodInitialRequest[0] } />
      <h1>Foods!</h1>
      <Footer />
    </>
  );
};

export default Foods;
