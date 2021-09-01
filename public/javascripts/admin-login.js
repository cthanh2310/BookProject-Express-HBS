function resetErrorAdmin() {
    let listErrorSpan = document.querySelectorAll('.span-validate');
    listErrorSpan.forEach((error) => {
        error.innerHTML = '';
    })
}
function loginAdmin() {
    let loginBtn = document.getElementById('login-btn');
    loginBtn.addEventListener('click', () => {
        let password = document.getElementById('password').value;
        let email = document.getElementById('email').value;
        axios.post('/admin/login', { email, password })
            .then((response) => {
                window.location.href = '/admin/dashboard'
            })
            .catch((error) => {
                console.log('voo error' + error.response.data.message);
                let errorResponse = error.response.data;
                switch (errorResponse.type) {
                    case 'notAdminAccount':
                        resetErrorAdmin()
                        document.getElementById('email-span').innerHTML = errorResponse.message;
                        break;
                    case 'wrongPassword':
                        resetErrorAdmin()
                        document.getElementById('password-span').innerHTML = errorResponse.message;
                        break;
                }
            })
    })

}


window.onload = loginAdmin;
