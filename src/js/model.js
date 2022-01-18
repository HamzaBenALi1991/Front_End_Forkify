import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (recepieId) {
  try {
    // fetch recipe
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recepieId}`
    );
    // extracting data from promise using json
    const data = await res.json();
    // guard for throwing new error

    if (!res.ok)
      throw new Error(`loading failed : ${data.message} ${res.status}`);
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
    console.log(err);
  }
};
