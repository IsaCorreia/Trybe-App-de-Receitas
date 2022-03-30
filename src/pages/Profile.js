import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Profile = () => (
  <>
    <Header />

    <h1>Profile!</h1>
    <span>Email</span>
    <Link to="/favorite-recipes">FavoriteRecipes</Link>
    <Link to="/done-recipes">DoneRecipes</Link>
    <button type="button" onClick={ () => global.alert('Saiu') }>Logout</button>

    <Footer />
  </>
);

export default Profile;
