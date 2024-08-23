const modal = document.querySelector('.slick-notification');
const modalClosed = document.querySelector('.slick-notification__close')
const modalContinue = document.querySelector('.slick-notification__accept');
const modalOpen = document.querySelectorAll('.product__button');

modalOpen.forEach((button) => {
    button.addEventListener('click', () => {
        modal.classList.add('slick-notification--showed');
        modalClosed.addEventListener('click', closeModal);
        modalContinue.addEventListener('click', closeModal);
    })
})

const closeModal = () => {
    modal.classList.remove('slick-notification--showed');
    modalClosed.remdoveEventListener('click', closeModal);
    modalContinue.removeEventListener('click', closeModal);
}


const buttonBurger = document.querySelector('.main-nav__button--burger');
const mainNav = document.querySelector('.main-nav__menu');
const mainNavButtons = document.querySelector('.main-nav__buttons');
const buttonClosed = document.querySelector('.main-nav__button--close');

const closeMainNav = () => {
    mainNav.classList.remove('main-nav__menu--showed');
    mainNavButtons.classList.remove('main-nav__buttons--showed');
    buttonClosed.removeEventListener('click', closeMainNav);
};

buttonBurger.addEventListener('click', () => {
    mainNav.classList.add('main-nav__menu--showed');
    mainNavButtons.classList.add('main-nav__buttons--showed');
    buttonClosed.addEventListener('click', closeMainNav);
});