let cartContent = [];
let slides = document.getElementsByClassName('slide');
let currentSlide = 0;
let productsList = []




function changeSlide(n) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

setInterval(function () {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}, 2000);

document.addEventListener('DOMContentLoaded', function () {
  let cartContentCoded = sessionStorage.getItem("cart_content");
  let cartContentArray = JSON.parse(cartContentCoded);
  if (cartContentArray) {
    for (const product of cartContentArray) {
      cartContent.push(Product.fromStorage(product));
    }
  }

  const cartCountText = document.getElementById('cart-count');
  cartCountText.textContent = calculateProductsInCart();
  axios.get('http://localhost:3000/product')
    .then(response => {
      const products = response.data.products;
      const productsList = products.map(productData => Product.fromJson(productData));
      mapProductsToGrid(productsList);
    })
    .catch(error => {
      console.error('Error:', error);
    });

})


const incrementProductInCart = (product) => {
  cartContent.find((e) => e.name === product.name).currentAmountInCart++;
  updateCartContent();
};

const updateCartContent = () => {
  const cartCountText = document.getElementById('cart-count');
  cartCountText.textContent = calculateProductsInCart();
  sessionStorage.setItem("cart_content", JSON.stringify(cartContent));
};

const calculateProductsInCart = () => {
  let totalProductsInCart = 0;
  cartContent.forEach(e => {
    totalProductsInCart += e.currentAmountInCart;
  });
  return totalProductsInCart;
};


function mapProductsToGrid(productsList) {
  const gridContainer = document.querySelector('.grid-container');

  productsList.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImage = document.createElement('img');
    productImage.classList.add('product-card-image');
    productImage.src = product.imagePath;
    productImage.alt = product.name;

    const productName = document.createElement('div');
    productName.classList.add('product-card-name');
    productName.textContent = product.name;

    const productPrice = document.createElement('div');
    productPrice.classList.add('product-card-price');
    productPrice.textContent = `$${product.price}`;


    const addToCartContainer = document.createElement('div');
    addToCartContainer.classList.add('product-card-add-to-cart-container');

    const addToCartButton = document.createElement('div');
    const incrementButton = document.createElement('button');
    const decrementButton = document.createElement('button');
    const cartCountText = document.getElementById('cart-count');

    addToCartButton.addEventListener("click", () => addProductToCart(product));
    incrementButton.addEventListener("click", () => {
      const productEntity = cartContent.find((e) => e.name === product.name);
      productEntity.currentAmountInCart++;
      if (productEntity.currentAmountInCart >= 0) {

        addToCartButton.style.display = 'none';
        incrementButton.style.display = 'inline-block';
        decrementButton.style.display = 'inline-block';

      }

      cartCountText.textContent = calculateProductsInCart();
      sessionStorage.setItem("cart_content", JSON.stringify(cartContent));

    });



    if (sessionStorage.getItem("cart_content")) {
      const productInCart = cartContent.find((e) => e.name === product.name)
      if (!(productInCart && productInCart.currentAmountInCart >= 1)) {
        addToCartButton.style.display = 'inline-block';
        incrementButton.style.display = 'none';
        decrementButton.style.display = 'none';
      } else {
        addToCartButton.style.display = 'none';
        incrementButton.style.display = 'inline-block';
        decrementButton.style.display = 'inline-block';
      }
    } else {
      addToCartButton.style.display = 'inline-block';
      incrementButton.style.display = 'none';
      decrementButton.style.display = 'none';
    }



    decrementButton.addEventListener("click", () => {
      const productEntity = cartContent.find((e) => e.name === product.name);
      productEntity.currentAmountInCart--;
      if (productEntity.currentAmountInCart <= 0) {

        addToCartButton.style.display = 'inline-block';
        incrementButton.style.display = 'none';
        decrementButton.style.display = 'none';

      }
      cartContent = cartContent.filter(e => e.currentAmountInCart >= 1)
      cartCountText.textContent = calculateProductsInCart();
      sessionStorage.setItem("cart_content", JSON.stringify(cartContent));

    });

    addToCartButton.classList.add('product-card-add-to-cart-button');
    addToCartButton.textContent = 'Agregar al Carrito';
    incrementButton.classList.add('product-card-increment-button');
    incrementButton.textContent = '+';
    decrementButton.classList.add('product-card-decrement-button');
    decrementButton.textContent = '-';
    cartCountText.classList.add('product-card-cart-count');

    const addProductToCart = (product) => {
      const productsIds = cartContent.map((e) => e.name);

      addToCartButton.style.display = 'none';
      incrementButton.style.display = 'inline-block';
      decrementButton.style.display = 'inline-block';

      const productEntity = Product.fromJson(product);
      productEntity.currentAmountInCart++;
      cartContent.push(productEntity);

      updateCartContent();
    };


    const updateCartContent = () => {
      cartCountText.textContent = calculateProductsInCart();
      sessionStorage.setItem("cart_content", JSON.stringify(cartContent));

    };

    const calculateProductsInCart = () => {
      let totalProductsInCart = 0;
      cartContent.forEach(e => {
        totalProductsInCart += e.currentAmountInCart;
      });
      return totalProductsInCart;
    };




    addToCartContainer.appendChild(addToCartButton);
    addToCartContainer.appendChild(decrementButton);
    addToCartContainer.appendChild(incrementButton);
    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(addToCartContainer);
    gridContainer.appendChild(productCard);
  });

  var searchInput = document.getElementById('floatingInputValue');
  var productCards = document.getElementsByClassName('product-card');
  var productNames = Array.from(productCards).map(function (card) {
    return card.querySelector('.product-card-name').textContent.toLowerCase();
  });

  searchInput.addEventListener('input', function () {
    var searchQuery = searchInput.value.toLowerCase();

    for (var i = 0; i < productCards.length; i++) {
      var productCard = productCards[i];
      var productName = productNames[i];

      if (productName.includes(searchQuery)) {
        productCard.style.display = 'flex';
      } else {
        productCard.style.display = 'none';
      }
    }
  });
}

