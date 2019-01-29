'use strict';


export class UVaSlideshow extends HTMLElement {
	// Elemento base del slideshow, vamos el slideshow en si
	// dentro se crean los slideshow-elements que son las imagenes y los slideshow-dots que son los puntitos

  static get is() {
    return 'uva-slideshow';
  }
  
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
			//Numero de elementos a mostrar cada vez
			this._datashow=1;
			//Numero de elementos en total
			this._datanum=4;

			this._indice = 0;
			this._childs = 0;
			this._objects = [];
			this._dots = [];
			this._auto=false;
			this._timer = undefined;
			// Opciones por defecto
			this._options= {
				slideIndex: 0,
				timming: 5000,
				automated: true,
				num_show: 3,
				dots: true,
			};
			//Funciones
			this._show = this._show.bind(this);
			this._next = this._next.bind(this);
			this._onclick = this._onclick.bind(this);
			this._render_element = this._render_element.bind(this);
			this._dot_click = this._dot_click.bind(this);
			//Shadow
			let shadowRoot = this.attachShadow({mode: 'open'});
			this.shadowRoot.innerHTML = `
				<style>
				:host {
					overflow: hidden;
					text-align: center; 
					
					
				}
				@media screen and (max-width: 1199px) {
					height: 380px;
				}

				@media screen and (max-width: 999px) {
					height: 300px;
				}

				@media screen and (max-width: 769px) {
					height: 200px;
				}

				@media screen and (max-width: 400px) {
					height: 180px;
				}
				#slide-elements, #dots {
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 0.5em;
				}
				</style>
				<div id="slide-elements"></div>
				<div id="dots"></div>
				`;
		} catch(err) {
			alert('Lo sentimos.\r\nHa habido un error: Sx01');
			throw 'Ha habido un error al crear el componente del Slideshow: '+ err;
		} finally {
			// Opciones del slideshow aqui
			// Tiempo del slideshow en atributo "timming" en milisegundos
			if (this.getAttribute('timming')) {
				this._options.timming = this.getAttribute('timming');
			}
			// Se mueve solo?, esta automatico?
			if (this.getAttribute('auto')) {
				this._auto = this.getAttribute('auto');
			}
			// El numero en el que llega
			if (this.getAttribute('num')) {
				this._datanum = this.getAttribute('num');
			}
			// El show, el mostrar o no
			if (this.getAttribute('show')) {
				this._datashow = this.getAttribute('show');
			}
		}
	}

	connectedCallback() {
		// Cuando monta el elemento

		//Funciones 
		this.addEventListener('click', this._onclick);
		this.addEventListener('slideshowimg_render',this._render_element);
		this.addEventListener('slideshowdot_click',this._dot_click);
		this._loadChilds();
		this._render();
	}

	disconnectedCallback() {
		// Cuando se quita el elemento
		// Eliminamos los eventos del listener
		this.removeEventListener('click', this._onclick);
		this.removeEventListener('slideshowimg_render',this._render_element);
		this.removeEventListener('slideshowdot_click',this._dot_click);
	}

	adoptedCallback() {
	}
  
	static get observedAttributes () {
		return ['slotchange'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		// Cuando lo movemos en el DOM
	}

	addElement(val) {
		// Añade un elemento al slideshow
		this._objects.push(val);
	}

	set indice(val) {
		// Setea Indice en el que se llega
		this._indice = val;
	}

	get indice() {
		// Getea el Indice en el que se llega
		return this._indice;
	}

	_render() {
		// El render que, en este caso, esta vacio
		//console.log("---Slideshow _render ","auto ",this._auto);
		//console.log("---Slideshow _render ",this._objects);
	}

	_render_element(event) {
		// Renderizado del elemento concreto
		// event = el evento del que viene, normalmente un click
		
		// Sacamos el elemento
		let el = Object.assign(event.detail.data);
		// Crea el elemento
		this._objects.push(el);

		// SI tenemos todos los elementos
		if (this._objects.length === this._childs)  {
			if (this._auto) {
				// Si esta automatico, mostramos el elemento y arrancamos el auto desde el elemento
				this._show(this._indice);
			}
			if (this._options.dots) {
				// Si hay puntitos
				this._objects.forEach((element) => {
					// Creamos el dot
					// Se puede refactorizar metiendo ciertas cosas en el constructor, como el data
					let dot = new UVaSlideshowDot();
					dot.data = element;
					// Ponemos los puntos
					this._dots.push(dot);
					// Y les añadimos en el ShadowRoot del elemento para que aparezcan
					let shadowRootDots = this.shadowRoot.getElementById('dots');
					shadowRootDots.appendChild(dot);
				});
			}
		}
	}

	_dot_click(event) {
		// Al hacer click desactivamos el automated
		// Primero llamamos al metodo que elimina el timer (el temporizador)
		this._endtimer();
		// Le quita al elemento slideshow el automatico para que se quede en el elemento
		this._options.automated = false;
		// Pillamos a donde ha hecho click (a donde va)
		let el = Object.assign(event.detail.data);
		
		// Ahora recorremos los dots para saber donde ha hecho click (en que dot)
		let indice;
		this._dots.forEach((element, index, array) => {
			// Si el elemento es el elemento a donde va
			if (element === el) {
				// Lo mostramos
				this._show(index);
			}
		});
	}

	_loadChilds() {
		// Carga los elementos que hay dentro del slideshow (los que el formateador genera)
		this._options.num_show = 1;
		
		// Cargamos los nodos del DOM que hay debajo
		let childs = this.childNodes;
		
		// Para cada uno de los nodos
		this.childNodes.forEach(element => {
			// Si es un elemento del slideshow
			if (element.nodeName === "UVA-SLIDESHOW-IMG") {
				// Lo pintamos
				let shadowRootElements = this.shadowRoot.getElementById('slide-elements');
				shadowRootElements.appendChild(Object.assign(element));
				// Y le añadimos "uno" al numero de hijos que sabe el slideshow que tiene
				this._childs++;
			}
		});
	}

	_show(indice) { 
		// Muestra un elemento del slideshow en concreto
		// indice = indice del elemento
		
		// Asignamos la propiedad al objeto slideshow del indice que queremos ver
		this._indice = indice;
		
		// Forma estandar, ocultar todo y mostrar el que queremos

		// Ocultamos todos los elementos
		if (this._objects && this._objects.length > 0) {
			this._objects.forEach(el => {
				el.style.display = "none";
			});
		}
		// Ocultamos todos los dots
		if (this._dots && this._dots.length > 0) {
			this._dots.forEach(el => {
				el.classList.remove("active");
			});
		}
		// Mostramos los elementos elegidos
		if (this._objects && this._objects.length >0  && this._objects.length >= indice*this._datashow) {
			for (let i=0; i<this._datashow; i++) {
				let el=this._objects[indice*this._datashow+i];
				if (el && el!=undefined) {
					el.style.display = "block";
				}
			}
		}
		// Activamos _dots dot
		if (this._dots && this._dots.length >0 && this._dots.length >= indice) {
			let el = this._dots[indice];
			el.classList.add("active");
		}
		// Activamos el timer para que se mueva el asunto
		if (this._options.automated) {
			this._starttimer();
		}
	}

	_starttimer() {
		// Arranca un temporizador en forma estandar, primero paramos todos y luego lo arrancamos
		
		// Paramos el que haya
		this._endtimer();
		// Y si esta que haga play solo
		if (this._options.automated) {
			// Creamos el temporizador
			this._timer = setTimeout(this._next, this._options.timming, "nameOfSlideshow", this._options);
		}
	}

	_endtimer() {
		// Mata el temporizador del objeto
		clearTimeout(this._timer);
	}

	_next() {
		// Pasa al siguiente elemento del slideshow
		// Aumentamos el indice
		this._indice++;
		// Si el indice sobrepasa los elementos que hay, pues al primero que va
		if (this._indice*this._datashow >= this._objects.length) {
			// Al primero, al primero!
			this._indice = 0;
		}
		// Y mostramos el elemento, obviamente
		this._show(this._indice);
	}

  
	_refresh() {
		// Refresca el slideshow
		// Creamos el evento, "vete al siguiente"
		let event = new CustomEvent("next");
		// Y lo ejecutamos
		this.dispatchEvent(event);
	}

	doclick() {
		// Not used!
	}

	_onclick(event)  {
		// On click de toda la vida por si acaso
	}

	showSlide(nameOfSlideshow, options) {
		// Not used!
	}
  
}
customElements.define(UVaSlideshow.is, UVaSlideshow);

