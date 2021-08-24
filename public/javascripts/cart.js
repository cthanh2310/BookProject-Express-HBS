var feeShip = 15000;
var totalPay = 0;
(function () {  //Immediately invoked function expression
    feeShip = feeShip.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    var payShipFee = document.querySelector('.pay__ship-fee');
    payShipFee.append(feeShip);
    var listBill = document.querySelectorAll('.product__bill-fee-total');
    listBill.forEach((element) => {
        var eachBill = element.innerHTML;
        eachBill = eachBill.replaceAll('đ', '').replaceAll('.', '').replaceAll('&nbsp;₫', '');
        eachBill = parseInt(eachBill);
        totalPay = totalPay + eachBill;
    })
    totalPay += 15000;
    document.querySelector('.pay__ship-total-h3').innerHTML = totalPay.toLocaleString('vi', { style: 'currency', currency: 'VND' });;

    var subList = document.querySelectorAll('.product');
    subList.forEach((element) => {
        var subButton = element.querySelector('#product__bill-amount-sub');
        subButton.onclick = () => {
            var totalPay = 0;
            var currentAmount = element.querySelector('#product__bill-amount').innerHTML;
            currentAmount = parseInt(currentAmount);
            if (currentAmount > 1) {
                currentAmount--;
                element.querySelector('#product__bill-amount').innerHTML = currentAmount;
                var fee = element.querySelector('.product__bill-fee').innerHTML;
                var newFee = fee.replace('.', '');
                newFee = parseInt(newFee);
                var feeTotal = element.querySelector('.product__bill-fee-total').innerHTML;
                feeTotal = newFee * currentAmount;
                feeTotal = feeTotal.toLocaleString('vi', { style: 'currency', currency: 'VND' });
                element.querySelector('.product__bill-fee-total').innerHTML = feeTotal;
            }
            var listBill = document.querySelectorAll('.product__bill-fee-total');
            listBill.forEach((element) => {
                var eachBill = element.innerHTML;
                eachBill = eachBill.replaceAll('đ', '').replaceAll('.', '').replaceAll('&nbsp;₫', '');
                eachBill = parseInt(eachBill);
                totalPay = totalPay + eachBill;
            })
            totalPay += 15000;
            document.querySelector('.pay__ship-total-h3').innerHTML = totalPay.toLocaleString('vi', { style: 'currency', currency: 'VND' });;

        }
        var sumButton = element.querySelector('#product__bill-amount-sum');
        sumButton.onclick = () => {
            var totalPay = 0;
            var currentAmount = element.querySelector('#product__bill-amount').innerHTML;
            currentAmount = parseInt(currentAmount);
            if (currentAmount <= 99) {
                currentAmount++;
                element.querySelector('#product__bill-amount').innerHTML = currentAmount;
                var fee = element.querySelector('.product__bill-fee').innerHTML;
                var newFee = fee.replace('.', '');
                newFee = parseInt(newFee);
                var feeTotal = element.querySelector('.product__bill-fee-total').innerHTML;
                feeTotal = newFee * currentAmount;
                feeTotal = feeTotal.toLocaleString('vi', { style: 'currency', currency: 'VND' });
                element.querySelector('.product__bill-fee-total').innerHTML = feeTotal;
            }
            var listBill = document.querySelectorAll('.product__bill-fee-total');
            listBill.forEach((element) => {
                var eachBill = element.innerHTML;
                eachBill = eachBill.replaceAll('đ', '').replaceAll('.', '').replaceAll('&nbsp;₫', '');
                eachBill = parseInt(eachBill);
                totalPay = totalPay + eachBill;
            })
            totalPay += 15000;
            document.querySelector('.pay__ship-total-h3').innerHTML = totalPay.toLocaleString('vi', { style: 'currency', currency: 'VND' });;

        }
    })
})()

// POPUP SHOW MESSAGE
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
        console.log(popup.lastElementChild.lastElementChild)
        popup.lastElementChild.lastElementChild.addEventListener('click', function () { // get button element
            event.preventDefault();
            console.log('ok');
            var deleteForm = document.forms['form-delete']; // get form element by name
            deleteForm.action = '/cart/' + dataId + '?_method=DELETE';
            console.log(deleteForm);
            deleteForm.submit();
        })
    }
})

// payment
var paymentButton = document.querySelector('.personal__info-payment-button');
var listBook = [];
paymentButton.onclick = () => {
    console.log('Da thanh toan!');
    var cartId = document.querySelector('#cart-id').value;
    var customerName = document.querySelector('.personal__info-name-input').value;
    var customerAddress = document.querySelector('.personal__info-address-input').value;
    var customerPhone = document.querySelector('.personal__info-phone-number-input').value;
    var totalPrice = document.querySelector('.pay__ship-total-h3').innerHTML;
    totalPrice = parseInt(totalPrice.replaceAll('.', ''));
    var listProduct = document.querySelectorAll('.product');
    listProduct.forEach((product) => {
        var bookId = product.querySelector('.product__bill-amount-icon-cancel').getAttribute('bookId');
        console.log(bookId);
        var quantity = parseInt(product.querySelector('#product__bill-amount').innerHTML);
        listBook.push({ productId: bookId, quantity: quantity, });
    })
    axios.post('/cart', { cartId, customerName, customerAddress, customerPhone, totalPrice, listBook })
        .then(response => {
            window.location.href = "/my-order";
        })
        .catch(error => {
            console.log(error);
        })
}
