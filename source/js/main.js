import renderProducts from './renderProducts.js';
import './script.js';
import './productCart.js';
import { fetchParams } from './fetchParams.js';

const catalogList = document.querySelector('.best-selling__product-wrapper.product-list');
const catalogItemTemplate = document.querySelector('#product-list__exam').content;

const dataCatalog = fetchParams('https://zsa-studio.ru/catalog.php');
dataCatalog.then((products) => renderProducts(products, catalogItemTemplate, catalogList));