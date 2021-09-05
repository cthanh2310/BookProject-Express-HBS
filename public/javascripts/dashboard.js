function toggleMenu() {
    let toggle = document.querySelector('.main__topbar-toggle');
    let navigation = document.querySelector('.navigation');
    let main = document.querySelector('.main');
    toggle.classList.toggle('active'); // toggle: check if true: remove, if false : add
    navigation.classList.toggle('active');
    main.classList.toggle('active');

}
(function () {
    let btn_statistical = document.querySelector('.navigation__list-item-link--statistical');
    btn_statistical.onclick = function () {
        let ul_statistical = document.querySelector('.navigation__list-item--statistical');
        let icon = document.querySelector('.navigation__list-item-icon-dropdown');

        icon.classList.toggle('rotate');
        ul_statistical.classList.toggle('show');
    }
    // let list_item = document.querySelectorAll('.navigation__list-item-link');
    //     list_item.forEach(item =>{
    //         item.onclick = () =>{
    //             item.classList.toggle('click');
    //             console.log(item);
    //         }
    //     })
})()
// (function(){
//     let nav__list = document.querySelectorAll('.navigation__list-item');
//     nav__list.forEach((element) =>{
//         element.onclick = ()=>{
//             console.log(2);
//             element.style.borderLeft = "5px solid #00ecff";
//         }
//     })
// })()
function logoutAdmin() {
    function setCookie(cname, cvalue, exMins) {
        var d = new Date();
        d.setTime(d.getTime() + (exMins * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    const logout = document.getElementById('admin-logout');
    if (logout) {
        logout.addEventListener('click', function () {
            setCookie('token', '', 0)
            console.log('ok');
        })

    }

}

window.onload = logoutAdmin;