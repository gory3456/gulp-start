import { cartCount } from "./productCart.js";
import { createOrder } from "./fetchParams.js";
import formatPrice from "./formatPrice.js";
import LocalStorage from "./localstorage.js";

const orderButton = document.querySelector('.shopping-cart__order-button.button');
export const cartStorage = new LocalStorage('cart');

const calculateCountsData = (data) => {
    return data.reduce((acc, curr) => {
        const id = curr.id;
        acc[id] = acc[id] ? acc[id] + 1 : 1;	
									
        return acc;
    }, {});
};

orderButton.addEventListener('click', () => {
    const data = cartStorage.getStorage('cart');

    const countsData = calculateCountsData(data);
	console.log(countsData);
    const formattedData = Object.entries(countsData).map(([id, count]) => ({
        id: Number(id),
        count
    }));

    createOrder('https://zsa-studio.ru/catalog.php', formattedData);
})


const editProductCount = (node, product, operation = 'plus') => {
    const input = node.querySelector('.shopping-cart__counter').value;
    const totalEl = document.querySelector('.shopping-cart__total-quantity span');
    const totalPriceEl = document.querySelector('.shopping-cart__total-price');

    const totalPrice = Number(totalPriceEl.textContent.replace(/\D/g, ''));
    if (operation === 'plus') {
        totalPriceEl.textContent = formatPrice(totalPrice + Number(product.price));
        node.querySelector('.shopping-cart__counter').value = Number(input) + 1;
        totalEl.textContent = Number(totalEl.textContent) + 1;
        cartCount.textContent = totalEl.textContent;
    } else {
        totalPriceEl.textContent = formatPrice(totalPrice - Number(product.price));
        node.querySelector('.shopping-cart__counter').value = Number(input) - 1;
		totalEl.textContent = Number(totalEl.textContent) - 1;
		
        cartCount.textContent = totalEl.textContent;
    }
};

export const renderCart = () => {
    const data = cartStorage.getStorage('cart');
    if (!data?.length) {
        return;
    }

    const countsData = calculateCountsData(data);

    const uniqueData = [...new Set(data.map(JSON.stringify))].map(JSON.parse).sort((a, b) => a.id - b.id);

    const cartList = document.querySelector('.shopping-cart__list');
    const cartProductTemplate = document.querySelector('.shopping-cart__product').content.querySelector('.shopping-cart__item');
    const fragment = document.createDocumentFragment();

    cartList.innerHTML = '';

    uniqueData.forEach(product => {
        const node = cartProductTemplate.cloneNode(true);
        node.querySelector('.shopping-cart__counter').value = countsData[product.id];
        node.querySelector('.shopping-cart__image').src = product.image;
        node.querySelector('.shopping-cart__name').textContent = product.name;
        node.querySelector('.shopping-cart__price').textContent = formatPrice(product.price);

        node.querySelector('.shopping-cart__count-button--minus').addEventListener('click', () => {
            if (node.querySelector('.shopping-cart__counter').value > 0) {
                LocalStorage.removeFromStorage('cart', product.id);

                editProductCount(node, product, 'minus');
            }
        })

        node.querySelector('.shopping-cart__count-button--plus').addEventListener('click', () => {
            LocalStorage.addToStorage('cart', product);

            editProductCount(node, product, 'plus');
        })

        fragment.append(node);
    });

    cartList.append(fragment);


    const totalEl = document.querySelector('.shopping-cart__total-quantity span');
    totalEl.textContent = data.length;

    const totalPriceEl = document.querySelector('.shopping-cart__total-price');
    totalPriceEl.textContent = formatPrice(data.reduce((acc, curr) => acc + Number(curr.price), 0));
}
renderCart();