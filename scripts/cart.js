let cartContent = [];
let shipPrice = 0
window.onload = function () {
    // Aquí puedes colocar el código para imprimir algo en la página
    getCartContent();
    addElementToCartContainer(cartContent);

    var inputDireccion = document.getElementById("input-direccion");


    inputDireccion.addEventListener("blur", function () {
        axios.get(`http://localhost:3000/envio/${inputDireccion.values}`)
            .then(response => {
                shipPrice = response.data.costo_envio;
                const productsContainer = document.querySelector('.products-container');

                const product = document.createElement('div');
                product.classList.add('product');

                const item = document.createElement('div');
                item.classList.add('item');
                item.textContent = 'Costo de Envio'

                const price = document.createElement('div');
                price.classList.add('price');
                price.textContent = `$${shipPrice}`

                product.appendChild(item);
                product.appendChild(price);
                productsContainer.appendChild(product);

                const priceTotal = document.querySelector('.price-total');
                const totalPrice = calculateTotalPrice() + shipPrice
                priceTotal.textContent = `Total $ ${totalPrice}`
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
};

function getCartContent() {
    let cartContentCoded = sessionStorage.getItem("cart_content");
    let cartContentArray = JSON.parse(cartContentCoded);
    for (const product of cartContentArray) {
        cartContent.push(Product.fromStorage(product));
    }
}

function addElementToCartContainer(cartContent) {

    const orderContainer = document.querySelector('.order-container');

    const productsContainer = document.createElement('div');
    productsContainer.classList.add('products-container');


    for (const cartProduct of cartContent) {
        if (cartProduct.currentAmountInCart <= 0) {
            continue
        }
        const product = document.createElement('div');
        product.classList.add('product');

        const incrementAmount = document.createElement('button');
        incrementAmount.textContent = "+"
        incrementAmount.addEventListener("click", function () {
            cartProduct.currentAmountInCart++

            item.textContent = `${cartProduct.currentAmountInCart}X ${cartProduct.name}`
            totalprice.textContent = `Total $ ${calculateTotalPrice()}`
            sessionStorage.setItem("cart_content", JSON.stringify(cartContent));
        });

        const decrementAmount = document.createElement('button');
        decrementAmount.textContent = "-"
        decrementAmount.addEventListener("click", function () {
            cartProduct.currentAmountInCart--
            sessionStorage.setItem("cart_content", JSON.stringify(cartContent));
            totalprice.textContent = `Total $ ${calculateTotalPrice()}`

            if (cartProduct.currentAmountInCart == 0) {
                product.style.display = "none"
            } else {
                item.textContent = `${cartProduct.currentAmountInCart}X ${cartProduct.name}`
            }



        });


        const item = document.createElement('div');
        item.classList.add('item');
        item.setAttribute('id', cartProduct.name)
        item.textContent = `${cartProduct.currentAmountInCart}X ${cartProduct.name}`

        const price = document.createElement('div');
        price.classList.add('price');
        price.textContent = `$${cartProduct.price}`
        product.appendChild(incrementAmount);
        product.appendChild(decrementAmount);
        product.appendChild(item);
        product.appendChild(price);
        productsContainer.appendChild(product);
    }

    const totalprice = document.createElement('div');
    totalprice.classList.add('price-total');
    totalprice.textContent = `Total $ ${calculateTotalPrice()}`


    orderContainer.appendChild(productsContainer);
    orderContainer.appendChild(totalprice);
}

function calculateTotalPrice() {
    let totalprice = 0;
    for (const product of cartContent) {
        totalprice += product.price * product.currentAmountInCart
    }
    return totalprice
}

