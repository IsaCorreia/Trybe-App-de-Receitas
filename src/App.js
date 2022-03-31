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
  DrinksExplorer,
  Explorer,
  FavoriteRecipes,
  FoodDetail,
  FoodDetailInProgress,
  Foods,
  FoodsExplorer,
  IngredientsDrinksExplorer,
  IngredientsFoodsExplorer,
  Login,
  NationalitiesFoodsExplorer,
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
            <Route exact path="/explorer" component={ Explorer } />

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
            <Route exact path="/explorer/foods" component={ FoodsExplorer } />
            <Route exact path="/explorer/drinks" component={ DrinksExplorer } />
            <Route
              exact
              path="/explorer/foods/ingredients"
              component={ IngredientsFoodsExplorer }
            />
            <Route
              exact
              path="/explorer/foods/nationalities"
              component={ NationalitiesFoodsExplorer }
            />
            <Route
              exact
              path="/explorer/drinks/ingredients"
              component={ IngredientsDrinksExplorer }
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
