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


