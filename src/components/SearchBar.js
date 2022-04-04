import React, { useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import {
  fetchFoodByFirstLetter,
  fetchFoodByIngredient,
  fetchFoodByName,
} from '../services/fetchFoods';
import {
  fetchDrinkByIngredient,
  fetchDrinkByName,
  fetchDrinkByFirstLetter,
} from '../services/fetchDrinks';

function SearchBar() {
  const {
    radioValue,
    setRadioValue,
    inputSearchBarValue,
    setInputSearchBarValue,
    setRecipesAPI,
    recipesAPI,
  } = useContext(AppContext);

  // Redirecione para a tela de detalhes da receita
  // caso apenas uma receita seja encontrada, com o ID da mesma na URL
  // const redirectToDetailScreen = (recipes) => {
  //   if (recipes.length === 1) {
  //     history.push(`/foods/${recipes[0].idMeal}`);
  //   } else {
  //     history.push(`/drinks/${recipes[0].idDrink}`);
  //   }
  // };

  //  Exiba um alert caso nenhuma receita seja encontrada

  const verifyIfRecipeFound = (recipes) => {
    if (!recipes) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  // função para retornar as comidas de acordo com o radio selecionado.
  async function fetchFoodsFromApi() {
    if (radioValue === 'ingredient') {
      const recipes = await fetchFoodByIngredient(inputSearchBarValue);
      setRecipesAPI(recipes);
      verifyIfRecipeFound(recipes);
    } else if (radioValue === 'name') {
      const recipes = await fetchFoodByName(inputSearchBarValue);
      setRecipesAPI(recipes);
      verifyIfRecipeFound(recipes);
    } else if (radioValue === 'firstLetter') {
      if (inputSearchBarValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const recipes = await fetchFoodByFirstLetter(inputSearchBarValue);
        setRecipesAPI(recipes);
        verifyIfRecipeFound(recipes);
      }
    }
  }

  // função para retornar os drinks de acordo com o radio selecionado.

  const fetchDrinksFromApi = async () => {
    if (radioValue === 'ingredient') {
      const recipes = await fetchDrinkByIngredient(inputSearchBarValue);
      setRecipesAPI(recipes);
      verifyIfRecipeFound(recipes);
    }
    if (radioValue === 'name') {
      const recipes = await fetchDrinkByName(inputSearchBarValue);
      setRecipesAPI(recipes);
      verifyIfRecipeFound(recipes);
    }
    if (radioValue === 'firstLetter') {
      if (inputSearchBarValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const recipes = await fetchDrinkByFirstLetter(inputSearchBarValue);
        setRecipesAPI(recipes);
        verifyIfRecipeFound(recipes);
      }
    }
  };

  // handle para controlar o clique do botão (Trazer foods se for foods, trazer drink se for drinks)

  const handleClickButtonSearchBar = async (e) => {
    e.preventDefault();
    // window.location retirado https://www.samanthaming.com/tidbits/86-window-location-cheatsheet/
    const actualURL = window.location.pathname;
    if (actualURL === '/foods') {
      await fetchFoodsFromApi();
    }
    if (actualURL === '/drinks') {
      await fetchDrinksFromApi();
    }
  };

  return (
    <div>
      <form htmlFor="searchBar">
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search Recipe"
          value={ inputSearchBarValue }
          onChange={ (e) => setInputSearchBarValue(e.target.value) }
        />

        <label htmlFor="Ingredient">
          Ingredient
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient"
            name="test"
            onChange={ () => setRadioValue('ingredient') }
          />
        </label>
        <label htmlFor="Name">
          Name
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name"
            name="test"
            onChange={ () => setRadioValue('name') }
          />
        </label>
        <label htmlFor="firstLetter">
          First Letter
          <input
            type="radio"
            id="firstLetter"
            data-testid="first-letter-search-radio"
            name="test"
            onChange={ () => setRadioValue('firstLetter') }
          />
        </label>
        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ handleClickButtonSearchBar }
        >
          Search
        </button>
      </form>
    </div>);
}

// SearchBar.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,
// };

export default SearchBar;
