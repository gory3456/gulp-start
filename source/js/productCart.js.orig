const buttonOpened = document.querySelector('.main-nav__button.main-nav__button--purchases');
const shoppingCart = document.querySelector('.shopping-cart');
const buttonClosed = document.querySelector('.shopping-cart__close');

const cart = document.querySelector('.shopping-cart');
const cartList = document.querySelector('.shopping-cart__list');
const cartProductTemplate = document.querySelector('.shopping-cart__product').content;

buttonOpened.addEventListener('click', () => {
    shoppingCart.classList.add('shopping-cart--active');
    buttonClosed.addEventListener('click', closeShoppingCart);
});

const closeShoppingCart = () => {
    shoppingCart.classList.remove('shopping-cart--active');
    buttonClosed.removeEventListener('click', closeShoppingCart);
};

export const addProductToCart = (product) => {
    const node = cartProductTemplate.querySelector('.shopping-cart__item').cloneNode(true);

    node.dataset.productId = product.id;
    node.querySelector('.shopping-cart__image').src = product.image;
    node.querySelector('.shopping-cart__name').textContent = product.title;
    node.querySelector('.shopping-cart__price').textContent = `${product.priceNew} ₽`;

    cartList.append(node);
};