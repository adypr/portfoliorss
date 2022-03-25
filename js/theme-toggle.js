const arr = ['body', '.toggle__line', '.toggle-nav','.button__transparent', '.button__transparent_active','.button__transparent.button__transparent_active', '.section__title', '.skills', '.portfolio', '.video', '.price', '.contacts', 'footer'];

const themeToggle = document.querySelector('.theme__toggle ');
let storageTheme = 'black';

function changeTheme() {
    arr.forEach(style => {
        let elements = document.querySelectorAll(style);
        elements.forEach(element => {
            element.classList.toggle('white-theme');
        })
    });
    let icon = document.querySelector('.theme__icon');
    icon.innerHTML = '';
    if (document.querySelector('.white-theme')) {
        icon.innerHTML = '<use class="moon" xlink:href="assets/svg/theme.svg#moon"></use>';
        storageTheme = 'white';
    } 
    else {
        icon.innerHTML = '<use class="sun" xlink:href="assets/svg/theme.svg#sun"></use>';
        storageTheme = 'black';
    } 

}

themeToggle.addEventListener('click', changeTheme);


function setLocalStorageTheme() {
    localStorage.setItem('storageTheme', storageTheme);
}

window.addEventListener('beforeunload', setLocalStorageTheme);

function getLocalStorageTheme() {
    if (localStorage.getItem('storageTheme') && localStorage.getItem('storageTheme') == 'white') changeTheme()
}

window.addEventListener('load', getLocalStorageTheme);




