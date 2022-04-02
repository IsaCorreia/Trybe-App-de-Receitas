import React, { useContext } from 'react';
import ExploreRecipeCard from '../components/ExploreRecipeCards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { DRINKS_ENDPOINT, DRINKS_FILTER_ENDPOINT } from '../helpers/enpoints';
import useRecipeInitialRequest from '../hooks/useRecipeInitialRequest';

const Drinks = () => {
  const NUMBER_OF_CARDS = 12;
  const { setDrinksInitialRequest, drinksInitialRequest,
    setDrinksFilterRequest } = useContext(RecipesContext);

  useRecipeInitialRequest(DRINKS_ENDPOINT, setDrinksInitialRequest, 'drinks');
  useRecipeInitialRequest(DRINKS_FILTER_ENDPOINT, setDrinksFilterRequest, 'drinks');

  return (
    <>
      <Header currentPage="Drinks" disableSearch={ false } />
      <div className="card-display">
        { drinksInitialRequest.length > 0
      && drinksInitialRequest.slice(0, NUMBER_OF_CARDS)
        .map((card, index) => (<ExploreRecipeCard
          key={ index }
          index={ index }
          testidContainer={ `${index}-recipe-card` }
          testidImg={ `${index}-card-img` }
          testidName={ `${index}-card-name` }
          src={ card.strDrinkThumb }
          recipeName={ card.strDrink }
        />)) }
      </div>
      <Footer />
    </>
  );
};

export default Drinks;
