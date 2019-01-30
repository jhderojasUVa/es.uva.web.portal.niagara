'use strict';

class UVaFlickr extends HTMLElement {
	// Objeto Flickr padre de todos los objetos
  
	static get is() {
		return 'uva-flickr';
	}

	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw "Error al crear el elemento UVaFlickr " + e;
		} finally {
			//Variables
			this._urldata = undefined; // URL de los datos
			this._datanum = 4; // Numero a mostrar por defecto
			this._data = undefined; // Datos
			// Creamos el shadow del elemento
			let shadowRoot = this.attachShadow({ mode: 'open' });
			// No hace falta poner nada en este padrazo
			this.shadowRoot.innerHTML = '';
		}
	}

	connectedCallback() {
		// Cuando montamos en el DOM
		this._urldata = this.getAttribute('data'); // La URL de los datos
		this._datanum = this.getAttribute('num'); // El numero de elementos
		this._loadDatos();
	}

	disconnectedCallback() {
		// Cuando le sacamos del DOM
	}

	adoptedCallback() {
		// Cuando le movemos del DOM
	}

	attributeChangedCallback(name, oldValue, newValue) { 
		// Cuando cambia algun atributo/propiedad
	}

	_loadDatos() {
		// Carga los datos de la URL del objeto
		loadJSON(this._urldata)
			.then((element) =>  {
			this._data = element;
			this._render();
		})
			.catch( (error) =>  {
			console.warn('Error al consultar los datos ', error);
		});
	}

	_render() {
		// Render (no necesario)
	}
}
customElements.define(UVaFlickr.is, UVaFlickr);

class UVaFlickrAlbums extends UVaFlickr {
	// Objeto de albumes de Flickr que hereda del padre Flickr gordo para los albumes
	// En este objeto ponemos la cabecera de los elementos
  
