var saveButton = document.querySelector('#btn--save-id');
saveButton.addEventListener('click', function () {
    console.log(23)
    var userIdElement = document.querySelector('#userId');
    userId = userIdElement.value;
    var fullname = document.querySelector('#fullname').value;
    var address = document.querySelector('#address').value;
    var phoneNumber = document.querySelector('#phone-number').value;
    var listGender = document.getElementsByName('gender');
    var gender;
    for (var i = 0; i < listGender.length; i++) {
        if (listGender[i].checked) {
            gender = listGender[i].value;
        }
    }
    var dob = document.querySelector('#dob').value;
    var avatar = document.querySelector('#avatar-file').files;
    var formData = new FormData();
    formData.append('userId', userId)
    formData.append('fullname', fullname)
    formData.append('address', address)
    formData.append('phoneNumber', phoneNumber)
    formData.append('gender', gender)
    formData.append('dob', dob)
    formData.append('avatar-file', avatar[0])
    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    var contenttype = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };
    axios.put('/profile', formData)
        .then(response => {
            alert('Cập nhật thông tin thành công!')
        })
        .catch(error => {
            console.log(error)
        })
})