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
            if (currentAmount >= 1) {
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