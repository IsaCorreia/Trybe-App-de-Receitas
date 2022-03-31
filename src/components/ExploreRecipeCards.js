import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ExploreRecipeCard = ({ info }) => {
  // const sliceId = id.slice(1);
  console.log(info);

  return (
    <Link to="/foods/1">
      <div>
        <img src={ info.strMealThumb } alt={ info.strMeal } />
        <p>{ info.strMeal }</p>
        Qualquer coisa
      </div>
    </Link>
  );
};

ExploreRecipeCard.propTypes = {
  info: PropTypes.shape([PropTypes.string]).isRequired,
};

export default ExploreRecipeCard;
