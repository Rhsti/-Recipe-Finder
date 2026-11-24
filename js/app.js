const menu = document.querySelector('.fa-bars');
const ul = document.querySelector('ul');
const x = document.querySelector('.fa-x')

// menu bar 
menu.addEventListener('click', () => {
  //When user click by the menu bar the ul become visible
  ul.classList.remove('ul-hidden-menu');
  ul.classList.add('ul-changer');

  menu.style.display = 'none';
  x.style.display = 'block';
})
// menu x
 x.addEventListener('click', () => {
    //When user click by the x bar the ul become invisible
    ul.classList.add('ul-hidden-menu');
    ul.classList.remove('ul-changer');

    x.style.display = 'none';
    menu.style.display = 'block';
  })



// recipes card

const container = document.querySelector('.container');


let getallRecipes = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// ExploreRecipes scrollview
 document.querySelector('.ExploreRecipes').addEventListener('click' , () => {
container.scrollIntoView({ behavior: 'smooth' });
 })

//  icons
const difficultyIcons = {
  Easy: `<i class="fa-solid fa-seedling" style="color: green;"></i> Easy`,
  Medium: `<i class="fa-solid fa-fire" style="color: orange;"></i> Medium`,
  Hard: `<i class="fa-solid fa-fire-flame-curved" style="color: red;"></i> Hard`
};
//display recipes
function displayRecipes(recipesList) {


  if (recipesList.length === 0) {
    container.innerHTML = `<p>There is no matching recipes found.</p>`;
    return;
  }
  container.innerHTML = `
      ${recipesList.map(recipe => `
        <div class="card" data-id='${recipe.id}'>
       
              <i class="${favorites.includes(recipe.id) ? 'fa-solid' : 'fa-regular'} 
        fa-heart favorite-icon"
        data-index="${recipe.id}">
        </i>


          <img class='img' src="${recipe.image}" alt="${recipe.name}">
           
          <h3 class='name'>${recipe.name}</h3>
          <div class='span'>
           <span><i class="fa-regular fa-clock"></i> ${recipe.cookTimeMinutes} min</span>
          <span> ${difficultyIcons[recipe.difficulty] || recipe.difficulty}</span>
          
          </div>
          </div>
          
      `).join("")}
    `;

}
// Fetch data
async function fetchData() {
  container.innerHTML = `<p class="loading">Loading...</p>`;
  try {
    const res = await fetch('https://dummyjson.com/recipes');
    if (res.status === 404) {
      throw new Error('Recipes not found (404)');
    }
    if (!res.ok) {
      throw new Error(`Failed to fetch recipe: ${res.status}`);
    }
    const data = await res.json();
    getallRecipes = data.recipes;
    displayRecipes(getallRecipes)


  } catch (error) {
    console.error(`Failed to fetch recipe:  ${error.message}`);
     
     container.innerHTML = `
        <div class="error-message">
    <p>Something went wrong!</p>
    <p>We couldn't load the recipes. Please try again.</p>
  </div>
    `;

  }
}


fetchData()

// filter and search
const select = document.getElementById('difficulty-select');
const search = document.getElementById('search-input');
const searchandselect = document.querySelector('.searchandselect');

function filterAndsearch() {
  const selectdifficulty = select.value;
  const searchinput = search.value.toLowerCase().trim();

  const filtered = getallRecipes.filter((recipe) => {
    const matchesname = recipe.name.toLowerCase().includes(searchinput);
    const matchesmealType = recipe.mealType.some(mealtype => 
    mealtype.toLowerCase().includes(searchinput)
    )
    const matchesIngredient = recipe.ingredients.some(ingredient =>
      ingredient.toLowerCase().includes(searchinput)
   );
    const matchesdifficulty =
      selectdifficulty == 'All' || recipe.difficulty === selectdifficulty;
    return matchesdifficulty && ( matchesname || matchesIngredient || matchesmealType);
  })
  displayRecipes(filtered)
  // search.value = ''
}
// select
select.addEventListener('change', filterAndsearch);
// input
search.addEventListener('input', filterAndsearch);


// find recipe detail
const recipedetails = document.getElementById('recipe-details')
const herosection = document.getElementById('hero-section')
container.addEventListener('click', (e) => {
  
   if (e.target.closest('.favorite-icon')) return;
   
  const cardClicked = e.target.closest('.card');
  if (!cardClicked) return;
 
  const recipeId = Number(cardClicked.dataset.id);
  //  find recipe
  const findRecipe = getallRecipes.find(recipe => recipe.id === recipeId)


  // Hide all recipe cards and searchandselect
  container.style.display = 'none';
  searchandselect.style.display = 'none';
 herosection.style.display = 'none';

  recipedetails.innerHTML = `

    <div class='card-details'>
    
     <div class='first-carddetails'>
      <button id="back-btn"><i class="fa-solid fa-angle-left"></i> Back to Recipes</button>

      <img src="${findRecipe.image}" alt="${findRecipe.name}">
       <i class="${favorites.includes(findRecipe.id) ? 'fa-solid' : 'fa-regular'} 
      fa-heart favorite-icons"
      data-index="${findRecipe.id}">
      </i>

     </div>


     <div class='second-carddetails'>
      <h2>${findRecipe.name}</h2>
      <div>
       <p><i class="fa-regular fa-clock"></i> ${findRecipe.cookTimeMinutes} min</p>
      <p> ${difficultyIcons[findRecipe.difficulty] || findRecipe.difficulty}</p>
      <p><i class="fa-solid fa-utensils"></i> ${findRecipe.cuisine}</p>
      </div>
      <p>${findRecipe.mealType}</p>  
     </div>

     <div class='ingredients'>
      <h3><i class="fa-solid fa-basket-shopping"></i> Ingredients</h3>

      <ul>
        ${findRecipe.ingredients.map(ingredient =>
    `<li><i class="fa-solid fa-circle-check"></i> ${ingredient}</li>`
  ).join('')}
      </ul>
     </div>
     <div class='instructions'>
      <h3><i class="fa-solid fa-mortar-pestle"></i> Instructions</h3>

      <ol>
        ${findRecipe.instructions.map(instruction =>
    `<li>${instruction}</li>`
  ).join('')}
      </ol>
     </div>
    </div>
  `;

  // back to Recipes
  document.getElementById('back-btn').addEventListener('click', () => {
    container.style.display = 'grid';
    searchandselect.style.display = 'flex'
    herosection.style.display = 'grid';
    recipedetails.innerHTML = ''
  })

})


// favorite container
container.addEventListener('click', (e) => {
  const heart = e.target.closest('.favorite-icon');

  if (!heart) return;

  const recipeId = Number(heart.dataset.index);

  if (favorites.includes(recipeId)) {
    // Remove from favourites
    favorites = favorites.filter(id => id !== recipeId);
  } else {
    // Add to favourites
    favorites.push(recipeId);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));

  displayRecipes(getallRecipes);
});

// favorite recipedetails
recipedetails.addEventListener('click', (e) => {
  const heart = e.target.closest('.favorite-icons');

  if (!heart) return;

  const recipeId = Number(heart.dataset.index);

  if (favorites.includes(recipeId)) {
    // Remove from favourites
    favorites = favorites.filter(id => id !== recipeId);
  } else {
    // Add to favourites
    favorites.push(recipeId);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
  const isFavorite = favorites.includes(recipeId);

  heart.classList.toggle('fa-solid', isFavorite);
  heart.classList.toggle('fa-regular', !isFavorite);
});


