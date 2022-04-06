import React, { useState } from 'react';
import DoneRecipeCard from '../components/DoneRecipeCard';

export default function DoneRecipesCard() {
  const [filterByType, setFilterByType] = useState('');

  return (
    <div>
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilterByType('') }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => setFilterByType('food') }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFilterByType('drink') }
        >
          Drinks
        </button>
      </div>
      <DoneRecipeCard filterByType={ filterByType } />
    </div>
  );
}
