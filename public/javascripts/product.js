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

// socket review + like
var link = window.location.href.split('/')[4];
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
var token = getCookie('token');
var socket = io.connect();
function getParentElement(element, selector) {
    while (!element.parentElement.matches(selector)) {
        element = element.parentElement;
    }
    return element.parentElement;
}
socket.on('sendData', function (data) {
    if (data) {
        var htmlTextReview = `
        <div class="review__comment row no-gutters">
                    <input type="hidden" id="review-id" data-id="${data.reviewID}">    
                    <div class="col l-1">
                        <div class="review__avatar">
                            <img src="${data.avatar}" alt="">
                        </div>
                    </div>
                    <div class="col l-11">
                        <div class="review__content">
                            <span class="content__user-name">${data.fullname}</span>
                            <div class="content__details">
                                <p>${data.reviewContent}</p>
                            </div>
                            <div class="content__react" id="${data.reviewID}">
                                <span onclick="like('${data.reviewID}')" class="content__react-like">
                                    <i class="fas fa-thumbs-up"></i>
                                    <span class="content__react-amount"></span>
                                </span>
                             
                            </div>
                        </div>
                    </div>
                </div>
    
    `
        htmlTextReview += document.querySelector('.review__list-comment').innerHTML;
        document.querySelector('#review__textarea').value = '';
        document.querySelector('.review__list-comment').innerHTML = htmlTextReview;
    } else {
        alert('Vui lòng đăng nhập trước khi thêm bình luận')
    }
})

socket.on('focus', function () {
    document.getElementById('people-focusing-id').style.display = 'block';
})
socket.on('blur', function () {
    document.getElementById('people-focusing-id').style.display = 'none';
})
function like(reviewID) {
    socket.emit('like', { reviewID, token, link })
}
socket.on('like', (data) => {
    if (data) {
        let reactElement = document.getElementById(data.reviewID);

        return reactElement.innerHTML =
            `
            <span onclick="like('${data.reviewID}')" class="content__react-like"><i
                    class="fas fa-thumbs-up"></i> <span
                    class="content__react-amount">${data.length = data.length > 0 ? data.length : ''}</span></span>
        `

    }
    return alert('Vui lòng đăng nhập để thích bình luận này!')
})
socket.on('onlyMeSeeStatusLike', (data) => {
    let reactElement = document.getElementById(data.reviewID);
    if (data.status == 'like' && data.token == token) {
        return reactElement.querySelector('.fa-thumbs-up').classList.add('content__react-like--color');
    } else if (data.status == 'unlike' && data.token == token) {
        return reactElement.querySelector('.fa-thumbs-up').classList.remove('content__react-like--color');
    }
})

var reviewFunc = function () {
    axios.get(`/product/${link}/get-review-liked`)
        .then(response => {
            response.data.forEach((reviewId) => {
                document.getElementById(`${reviewId}`).querySelector('.fa-thumbs-up').classList.add('content__react-like--color')
            })
        })
        .catch(err => {
            console.log(err);

        })



    socket.emit('connection', link);
    var commentBTN = document.querySelector('#comment-btn');
    commentBTN.addEventListener('click', function (event) {
        var reviewContent = document.querySelector('#review__textarea').value;
        socket.emit('sendData', { reviewContent, link, token });
    })

    document.querySelector('#review__textarea').addEventListener('focus', () => {
        socket.emit('focus', link);
    })
    document.querySelector('#review__textarea').addEventListener('blur', () => {
        socket.emit('blur', link);
    })
    // like    




    /* if (reactLike) {
        reactLike.addEventListener('click', () => {
            if (document.querySelector('.fa-thumbs-up').classList.contains('content__react-like--color')) {
                return document.querySelector('.fa-thumbs-up').classList.remove('content__react-like--color')
            }
            return document.querySelector('.fa-thumbs-up').classList.add('content__react-like--color')

        })
    } */
}




window.onload = reviewFunc();


















window.onload = init();