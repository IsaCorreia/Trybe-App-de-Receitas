import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Login = () => {
  // const SIX = 6;
  const { loginValues, setLoginValues } = useContext(AppContext);

  // const validateFields = (email, password) => {
  //   if (validator.isEmail(email) && password >= SIX) {
  //     setLoginValues({
  //       ...loginValues,
  //       isButtonDisabled: false,
  //     });
  //   }
  // };
  const handleInput = ({ target: { name, value } }) => {
    setLoginValues({
      ...loginValues,
      [name]: value,
    });
    // validateFields(loginValues.email, loginValues.password);
  };

  return (

    <form className="input">
      <label htmlFor="email">
        <input
          placeholder="e-mail"
          name="email"
          data-testid="email-input"
          type="email"
          value={ loginValues.login }
          onChange={ handleInput }
        />
      </label>
      <label htmlFor="password">
        <input
          placeholder="password"
          data-testid="password-input"
          type="password"
          name="password"
          value={ loginValues.password }
          onChange={ handleInput }
        />
      </label>
      <Link to="/foods">
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ loginValues.isButtonDisabled }
        >
          Enter

        </button>
      </Link>
    </form>
  );
};

export default Login;
