import { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

const useFormValidatior = () => {
  const { user: { email, password }, setIsButtonDisabled } = useContext(AppContext);
  const SIX = 6;

  useEffect(() => {
    if (validator.isEmail(email) && password.length > SIX) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password, setIsButtonDisabled]);
};

export default useFormValidatior;