export class UVaSlideshowDot extends HTMLElement {
	// Objeto de los puntos del slideshow
	static get is() {
		return 'uva-slideshow-dot';
	}
  
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
			// Las variables
			this._data = undefined;
			// Las Funciones
			this._onclick = this._onclick.bind(this);
			// Creamos el Shadow
			let shadowRoot = this.attachShadow({mode: 'open'});
			this.shadowRoot.innerHTML = `
				<style>
				:host {
					margin: 0 0.2em;
					width: 40px;
					height: 5px;
					border: 1px solid black;
					background-color: white;
					display: inline-block; 
					text-align: center;
				}
				:host(.active) {
					background-color: black;
					font-weight: bold; 
				}
				:host(:hover) {
					cursor: pointer; 
				}
				</style>
				<span id="content"></span>
				`;
		} catch(err) {
			alert('Lo sentimos.\r\nHa habido un error: Sx0101D');
			throw 'Ha habido un error al crear el componente del Slideshow (Dots): '+ err;
		} finally {
		}
	}

	connectedCallback() {
		// Cuando se monta en el durumdumdumdum
		
		// Añadimos el evento del click!
		this.addEventListener('click', this._onclick);
		
		// Pintamos el contenido
		this._render();
	}

	disconnectedCallback() {
		// Lo sacamos del durumdumdumdum
		this.removeEventListener('click', this._onclick);
	}

	adoptedCallback() {
		// Cuando lo cambiamos del durumdumdumdum
	}

	static get observedAttributes () {
	}

	attributeChangedCallback(name, oldValue, newValue) {
		// Cuando cambia un atributo
	}

	get data() {
		// Obtencion de los datos
		return this._data;
	}
  
	set data(val) {
		// Cambiamos los datos
		this._data = val;
	}

	_render() {
		// El render del elemento que esta vacio
	}

	_onclick() {
		// Metodo del click
		// Creamos el evento
		let ev = new CustomEvent("slideshowdot_click",{
			bubbles: true,
			cancelable: false,
			composed: true,
			detail: { data: this}
		});
		// Escupimos el evento
		this.dispatchEvent(ev);
	}
  
}
customElements.define(UVaSlideshowDot.is, UVaSlideshowDot);

