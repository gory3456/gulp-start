import formatPrice from './formatPrice.js';
import LocalStorage from './localstorage.js';
import Modal from './modal.js';
export const cartStorage = new LocalStorage('cart');

const buttonOpened = document.querySelector('.main-nav__button.main-nav__button--purchases');
const shoppingCart = document.querySelector('.shopping-cart');
const buttonClosed = document.querySelector('.shopping-cart__close');

const cart = document.querySelector('.shopping-cart');
const cartList = document.querySelector('.shopping-cart__list');
const cartProductTemplate = document.querySelector('.shopping-cart__product').content;
export const cartCount = buttonOpened.querySelector('.main-nav__pin');

buttonOpened.addEventListener('click', () => {
	const openShop = new Modal(shoppingCart, 'shopping-cart--active');
    openShop.openModal();
    buttonClosed.addEventListener('click', buttonClosed);
});

buttonClosed.addEventListener('click', () => {
    const openShop = new Modal(shoppingCart, 'shopping-cart--active');
    openShop.closeModal();
    buttonClosed.removeEventListener('click', buttonClosed);
});

const removeProductFromCart = (productId) => {
    const node = cartList.querySelector(`[data-product-id="${productId}"]`);
    node.remove();
    cartCount.textContent = cartList.childElementCount;

    if (!cartList.childElementCount) {
        cart.classList.remove('shopping-cart--active');
    }
    LocalStorage.removeFromStorage('cart', productId);
};

export const addProductToCart = (product ,isClick  = false) => {
    const node = cartProductTemplate.querySelector('.shopping-cart__item').cloneNode(true);

    node.dataset.productId = product.id;
    node.querySelector('.shopping-cart__image').src = product.image;
    node.querySelector('.shopping-cart__name').textContent = product.name;
	node.querySelector('.shopping-cart__price').textContent = formatPrice(product.price);

	if (isClick) {
        LocalStorage.addToStorage('cart', product);
        cartCount.textContent = cartStorage.getStorage('cart')?.length;
    }

    cartList.append(node);
};

if (cartStorage.getStorage('cart')?.length) {
    cartStorage.getStorage('cart').forEach(product => {
        addProductToCart(product);
		cartCount.textContent = cartStorage.getStorage('cart').length;

    });
}

document.addEventListener('click', (event) => {
    if (!shoppingCart.contains(event.target) && !buttonOpened.contains(event.target)) {
        const openShop = new Modal(shoppingCart, 'shopping-cart--active');
        openShop.closeModal();
    }
});
