
if (window.sessionStorage) {
}
if (sessionStorage) {
}

function handleStorage(event) {
  event = event || window.event; // support IE8
  if (event.newValue === null) { // it was removed
      // Do somthing
  } else {
      // Do somthing else
  }
}

window.addEventListener('storage', handleStorage, false);

async function loadJSON(url) {
  //Intentamos cargar los objetos del local
  var datosDetails = JSON.parse(sessionStorage.getItem('uva_'+url));
  if (datosDetails != null) {
    //Devolvemos los datos actuales
    return datosDetails;
  } else {
    //Consultamos los datos
    return fetch (url)
    .then((element) =>  {
      return element.json();
    })
    .then((element) =>  {
       //Los guardamos en el storage
      sessionStorage.setItem('uva_'+url, JSON.stringify(element) );  
      return element;
    })
    .catch( (error) =>  {
      console.error('Request failed', error)
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  /*
  // Añadimos el listener para crear el elemento en el DOM
  //CArgamos los datos del perfil
  let data = loadJSONMiPortal('./ws/datos.jsp');
  data.then((elemento) => {
    contenidoObject = new PhotoMiPortal();
    contenidoObject.datos = elemento;
   	// Y una vez acabado el cuento, lo metemos en el DOM
   	document.getElementById('contenidoperfilfoto').appendChild(contenidoObject);
  });

  //Miramos si tenemos datos en el storage
  var datosDetails = JSON.parse(sessionStorage.getItem('uvaintranet'));
  if (datosDetails!=null) {
    //CArgmos los objetos del local
    // Creamos el contenedor de los Grupos que a su vez llamara al del Grupo y que a su vez llamara a las Acciones
    console.log("cargando datos del local");
		loadContent(datosDetails);
  } 
  //CArgamos los datos en backgrond
  // Cargamos todos los datos 
  data = loadJSONMiPortal('./ws/info.jsp');
  data.then((elemento) => {
    sessionStorage.setItem('uvaintranet', JSON.stringify(elemento) );  
    if (datosDetails==null) {
      console.log("Cargando datos en directo");
      loadContent(elemento);
    }
  });
  */
});