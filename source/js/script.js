const buttonBurger = document.querySelector('.burger-button--showed');
const mainNav = document.querySelector('.main-nav__menu');
const mainNavButtons = document.querySelector('.main-nav__buttons');
const buttonClosed = document.querySelector('.main-nav__button--close');

const closeMainNav = () => {
    mainNav.classList.remove('main-nav__menu--showed');
    mainNavButtons.classList.remove('main-nav__buttons--showed');
    buttonBurger.classList.add('burger-button--showed');
    buttonClosed.removeEventListener('click', closeMainNav);
};

buttonBurger.addEventListener('click', () => {
    mainNav.classList.add('main-nav__menu--showed');
    mainNavButtons.classList.add('main-nav__buttons--showed');
    buttonBurger.classList.remove('burger-button--showed');

    buttonClosed.addEventListener('click', closeMainNav);
});