let recipeCollection = [];

function loadRecipeCards(allRecipes) {
  console.log('loading recipes');
  let container = document.querySelector(".container");
  container.innerHTML = '';
  allRecipes.forEach(entry => {
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

function debounce(func, timeout = 800){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function search(event) {
  console.log(`searching for ${event.target.value}`);
  const searchString = event.target.value.toLowerCase();
  let filteredRecipes = recipeCollection.filter(recipe => {
    const recipeLabel = recipe.recipe.label.toLowerCase();
    return recipeLabel.includes(searchString);
  });
  loadRecipeCards(filteredRecipes);
}

const searchKeyUpEvent = debounce((event) => search(event));

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('Dom Content has loaded!');

  fetch("/recipes")
    .then(response => {
      return response.json();
    })
    .then(data => {
      recipeCollection = data;
      loadRecipeCards(data);
    }); 
});