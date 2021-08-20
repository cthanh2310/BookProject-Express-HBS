const form = document.getElementById("register_form")
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(this);
    var formObject = {};
    // conver formData to Object
    formData.forEach((value, key) => formObject[key] = value);
    console.log(JSON.stringify(formObject));
    $.ajax({
        url: '/auth/register',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(formObject),
        processData: false,
        dataType: 'json',

    }).done(function (data) {
        // If successful
        console.log("data: " + JSON.stringify(data));
        alert(JSON.stringify(data.status));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        console.log(textStatus + ': ' + errorThrown);
    });

});