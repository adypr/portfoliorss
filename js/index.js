import i18Obj from './translate.js';



// Burger menu

const toggle = document.querySelector('.toggle-nav');
const check = document.querySelector('.toggle__check');
const dark = document.querySelector('.dark');


function toggleleMenu() {
    toggle.classList.toggle('open');
    dark.classList.toggle('visible');
    if (check.checked) check.checked = false;
}

function checkMenu() {
    toggle.classList.toggle('open');
    dark.classList.toggle('visible');
   
}
check.addEventListener('click', checkMenu);
toggle.addEventListener('click', toggleleMenu);


// Portfolio

const portfolioBtns = document.querySelector('.portfolio__buttons');
const portfolioImages = document.querySelectorAll('.portfolio__image');
const seasons = ['winter', 'spring', 'summer', 'autumn'];
const portfolioButtons = document.querySelectorAll('.portfolio__buttons .button');

function preloadImages() {
    seasons.forEach(season => {
        for(let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${season}/${i}.jpg`;
          }
    })
};

function changeImage(event) {
    if( event.target.closest('.button')) {
        let targetElement = event.target.closest('.button');
        let buttonText = targetElement.dataset.season;
        
        portfolioImages.forEach((img, index) => img.src = `./assets/img/${buttonText}/${index + 1}.jpg`);
        portfolioButtons.forEach(button => {
            button.classList.remove('button__transparent_active');
        });
        targetElement.classList.add('button__transparent_active');
    }
  };

  preloadImages();
  portfolioBtns.addEventListener('click', changeImage);


  // Translate

  let storageLang = 'en';

 function getTranslate(lang) {
    const i18ns = document.querySelectorAll('[data-i18n]');
    i18ns.forEach(element => {
        if (element.tagName == 'BUTTON') {
            element.dataset.text = i18Obj[lang][element.dataset.i18n];
        }
        else {
            element.textContent = i18Obj[lang][element.dataset.i18n];
        if (element.placeholder) element.placeholder = i18Obj[lang][element.dataset.i18n];
        }
        
    })
 }

const langsContainer = document.querySelector('.langs');
const langs = document.querySelectorAll('[data-lang]');

function toggleLangs(event) {
    if (!event.target.dataset.lang) return;
    const lang = event.target.dataset.lang;
    const link = event.target;
    getTranslate(lang);
    langs.forEach(element => {
        element.classList.remove('active');
    })
    link.classList.add('active');
    storageLang = lang;
}

langsContainer.addEventListener('click', toggleLangs);


function setLocalStorageLang() {
    localStorage.setItem('storageLang', storageLang);
  }

window.addEventListener('beforeunload', setLocalStorageLang)



function getLocalStorageLang() {
    if (localStorage.getItem('storageLang')) {
    const lang = localStorage.getItem('storageLang');
    const link = document.querySelector(`.langs a[data-lang="${lang}"]`);
    getTranslate(lang);
    langs.forEach(element => {
        element.classList.remove('active');
    })
    link.classList.add('active');
    storageLang = lang;
    }
}

window.addEventListener('load', getLocalStorageLang);