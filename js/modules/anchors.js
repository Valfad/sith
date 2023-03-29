//Якоря
//Вешаем на ссылки атрибут data-anchor, и в самой ссылке указываем id блока страницы с решёткой
//Для корректной работы также стоит указать блокам страницы класс page__block
//========================================================================================================================================================
const header = document.querySelector('.header');
const page = document.querySelector('.page');
const pageBlocks = page?.children;

class Anchors{
	constructor(){
		this.anchors = [];

		let anchorsElems = document.querySelectorAll('[data-anchor]');	
		for(let elem of anchorsElems){			
			let anchor = new Anchor(elem);
			if(!anchor.href || !anchor.to) continue;
			this.anchors.push(anchor);
		}			

        document.addEventListener("click", (event) => {
            let target = event.target.closest('[data-anchor]');
            if(!target) return;

            event.preventDefault();

            this.removeScrollListener();
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(this.addScrollListener, 800);

            let anchor = this.getAnchor(target.getAttribute('href').slice(1));
            
            if(!anchor) return;
            this.changeActiveAnchor(anchor);
            anchor.scrollTo();
        });

		this.addScrollListener();
		this.scrollHandler();
	}

    removeScrollListener = () => {
        window.removeEventListener("scroll", this.scrollHandler);
    }
    addScrollListener = () => {
        window.addEventListener("scroll", this.scrollHandler);
    }

    scrollHandler = () => {
        let newCurrentSection = this.getCurrentSection();

        if(this.currentSection == newCurrentSection) return;
        
        this.currentSection = newCurrentSection;
        let currentSectionId = this.getSectionId(this.currentSection);

        if(!currentSectionId && !this.fill) return this.removeActiveAnchor()
        if(!currentSectionId) return;

        let anchor = this.getAnchor(currentSectionId, true);

        if(!anchor) return;

        return this.changeActiveAnchor(anchor);
    }

    changeActiveAnchor = (anch) => {
        if(this.currentActiveAnchor == anch) return;	
        if(this.currentActiveAnchor) this.currentActiveAnchor.active = false;		
        this.currentActiveAnchor = anch;
        return this.currentActiveAnchor.active = true;
    }

    removeActiveAnchor = () => {
        if(!this.currentActiveAnchor) return
        this.currentActiveAnchor.active = false;	
        this.currentActiveAnchor = null
    }

    getAnchor(token, onlyThatReact){
        for(let anchor of this.anchors){			
            if(onlyThatReact && !anchor.canReact) continue;	
            //Если элемент
            if(token != anchor.elem && (token instanceof Element || token instanceof Document)) continue; 
            //Если ссылка
            if(token != anchor.href && !(token instanceof Element || token instanceof Document)) continue; 
            return anchor;
        }	
    }

	getSectionId(pageSection){
		if(!pageSection) return;
		return pageSection.id || pageSection.dataset.corId;
	}

	getCurrentSection = () => {
		//текущий блок страницы, на котором находятся пользователь	
		//если мы в самом низу
		if(this.fill){
			if ((document.documentElement.clientHeight + window.pageYOffset) >= Math.max(document.body.scrollHeight, 
				document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, 
				document.body.clientHeight, document.documentElement.clientHeight)) return pageBlocks[pageBlocks.length-1];
        }
		return document.elementFromPoint(310, header.offsetHeight+1).closest('.page-block');
	}
	
	static init = (fill) => {
		new Anchors(fill);
	}
}

class Anchor{
	constructor(elem){
		try{
			if(!elem.hasAttribute('data-anchor')) throw new Error('Упс, кажется элемент не является якорем');		
			
			this.elem = elem;
			this.canReact = this.elem.dataset.anchor == 'no-react' ? false : true;
			
			this.href = elem?.getAttribute('href')?.slice(1);

			if(!this.href) throw new Error(`Упс, кажется у какого-то якоря нет ссылки`);
			if(!this.to) throw new Error(`Упс, кажется ссылка какого-то якоря недействительна`);
		}
		catch(error){
			console.log(error);
		}
	}

	get to(){
		return document.getElementById(this.href);
	}

	scrollTo = () => {	
		window.scrollTo({
			top: this.getScrollDistanceTo(),
			behavior: "smooth"
		});
	}

	getScrollDistanceTo = () => {
		if(!this.to) return;
		let elemPosition = this.to.getBoundingClientRect().top;

		if(header.dataset.orientation != 'top') return elemPosition && elemPosition + window.pageYOffset;
		return elemPosition && elemPosition + window.pageYOffset - header.offsetHeight;
	}

	get active(){
		return this.elem.classList.contains('active');
	}
	set active(bool){
		if(bool)	return this.elem.classList.add('active');
		this.elem.classList.remove('active')
	}
}

export default Anchors;

