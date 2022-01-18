import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJson } from './helpers';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    // fetch recipe
    const data = await getJson(id);
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
    console.error(`Opeération Failed : ${err}`);
  }
};
