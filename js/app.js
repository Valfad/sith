import Anchors from './modules/anchors.js'
import MousePRLX from './modules/parallax-mouse.js'

//Инициализация
//========================================================================================================================================================
//Кастомный селект
//Select.init(true)

//Якоря
Anchors.init(false)

new MousePRLX()

//========================================================================================================================================================

const themeButton = document.querySelector('.header__theme')
const wrapper = document.querySelector('.wrapper')
const header = document.querySelector('.header')
const footer = document.querySelector('.footer')

themeButton.addEventListener("click", e => {
	if(wrapper.dataset.theme == 'light') return wrapper.dataset.theme = 'dark'
	return wrapper.dataset.theme = 'light'
});

window.addEventListener('scroll', e => {
	return header.classList.toggle('fixed', window.scrollY > 0)	
})

let observerFooter = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		header.classList.toggle('hidden', entry.isIntersecting)
	},)
}, {threshold: 0.7,})

observerFooter.observe(footer)

