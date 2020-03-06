/* eslint-disable linebreak-style */
fetch("/recipes")
  .then(response => {
    return response.json();
  })
  .then(data => {
    loadRecipeCards(data);
  });

function loadRecipeCards(recipeJson) {
  let container = document.querySelector(".container");
  recipeJson.forEach(entry => {
    let recipe = entry.recipe;
    let ingredients = "";
    recipe.ingredientLines.forEach(ingredient => {
      ingredients += `<li>${ingredient}</li>`;
    });
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `      
      <div class="hero"><img src="${recipe.image}" alt=""></div>
      <div class="recipe">
        <h1>${recipe.label}</h1>
        <h3>Ingredients</h3>
        <ul>
          ${ingredients}
        </ul>
      </div>
    `;
    container.appendChild(div);
  });
}
