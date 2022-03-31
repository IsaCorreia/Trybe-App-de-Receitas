import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => (
  <div
    style={ {
      position: 'absolute',
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
    </div>
  </div>
);

export default Footer;
