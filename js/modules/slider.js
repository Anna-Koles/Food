function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter,wrapper, field}) {
    const slides = document.querySelectorAll(slide),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        counter = document.querySelector(".offer__slider-counter"), // только для моего варианта простого
        // выше были для простого, для слайдера-карусели дополнительно нужны:
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector(field),
        slider = document.querySelector(container),
        indicators = document.createElement('ol'),
        dots = []; // чтобы использовать push

    let  slideIndex = 1;
    let offset = 0;

// простой (полностью мой вариант)

    // showSlide(slideIndex);

    // function showSlide(i) {
        
    //     if (i > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (i < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => {
    //         item.classList.add('hide');
    //         item.classList.remove('show', 'fade');
    //     });

    //     slides[slideIndex - 1].classList.add('show', 'fade');
    //     slides[slideIndex - 1].classList.remove('hide');

    //     if (slides.length < 10) {
    //         current.textContent =  `0${slideIndex}`;
    //         total.textContent =  `0${slides.length}`;
    //     } else {
    //         current.textContent =  slideIndex;
    //         total.textContent =  slides.length;
    //     }
    // }    

    // counter.addEventListener('click', (event) => {
	// 	const target = event.target;
	// 	if(target && target.classList.contains('offer__slider-prev')) {
    //         showSlide(slideIndex);
    //         slideIndex -= 1;
    //     } else {
    //         if(target && target.classList.contains('offer__slider-next')) {
    //             showSlide(slideIndex);
    //             slideIndex += 1;
    //         }
    //     }
    // });

// вариант преподавателя (простой слайдер)

    // let slideIndex = 1;
    // const slides = document.querySelectorAll('.offer__slide'),
    //     prev = document.querySelector('.offer__slider-prev'),
    //     next = document.querySelector('.offer__slider-next'),
    //     total = document.querySelector('#total'),
    //     current = document.querySelector('#current');

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach((item) => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block'; 
        
    //     if (slides.length < 10) {
    //         current.textContent =  `0${slideIndex}`;
    //     } else {
    //         current.textContent =  slideIndex;
    //     }
    // }

    // function plusSlides (n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', function(){
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', function(){
    //     plusSlides(1);
    // });

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }
    
    function zeroInCurrent(items) {
        if (items.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }
    }
    zeroInCurrent(slides);
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;`;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    function dotsOpacity(arr) {
        arr.forEach(item => item.style.opacity = ".5");
        arr[slideIndex-1].style.opacity = 1;
    }
     
    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        zeroInCurrent(slides);

        dotsOpacity(dots);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        zeroInCurrent(slides);

        dotsOpacity(dots);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            zeroInCurrent(slides);

            dotsOpacity(dots);
        });
    });
}
export default slider;
