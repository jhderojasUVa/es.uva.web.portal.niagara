'use strict';


class UVANoticias extends HTMLElement {
	// Objeto/Clase de las noticias
	// Este objeto es el padre de todas las noticias, el agujero donde se hacen las noticias
	static get is() {
		return 'uva-noticias';
	}
	
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw "Error al crear el elemento UVANoticias: " + e;
		} finally {
			// Propiedades del objeto
			this._urldata = undefined;
			this._data = undefined;
			this._datanum = 4;
			this._localedata = "es";
			// Metodos del objeto
			this._onclick = this._onclick.bind(this);
			// Creamos el shadow del elemento
			let shadowRoot = this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
<style>
/* Bootstrap */
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css");
@import url("https://fonts.googleapis.com/css?family=Alegreya:300, 400, 500|Arvo:300, 400, 500|IM+Fell+English+SC:300, 400, 500|Lato:300, 400, 500|Libre+Franklin:300, 400, 500|Montserrat:300, 400, 500|Open+Sans:300, 400, 500|Raleway:300, 400, 500");
@import url("https://use.fontawesome.com/releases/v5.6.3/css/all.css");

h1, h2, h3 {
	font-family: "Montserrat", sans-serif; 
}

.header {
	border-bottom: 1px solid #121212;
 	margin-right: 15px;
}

.header h1 {
	position: relative;
	bottom: -7px;
    font-size: 1.9em;
    font-weight: 500;
    padding-right: 20px;
    padding-bottom: 7px;
    text-transform: uppercase;
    margin-right: 15px;
    font-family: "Montserrat", sans-serif;
	color: rgba(55, 55, 55, 0.9);
	
	line-height: 1.0em;
    margin-bottom: .1em;
    margin-top: .1em;
}

@media only screen and (max-width: 992px) {
	.header h1 {
		font-size: 1.3em;
	}
}

.bloque_raya {
	margin-left: 0;
	padding-left: 0;
	border-bottom: 1px solid #121212;
}

.bloque_raya .masinformacion {
	font-size: 1.15em;
	padding: 5px 20px;
	border: 1px solid #121212;
	text-transform: uppercase;
	display: inline-block;
	margin-bottom: -1px;
	transition: all 0.5s;
	
	position: absolute;
	bottom: 0px;
}

.bloque_raya a .masinformacion {
	color: #121212;
}

.bloque_raya a:hover .masinformacion {
	color: #121212;
	text-decoration: none;
	background-color: #5af9ff;
}

.bloque_raya .flecha {
	transition: all 0.5s;
}

.bloque_raya a:hover .flecha {
	display: inline-block;
	transform: translateX(10px);
}

</style>
<div class="row">
	<div class="col-12 col-md-2 header">
		<h1>Noticias</h1>
	</div>
	<div class="col bloque_raya d-none d-md-block">
		<a href="http://comunicacion.uva.es" target="_blank" role="link" rel="noopener noreferrer">
			<span class="masinformacion">
				<span data-i18n-es="más información" data-i18n-en="read more">más información</span> 
				<span class="flecha"><i class="fas fa-angle-right"></i></span>
			</span>
		</a>
	</div>
</div>
<div class="row" style="margin-top: 15px;" id="noticias-contenido"></div>
`;

		}
	}

	connectedCallback() {
		// Cuando el elemento aparece en el DOM
		// Añadimos el listener del click del elemento
		this.addEventListener('click', this._onclick);
		// Los datos
		if (this.getAttribute("data"))
			this._urldata = this.getAttribute('data');
		// Los numeros a mostrar
		if (this.getAttribute("num"))
			this._datanum = parseInt(this.getAttribute('num'));
		// El idioma
		if (this.getAttribute("locale"))
			this._localedata = parseInt(this.getAttribute('locale'));
		// Cargamos los datos
		this._loadDatos();
	}

	disconnectedCallback() {
		// Desconectamos el listener del elemento
		this.removeEventListener('click', this._onclick);
	}

	adoptedCallback() {  }
  
	static get observedAttributes() {
		// Metemos un observable en el idioma por si cambia
		return ['locale'];
	}

	attributeChangedCallback(name, oldValue, newValue) { 
		// Si cambia alguna propiedad del elemento
		
		// Si cambia el idioma, lo re-renderizamos
		if (name === "locale") {
			this._localedata = newValue;
			this._render();
		}
	}

	set data(val) {
		//Modificamos los datos de la navegación
		this._data = val;
	}

	_loadDatos() {
		// Metodo de carga de datos
		loadJSON(this._urldata)
			.then((elemento) => {
			this._data = elemento;
			this._render();
		})
			.catch(function(error) {
			// Si hay un error
			console.warn('Error al consultar los datos: ', error);
		});
	}

	_render() {
		// Metodo de renderizado del padre de todas las noticias
		let count = 1;
		// Si no hay datos, pa'ke hacer nada...
		if (!this._data) {
			return;
		}
		// Si hay datos, los recorremos y pintamos las noticias dependiendo del tipo de noticia
		this._data.forEach(doc => {
			if (count > parseInt(this._datanum)) return;
			count++;
			let noticia ;
			// Si es de imagen
			// Esto se puede poner un case mas adelante, en la siguient refactorizacion
			if (doc.image) {
				noticia = new UVANoticiaImagen();
			} else {
				// Si no es de texto
				noticia = new UVANoticiaTexto()
			}
			// Pasamos el locale a la noticia
			noticia.locale = this._localedata;
			// Pasamos los datos
			noticia.doc = doc;
			// Lo añadimos al durumdumdumdum dentro de su sitio cochino
			let sitioNoticias = this.shadowRoot.getElementById('noticias-contenido');
			sitioNoticias.appendChild(noticia);
		});
	}

	_onclick(event)  {
		// Evento de click al grupo gordo de noticias
	}
}
customElements.define(UVANoticias.is, UVANoticias);
  
class UVANoticia extends HTMLElement {
	static get is() {
		return 'uva-noticia';
	}
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw "Error al crear el elemento UVANoticia " + e;
		} finally {
			//Variables
			this._doc = undefined;
			this._locale = undefined;
			// Creamos el shadow del elemento
			let shadowRoot = this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
<style>
/* Importamos bootstrap */
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css");
<style>
</style>
`;
		}
	}

	connectedCallback() {
		this.addEventListener('click', this.onclick);
	}

	disconnectedCallback() {
		this.removeEventListener('click', this.onclick);
	}

	adoptedCallback() {  }
	attributeChangedCallback(name, oldValue, newValue) {  }

	set doc(val) {
		this._doc = val;
	}

	set locale(val) {
		this._locale = val;
	}


}
 
