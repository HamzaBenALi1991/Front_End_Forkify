import * as model from './model';
import 'core-js/stable';
import 'regenerator-runtime';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import searchResultview from './views/searchResultview';
import paginationview from './views/paginationview';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import { async } from 'regenerator-runtime';

// get recipe controller
const GetOneReceipe = async function () {
  try {
    const recepieId = window.location.hash.slice(1);
    if (!recepieId) return;
    // spinner
    recipeView.spinner();
    // 0) Update results view to mark selected search result
    searchResultview.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // load recipe
    await model.loadRecipe(recepieId);
    // Setting  Up recipe into the DOM
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.errorHandlying();
    console.log(err);
  }
};
// search controller
const controlSearchResult = async function () {
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

const survingsControl = function (newS) {
  model.updateServings(newS);
  recipeView.update(model.state.recipe);
};

const controllerAddBookmark = function () {
  //add or remove
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // update recipe view
  recipeView.update(model.state.recipe);
  // render the bookmarks
  bookmarksView.render(model.state.bookmarks);
};
const controllerAddRecipe = async function (newRec) {
  try {
    addRecipeView.spinner();
    // uploading
    await model.uploadRecipe(newRec);
    // render recipe just uploaded
    recipeView.render(model.state.recipe);

    addRecipeView.successHandlying();

    bookmarksView.render(model.state.bookmarks);

    // change id in the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(() => {
      addRecipeView.windowToggle();
    }, 2500);
  } catch (err) {
    console.error(err);
    addRecipeView.errorHandlying(err.message);
  }
};
const bookmarkInit = function () {
  bookmarksView.render(model.state.bookmarks);
};
// this is for DOM EVENT HANDLYING outside of controller
const init = function () {
  bookmarksView.addhandler(bookmarkInit);
  recipeView.addHandlerRender(GetOneReceipe);
  searchView.addhandler(controlSearchResult);
  paginationview.addHandlerClick(paginationController);
  recipeView.addHandlerUpdateServ(survingsControl);
  recipeView.addhandlerBookMark(controllerAddBookmark);
  addRecipeView.addhandlerUpload(controllerAddRecipe);
};

init();
