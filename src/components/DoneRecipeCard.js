import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard({ filterByType }) {
  const [doneRecipesFromlocalStorage, setDoneRecipesFromLocalStorage] = useState([]);
  const [shareStatus, setShareStatus] = useState(false);

  useEffect(() => {
    const getDoneRecipesDoLocalStorage = localStorage.getItem('doneRecipes');
    if (getDoneRecipesDoLocalStorage) {
      setDoneRecipesFromLocalStorage(JSON.parse(getDoneRecipesDoLocalStorage));
    }
  }, [setDoneRecipesFromLocalStorage]);

  const checkFilterValue = () => {
    if (filterByType === '') return doneRecipesFromlocalStorage;
    return doneRecipesFromlocalStorage
      .filter(({ type }) => type === filterByType);
  };

  return (
    <div>
      {doneRecipesFromlocalStorage?.length > 0
      && checkFilterValue()
        .map((recipe, index) => (
          <div key={ index } className="card-recipe">
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
                style={ { width: '100px' } }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'food'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </p>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <p data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </p>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {recipe.doneDate}
            </p>
            <button
              src={ shareIcon }
              alt="imagem do ícone"
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => {
                navigator.clipboard.writeText(
                  `http://localhost:3000/${recipe.type}s/${recipe.id}`,
                );
                setShareStatus(true);
              } }
            >
              <img src={ shareIcon } alt="imagem do ícone" />
            </button>
            {shareStatus && <p>Link copied!</p>}
            {recipe.tags
                && recipe.tags.map((tag) => (
                  <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>
                    {console.log(tag)}
                    {tag}
                  </p>
                ))}
          </div>
        ))}
    </div>
  );
}
DoneRecipeCard.propTypes = {
  filterByType: PropTypes.string.isRequired,
};
export default DoneRecipeCard;
