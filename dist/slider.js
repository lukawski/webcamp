'use strict';

function Slider() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        mode: 'slide',
        interval: true
    };

    var el = document.querySelector('.slider');
    var slides = document.querySelectorAll('.slide');
    var currentEl = 0;
    var slidesLength = slides.length;
    var translateValue = void 0;
    var duplicate = void 0;

    var fragment = document.createDocumentFragment();
    var btnContainer = document.createElement('div');
    btnContainer.classList.add('buttons');
    for (var i = 0; i < slidesLength; i++) {
        var btn = document.createElement('button');
        if (i === 0) btn.classList.add('active');
        btnContainer.appendChild(btn);
    }
    fragment.appendChild(btnContainer);
    el.appendChild(fragment);

    var btns = document.querySelectorAll('.buttons button');

    function slideRight() {
        right = setInterval(function () {
            console.log(currentEl);
            btns[currentEl].classList.toggle('active');
            if (currentEl) btns[currentEl - 1].classList.toggle('active');

            duplicate = slides[currentEl].cloneNode(true);
            translateValue = (currentEl + 1) * 100;
            console.log(translateValue, currentEl);
            slides = document.querySelectorAll('.slide');
            for (var _i = 0; _i < slidesLength; _i++) {
                slides[_i].style.transform = 'translateX(' + translateValue + '%)';
            }
            currentEl--;
        }, 5000);
    }

    var right = void 0,
        left = void 0;

    function stop(interval) {
        clearInterval(interval);
    }

    function slideLeft() {
        left = setInterval(function () {
            btns[currentEl].classList.toggle('active');
            btns[currentEl + 1].classList.toggle('active');

            duplicate = slides[currentEl].cloneNode(true);
            translateValue = (currentEl + 1) * 100;
            console.log(translateValue, currentEl);
            slides = document.querySelectorAll('.slide');
            for (var _i2 = 0; _i2 < slidesLength; _i2++) {
                slides[_i2].style.transform = 'translateX(-' + translateValue + '%)';
            }
            currentEl++;
        }, 5000);
    }
    slideLeft();

    document.addEventListener('transitionend', function (e) {
        if (currentEl === slidesLength - 1) {
            stop(left);
            slideRight();
        } else if (!currentEl) {
            stop(right);
            slideLeft();
        }
    });
}