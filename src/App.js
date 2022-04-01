import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AppProvider from './context/AppProvider';
import RecipesProvider from './context/RecipesProvider';
// https://stackoverflow.com/questions/55492406/how-to-import-multiple-components-from-one-general-folder
import {
  DoneRecipes,
  DrinkDetail,
  DrinkDetailInProgress,
  Drinks,
  DrinksExplore,
  Explore,
  FavoriteRecipes,
  FoodDetail,
  FoodDetailInProgress,
  Foods,
  FoodsExplore,
  IngredientsDrinksExplore,
  IngredientsFoodsExplore,
  Login,
  NationalitiesFoodsExplore,
  NotFound,
  Profile,
} from './pages';

function App() {
  return (
    <RecipesProvider>
      <AppProvider>
        <BrowserRouter>
          <Switch>
            {/* Páginas principais: */}
            <Route exact path="/" component={ Login } />
            <Route exact path="/foods" component={ Foods } />
            <Route exact path="/drinks" component={ Drinks } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
            <Route exact path="/done-recipes" component={ DoneRecipes } />
            <Route exact path="/explore" component={ Explore } />

            {/* Páginas de detalhes: */}
            <Route exact path="/foods/:id" component={ FoodDetail } />
            <Route exact path="/drinks/:id" component={ DrinkDetail } />

            {/* Páginas de receitas em progresso: */}
            <Route
              exact
              path="/foods/:id/in-progress"
              component={ FoodDetailInProgress }
            />
            <Route
              exact
              path="/drinks/:id/in-progress"
              component={ DrinkDetailInProgress }
            />

            {/* Páginas de explorar: */}
            <Route exact path="/explore/foods" component={ FoodsExplore } />
            <Route exact path="/explore/drinks" component={ DrinksExplore } />
            <Route
              exact
              path="/explore/foods/ingredients"
              component={ IngredientsFoodsExplore }
            />
            <Route
              exact
              path="/explore/foods/nationalities"
              component={ NationalitiesFoodsExplore }
            />
            <Route
              exact
              path="/explore/drinks/ingredients"
              component={ IngredientsDrinksExplore }
            />

            {/* Página 404 */}
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </AppProvider>
    </RecipesProvider>
  );
}

export default App;
