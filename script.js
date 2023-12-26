document.addEventListener('DOMContentLoaded', function () {
    var splide = new Splide('.splide', {
        perPage: 3,
        width: '100%',
        perMove: 1,
        gap: '2rem',
        autoplay: false,
        interval: 5000,
        type  : 'carousel',
        breakpoints: {
            640: {
                perPage: 1,
                gap: '20em',
                padding: '5em',
            },
        },
    });
    
    splide.mount();
});
