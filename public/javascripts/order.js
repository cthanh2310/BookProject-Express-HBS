
    const listStatus = document.querySelectorAll('.order__status-h5');
    $.ajax({
        url: '/my-order/get-data',
        method: 'GET',
    })
        .then((response) => {
            let htmlStatus = '';
            let htmlStatusElement = document.querySelector('.order__have-products');
            console.log(htmlStatusElement)
            let listOrder = response;
            listStatus.forEach((status) => {
                status.addEventListener('click', (event) => {
                    listStatus.forEach((status) => {
                        status.style.color = '#333';
                        status.style.fontWeight = '500';
                    })
                    status.style.fontWeight = '600';
                    status.style.color = '#fb3535'
                    let statusGetById = status.id.split('-')[1];
                    console.log(statusGetById)
                    listOrder.forEach((order) => {
                        if (order.status == statusGetById) {
                            console.log(order.status)
                            htmlStatus += `
                             <div class="row order__date">
            <ul class="oder__date-list">
                <li class="order__date-item order__date-item--date">Date: ${order.createdAt}</li>
                <li class="order__date-item order__date-item--Total">Total: ${order.totalPrice}</li>
            </ul>
        </div>
        <div class="row order__info">
            <div class="col l-6">
                <div class="order__order__product">
                    <h3 class="order__order__product-h3">Sản phẩm</h3>
                </div>
            </div>
            <div class="col l-6">
                <div class="row">
                    <div class="col l-4">
                        <div class="order__details">
                            <h3 class="order__details-h3">Đơn giá</h3>
                        </div>
                    </div>
                    <div class="col l-4">
                        <div class="order__details">
                            <h3 class="order__details-h3">Số lượng</h3>
                        </div>
                    </div>
                    <div class="col l-4">
                        <div class="order__details">
                            <h3 class="order__details-h3">Thành tiền</h3>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="list__product"> `
                            order.listProduct.forEach(product => {
                                htmlStatus += `<div class="row order__product">
                <div class="col l-6">
                    <div class="order__product-info">
                        <img src="${product.productId.image}" alt="" class="order__product-info-img">
                        <h3 class="order__product-info-name">${product.productId.name}</h3>
                    </div>
                </div>
                <div class="col l-6">
                    <div class="row">
                        <div class="col l-4 order__product-bill">
                            <h3 class="order__product-bill-fee">${product.productId.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                            </h3 >
                        </div >
                        <div class="col l-4 order__product-bill--modifier">
                            <div class="order__product-bill-amount">
                                <span id="order__product-bill-amount"
                                    class="order__product-bill-amount-span">${product.quantity}</span>
                            </div>
                        </div>
                        <div class="col l-4 order__product-bill">
                            <h3 class="order__product-bill-fee-total">${(product.productId.price * product.quantity).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h3>
                        </div>
                    </div >
                </div >
            </div > `
                            })
                            htmlStatus += `</div >
                            <div class="order__cancel">
                                <button orderId="${order._id}" class="order__cancel-button">Hủy đơn hàng</button>
                            </div>`
                        }
                    })
                    if (htmlStatus != '') {
                        htmlStatusElement.innerHTML = htmlStatus;
                        document.querySelector('.order__no-product').style.display = 'none';
                        htmlStatus = '';
                    } else {
                        console.log('vao else')
                        htmlStatusElement.innerHTML = '';
                        document.querySelector('.order__no-product').style.display = 'block';
                        document.querySelector('.order__no-product').innerHTML = `
                         <img src="/images/no-cart.png" alt="" class="order__no-product-img">
                        <h3 class="order__no-product-h3">
                            Không có sản phẩm
                        </h3>
                        `;
                    }
                    var orderCancelList = document.querySelectorAll('.order__cancel-button');
                    orderCancelList.forEach(orderCancel => {
                        orderCancel.onclick = function () {
                            console.log('ok')
                            var overlay = document.querySelector('.overlay');
                            var popup = document.querySelector('.popup');
                            popup.style.display = 'block';
                            overlay.style.display = 'block';
                            let orderId = orderCancel.getAttribute('orderId');
                            console.log(orderId)
                            document.getElementById('order-cancel-btn-ok').addEventListener('click', () => {
                                $.ajax({
                                    url: '/my-order',
                                    method: 'PUT',
                                    data: {
                                        orderId: orderId,
                                    },
                                })
                                    .then((response) => {
                                        console.log(response);
                                        window.location.href = '/my-order'
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    })

                            })

                        }
                    })
                })

            })

        })
    var exitButton = document.querySelector('.pop__up-button-exit');
    exitButton.onclick = function () {
        var overlay = document.querySelector('.overlay');
        var popup = document.querySelector('.popup');
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }
    window.onload = function () {
        var orderCancelList = document.querySelectorAll('.order__cancel-button');
        orderCancelList.forEach(orderCancel => {
            orderCancel.onclick = function () {
                console.log('ok')
                var overlay = document.querySelector('.overlay');
                var popup = document.querySelector('.popup');
                popup.style.display = 'block';
                overlay.style.display = 'block';
                let orderId = orderCancel.getAttribute('orderId');
                console.log(orderId)
                document.getElementById('order-cancel-btn-ok').addEventListener('click', () => {
                    $.ajax({
                        url: '/my-order',
                        method: 'PUT',
                        data: {
                            orderId: orderId,
                        },
                    })
                        .then((response) => {
                            console.log(response);
                            window.location.href = '/my-order'
                        })
                        .catch((error) => {
                            console.log(error);
                        })

                })

            }
        })
    }