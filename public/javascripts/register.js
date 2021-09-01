function init() {
    const form = document.getElementById("register_form")
    function resetError() {
        let listErrorSpan = document.querySelectorAll('.span-validate');
        listErrorSpan.forEach((errorSpan) => {
            errorSpan.innerHTML = '';
        })
    }
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var formData = new FormData(this);
        var formObject = { };
        // conver formData to Object
        formData.forEach((value, key) => formObject[key] = value);
        $.ajax({
            url: '/auth/register',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(formObject),
            processData: false,
            dataType: 'json',

        })
            .then((data) => {
                resetError();
                alert(JSON.stringify(data.status));
            })
            .catch((err) => {
                let errResponse = err.responseJSON;
                switch (errResponse.type) {
                    case 'emailNotMatch':
                        resetError();
                        document.getElementById('wrong-email').innerHTML = errResponse.message;
                        break;
                    case 'emailExist':
                        resetError();
                        document.getElementById('wrong-email').innerHTML = errResponse.message;
                        break;
                    case 'passwordNotMatch':
                        resetError();
                        document.getElementById('wrong-password').innerHTML = errResponse.message;
                        break;
                    case 'twoPasswordNotMatch':
                        resetError();
                        document.getElementById('wrong-confirm-password').innerHTML = errResponse.message;
                        break;
                }
            })

    });
}
window.onload = init();
