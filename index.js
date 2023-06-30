let slides = document.getElementsByClassName('slide');
let currentSlide = 0;

setInterval(function () {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}, 3000); 



function changeSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

document.addEventListener('DOMContentLoaded', function () {
    $('.carousel').carousel({
        interval: 3000
      })
    let prevButton = document.querySelector('.prev');
    let nextButton = document.querySelector('.next');

    prevButton.addEventListener('click', function () {
        changeSlide(-1);
    });

    nextButton.addEventListener('click', function () {
        changeSlide(1);
    });
})


const fakeProducts = [
    { name: 'Collar Reflectante', precio: 500, image: 'assets/product_image.png' },
    { name: 'Juguete de Peluche para Perros', precio: 700, image: 'assets/product_image.png' },
    { name: 'Cama Suave para Gatos', precio: 1200, image: 'assets/product_image.png' },
    { name: 'Arnés Ajustable para Perros', precio: 800, image: 'assets/product_image.png' },
    { name: 'Bol de Comida Antideslizante', precio: 300, image: 'assets/product_image.png' },
    { name: 'Rascador de Cartón para Gatos', precio: 250, image: 'assets/product_image.png' },
    { name: 'Pelota de Tenis para Perros', precio: 150, image: 'assets/product_image.png' },
    { name: 'Champú Hipoalergénico para Mascotas', precio: 900, image: 'assets/product_image.png' },
    { name: 'Comedero Automático para Gatos', precio: 1500, image: 'assets/product_image.png' },
    { name: 'Correa Extensible para Perros', precio: 1000, image: 'assets/product_image.png' },
    { name: 'Juguete Interactivo para Gatos', precio: 400, image: 'assets/product_image.png' },
    { name: 'Casita de Madera para Conejos', precio: 2000, image: 'assets/product_image.png' },
    { name: 'Ropa de Invierno para Perros', precio: 600, image: 'assets/product_image.png' },
    { name: 'Cepillo Deslanador para Gatos', precio: 350, image: 'assets/product_image.png' },
    { name: 'Bolso de Transporte para Mascotas', precio: 1800, image: 'assets/product_image.png' },
    { name: 'Snacks Naturales para Perros', precio: 250, image: 'assets/product_image.png' },
    { name: 'Fuente de Agua para Gatos', precio: 1200, image: 'assets/product_image.png' },
    { name: 'Collar de Diamantes para Mascotas', precio: 5000, image: 'assets/product_image.png' },
    { name: 'Transportadora de Viaje para Perros', precio: 2500, image: 'assets/product_image.png' },
    { name: 'Dispensador Automático de Comida', precio: 1500, image: 'assets/product_image.png' },
    { name: 'Cepillo Dental para Mascotas', precio: 400, image: 'assets/product_image.png' }
  ];
  
  

  const gridContainer = document.querySelector('.grid-container');

  fakeProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImage = document.createElement('img');
    productImage.classList.add('product-card-image');
    productImage.src = product.image;
    productImage.alt = product.name;

    const productName = document.createElement('div');
    productName.classList.add('product-card-name');
    productName.textContent = product.name;

    const productPrice = document.createElement('div');
    productPrice.classList.add('product-card-price');
    productPrice.textContent = '$ ' + product.precio;

    const addToCartContainer = document.createElement('div');
    addToCartContainer.classList.add('product-card-add-to-cart-container');

    const addToCartButton = document.createElement('div');
    addToCartButton.classList.add('product-card-add-to-cart-button');
    addToCartButton.textContent = 'Agregar al Carrito';

    addToCartContainer.appendChild(addToCartButton);
    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(addToCartContainer);
    gridContainer.appendChild(productCard);
  });