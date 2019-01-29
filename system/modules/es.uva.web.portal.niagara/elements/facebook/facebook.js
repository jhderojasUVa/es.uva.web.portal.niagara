// Facebook

// Primero, con el ID y el secret pedimos el token

async function devuelveTokenFacebook() {
	// Hacemos el fetch escondido para no revelar el secret
	let token = fetch('/system/modules/es.uva.web.portal.niagara/elements/facebook/facebook_token.jsp')
		.then((respuesta) => respuesta.json())
		.then((respuestajson) => {
			// Rellenamos el objeto token
			token.access_token = respuestajson.access_token;
			token.token_type = respuestajson.token_type;
		})
		.catch((error) => {
			// Cabum!
			alert('Lo sentimos.\r\nHa habido un error. Error Fx01');
			throw 'Ha habido un error al conectarse para obtener el token: '+ error;
		});
	return token;
}

devuelveTokenFacebook().then((token) => {
	// Bueno pues ya tenemos el token... ahora a ver que hacemos con el
	// Podemos hacerlo con el jsp que llama al feed metiendole el token O directamente y asi dejamos el servidor tranquilo
	
	// Preguntamos a Facebook
	//	Sobre el usuario: id, nombre, imagen y nombre corto
	//	Sobre el feed: id, mensaje, fecha de creacion, likes y attachment (imagenes, videos, lo que sea)
	let feed = fetch('https://graph.facebook.com/187763507920209/fields=id,name,picture,short_name,feed{id,attachments,message,created_time,likes}&access_token='+token.access_token)
		.then((respuesta) => respuesta.json())
		.then((respuestajson) => {
			// Aqui lo pintamos o llamamos mejor a la funcion que lo pinta o al objeto que lo pinta
			// Yo creo que lo metemos en una caja llamada "#facebook-feed"
			var base = document.getElementsbyId('facebook-feed');
			respuestajson.feed.data.forEach((elementoFacebook) => {
				let elementoFace = new FacebookElement(
						elementoFacebook.id, elementoFacebook.message, elementoFacebook.attachments, elementoFacebook.created_time, elementoFacebook.likes
						);
				base.appendChild(elementoFace);
		})
		.catch((error) => {
			alert('Lo sentimos.\r\nHa habido un error. Error Fx01F');
			throw 'Ha habido un error al recuperar el feed: '+ error;
		});
});

// Elemento de Facebook donde metemos el contenido
class FacebookElement extends HTMLElement {
	static get is() {
	return 'uva-facebook-elemento';
  }
  
  constructor(...args) {
  	// Mas vale heredar en mano que ciento volando
  	try {
		// Vamos a ver si no peta
		const self = super(...args);
	} catch(error) {
		// Error!
		throw 'Error al crear el componente del elemento de Facebook: '+ error;
	} finally {
		// Un lugar para cada cosa y cada cosa en un lugar
		// Esto se puede factorizar con lo de pasar un array a variables que nunca me acuerdo que no es el split y esas mierdas
		// ID
		if (args[0]) {
			this.id = args[0];
		}
		// Mensaje (texto)
		if (args[1]) {
			this.message = args[1];
		}
		// Imagenes, videos, enlaces...
		if (args[2]) {
			this.attachments = args[2];
		} else {
			this.attachments = undefined;
		}
		// Fecha de publicacion
		if (args[3]) {
			this.createdTime = args[3];
		}
		// Likes!
		if (args[4]) {
			this.likes = args[4];
		} else {
			this.likes = 0;
		}
		
		let shadowRoot = this.attachShadow({ mode: 'open' });
		
		// Ponemos lo basico
		shadowRoot.innerHTML = this.message + ' <strong>en</strong> '+ this.createdTime;
		
		// Aqui lo avanzado que no escupe nada porque nada sabemos
		this._render();
	}
  }
  
  _render() {
  	// Pues el render, que como no sabemos como hay que mostrarlo, lo dejamos mas empty que mi culo
	// Estoy usando el _ pero estaria bien tener una idea estandarizada de para cuando un metodo o una propiedad la llamamos con el _ delante o no
	// Pero vamos, la base es coger los this que correspondan, coger el shadow, unos cuantos if y cases y listo calisto
  }
}

customElements.define(FacebookElement.is, FacebookElement);