	static get is() {
		return 'uva-flickr-albums';
	}
  
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw "Error al crear el elemento UVaFlickrAlbums " + e;
		} finally {
			// Creamos el shadow del elemento con la cabecera del grupo de cosas
			this.shadowRoot.innerHTML = `
<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css");
@import url("https://fonts.googleapis.com/css?family=Alegreya:300, 400, 500|Arvo:300, 400, 500|IM+Fell+English+SC:300, 400, 500|Lato:300, 400, 500|Libre+Franklin:300, 400, 500|Montserrat:300, 400, 500|Open+Sans:300, 400, 500|Raleway:300, 400, 500");
@import url("https://use.fontawesome.com/releases/v5.6.3/css/all.css");
.flickr .header {
	border-bottom: 1px solid #121212;
	margin-right: 15px;
}

.flickr .header h1 {
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

.flickr .bloque_raya {
	margin-left: 0;
	padding-left: 0;
	border-bottom: 1px solid #121212;
}

.flickr .bloque_raya .masinformacion {
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

.flickr .bloque_raya a .masinformacion {
	color: #121212;
}

.flickr .bloque_raya a:hover .masinformacion {
	color: #121212;
	text-decoration: none;
	background-color: #5af9ff;
}

.flickr .bloque_raya .flecha {
	transition: all 0.5s;
}

.flickr .bloque_raya a:hover .flecha {
	display: inline-block;
	transform: translateX(10px);
}
</style>
<div class="row flickr">
	<div class="col-12 col-md-5 header">
		<h1>Albumes de imágenes</h1>
	</div>
	<div class="col bloque_raya d-none d-md-block">
		<a href="https://www.flickr.com" target="_blank" role="link" rel="noopener noreferrer">
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
		// Cuando aparece en el DOM
		// Leemos del padre, de su connectedCallback
		super.connectedCallback();
	}
  
	disconnectedCallback() {
		// Cuando le quitamos del DOM
		// Leemos del padre, de su disconnectedCallback
		super.disconnectedCallback();
	}
  
	adoptedCallback() {  
		// Cuando se mueve en el DOM
		// Leemos de su padre
		super.adoptedCallback();
	}
  
	attributeChangedCallback(name, oldValue, newValue) { 
		// Cuando cambia alguna propiedad
	}
   
	_render() {
		// Metodo/Funcion de renderizado
		// Hablamos con el padre y hacemos lo que nos dicta, para empezar
		super._render();

		// Como se supone que tiene los datos, los pintamos
		// Empezamos por el numero 1, por supuesto
		let count = 1;
		// Los recoremos
		this._data.forEach(doc => {
			if (count > parseInt(this._datanum)) return;
			count++;
			// Creamos el elemento nuevo de album
			let album = new UVaFlickrAlbum();
			// Le metemos los datos
			album.data = doc;
			// Y lo añadimos al shadowRoot
			this.shadowRoot.appendChild(album);
		});

	}
  
}
customElements.define(UVaFlickrAlbums.is, UVaFlickrAlbums);

class UVaFlickrAlbum extends HTMLElement {
	// Objeto Album de Flickr que hereda de un html y saca los diferentes albumes de Flickr

	static get is() {
		return 'uva-flickr-album';
	}

	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw "Error al crear el elemento UVaFlickrAlbum " + e;
		} finally {
			//Variables

			// Creamos el shadow del elemento
			let shadowRoot = this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css");
:host {
	display: inline-flex;
	-ms-flex: 0 0 25%;
	flex: 0 0 25%;
	max-width: 25%;
	margin: 0.5em;
}

a, a:link, a:visited, a:hover, a:active  {
	color: black;
	text-decoration: none;
}

a img {
	max-width:100%;
	-webkit-transition: all 1s; /* Safari */
	transition: all 0.8s;
}

a img:hover, a:hover img:hover {
	-webkit-filter: grayscale(80%); /* Safari 6.0 - 9.0 */
 	filter: grayscale(80%);
	transition: all 0.8s;
}

h5 {
	margin-top: 0.5em;
	font-family: "Lato", sans-serif;
	font-size: 1em;
	color: rgba(12, 12, 12, 0.8);
	white-space: nowrap; 
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 150px;
}

</style>
<a id="link" href="">
	<img id="photo" />
	<h5 id="title" class="text-center" style="display:none"></h5>
</a>
`;
		}
	}

	connectedCallback() {
		// Cuando aparece en el DOM
	}

	disconnectedCallback() {
		// Cuando lo quitamos del DOM
	}

	adoptedCallback() {  
		// Si se mueve en el DOM
	}

	attributeChangedCallback(name, oldValue, newValue) { 
		// Si cambia algun atributo
	}
	
	get data() {
		// El getter de los datos
		return this._data;
	}
	
	set data(val) {
		// El setter de los datos
		this._data = val;
		// Obviamente, hay que pintarlo
		this._render();
	}

	_render() {
		// Metodo "del pintamiento"
		if (this._data.photo) {
			// Si hay foto/imagen, la pongo
			this.shadowRoot.getElementById("photo").setAttribute("src",this.data.photo);
			this.shadowRoot.getElementById("photo").setAttribute("class","img-fluid");
		}
		if (this._data.title) {
			// Si hay titulo, lo pongo
			this.shadowRoot.getElementById("title").innerText = this._data.title;
			this.shadowRoot.getElementById("title").style.display = "";
		}

		if (this._data.url) {
			// Si tiene enlace, lo pongo
			this.shadowRoot.getElementById("link").setAttribute("href",this._data.url);
		}
	}

}
customElements.define(UVaFlickrAlbum.is, UVaFlickrAlbum);

class UVaFlickrPhotoset extends UVaFlickr {
	// Objeto de albumes de Flickr que hereda del padre Flickr gordo para las imagenes
	// En este objeto ponemos la cabecera de los elementos
	
