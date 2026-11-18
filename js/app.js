const menu = document.querySelector('.fa-bars');
const ul = document.querySelector('ul');
const x = document.querySelector('.fa-x')

// menu bar and x
menu.addEventListener('click', () => {
       //When user click by the menu bar the ul become visible
        ul.classList.remove('ul-hidden-menu')
        ul.classList.add('ul-changer')
        menu.style.display = 'none';
        x.style.display = 'block';
  
       x.addEventListener('click', () => {
     //When user click by the x bar the ul become invisible
        ul.classList.add('ul-hidden-menu');    
        ul.classList.remove('ul-changer')

         x.style.display = 'none';
         menu.style.display = 'block';
       })
}
)



// recipes card

const container = document.querySelector('.container');

let getallRecipes = [];

const difficultyIcons = {
 Easy: `<i class="fa-solid fa-seedling" style="color: green;"></i> Easy`,
  Medium: `<i class="fa-solid fa-fire" style="color: orange;"></i> Medium`,
  Hard: `<i class="fa-solid fa-fire-flame-curved" style="color: red;"></i> Hard`
};
//display recipes
 function  displayRecipes(recipesList) {

  
   if (recipesList.length === 0) {
      container.innerHTML = `<p>There is no matching recipes found.</p>`;
      return;
    }
   container.innerHTML = `
      ${recipesList.map(recipe => `
        <div class="card">
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
    if(!res.ok){
      throw new Error(`Failed to fetch recipe: ${res.status}`);
    }
  const data = await res.json();
   getallRecipes = data.recipes;
   displayRecipes(getallRecipes)
      
   
  } catch (error) {
     console.error(`Failed to fetch recipe:  ${error.message}`);
  }
    }
 

fetchData()

// filter
const select = document.getElementById('difficulty-select');
const search = document.getElementById('search-input');
function filterAndsearch(){
  const selectdifficulty = select.value;
  const searchbyName = search.value.toLowerCase();

  const filtered = getallRecipes.filter((recipe) => {
    const matchesName = recipe.name.toLowerCase().includes(searchbyName);
    const matchesdifficulty = 
    selectdifficulty == 'All' || recipe.difficulty === selectdifficulty;
    return matchesdifficulty && matchesName;
  })
  displayRecipes(filtered)
}
select.addEventListener('change', filterAndsearch);
search.addEventListener('input', filterAndsearch)

function nextChapter() {
  
}

 container.addEventListener('click', () => {
      container.innerHTML = `
       ${getallRecipes.map(recipe => `
        <div class="card">
          <img class='img' src="${recipe.image}" alt="${recipe.name}">
          <h3 class='name'>${recipe.name}</h3>
          <span><i class="fa-regular fa-clock"></i> ${recipe.cookTimeMinutes} min</span>
          <span> ${difficultyIcons[recipe.difficulty] || recipe.difficulty}</span>
          </div>
          <div >
          <p>${recipe.ingredients}</p>
          /div>
          
      `).join("")}
    `;
    })


