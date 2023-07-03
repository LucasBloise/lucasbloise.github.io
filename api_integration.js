let ualaAccessToken;
document.addEventListener('DOMContentLoaded', function () {
    const urlToken = 'https://auth.stage.ua.la/1/auth/token';
    const data = {
        "user_name": "new_user_1631906477",
        "client_id": "5qqGKGm4EaawnAH0J6xluc6AWdQBvLW3",
        "client_secret_id": "cVp1iGEB-DE6KtL4Hi7tocdopP2pZxzaEVciACApWH92e8_Hloe8CD5ilM63NppG",
        "grant_type": "client_credentials"
    };

    axios.post(urlToken, data)
        .then(function (response) {
            ualaAccessToken = response.data['access_token']
        })
        .catch(function (error) {

        });

    const checkOutButton = document.getElementById('checkOutButton');

    checkOutButton.addEventListener('click', function () {
        event.preventDefault();
        const form = document.querySelector('.payment-form');
        if (form.checkValidity()) {
            ualaApiCheckOut();
        } else {
            alert('Por favor, completa todos los campos antes de enviar el formulario.');
        }

    });
});


function ualaApiCheckOut() {
    const urlCheckOut = 'https://checkout.stage.ua.la/1/checkout';
    const description = "Compra Super Mascotas";
    const userName = "new_user_1631906477";
    const callback_fail = "http://127.0.0.1:5500/index.html";
    const callback_success = "http://127.0.0.1:5500/index.html";
    const notification_url = "https://www.notificationurl.com";
    const amount = calculateTotalNumberPrice();
    const data = {
        "amount": `${amount}`,
        "description": description,
        "userName": userName,
        "callback_fail": callback_fail,
        "callback_success": callback_success,
        "notification_url": notification_url
    };
    axios.post(urlCheckOut, data, {
        headers: {
            "Authorization": `Bearer ${ualaAccessToken}`
        }
    })
        .then(function (response) {
            if (response.data && response.data.links && response.data.links.checkoutLink) {
                const checkoutLink = response.data.links.checkoutLink;
                window.open(checkoutLink, '_blank');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function calculateTotalNumberPrice() {
    let totalprice = 0;
    for (const product of cartContent) {
        totalprice += product.price * product.currentAmountInCart
    }

    return totalprice + shipPrice;
}