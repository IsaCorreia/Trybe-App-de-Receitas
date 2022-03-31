import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => (
  <>
    <hr />
    <Link to="/foods">
      <button type="button">
        <img src={ mealIcon } alt="meals" />
      </button>
    </Link>

    <Link to="/drinks">
      <button type="button">
        <img src={ drinkIcon } alt="drinks" />
      </button>
    </Link>

    <Link to="/explorer">
      <button type="button">
        <img src={ exploreIcon } alt="explore" />
      </button>
    </Link>
  </>
);

export default Footer;
