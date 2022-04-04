import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import useRecipesInitialRequest from '../hooks/useRecipeInitialRequest';

const FoodsExplore = () => {
  const { foodRequest, setFoodRequest } = useContext(RecipesContext);
  const history = useHistory();

  const RANDOM_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/random.php';
  useRecipesInitialRequest(RANDOM_ENDPOINT, setFoodRequest, 'drinks');

  const handleClick = () => {
    const RANDOM_ID = foodRequest[0].idMeal;
    history.push(`/foods/${RANDOM_ID}`);
  };
  return (
    <>
      <Header currentPage="Explore Foods" disableSearch />
      <div
        style={ {
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        } }
      >
        <h1>FoodsExplore!</h1>

        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>

        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
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

export default FoodsExplore;
