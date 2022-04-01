import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import {
  fetchFoodByFirstLetter,
  fetchFoodByIngredient,
  fetchFoodByName,
} from '../services/fetchFoods';

function SearchBar() {
  const {
    radioValue,
    setRadioValue,
    inputSearchBarValue,
    setInputSearchBarValue } = useContext(AppContext);

  const fetchFoodsFromApi = async () => {
    let recipe;
    if (radioValue === 'ingredient') {
      recipe = await fetchFoodByIngredient(inputSearchBarValue);
    } else if (radioValue === 'name') {
      recipe = await fetchFoodByName(inputSearchBarValue);
    } else if (radioValue === 'firstLetter') {
      recipe = await fetchFoodByFirstLetter(inputSearchBarValue);
    }
    if (recipe === undefined) { console.log('aqui deu ruim'); }
  };

  const handleClickButtonSearchBar = (e) => {
    e.preventDefault();
    console.log(fetchFoodsFromApi());
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
