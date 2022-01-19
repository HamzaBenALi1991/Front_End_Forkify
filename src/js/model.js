import { async } from 'regenerator-runtime';
import { API_URL, API_URL_SEARCH, RESULT_PER_PAGE } from './config';
import { getJson } from './helpers';
export const state = {
  recipe: {},
  search: {
    query: '',
    seachArray: [],
    page: 1,
  },
};

export const loadRecipe = async function (id) {
  try {
    // fetch recipe
    const data = await getJson(`${API_URL}${id}`);
    // reformating recipe object from fetched data
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
    };
  } catch (err) {
    throw err;
  }
};

export const loaddSearchResult = async function (str) {
  try {
    const data = await getJson(`${API_URL}?search=${str}`);
    state.search.query = str;
    state.search.seachArray = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    console.log(state);
  } catch (err) {
    console.log(err);
  }
};
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * RESULT_PER_PAGE;
  const end = page * RESULT_PER_PAGE;
  return state.search.seachArray.slice(start, end);
};
