import { useEffect } from 'react';

const useSaveToLocalStorage = (data) => {
  useEffect(() => () => {
    data.forEach((dataElement) => localStorage.setItem(dataElement[0], dataElement[1]));
  }, [data]);
};

export default useSaveToLocalStorage;
