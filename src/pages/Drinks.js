import React, { useContext } from 'react';
import ExploreRecipeCard from '../components/ExploreRecipeCards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { DRINKS_ENDPOINT } from '../helpers/enpoints';
import useRecipeInitialRequest from '../hooks/useRecipeInitialRequest';

const Drinks = () => {
  const NUMBER_OF_CARDS = 12;
  const { setDrinksInitialRequest, drinksInitialRequest } = useContext(RecipesContext);
  useRecipeInitialRequest(DRINKS_ENDPOINT, setDrinksInitialRequest, 'drinks');
  return (
    <>
      <Header currentPage="Drinks" disableSearch={ false } />
      { drinksInitialRequest.length > 0
      && drinksInitialRequest.slice(0, NUMBER_OF_CARDS)
        .map((card, index) => (<ExploreRecipeCard
          key={ index }
          index={ index }
          info={ card }
        />)) }

      <Footer />
    </>
  );
};

export default Drinks;
