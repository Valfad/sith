class Popup{
	constructor(elem){
		this.popup = elem;
		this.href = this.popup.id;

		this.links = [...document.querySelectorAll(`[href="#${this.href}"]`)];

		document.addEventListener('click', (event) => {
			if(this.isOpened && !event.target.closest('.popup__content')){
				event.preventDefault();
				this.isOpened = false;
			}
			if(this.links.includes(event.target)){
				event.preventDefault();
				this.isOpened = true;
			} 
		});		
	}		
	
	set isOpened(bool){
		if(bool){
			return this.popup.classList.add('opened');
		}	
		return this.popup.classList.remove('opened');		
	}
	get isOpened(){
		return this.popup.classList.contains('opened')
	}

	static init = () => {
		const popupElements = document.querySelectorAll('[data-popup]');
		for(let popupElem of popupElements){
			new Popup(popupElem);
		}
	}
}

export default Popup;
