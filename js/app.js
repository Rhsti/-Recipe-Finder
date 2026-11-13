const menu = document.querySelector('.fa-bars');
const ul = document.querySelector('ul');
const x = document.querySelector('.fa-x')


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







