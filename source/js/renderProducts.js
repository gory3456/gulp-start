import formatPrice from './formatPrice.js';
import { addToStorage, getStorage } from './localstorage.js';
import { cartCount } from './productCart.js';
import { renderCart } from './renderCart.js';
import Modal from './modal.js';

export default (products, template, target, isTargetList = false, templateClass = '') => {
    const fragment = document.createDocumentFragment();

    let productEl = template.querySelector('.product-list__card');

    if (isTargetList) {
        const node = document.createElement('li');
        node.innerHTML = productEl.innerHTML;

        Array.prototype.forEach.call(productEl.attributes, function (attr) {
            node.setAttribute(attr.name, attr.value);
        });

        node.classList.add(templateClass);

        productEl = node;
    }

    products.forEach(product => {
        const itemEl = productEl.cloneNode(true);
        const linkEl = itemEl.querySelector('.product-list__link');
        const imageEl = itemEl.querySelector('.product-list__image');
        const nameEl = itemEl.querySelector('.product-list__title');
        const priceEl = itemEl.querySelector('.product-list__price.product-list__price--new');
        const oldPriceEl = itemEl.querySelector('.product-list__price.product-list__price--old');
        const buttonEl = itemEl.querySelector('.product-list__button');
        const arrowImgEl = itemEl.querySelector('.product-list__arrow');
        const slickModalEl = document.querySelector('.slick-notification');
        const modalClosed = document.querySelector('.slick-notification__close')
        const modalContinue = document.querySelector('.slick-notification__accept.button');
        const { id, link, image, name, price, oldPrice } = product;

        itemEl.dataset.productId = id;
        linkEl.href = link;
        imageEl.src = image;

        nameEl.textContent = name;
        priceEl.textContent = formatPrice(price);
        oldPriceEl.textContent = formatPrice(oldPrice);
        buttonEl.className = 'product-list__button';
        buttonEl.appendChild(arrowImgEl);

    


        // Определение величины карточки и лейбла (Hot! / New)

        if (product.isBig) {
            itemEl.classList.add('product-list__card--big');
        }

        if (product.status === 'hot') {
            itemEl.classList.add('product-list__label');
            itemEl.classList.add('product-list__label--hot');
        }
        else if (product.status === 'new') {
            itemEl.classList.add('product-list__label');
            itemEl.classList.add('product-list__label--new');
        }

        if (product.isBig && (product.status === 'hot' || product.status === 'new')) {
            itemEl.classList.add('product-list__label--big');
        }

        // Вызов модального окна о подтверждении добавления товара в корзину

        buttonEl.addEventListener('click', () => {
            const slickModal = new Modal(slickModalEl, 'slick-notification--showed');
            slickModal.openModal();
            addToStorage('cart', product);
            renderCart();

            const itemData = getStorage('cart');
            cartCount.textContent = Number(itemData.length);
        });

        modalClosed.addEventListener('click', () => {
            const slickModal = new Modal(slickModalEl, 'slick-notification--showed');
            slickModal.closeModal();
        });

        modalContinue.addEventListener('click', () => {
            const slickModal = new Modal(slickModalEl, 'slick-notification--showed');
            slickModal.closeModal();
        });

        cartCount.textContent = getStorage('cart')?.length || 0;

        fragment.appendChild(itemEl);
    });

    target.innerHTML = '';
    target.append(fragment);
}