class Parallax {
	constructor(elem) {
const paramСoefficientX = elem.dataset.prlxCx ? +elem.dataset.prlxCx : 100;
const paramСoefficientY = elem.dataset.prlxCy ? +elem.dataset.prlxCy : 100;
const paramAnimation = elem.dataset.prlxA ? +elem.dataset.prlxA : 50;

let positionX = 0, positionY = 0;
let coordXprocent = 0, coordYprocent = 0;

setMouseParallaxStyle();

mouseMoveParalax();

function setMouseParallaxStyle() {
    const distX = coordXprocent - positionX;
    const distY = coordYprocent - positionY;
    positionX = positionX + (distX * paramAnimation / 1000);
    positionY = positionY + (distY * paramAnimation / 1000);
    elem.style.cssText = `transform: translate3D(${positionX / (paramСoefficientX / 10)}%,${positionY / (paramСoefficientY / 10)}%,0);`;
    requestAnimationFrame(setMouseParallaxStyle);
}

function mouseMoveParalax(wrapper = window) {
    wrapper.addEventListener("mousemove", function (e) {
        const offsetTop = elem.getBoundingClientRect().top + window.scrollY;
        if (offsetTop >= window.scrollY || (offsetTop + elem.offsetHeight) >= window.scrollY) {
            const parallaxWidth = window.innerWidth;
            const parallaxHeight = window.innerHeight;
            const coordX = e.clientX - parallaxWidth / 2;
            const coordY = e.clientY - parallaxHeight / 2;
            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
        }
    });
}
	}

    static init = () => {
        const paralaxElems = document.querySelectorAll('[data-prlx-mouse]');
        for (let paralaxElem of paralaxElems) {
            new Parallax(paralaxElem)
        }        
	}
}

export default Parallax

