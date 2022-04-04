import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import useRecipesInitialRequest from '../hooks/useRecipeInitialRequest';

const DrinksExplore = () => {
  const { drinksRequest, setDrinksRequest } = useContext(RecipesContext);
  const history = useHistory();

  const RANDOM_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  useRecipesInitialRequest(RANDOM_ENDPOINT, setDrinksRequest, 'drinks');

  const handleClick = () => {
    const RANDOM_ID = drinksRequest[0].idDrink;
    history.push(`/drinks/${RANDOM_ID}`);
  };
  return (
    <>
      <Header currentPage="Explore Drinks" disableSearch />
      <div
        style={ {
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        } }
      >
        <h1>DrinksExplore!</h1>

        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>

        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ handleClick }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </>
  );
};

export default DrinksExplore;
