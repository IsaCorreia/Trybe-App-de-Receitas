import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function IngredientCard({ index, ingredientName, ingredientImage }) {
  return (
    <div data-testid={ `${index}-ingredient-card` } className="card-recipe">
      <Link to="/">
        <img
          src={ ingredientImage }
          alt={ ingredientName }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{ingredientName}</p>
      </Link>
    </div>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingredientName: PropTypes.string.isRequired,
  ingredientImage: PropTypes.string.isRequired,
};

export default IngredientCard;
