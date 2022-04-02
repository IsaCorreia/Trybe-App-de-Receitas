import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { MEALS_ENDPOINT, MEALS_FILTER_ENDPOINT } from '../helpers/enpoints';
import useRecipeInitialRequest from '../hooks/useRecipeInitialRequest';
import ExploreRecipeCard from '../components/ExploreRecipeCards';

const Foods = () => {
  const NUMBER_OF_CARDS = 12;
  const NUMBER_OF_FILTERS = 5;
  const { setFoodInitialRequest,
    foodInitialRequest,
    mealsFilterRequest,
    setMealsFilterRequest } = useContext(RecipesContext);

  useRecipeInitialRequest(MEALS_ENDPOINT, setFoodInitialRequest, 'foods');
  useRecipeInitialRequest(MEALS_FILTER_ENDPOINT, setMealsFilterRequest, 'meals');

  return (
    <>
      <Header currentPage="Foods" disableSearch={ false } />
      { mealsFilterRequest.slice(0, NUMBER_OF_FILTERS).map((filter) => (
        <button
          key={ filter.strCategoy }
          type="button"
        >
          { filter.strCategory }
        </button>))}
      <div className="card-display">
        { foodInitialRequest.length > 0
      && foodInitialRequest.slice(0, NUMBER_OF_CARDS)
        .map((card, index) => (<ExploreRecipeCard
          key={ index }
          index={ index }
          testidContainer={ `${index}-recipe-card` }
          testidImg={ `${index}-card-img` }
          testidName={ `${index}-card-name` }
          src={ card.strMealThumb }
          recipeName={ card.strMeal }
        />)) }
      </div>
      <Footer />
    </>
  );
};

export default Foods;
