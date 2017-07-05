function Slider(options = {
    mode: 'slide',
    interval: true,
}) {
    const el = document.querySelector('.slider');
    let slides = document.querySelectorAll('.slide');
    let currentEl = 0;
    const slidesLength = slides.length;
    let translateValue;
    let duplicate;

    let fragment = document.createDocumentFragment();
    let btnContainer = document.createElement('div');
    btnContainer.classList.add('buttons');
    for (let i = 0; i < slidesLength; i++) {
        let btn = document.createElement('button');
        if (i === 0) btn.classList.add('active');
        btnContainer.appendChild(btn);
    }
    fragment.appendChild(btnContainer);
    el.appendChild(fragment);

    const btns = document.querySelectorAll('.buttons button');

    function slideRight() {
        right = setInterval(() => {
            console.log(currentEl);
            btns[currentEl].classList.toggle('active');
            if (currentEl) btns[currentEl - 1].classList.toggle('active');

            duplicate = slides[currentEl].cloneNode(true);
            translateValue = (currentEl + 1) * 100;
            console.log(translateValue, currentEl);
            slides = document.querySelectorAll('.slide')
            for (let i = 0; i < slidesLength; i++) {
                slides[i].style.transform = `translateX(${translateValue}%)`;
            }
            currentEl--;
        }, 5000);
    }

    let right, left;

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
            slides = document.querySelectorAll('.slide')
            for (let i = 0; i < slidesLength; i++) {
                slides[i].style.transform = `translateX(-${translateValue}%)`;
            }
            currentEl++;
        }, 5000);
    }
    slideLeft();

    document.addEventListener('transitionend', e => {
        if (currentEl === slidesLength - 1) {
            stop(left);
            slideRight();
        } else if (!currentEl) {
            stop(right);
            slideLeft();
        }
    });
}