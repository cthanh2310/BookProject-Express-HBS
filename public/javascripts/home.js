const priceRadioList = document.querySelectorAll('input[name="price"]');
const showBookElement = document.querySelector('#show-book-list');
const listCategory = document.querySelectorAll('.category__link');
const inputSearch = document.querySelector('#search-book');
const buttonSearch = document.querySelector('#search-book-btn');
console.log(showBookElement);
var listBook = '';
var listBookData = {};

axios.get('/drop-data')
    .then((response) => {
        listBookData = response.data.data;
        priceRadioList.forEach((priceRadio) => {
            priceRadio.addEventListener('click', () => {
                let priceValue = priceRadio.value;
                switch (priceValue) {
                    case 'all-price':
                        response.data.data.forEach(data => {
                            listBook += `
                                    <div class="col l-3 m-4 c-6">
                                            <a href="/product/${data._id}" class="book-detail">
                                                <img class="book-image" src="${data.image}" alt="">
                                                <h3 class="book-name">
                                                    ${data.name}
                                                </h3>
                                                <div class="price-detail">
                                                    <p class="book-price">
                                                        Giá: ${data.price}
                                                    </p>
                                                    <p class="vnd">đ</p>
                                                </div>
                                            </a>
                                        </div>
                                `
                        })
                        showBookElement.innerHTML = listBook;
                        listBook = '';
                        break;
                    case '>150.000':
                        response.data.data.forEach(data => {
                            if (data.price > 150000) {
                                listBook += `
                                        <div class="col l-3 m-4 c-6">
                                                <a href="/product/${data._id}" class="book-detail">
                                                    <img class="book-image" src="${data.image}" alt="">
                                                    <h3 class="book-name">
                                                        ${data.name}
                                                    </h3>
                                                    <div class="price-detail">
                                                        <p class="book-price">
                                                            Giá: ${data.price}
                                                        </p>
                                                        <p class="vnd">đ</p>
                                                    </div>
                                                </a>
                                            </div>
                                    `
                            }
                        })
                        showBookElement.innerHTML = listBook;
                        listBook = '';
                        break;
                    default:
                        var firstValue = parseInt(priceValue.split('-')[0]);
                        console.log(firstValue);
                        var secondValue = parseInt(priceValue.split('-')[1]);
                        console.log(secondValue);
                        response.data.data.forEach(data => {
                            if (data.price >= firstValue && data.price <= secondValue) {
                                console.log(data)
                                listBook += `
                                        <div class="col l-3 m-4 c-6">
                                                <a href="/product/${data._id}" class="book-detail">
                                                    <img class="book-image" src="${data.image}" alt="">
                                                    <h3 class="book-name">
                                                        ${data.name}
                                                    </h3>
                                                    <div class="price-detail">
                                                        <p class="book-price">
                                                            Giá: ${data.price}
                                                        </p>
                                                        <p class="vnd">đ</p>
                                                    </div>
                                                </a>
                                            </div>
                                    `
                            }
                        })
                        showBookElement.innerHTML = listBook;
                        listBook = '';
                        break;
                }
            })
        })
        listCategory.forEach((category) => {
            category.addEventListener('click', () => {
                listBookData.forEach((data) => {
                    if (data.category == category.innerHTML.trim()) {
                        listBook += `
                                    <div class="col l-3 m-4 c-6">
                                            <a href="/product/${data._id}" class="book-detail">
                                                <img class="book-image" src="${data.image}" alt="">
                                                <h3 class="book-name">
                                                    ${data.name}
                                                </h3>
                                                <div class="price-detail">
                                                    <p class="book-price">
                                                        Giá: ${data.price}
                                                    </p>
                                                    <p class="vnd">đ</p>
                                                </div>
                                            </a>
                                        </div>
                                `
                    }
                })
                showBookElement.innerHTML = listBook;
                listBook = '';
            })
        })
        inputSearch.onkeyup = (event) => {
            event.preventDefault();
            buttonSearch.click();
        }
        buttonSearch.onclick = () => {
            listBookData.forEach((data) => {
                if (data.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().includes(inputSearch.value.toLowerCase())) {
                    listBook += `
                                <div class="col l-3 m-4 c-6">
                                        <a href="/product/${data._id}" class="book-detail">
                                            <img class="book-image" src="${data.image}" alt="">
                                            <h3 class="book-name">
                                                ${data.name}
                                            </h3>
                                            <div class="price-detail">
                                                <p class="book-price">
                                                    Giá: ${data.price}
                                                </p>
                                                <p class="vnd">đ</p>
                                            </div>
                                        </a>
                                    </div>
                            `
                }
            })
            showBookElement.innerHTML = listBook;
            listBook = '';
        }
    })
    .catch((error) => {
        console.log(error);
    })
