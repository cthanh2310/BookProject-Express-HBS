var observe;
if (window.attachEvent) {
    observe = function (element, event, handler) {
        element.attachEvent('on' + event, handler);
    };
}
else {
    observe = function (element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}
function init() {
    var review__textarea = document.getElementById('review__textarea');
    function resize() {
        review__textarea.style.height = '25px';
        review__textarea.style.height = review__textarea.scrollHeight + 'px';
    }
    /* 0-timeout to get the already changed review__textarea */
    function delayedResize() {
        window.setTimeout(resize, 0);
    }
    observe(review__textarea, 'change', resize);
    observe(review__textarea, 'cut', delayedResize);
    observe(review__textarea, 'paste', delayedResize);
    observe(review__textarea, 'drop', delayedResize);
    observe(review__textarea, 'keydown', delayedResize);

    review__textarea.focus();
    review__textarea.select();
    resize();
}
window.onload = init();