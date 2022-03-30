import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import useFormValidatior from '../hooks/useFieldValidator';

const Login = () => {
  const { user, setUser, isButtonDisabled } = useContext(AppContext);

  useFormValidatior();

  const handleInput = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (

    <form className="login-form">
      <label htmlFor="email">
        <input
          placeholder="e-mail"
          name="email"
          data-testid="email-input"
          type="email"
          value={ user.email }
          onChange={ handleInput }
        />
      </label>
      <label htmlFor="password">
        <input
          placeholder="password"
          data-testid="password-input"
          type="password"
          name="password"
          value={ user.password }
          onChange={ handleInput }
        />
      </label>
      <Link to="/foods">
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ isButtonDisabled }
        >
          Enter

        </button>
      </Link>
    </form>
  );
};
export default Login;
