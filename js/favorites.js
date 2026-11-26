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

const favoriteContainer = document.querySelector('.container');

// Get saved favourites from localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//display favorite
// ExploreRecipes scrollview
 document.querySelector('.ExploreRecipes').addEventListener('click' , () => {
favoriteContainer.scrollIntoView({ behavior: 'smooth' });
 })

async function displayFavorites() {
   favoriteContainer.innerHTML = `<p class="loading">Loading...</p>`;

  try {
    const res = await fetch('https://dummyjson.com/recipes');
    if (res.status === 404) {
      throw new Error('Recipes not found (404)');
    }
    if(!res.ok){
      throw new Error(`Failed to fetch recipe favorites: ${res.status}`)
    }
    const data = await res.json();

    const allRecipes = data.recipes;

    // Find only favourite recipes 
    // assisted by AI  only the first const code but I understand what I am doing and how my code works.
    const favoriteRecipes = allRecipes.filter(recipe =>
      favorites.includes(recipe.id)
    );

    if (favoriteRecipes.length === 0) {
      favoriteContainer.innerHTML =
      // assisted by AI only heart ❤️.
        '<p>You have no favourite recipes yet ❤️</p>';
      return;
    }

    favoriteContainer.innerHTML = favoriteRecipes.map(recipe => `
      <div class="card" data-id="${recipe.id}">

        <i class="${favorites.includes(recipe.id) ? 'fa-solid' : 'fa-regular'} 
        fa-heart favorite-icon"
           data-id="${recipe.id}">
        </i>
       
        <img class="img" src="${recipe.image}" alt="${recipe.name}">

        <h3 class="name">${recipe.name}</h3>

        <div class="span">
          <span>${recipe.cookTimeMinutes} min</span>
          <span>${recipe.difficulty}</span>
        </div>

      </div>
    `).join('');

  } catch (error) {
    favoriteContainer.innerHTML = '<p>Something went wrong!</p>';
    console.error(`Failed to fetch recipe favorites:  ${error.message}`);
  }
}

displayFavorites();


// the favorite
favoriteContainer.addEventListener('click', (e) => {

  const heart = e.target.closest('.favorite-icon');

  if (!heart) return;

  const recipeId = Number(heart.dataset.id);

  favorites = favorites.filter(id => id !== recipeId);
  

  localStorage.setItem('favorites', JSON.stringify(favorites));

  displayFavorites();
});