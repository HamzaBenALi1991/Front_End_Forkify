const recipeContainer = document.querySelector('.recipe');
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
const GetOneReceipe = async function() {
    try {
        // fetch recipe
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`);
        // extracting data from promise using json
        const data = await res.json();
        // guard for throwing new error
        if (!res.ok) throw new Error(`loading failed : ${data.message} ${res.status}`);
        // reformating recipe object from fetched data
        let { recipe  } = data.data;
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };
    } catch (err) {
        console.log(err);
    }
};
GetOneReceipe();

//# sourceMappingURL=index.430fc437.js.map
