import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => (
  <div
    data-testid="footer"
    style={ {
      position: 'fixed',
      bottom: '0',
      width: '100%',
    } }
  >
    <hr />
    <div
      style={ {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EA1D2C ',
      } }
    >
      <Link to="/foods">
        <button type="button">
          <img src={ mealIcon } alt="meals" data-testid="food-bottom-btn" />
        </button>
      </Link>

      <Link to="/explore">
        <button type="button">
          <img src={ exploreIcon } alt="explore" data-testid="explore-bottom-btn" />
        </button>
      </Link>

      <Link to="/drinks">
        <button type="button">
          <img src={ drinkIcon } alt="drinks" data-testid="drinks-bottom-btn" />
        </button>
      </Link>
    </div>
  </div>
);

export default Footer;