class UVaSlideshowImg extends HTMLElement {
	// Elemento del slideshow que es una IMAGEN

	static get is() {
		return 'uva-slideshow-img';
	}
  
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
			// Variables
			this._src = undefined; // El src de la imagen
			this._alt = undefined; // El alt de la imagen
			this._title = undefined; // El title de la imagen
			// Metodos
			this._onclick = this._onclick.bind(this);
			// El ShadowRoot o lo que se pinta
			let shadowRoot = this.attachShadow({mode: 'open'});
			this.shadowRoot.innerHTML = `
				<style>
				</style>
				<img id="content" />
				`;
		} catch(err) {
			alert('Lo sentimos.\r\nHa habido un error: Sx0102I');
			throw 'Ha habido un error al crear el componente del Slideshow (Image): '+ err;
		} finally {
			this._src = this.getAttribute('src');
			this._alt = this.getAttribute('alt');
			this._title = this.getAttribute('title');
		}
	}

	connectedCallback() {
		// Cuando aparece en el DOM
		
		// Añadimos el evento del click
		this.addEventListener('click', this._onclick);
		// Pintamos el contenido
		this._render();
	}

	disconnectedCallback() {
		// Cuando sale del DOM quitamos el listener del evento del click
		this.removeEventListener('click', this._onclick);
	}

	adoptedCallback() {
		// Cuando se mueve del DOM
	}
  
	static get observedAttributes () {
	}

	attributeChangedCallback(name, oldValue, newValue) {
		// Cuando cambia algo en las propiedades del objeto
	}

	_render() {
		// Metodo del render que es muy simple
		// Primero buscamos donde lo ponemos
		let el = this.shadowRoot.getElementById("content");
		// Le añadimos los atributos
		el.setAttribute("src", this._src);
		el.setAttribute("title", this._title);
		el.setAttribute("alt", this._alt);
		// Y que no se muestre
		this.style.display = "none";

		// Le añadimos el evento de renderizado
		let ev = new CustomEvent("slideshowimg_render",{
			bubbles: true,
			cancelable: false,
			composed: true,
			detail: { data: this}
		});
		// Y patapum parriba el evento (se lo enviamos)
		this.dispatchEvent(ev);
	}

	_onclick() {
		// Evento del click... por ahora who knows...
	}
  
}
customElements.define(UVaSlideshowImg.is, UVaSlideshowImg);