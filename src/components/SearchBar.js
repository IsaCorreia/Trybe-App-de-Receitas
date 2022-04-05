import React, { useContext, useEffect } from 'react';
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
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  // https://felixgerschau.com/usehistory-react-hooks/ <- Explicação do useHistory;
  const history = useHistory();
  const {
    radioValue,
    setRadioValue,
    inputSearchBarValue,
    setInputSearchBarValue,
    recipesAPI,
    setRecipesAPI,
  } = useContext(AppContext);
  const {
    setFoodRequest,
    setDrinksRequest,
  } = useContext(RecipesContext);

  // retornando true no estado caso apenas uma receita seja encontrada.
  useEffect(() => {
    if (recipesAPI?.length === 1 && recipesAPI[0].idMeal) {
      history.push(`/foods/${recipesAPI[0].idMeal}`);
    } if (recipesAPI?.length === 1 && recipesAPI[0].idDrink) {
      history.push(`/drinks/${recipesAPI[0].idDrink}`);
    }
  }, [recipesAPI, history]);

  //  Exiba um alert caso nenhuma receita seja encontrada

  const verifyIfRecipeFound = (recipes) => {
    if (!recipes) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  // função para retornar as comidas de acordo com o radio selecionado.
  async function fetchFoodsFromApi() {
    let recipes;

    if (radioValue === 'ingredient') {
      recipes = await fetchFoodByIngredient(inputSearchBarValue);
      verifyIfRecipeFound(recipes);
      setRecipesAPI(recipes);
      setFoodRequest(recipes);
    } else if (radioValue === 'name') {
      recipes = await fetchFoodByName(inputSearchBarValue);
      verifyIfRecipeFound(recipes);
      setRecipesAPI(recipes);
      setFoodRequest(recipes);
    } else if (radioValue === 'firstLetter') {
      if (inputSearchBarValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        recipes = await fetchFoodByFirstLetter(inputSearchBarValue);
        verifyIfRecipeFound(recipes);
        setRecipesAPI(recipes);
        setFoodRequest(recipes);
      }
    }
  }

  // função para retornar os drinks de acordo com o radio selecionado.
  const fetchDrinksFromApi = async () => {
    let recipes;
    if (radioValue === 'ingredient') {
      recipes = await fetchDrinkByIngredient(inputSearchBarValue);
      verifyIfRecipeFound(recipes);
      setRecipesAPI(recipes);
      setDrinksRequest(recipes);
    }
    if (radioValue === 'name') {
      recipes = await fetchDrinkByName(inputSearchBarValue);
      verifyIfRecipeFound(recipes);
      setRecipesAPI(recipes);
      setDrinksRequest(recipes);
    }
    if (radioValue === 'firstLetter') {
      if (inputSearchBarValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        recipes = await fetchDrinkByFirstLetter(inputSearchBarValue);
        verifyIfRecipeFound(recipes);
        setRecipesAPI(recipes);
        setDrinksRequest(recipes);
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

export default SearchBar;
