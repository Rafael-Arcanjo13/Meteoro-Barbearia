const btnNext = document.getElementById('nextSlide');
const btnPrevious = document.getElementById('previousSlide');
const slider = document.querySelector('.slider');
const content = document.querySelector('.slider-content');

const  { width: contentWidth } = window.getComputedStyle(content);

let currentSlide = 0;

const slideProps = {
    scroll: 0,
}

function setCurrentDot() {
    const dots = document.querySelectorAll('.dot');
    for (let dot of dots) {
        dot.classList.remove('current');
    }
    dots[currentSlide].classList.add('current');
}

function controlSlide(event) {
    const { id } = event.currentTarget;
    const slideWidth = slider.clientWidth;

    switch (id) {   
        case 'nextSlide': {
            const contentLength = content.children.length;
            if (slideProps.scroll + slideWidth < parseInt(contentWidth)) {
                slideProps.scroll += slideWidth;
            }
            if (currentSlide < contentLength - 1) {
                currentSlide += 1;
                setCurrentDot();
            }
            return slider.scrollLeft = slideProps.scroll;
        }
            
        case 'previousSlide': {
            if (currentSlide > 0) {
                currentSlide -= 1;
                setCurrentDot();
            }
            slideProps.scroll = slideProps.scroll - slideWidth < 0 ? 0 : slideProps.scroll - slideWidth;
            return slider.scrollLeft = slideProps.scroll;
        }


        default:
            break;
    }
}

btnNext.addEventListener('click', controlSlide);
btnPrevious.addEventListener('click', controlSlide);

window.onload = () => {
    const contentLength = content.children.length;
    for (let index = 0; index < contentLength - 1; index += 1) {
        const newDot = slider.parentElement.querySelector('.dot').cloneNode();
        slider.parentElement.querySelector('.length-dots').appendChild(newDot);
    };
    setCurrentDot();
}