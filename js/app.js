import Anchors from './modules/anchors.js'
import Parallax from './modules/parallax-mouse.js'
import Popup from './modules/popup.js'

//Якоря
Anchors.init(false)
//Попапы
Popup.init()
//Пакалакс
Parallax.init()
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
}, {threshold: 0.7})

observerFooter.observe(footer)
//========================================================================================================================================================
const formPopup = document.getElementById("form-popup")
const form = document.getElementById("form")
const formInputs = form.querySelectorAll(".input")
const message = document.getElementById("form-message")

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const telnumRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm

function showMessage(isSuccess) {
    formPopup.classList.remove("opened")    
    message.classList.remove("show");
    message.classList.remove(isSuccess ? "error" : "success");
    void message.offsetWidth;
    message.classList.add("show");
    message.classList.add(isSuccess ? "success" : "error");
}

for (let input of formInputs) {
    input.addEventListener("input", e => {
        input.classList.remove("invalid")
    })
}

form.addEventListener('submit', e => {
    e.preventDefault()

    const data = new FormData(e.target);

    const fields = {
        clientName: data.get('clientName'),
        clientEmail: data.get('clientEmail'),
        clientTelnum: data.get('clientTelnum')

    }
    const invalidFields = []

    if (!emailRegex.test(fields.clientEmail)) {
        invalidFields.push("clientEmail")
    }

    if (!telnumRegex.test(fields.clientTelnum)) {
        invalidFields.push("clientTelnum")
    }

    for (let fieldName in fields) {
        const input = document.querySelector(`input[name="${fieldName}"]`)

        if (invalidFields.includes(fieldName)) {
            input.classList.remove("invalid")
            void message.offsetWidth;
            input.classList.add("invalid")
        } else {
            input.classList.remove("invalid")
        }
    }

    if (invalidFields.length > 0) return

    emailjs.sendForm('whatswronglera', 'template_qbndgap', form, 'TXdZFdiI-YnLf0CuC')
        .then(() => {
            showMessage(true)
        }, () => {            
            showMessage(false)
        });
})

