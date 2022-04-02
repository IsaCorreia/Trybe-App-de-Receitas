import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ExploreRecipeCard = ({
  testidContainer,
  src,
  recipeName,
  testidImg,
  testidName,
}) => (
  <Link to="/foods/1">
    <div className="card-recipe" data-testid={ testidContainer }>
      <img
        data-testid={ testidImg }
        className="card-thumb"
        src={ src }
        alt={ recipeName }
      />
      <p data-testid={ testidName }>
        { recipeName }
      </p>
    </div>
  </Link>);
ExploreRecipeCard.propTypes = {
  testidContainer: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  testidImg: PropTypes.string.isRequired,
  testidName: PropTypes.string.isRequired,
};

export default ExploreRecipeCard;