	static get is() {
		return 'uva-flickr-photoset';
	}

	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw "Error al crear el elemento UVaFlickrPhotoset " + e;
		} finally {
			this.shadowRoot.innerHTML = `
<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css");
@import url("https://fonts.googleapis.com/css?family=Alegreya:300, 400, 500|Arvo:300, 400, 500|IM+Fell+English+SC:300, 400, 500|Lato:300, 400, 500|Libre+Franklin:300, 400, 500|Montserrat:300, 400, 500|Open+Sans:300, 400, 500|Raleway:300, 400, 500");
@import url("https://use.fontawesome.com/releases/v5.6.3/css/all.css");
.flickr .header {
	border-bottom: 1px solid #121212;
	margin-right: 15px;
}

.flickr .header h1 {
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

.flickr .bloque_raya {
	margin-left: 0;
	padding-left: 0;
	border-bottom: 1px solid #121212;
}

.flickr .bloque_raya .masinformacion {
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

.flickr .bloque_raya a .masinformacion {
	color: #121212;
}

.flickr .bloque_raya a:hover .masinformacion {
	color: #121212;
	text-decoration: none;
	background-color: #5af9ff;
}

.flickr .bloque_raya .flecha {
	transition: all 0.5s;
}

.flickr .bloque_raya a:hover .flecha {
	display: inline-block;
	transform: translateX(10px);
}
</style>
<div class="row flickr">
	<div class="col-12 col-md-3 header">
		<h1>Imágenes</h1>
	</div>
	<div class="col bloque_raya d-none d-md-block">
		<a href="https://www.flickr.com" target="_blank" role="link" rel="noopener noreferrer">
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
		// Cuando aparece en el DOM
		// Hacemos el connected de su padre
		super.connectedCallback();
	}

	disconnectedCallback() {
		// Cuando se saca del DOM
		// Hacemos lo que el padre dice
		super.disconnectedCallback();
	}

	_render() {
		// Renderizado o pintado
		// Hacemos lo que el padre dice
		super._render();

		// recorremos los datos tantas veces como tenemos
		let count = 1;
		this._data.forEach(doc => {
			if (count > parseInt(this._datanum)) return;
			count++;
			// Creamos cada uno de los elementos foto
			let el = new UVaFlickrPhoto();
			// Le inyectamos sus datos
			el.data = doc;
			// Lo metemos en el shadow para que aparezca
			this.shadowRoot.appendChild(el);
		});
	}

}
customElements.define(UVaFlickrPhotoset.is, UVaFlickrPhotoset);

class UVaFlickrPhoto extends HTMLElement {
	// Objeto Imagen de Flickr que hereda de un html y saca los las diferentes imagenes de Flickr
	
	static get is() {
		return 'uva-flickr-photo';
	}

	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw "Error al crear el elemento UVaFlickrPhoto " + e;
		} finally {
			//Variables

			// Creamos el shadow del elemento
			let shadowRoot = this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css");
:host {
	display: inline-flex;
	-ms-flex: 0 0 25%;
	flex: 0 0 25%;
	max-width: 25%;
	margin: 0.5em;
}

@media only screen and (max-width: 501px) {
	:host {
		display: inline-flex;
		-ms-flex: 0 0 40%;
		flex: 0 0 40%;
		max-width: 40%;
		margin: 1em;
	}
}

a, a:link, a:visited, a:hover, a:active  {
	color: black;
	text-decoration: none;
}

a img {
	max-width:100%;
	-webkit-transition: all 1s; /* Safari */
  transition: all 1s;
}

a img:hover, a:hover img:hover {
	-webkit-filter: grayscale(80%); /* Safari 6.0 - 9.0 */
 	filter: grayscale(80%);
	transition: all 1s;
}

h5 {
	margin-top: 0.5em;
	font-family: "Lato", sans-serif;
	font-size: 1em;
	color: rgba(12, 12, 12, 0.8);
	white-space: nowrap; 
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 150px;
}

</style>
<a id="link" href="" target="_blank">
	<img id="photo" />
	<h5 id="title" style="display:none"></h5>
</a>
`;
		}
	}

	connectedCallback() {
		// Cuando aparece en el DOM
	}

	disconnectedCallback() {
		// Cuando se le quita del DOM
	}

	adoptedCallback() {  
		// Cuando se le mueve en el DOM
	}

	attributeChangedCallback(name, oldValue, newValue) { 
		// Cuando cambia algun atributo
	}
	
	get data() {
		// Getter de los datos
		return this._data;
	}
	
	set data(val) {
		// Setter de los datos
		this._data = val; // Metemos los datos en el objeto
		this._render(); // Lo pintamos
	}

	_render() {
		// Pintado del objeto
		
		if (this._data.medium_url) {
			// Si hay URL
			this.shadowRoot.getElementById("photo").setAttribute("src",this._data.medium_url);
			this.shadowRoot.getElementById("photo").setAttribute("class","img-fluid");
		}

		if (this._data.title) {
			// Si hay titulo
			this.shadowRoot.getElementById("title").innerText=this._data.title;
			this.shadowRoot.getElementById("title").style.display="";
		}

		if (this._data.url) {
			// Si hay URL
			this.shadowRoot.getElementById("link").setAttribute("href",this._data.url);
		}
	}

}
customElements.define(UVaFlickrPhoto.is, UVaFlickrPhoto);