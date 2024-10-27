import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const swiper = new Swiper('.banners__swiper', {
    // Optional parameters
    loop: true,
    spaceBetween: 30,
	
    // If we need pagination
    pagination: {
        el: '.banners__numbering',
        bulletActiveClass: 'pagination__item--active',
        bulletClass: 'pagination__item',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.arrow__banners--right',
        prevEl: '.arrow__banners--left',
    },
});

const swiperPopular = new Swiper('.most-popular__swiper', {
    // Optional parameters
    loop: true,
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        768: {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 55,
        },
        1728: {
            slidesPerView: '2',
            spaceBetween: 35,
        }
    },
    // If we need pagination
    pagination: {
        el: '.most-popular__numbering',
        bulletActiveClass: 'pagination__item--active',
        bulletClass: 'pagination__item',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.arrow__most-popular--right',
        prevEl: '.arrow__most-popular--left',
    },
});