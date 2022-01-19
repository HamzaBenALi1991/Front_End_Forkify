import * as model from './model';
import 'core-js/stable';
import 'regenerator-runtime';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import searchResultview, { ResultView } from './views/searchResultview';
import View from './views/view';
import paginationview from './views/paginationview';

if (module.hot) {
  module.hot.accept();
}
// get recipe controller
const GetOneReceipe = async function () {
  try {
    const recepieId = window.location.hash.slice(1);
    if (!recepieId) return;
    // spinner
    recipeView.spinner();
    // load recipe
    await model.loadRecipe(recepieId);
    // Setting  Up recipe into the DOM
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.errorHandlying();
  }
};
// search controller
controlSearchResult = async function () {
  try {
    searchResultview.spinner();
    // get search query
    const query = searchView.getInput();
    if (!query) return;
    // load search if exist
    await model.loaddSearchResult(query);

    // render
    // searchResultview.render(model.state.search.seachArray);
    searchResultview.render(model.getSearchResultsPage());
    // render pagination
    paginationview.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const paginationController = function (goToPage) {
  searchResultview.render(model.getSearchResultsPage(goToPage));
  // render pagination
  paginationview.render(model.state.search);
};
// this is for DOM EVENT HANDLYING outside of controller
const init = function () {
  recipeView.addHandlerRender(GetOneReceipe);
  searchView.addhandler(controlSearchResult);
  paginationview.addHandlerClick(paginationController);
};

init();
