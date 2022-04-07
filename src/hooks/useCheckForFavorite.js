import { useEffect } from 'react';

const useCheckForFavorite = (ID, setFavorite) => {
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites?.some((recipe) => recipe.id === ID)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [ID, setFavorite]);
};

export default useCheckForFavorite;
