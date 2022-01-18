import * as model from './model';
import 'core-js/stable';
import 'regenerator-runtime';
import recipeView from './views/recipeView';

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
// this is for DOM EVENT HANDLYING
const init = function () {
  recipeView.addHandlerRender(GetOneReceipe);
};
init();
