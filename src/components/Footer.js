import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <>
    <h1>Footer!</h1>
    <Link to="/foods">ir para Foods</Link>
    <Link to="/drinks">ir para Drinks</Link>
    <Link to="/explorer">Explorar</Link>
  </>
);

export default Footer;
