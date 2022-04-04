import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { MEALS_ENDPOINT, MEALS_FILTER_ENDPOINT } from '../helpers/enpoints';
import useRecipeInitialRequest from '../hooks/useRecipeInitialRequest';
import ExploreRecipeCard from '../components/ExploreRecipeCards';
import useClearState from '../hooks/useClearState';
import useFoodByCategory from '../hooks/useFoodByCategory';

const Foods = () => {
  const NUMBER_OF_CARDS = 12;
  const NUMBER_OF_FILTERS = 5;
  const { setFoodRequest,
    foodRequest,
    mealsFilterRequest,
    setMealsFilterRequest,
    currentFilter,
    setCurrentFilter,
  } = useContext(RecipesContext);

  useClearState();
  useRecipeInitialRequest(MEALS_ENDPOINT, setFoodRequest, 'foods');
  useRecipeInitialRequest(MEALS_FILTER_ENDPOINT, setMealsFilterRequest, 'meals');
  useFoodByCategory(MEALS_ENDPOINT, setFoodRequest, 'foods');

  const handleFilterClick = ({ target: { name } }) => (name === currentFilter
    ? setCurrentFilter('All')
    : setCurrentFilter(name));

  return (
    <>
      <Header currentPage="Foods" disableSearch={ false } />
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => setCurrentFilter('All') }
      >
        All
      </button>
      { mealsFilterRequest.slice(0, NUMBER_OF_FILTERS).map((filter, index) => (
        <button
          name={ filter.strCategory }
          data-testid={ `${filter.strCategory}-category-filter` }
          key={ index }
          type="button"
          onClick={ handleFilterClick }
        >
          { filter.strCategory }
        </button>))}
      <div className="card-display">
        { foodRequest?.length > 0
      && foodRequest.slice(0, NUMBER_OF_CARDS)
        .map((card, index) => (<ExploreRecipeCard
          linkTo={ `/foods/${card.idMeal}` }
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
