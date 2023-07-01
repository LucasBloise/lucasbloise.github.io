let cartContent = [];
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
    Product.fromJson({ name: 'Collar Reflectante', price: 500, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Juguete de Peluche para Perros', price: 700, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Cama Suave para Gatos', price: 1200, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Arnés Ajustable para Perros', price: 800, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Bol de Comida Antideslizante', price: 300, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Rascador de Cartón para Gatos', price: 250, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Pelota de Tenis para Perros', price: 150, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Champú Hipoalergénico para Mascotas', price: 900, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Comedero Automático para Gatos', price: 1500, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Correa Extensible para Perros', price: 1000, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Juguete Interactivo para Gatos', price: 400, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Casita de Madera para Conejos', price: 2000, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Ropa de Invierno para Perros', price: 600, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Cepillo Deslanador para Gatos', price: 350, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Bolso de Transporte para Mascotas', price: 1800, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Snacks Naturales para Perros', price: 250, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Fuente de Agua para Gatos', price: 1200, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Collar de Diamantes para Mascotas', price: 5000, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Transportadora de Viaje para Perros', price: 2500, image: 'assets/product_image.png' }),
    Product.fromJson({ name: 'Dispensador Automático de Comida', price: 1500, image: 'assets/product_image.png' })
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
    productPrice.textContent = `$${product.price}`;

    const addToCartContainer = document.createElement('div');
    addToCartContainer.classList.add('product-card-add-to-cart-container');

    const calculateProductsInCart = () => {
        let totalProductsInCart = 0;
        cartContent.forEach(e => {
            totalProductsInCart += e.currentAmountInCart;
        });
        return totalProductsInCart;
    }

    const addToCartButton = document.createElement('div');
    const cartCountText = document.getElementById('cart-count');

    addToCartButton.addEventListener("click",() => addProductToCart(product))

    const addProductToCart = (product) => {
        const productsIds = cartContent.map((e) => e.name);
      
        if (!productsIds.includes(product.name)) {
          const productEntity = Product.fromJson(product);
          productEntity.currentAmountInCart++;
          cartContent.push(productEntity);
        } else {
          cartContent.find((e) => e.name === product.name).currentAmountInCart++;
        }
        cartCountText.textContent = calculateProductsInCart();
      };

    addToCartButton.classList.add('product-card-add-to-cart-button');
    addToCartButton.textContent = 'Agregar al Carrito';
    

    addToCartContainer.appendChild(addToCartButton);
    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(addToCartContainer);
    gridContainer.appendChild(productCard);
  });