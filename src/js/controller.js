import * as model from './model';
import 'core-js/stable';
import 'regenerator-runtime';
import recipeView from './views/recipeView';
import searchView from './views/searchView';

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
    // get search query
    const query = searchView.getInput();
    if (!query) return;
    // load search if exist
    const data = await model.loaddSearchResult(query);
    // render
  } catch (err) {
    console.log(err);
  }
};
// this is for DOM EVENT HANDLYING
const init = function () {
  recipeView.addHandlerRender(GetOneReceipe);
  searchView.addhandler(controlSearchResult);
};
init();
