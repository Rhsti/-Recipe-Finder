const menu = document.querySelector('.fa-bars');
const ul = document.querySelector('ul');
const x = document.querySelector('.fa-x')


if (window.matchMedia('(max-width: 768px)').matches) {
menu.addEventListener('click', () => {
    if (ul.style.visibility === 'visible') {
        ul.style.visibility = 'hidden';
        menu.style.display = 'block';
        x.style.display = 'none';
    } else {
        ul.style.visibility = 'visible';
        menu.style.display = 'none';
        x.style.display = 'block';
    }

       x.addEventListener('click', () => {
         ul.style.visibility = 'hidden';
         x.style.display = 'none';
         menu.style.display = 'block';
       })
}
)}