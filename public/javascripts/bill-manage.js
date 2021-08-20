var bodyHTML = ``;
var listOrder;
var listOrderBody = document.querySelector('#listOrderBody');
var updateStatusBtn = document.querySelector('#update-status-btn');
var orderIdAndStatusObject = [];
(function () {
    axios.get('/admin/bill-manage/get-data')
        .then(response => {
            listOrder = response.data;
            console.log(listOrder);
            listOrder.forEach(order => {
                if (order.status == "pending") {
                    bodyHTML +=
                        `
                        <tr>
                            <td>${order.customerName}</td>
                            <td>${order.customerAddress}</td>
                            <td>${order.customerPhone}</td>
                            <td class="td__img-modifier"> 
                            <ul>
                    `
                    order.listProduct.forEach(product => {
                        bodyHTML +=
                            `
                            <li>${product.productId.name}(${product.quantity} quyển) </li>
                        `
                    })
                    bodyHTML += `
                        </ul>
                        </td>
                        <td>${order.totalPrice}</td>
                        <td>
                            <div class="status__info">
                                <input type="hidden" value=${order._id} id="orderId"> `
                    bodyHTML += ` 
                             <select name="status" id="status">
                                    <option value="pending" selected="selected">Đang chờ xử lí</option>
                                    <option value="delivering">Đang giao hàng</option>
                                    <option value="delivered">Đã giao hàng</option>
                                </select>
                                <div>
                        </td>
                    </tr>`
                }


            })
            listOrderBody.innerHTML = bodyHTML;
        })
        .catch(error => {
            console.log(error)
        })
    // fetch('/admin/bill-manage/get-data')
})()
function changeFunc() {
    var selectBox = document.getElementById("statusAll");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    switch (selectedValue) {
        case "pendingAll":
            console.log("pending")
            listOrderBody.innerHTML = '';
            bodyHTML = '';
            listOrder.forEach(order => {
                console.log(order)
                if (order.status == "pending") {
                    bodyHTML +=
                        `
                        <tr>
                            <td>${order.customerName}</td>
                            <td>${order.customerAddress}</td>
                            <td>${order.customerPhone}</td>
                            <td class="td__img-modifier"> 
                            <ul>
                    `
                    order.listProduct.forEach(product => {
                        bodyHTML +=
                            `
                            <li>${product.productId.name}(${product.quantity} quyển) </li>
                        `
                    })
                    bodyHTML += `
                        </ul>
                        </td>
                        <td>${order.totalPrice}</td>
                        <td>
                            <div class="status__info">
                                <input type="hidden" value=${order._id} id="orderId"> `
                    bodyHTML += ` 
                             <select name="status" id="status">
                                    <option value="pending" selected="selected">Đang chờ xử lí</option>
                                    <option value="delivering">Đang giao hàng</option>
                                    <option value="delivered">Đã giao hàng</option>
                                </select>
                                <div>
                        </td>
                    </tr>`
                }


            })
            listOrderBody.innerHTML = bodyHTML;
            break;
        case "deliveringAll":
            console.log("deliveringAll")
            listOrderBody.innerHTML = '';
            bodyHTML = '';
            listOrder.forEach(order => {
                console.log(order)
                if (order.status == "delivering") {
                    bodyHTML +=
                        `
                        <tr>
                            <td>${order.customerName}</td>
                            <td>${order.customerAddress}</td>
                            <td>${order.customerPhone}</td>
                            <td class="td__img-modifier"> 
                            <ul>
                    `
                    order.listProduct.forEach(product => {
                        bodyHTML +=
                            `
                            <li>${product.productId.name}(${product.quantity} quyển) </li>
                        `
                    })
                    bodyHTML += `
                        </ul>
                        </td>
                        <td>${order.totalPrice}</td>
                        <td>
                            <div class="status__info">
                                <input type="hidden" value=${order._id} id="orderId"> `
                    bodyHTML += ` 
                             <select name="status" id="status">
                                    <option value="pending" >Đang chờ xử lí</option>
                                    <option value="delivering" selected="selected">Đang giao hàng</option>
                                    <option value="delivered">Đã giao hàng</option>
                                </select>
                                <div>
                        </td>
                    </tr>`
                }
            })
            listOrderBody.innerHTML = bodyHTML;
            break;
        case "deliveredAll":
            console.log("deliveredAll");
            listOrderBody.innerHTML = '';
            bodyHTML = '';
            listOrder.forEach(order => {
                if (order.status == "delivered") {
                    console.log(order)
                    bodyHTML +=
                        `
                        <tr>
                            <td>${order.customerName}</td>
                            <td>${order.customerAddress}</td>
                            <td>${order.customerPhone}</td>
                            <td class="td__img-modifier"> 
                            <ul>
                    `
                    order.listProduct.forEach(product => {
                        bodyHTML +=
                            `
                            <li>${product.productId.name}(${product.quantity} quyển) </li>
                        `
                    })
                    bodyHTML += `
                        </ul>
                        </td>
                        <td>${order.totalPrice}</td>
                        <td>
                            <div class="status__info">
                                <input type="hidden" value=${order._id} id="orderId"> `
                    bodyHTML += ` 
                             <select name="status" id="status">
                                    <option value="pending" >Đang chờ xử lí</option>
                                    <option value="delivering">Đang giao hàng</option>
                                    <option value="delivered"  selected="selected">Đã giao hàng</option>
                                </select>
                                <div>
                        </td>
                    </tr>`
                }


            })
            listOrderBody.innerHTML = bodyHTML;
            break;
    }

}



updateStatusBtn.addEventListener('click', () => {
    var orderIdAndStatusList = document.querySelectorAll('.status__info');
    orderIdAndStatusList.forEach((orderIdAndStatus) => {
        var orderId = orderIdAndStatus.querySelector('#orderId').value;
        var statusElement = orderIdAndStatus.querySelector('#status');
        var status = statusElement.options[statusElement.selectedIndex].value;
        console.log('orderId: ' + orderId + ' status: ' + status);
        orderIdAndStatusObject.push({ orderId: orderId, status: status });
        // orderIdAndStatus.push(status);
    })
    console.log(orderIdAndStatusObject);
    axios.put('/admin/bill-manage', orderIdAndStatusObject)
        .then(function (response) {
            alert(response.data.status)
        })
        .catch(function (error) {
            console.log(error.message);
        })
})
