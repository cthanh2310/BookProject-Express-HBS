//// Resize textarea
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
//// Resize textarea

function init() {
    var description = document.getElementById('description');
    function resize() {
        description.style.height = '25px';
        description.style.height = description.scrollHeight + 'px';
    }
    /* 0-timeout to get the already changed description */
    function delayedResize() {
        window.setTimeout(resize, 0);
    }
    observe(description, 'change', resize);
    observe(description, 'cut', delayedResize);
    observe(description, 'paste', delayedResize);
    observe(description, 'drop', delayedResize);
    observe(description, 'keydown', delayedResize);

    description.select();
    resize();
}
function modal() {

    var exitButton = document.querySelector('.pop__up-button-exit');
    exitButton.onclick = function () {
        var overlay = document.querySelector('.overlay');
        var popup = document.querySelector('.popup');
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }
    var orderCancelList = document.querySelectorAll('.btn-icon-remove');
    orderCancelList.forEach(orderCancel => {
        orderCancel.onclick = function () {
            var overlay = document.querySelector('.overlay');
            var popup = document.querySelector('.popup');
            popup.style.display = 'block';
            overlay.style.display = 'block';
            var dataId = orderCancel.getAttribute('dataId');
            console.log(dataId)
            popup.lastElementChild.lastElementChild.addEventListener('click', function () { // get button element
                event.preventDefault();
                console.log('ok');
                var deleteForm = document.forms['form-delete']; // get form element by name
                deleteForm.action = '/admin/book-manage/delete/' + dataId + '?_method=DELETE';
                console.log(deleteForm);
                deleteForm.submit();
            })
        }
    })

}
function load(id) {
    $.ajax({
        url: '/admin/book-manage/store',
        type: 'POST',
        data: {
            id: id,
        }
    })
        .done(books => {
            books.forEach(book => {
                if (book._id == id.toString()) {
                    document.querySelector('#name').focus();
                    document.querySelector('#id').value = book._id;
                    document.querySelector('#name').value = book.name;
                    // book.dateOfSubmit = moment().format('YYYY-MM-DD');
                    document.querySelector('#dateOfSubmit').value = book.dateOfSubmit;
                    document.querySelector('#price').value = book.price;
                    document.querySelector('#description').value = book.description;
                    document.querySelector('#category').value = book.category;
                    document.querySelector('#author').value = book.author;
                    document.querySelector('#publisher').value = book.publisher;
                    document.querySelector('#image').src = book.image;
                }
            })
        })
}


// update book
const updateButton = document.getElementById('updateBtn');
updateButton.addEventListener('click', function (event) {
    event.preventDefault();

    var id = document.querySelector('#id').value;
    var name = document.querySelector('#name').value;
    var dateOfSubmit = document.querySelector('#dateOfSubmit').value;
    var price = document.querySelector('#price').value;
    var description = document.querySelector('#description').value;
    var category = document.querySelector('#category').value;
    var author = document.querySelector('#author').value;
    var publisher = document.querySelector('#publisher').value;
    var myfile = document.querySelector('#myfile').files;
    var formData = new FormData();

    formData.append("id", id);
    formData.append("name", name);
    if (dateOfSubmit) {
        formData.append("dateOfSubmit", dateOfSubmit);
    }
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("author", author);
    formData.append("publisher", publisher);
    for (var i = 0; i < myfile.length; i++) {
        formData.append("myfile", myfile[i]);
    }
    var contenttype = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };
    axios.put('/admin/book-manage/update', formData, contenttype)
        .then((response) => {
            console.log(response.data);
            alert(response.data.status);
        })
        .catch((error) => {
            console.log(error);
        })
})



// add book
const addButton = document.getElementById('addBtn');
addButton.addEventListener('click', function (event) {
    console.log(2);
    event.preventDefault();
    var name = document.querySelector('#name').value;
    var dateOfSubmit = document.querySelector('#dateOfSubmit').value;
    var price = document.querySelector('#price').value;
    var description = document.querySelector('#description').value;
    var category = document.querySelector('#category').value;
    var author = document.querySelector('#author').value;
    var publisher = document.querySelector('#publisher').value;
    var myfile = document.querySelector('#myfile').files;
    var formData = new FormData();

    formData.append("name", name);
    formData.append("dateOfSubmit", dateOfSubmit);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("author", author);
    formData.append("publisher", publisher);
    for (var i = 0; i < myfile.length; i++) {
        formData.append("myfile", myfile[i]);
    }
    var contenttype = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };
    axios.post('/admin/book-manage', formData, contenttype)
        .then((response) => {
            console.log(response);
            alert(response.data.status);
        })
        .catch((error) => {
            console.log(error);
        })
})
window.onload = init();
window.onload = modal();