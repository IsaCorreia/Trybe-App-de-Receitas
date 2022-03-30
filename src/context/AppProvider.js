import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const contextValue = {
    user,
    setUser,
    isButtonDisabled,
    setIsButtonDisabled,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
