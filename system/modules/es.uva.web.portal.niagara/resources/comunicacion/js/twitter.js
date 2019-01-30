'use strict';

class UVaTwitter extends HTMLElement {
	// Objeto twitter generico padre de todos, extendemos un elemento HTML
	
	static get is() {
		return 'uva-twitter';
	}
	
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw "Error al crear el elemento UVaTwitter " + e;
		} finally {
			// Variables "por defecto"
			this._urldata = undefined; // URL de donde sacamos los datos
			this._datanum = 4; // Numero de elementos a mostrar
			this._data = undefined; // El contenido
			// Funciones
			// Creamos el shadow del elemento
			let shadowRoot = this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css");
@import url("https://fonts.googleapis.com/css?family=Alegreya:300, 400, 500|Arvo:300, 400, 500|IM+Fell+English+SC:300, 400, 500|Lato:300, 400, 500|Libre+Franklin:300, 400, 500|Montserrat:300, 400, 500|Open+Sans:300, 400, 500|Raleway:300, 400, 500");
@import url("https://use.fontawesome.com/releases/v5.6.3/css/all.css");

:host {
	justify-content: center;
}

.twitter .header {
	border-bottom: 1px solid #121212;
	margin-right: 15px;
}

.twitter .header h1 {
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

.twitter .bloque_raya {
	margin-left: 0;
	padding-left: 0;
	border-bottom: 1px solid #121212;
}

.twitter .bloque_raya .masinformacion {
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

.twitter .bloque_raya a .masinformacion {
	color: #121212;
}

.twitter .bloque_raya a:hover .masinformacion {
	color: #121212;
	text-decoration: none;
	background-color: #5af9ff;
}

.twitter .bloque_raya .flecha {
	transition: all 0.5s;
}

.twitter .bloque_raya a:hover .flecha {
	display: inline-block;
	transform: translateX(10px);
}
</style>
<div class="row twitter">
	<div class="col-12 col-md-2 header">
		<h1>Twitter</h1>
	</div>
	<div class="col bloque_raya d-none d-md-block">
		<a href="https://www.twitter.com" target="_blank" role="link" rel="noopener noreferrer">
			<span class="masinformacion">
				<span data-i18n-es="más información" data-i18n-en="read more">más información</span> 
				<span class="flecha"><i class="fas fa-angle-right"></i></span>
			</span>
		</a>
	</div>
</div>
`;
		}
	}

	connectedCallback() {
		// Cuando se muestra en el durumdumdumdum
		// Añadimos el evento del click
		this.addEventListener('click', this._onclick);
		// Leemos los atributos de la URL y el numero de veces
		this._urldata = this.getAttribute('data');
		this._datanum = this.getAttribute('num');
		// Cargamos los datos
		this._loadDatos();
	}

	disconnectedCallback() {
		// Cuando lo quitamos del dom
		// Nos llevamos por delante el listener, para liberar memoria
		this.removeEventListener('click', this._onclick);
	}

	adoptedCallback() {
		// Cuando cambiamos de sitio el elemento en el DOM
	}
	
	attributeChangedCallback(name, oldValue, newValue) {
		// Cuando cambia alguna propiedad del objeto/tag
	}

	_loadDatos() {
		// Carga de los datos
		loadJSON(this._urldata)
			.then((element) =>  {
			// Para cada elemento
			this._data = element;
			// Renderizamos que toca
			this._render();
		})
			.catch( (error) =>  {
			// Si ha petado lo mostramos
			console.warn('Error al consultar los datos ', error);
		});
	}

	_render() {
		// Renderizado del elemento en cuestion
		let count = 1;
		this._data.forEach(doc => {
			if (count > parseInt(this._datanum)) return; // Si nos pasamos de numero, pasamos de renderizar mas
			count++;
			// Creamos un elemento de tweet particular
			let tweet = new UVATweet();
			// Le inyectamos el contenido que se merece
			tweet.doc = doc;
			// Lo añadimos al DOM
			this.shadowRoot.appendChild(tweet);
		});
	}

	_onclick(event)  {
		// Lo ponemos pero sobra, sinceramente
	}
}
customElements.define(UVaTwitter.is, UVaTwitter);

class UVATweet extends HTMLElement {
	// Objeto cada uno de los tweets
	
	static get is() {
		return 'uva-tweet';
	}
	
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw "Error al crear el elemento UVATweet " + e;
		} finally {
			// Variables
			this._doc = undefined; // Contenido
			// Creamos el shadow del elemento
			let shadowRoot = this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css");
@import url("https://fonts.googleapis.com/css?family=Alegreya:300, 400, 500|Arvo:300, 400, 500|IM+Fell+English+SC:300, 400, 500|Lato:300, 400, 500|Libre+Franklin:300, 400, 500|Montserrat:300, 400, 500|Open+Sans:300, 400, 500|Raleway:300, 400, 500");

:host {
	display: inline-flex;
	-ms-flex: 0 0 23%;
	flex: 0 0 23%;
	max-width: 23%;
	margin: 0.5em;
	padding: 0.5em;
	text-align: left;
	
	align-self: flex-start;
	justify-content: center;
}

:host(:hover) {
	background-color: #f2f2f2;
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

h1, p {
	font-family: "Lato", sans-serif,
	color: #121212,
	text-align: left;
}

h1:hover {
	color: rgba(12, 12, 12, 0.9);
}

h1 {
	font-size: 1.5em;
}

p {
	font-size: 1em;
}

p:hover {
	color: rgba(12, 12, 12, 0.8);
}

a, a:link, a:visited, a:hover, a:active  {
	color: black;
	text-decoration: none;
}

</style>
<a target="_blank" id="link" href="">
	<h1 id="name"></h1>
	<p id="text"></p>
</a>
`;
		}

	}

	connectedCallback() {
		// Cuando aparece en el DOM añadimos el evento de click
		this.addEventListener('click', this.onclick);
	}

	disconnectedCallback() {
		// Cuando le quitamos del DOM, le quitamos el click para ahorrar, que
		// no hay fortunas segun debajo de que culos
		this.removeEventListener('click', this.onclick);
	}

	adoptedCallback() {
		// Cuando se mueve dentro del DOM
	}
	attributeChangedCallback(name, oldValue, newValue) {
		// Cuando cambia un atributo
	}

	set doc(val) {
		// Setter del contenido
		this._doc = val;

		// Quien ha hecho el tweet (retuit mode on)
		let element = this.shadowRoot.getElementById('name');
		element.innerHTML = val.user_name;

		// Que nos cuenta
		element = this.shadowRoot.getElementById('text');
		element.innerHTML = val.text;

		// Enlace directo al tweet
		element=this.shadowRoot.getElementById('link');
		// https://twitter.com/statuses/1075311699236937728
		let link = "https://twitter.com/"+element.user_screenname+"/status/"+element.id;
		// Ahora... hasta que no lo definamos bien, "guardamos" a donde apuntamos el elemento
		element.href="https://twitter.com/CampusMDelibes/status/1075311699236937728";
		element.href="https://twitter.com/"+val.user_screenname+"/status/"+val.id;
		element.href="https://twitter.com/statuses/"+val.id;
	}

}
customElements.define(UVATweet.is, UVATweet);