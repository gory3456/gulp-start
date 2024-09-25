import products from './products.js';
import renderProducts from './renderProducts.js';
import './script.js';
import './productCart.js';

const catalogList = document.querySelector('.best-selling__product-wrapper.product-list');
const catalogItemTemplate = document.querySelector('#product-list__exam').content;

renderProducts(products, catalogItemTemplate, catalogList );
