import React, { useContext } from 'react';
import ExploreRecipeCard from '../components/ExploreRecipeCards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { DRINKS_ENDPOINT, DRINKS_FILTER_ENDPOINT } from '../helpers/enpoints';
import useClearState from '../hooks/useClearState';
import useDrinksByCategory from '../hooks/useDrinkByCategory';
import useRecipeInitialRequest from '../hooks/useRecipeInitialRequest';

const Drinks = () => {
  const NUMBER_OF_CARDS = 12;
  const NUMBER_OF_FILTERS = 5;
  const { setDrinksRequest,
    drinksRequest,
    drinksFilterRequest,
    setDrinksFilterRequest,
    setCurrentFilter,
    currentFilter,
    setIsFilterByCategoryOn,
  } = useContext(RecipesContext);

  useClearState();
  // useRecipeInitialRequest(DRINKS_ENDPOINT, setDrinksRequest, 'drinks');
  useRecipeInitialRequest(DRINKS_FILTER_ENDPOINT, setDrinksFilterRequest, 'drinks');
  useDrinksByCategory(DRINKS_ENDPOINT, setDrinksRequest, 'drinks');

  const handleFilterClick = ({ target: { name } }) => {
    setIsFilterByCategoryOn(true);
    if (name === currentFilter) {
      setCurrentFilter('All');
    } else {
      setCurrentFilter(name);
    }
  };

  return (
    <>
      <Header currentPage="Drinks" disableSearch={ false } />

      {/* <SearchBar /> */}
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => setCurrentFilter('All') }
      >
        All
      </button>
      { drinksFilterRequest.slice(0, NUMBER_OF_FILTERS).map((filter, index) => (
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
        { drinksRequest?.length > 0
      && drinksRequest.slice(0, NUMBER_OF_CARDS)
        .map((card, index) => (<ExploreRecipeCard
          linkTo={ `/drinks/${card.idDrink}` }
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
