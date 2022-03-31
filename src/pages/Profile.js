import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Profile = () => (
  <>
    <Header currentPage="Profile" />

    <h1>Profile!</h1>
    <div style={ { display: 'flex', flexDirection: 'column', textAlign: 'center' } }>
      <span>Email</span>
      <Link to="/favorite-recipes">
        <button type="button">FavoriteRecipes</button>
      </Link>
      <Link to="/done-recipes">
        <button type="button">DoneRecipes</button>
      </Link>
      <Link to="/">
        <button type="button" onClick={ () => global.alert('Saiu') }>
          Logout
        </button>
      </Link>
    </div>

    <Footer />
  </>
);

export default Profile;