customElements.define(UVANoticia.is, UVANoticia);

class UVANoticiaTexto extends UVANoticia {
	// Objeto/Clase de la noticia de texto
	
	static get is() {
		return 'uvanoticia-texto';
	}
	
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw "Error al crear el elemento UVANoticiaTexto: " + e;
		} finally {
			// Variables
			this._doc = undefined;
			// Creamos el shadow del elemento
			this.shadowRoot.innerHTML = `
<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css");
@import url("https://fonts.googleapis.com/css?family=Alegreya:300, 400, 500|Arvo:300, 400, 500|IM+Fell+English+SC:300, 400, 500|Lato:300, 400, 500|Libre+Franklin:300, 400, 500|Montserrat:300, 400, 500|Open+Sans:300, 400, 500|Raleway:300, 400, 500");

:host {
	-ms-flex: 0 0 25%;
	flex: 0 0 25%;
	max-width: 25%;
	margin-bottom: 0.5em;
}

@media only screen and (min-width: 501px) and (max-width: 992px) {
	:host {
		-ms-flex: 0 0 40%;
		flex: 0 0 40%;
		max-width: 40%;
		margin: 1em;
	}
}


@media only screen and (max-width: 500px) {
	:host {
		-ms-flex: 0 0 100%;
		flex: 0 0 100%;
		max-width: 100%;
		margin: 1em;
	}
}

a:hover {
	text-decoration: none;
}

h1 {
	font-family: "Lato", sans-serif;
	font-size: 1.5em;
	color: rgba(12, 12, 12, 0.9);
	margin: 0 0.5em;
}

h1:hover {
	color: rgba(12, 12, 12, 0.8);
	cursor: pointer;
}
</style>

<a id="link" href="">
	<h1 id="title"Titulo></h1>
</a>
`;
		}
	}

	set doc(val) {
		// Setter para pillar los datos

		// Si hay datos lo pintamos
		if (val) {
			// Buscamos en el shadow el titulo para ponerlo segun el idioma del locale
			var element = this.shadowRoot.getElementById('noticia-texto');
			//var elementTitle = document.createElement('A');
			
			var element = this.shadowRoot.getElementById('title');
			element.innerHTML = val.title;
			// Ponemos el texto correspondiente buscando en los locales de los datos
			if (this._locale && val.locales) {
				let locale = this._locale;
				let res = val.locales.find(function(element) {
					return element.id === locale;
				});
				// Si en los datos hay resultado, le ponemos el titulo del resultado
				if (res) {
					element.innerHTML = res.title;
				}
			}
			// Metemos el link buscandolo en el shadowDOM
			var element = this.shadowRoot.getElementById('link');
			element.href = val.link;
			//let html='';
		} else {
			// Sino, trincamos el elemento para que no se pueda seleccionar ni modificar ni nada
			this.removeAttribute('open');
		}
		// Metemos en el objeto los datos para que los tenga
		this._doc = val;
	}

}

