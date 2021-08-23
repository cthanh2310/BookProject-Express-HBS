(function() {
    
    var exitButton = document.querySelector('.pop__up-button-exit');
    exitButton.onclick = function(){
        var overlay = document.querySelector('.overlay');
        var popup = document.querySelector('.popup');
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }
    var orderCancel = document.querySelector('.order__cancel-button');
    orderCancel.onclick = function(){
        var overlay = document.querySelector('.overlay');
        var popup = document.querySelector('.popup');
        popup.style.display = 'block';
        overlay.style.display = 'block';
    }

})()

function orderCancel(){
    

}