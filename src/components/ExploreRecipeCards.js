import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ExploreRecipeCard = ({
  testidContainer,
  src,
  alt,
  testidImg,
  testidName,
}) => (
  <Link to="/foods/1">
    <div data-testid={ testidContainer }>
      <img
        data-testid={ testidImg }
        className="card-thumb"
        src={ src }
        alt={ alt }
      />
      <p data-testid={ testidName }>
        { alt }
      </p>
    </div>
  </Link>);
ExploreRecipeCard.propTypes = {
  testidContainer: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  testidImg: PropTypes.string.isRequired,
  testidName: PropTypes.string.isRequired,
};

export default ExploreRecipeCard;
