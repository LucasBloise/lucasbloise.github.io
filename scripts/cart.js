let cartContent = [];

window.onload = function() {
    // Aquí puedes colocar el código para imprimir algo en la página
    let cartContentCoded = sessionStorage.getItem("cart_content");
    let cartContentArray = JSON.parse(cartContentCoded)
    for (const product of cartContentArray) {
        cartContent.push(Product.fromStorage(product))
    }
    addElementToCartContainer(cartContent);
  };


function addElementToCartContainer(cartContent){
    const orderContainer = document.querySelector('.order-container');

    const productsContainer = document.createElement('div');
    productsContainer.classList.add('products-container');

  
    for (const cartProduct of cartContent) {
        const product = document.createElement('div');
        product.classList.add('product');
        
        const item = document.createElement('div');
        item.classList.add('item');
        item.textContent = `${cartProduct.currentAmountInCart}X ${cartProduct.name}`
    
        const price = document.createElement('div');
        price.classList.add('price');
        price.textContent = `$${cartProduct.price}`

        product.appendChild(item);
        product.appendChild(price);
        productsContainer.appendChild(product);
    }

    const totalprice = document.createElement('div');
    totalprice.classList.add('price-total');
    totalprice.textContent = calculateTotalPrice();

    
    orderContainer.appendChild(productsContainer);
    orderContainer.appendChild(totalprice);
}

function calculateTotalPrice(){
    let totalprice = 0;
    for (const product of cartContent) {
        totalprice += product.price * product.currentAmountInCart
    }

    return  `Total $ ${totalprice}`
}

