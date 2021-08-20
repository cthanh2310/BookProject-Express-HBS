var observe;
if (window.attachEvent) {
    observe = function (element, event, handler) {
        element.attachEvent('on' + event, handler);
    };
}
else {
    observe = function (element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}
function init() {
    var review__textarea = document.getElementById('review__textarea');
    function resize() {
        review__textarea.style.height = '25px';
        review__textarea.style.height = review__textarea.scrollHeight + 'px';
    }
    /* 0-timeout to get the already changed review__textarea */
    function delayedResize() {
        window.setTimeout(resize, 0);
    }
    observe(review__textarea, 'change', resize);
    observe(review__textarea, 'cut', delayedResize);
    observe(review__textarea, 'paste', delayedResize);
    observe(review__textarea, 'drop', delayedResize);
    observe(review__textarea, 'keydown', delayedResize);

    review__textarea.focus();
    review__textarea.select();
    resize();
}
const amoutSpan = document.getElementById("product__info-amount");
let amount = parseInt(amoutSpan.innerHTML);
document.getElementById("product__info-amount-sub").addEventListener('click', function (e) {
    if (amount > 1) {
        amount--;
        amoutSpan.innerHTML = amount;
    }
})
document.getElementById("product__info-amount-sum").addEventListener('click', function (e) {
    amount++;
    amoutSpan.innerHTML = amount;
})

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}



const addToCartBtn = document.getElementById('add-to-cart');
addToCartBtn.addEventListener('click', function (e) {
    if (!getCookie('token')) {
        event.preventDefault();
        alert('Cần đăng nhập để thêm giỏ hàng!');
    } else {
        var currentUrl = window.location.href;
        var bookId = currentUrl.split('/')[4];
        /* var amountString = amount.toString();
        var productInfo = [];
        productInfo.push(bookId + ':' + amountString);
        setCookie(bookId, productInfo, 999);
        console.log(productInfo);  */
        /* var formSubmit = document.getElementById('form-submit');
        var formData = new FormData(formSubmit);
        var currentUrl = window.location.href;
        var bookId = currentUrl.split('/')[4];
        formData.append('bookId', bookId);
        formData.append('amount', amount);
        formData.append('token', getCookie("token"));
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        formSubmit.submit(); */

        axios.post(`/product/${bookId}`, {
            bookId,
            quantity: amount,
        })
            .then(function (response) {
                console.log(response);
                var overlay = document.querySelector('.overlay');
                var popup = document.querySelector('.popup');
                popup.style.display = 'block';
                overlay.style.display = 'block';
                var exitButton = document.querySelector('.pop__up-button-exit');
                exitButton.onclick = function () {
                    var overlay = document.querySelector('.overlay');
                    var popup = document.querySelector('.popup');
                    popup.style.display = 'none';
                    overlay.style.display = 'none';
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
})















window.onload = init();