customElements.define(UVANoticiaTexto.is, UVANoticiaTexto);

class UVANoticiaImagen extends UVANoticia {
	// Objeto/Clase de noticia con imagen
	static get is() {
		return 'uvanoticia-imagen';
	}
	
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw "Error al crear el elemento UVANoticiaImagen: " + e;
		} finally {
			// Propiedades del objeto
			this._doc = undefined;
			// Creamos el shadow del elemento
			this.shadowRoot.innerHTML = `
<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css");
@import url("https://fonts.googleapis.com/css?family=Alegreya:300, 400, 500|Arvo:300, 400, 500|IM+Fell+English+SC:300, 400, 500|Lato:300, 400, 500|Libre+Franklin:300, 400, 500|Montserrat:300, 400, 500|Open+Sans:300, 400, 500|Raleway:300, 400, 500");

:host {
	-ms-flex: 0 0 25%;
	flex: 0 0 25%;
	max-width: 25%;
	margin-bottom: 0.5em;
	padding-bottom: 0.5em;
	
	position: relative;
	overflow: hidden;
	
}

@media only screen and (max-width: 992px) {
	:host {
		-ms-flex: 0 0 40%;
		flex: 0 0 40%;
		max-width: 40%;
		margin: 1em;
	}
}

@media only screen and (max-width: 500px) {
	:host {
		-ms-flex: 0 0 100%;
		flex: 0 0 100%;
		max-width: 100%;
		margin: 1em;
	}
}

:host(:hover) {
	cursor: pointer;
}

:host(:hover) #photo {
	filter: grayscale(.8);
}

:host(:hover) h1 {
	color: rgba(12, 12, 12, 0.8);
	visibility: visible;
	transform: translateY(-410px);
	
	transition: all 0.8s;
}

a:hover {
	text-decoration: none;
}

h1 {
	font-family: "Lato", sans-serif;
	font-size: 1.5em;
	color: white;
	margin-left: 0.5em;
	margin-right: 0.5em;
	margin-top: 0.5em;
	padding: 0.3em;
	background-color: white;
	
	visibility: hidden;
	position: relative;
	top: 420px;
	
	transition: all 0.8s;
}


#photo {
	height: 100%; 
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}

</style>
<a id="link" href="">
	<div id="photo">
		<h1 id="title"></h1>
		<div style="height: 30px"></div>
		
	</div>
</a>
`;
		}
	}

	set doc(val) {
		// Setter que mete los valores en el objeto
		
		// Si hay datos los metemos
		if (val) {
			// Buscamos el title en el shadow del objeto para ponerlo
			var elementTitle = this.shadowRoot.getElementById('title');
			let title = val.title;
			if (val.title.length > 50) {
				title = title.substring(0, 30) + '...';
			}
			elementTitle.innerHTML = title;
			// Vemos a ver los idiomas para sacar la enjundia (el texto)
			if (this._locale && val.locales) {
				let locale = this._locale;
				let res = val.locales.find(function(element) {
					return elementTitle.id === locale;
				});
				// Si hay, lo ponemos, que narices
				if (res) {
					elementTitle.innerHTML = res.title;
				}
			}

			// El link de Legend of Zelda
			var elementLink = this.shadowRoot.getElementById('link');
			elementLink.href = val.link;

			// Si hay imagen
			if (val.image) {
				// Buscamos la foto, el elemento y le cambiamos el estilo poniendole el fondo
				let elementPhoto = this.shadowRoot.getElementById('photo');
				elementPhoto.style.backgroundImage = 'url(' + val.image.replace("/sites/comunicacion","http://comunicacion.uva.es") + ')';
			}
		} else {
			// Trincamos el shadow
			this.removeAttribute('open');
		}
		
		// Metemos los datos del objeto en el objeto
		this._doc = val;
	}

}

customElements.define(UVANoticiaImagen.is, UVANoticiaImagen);