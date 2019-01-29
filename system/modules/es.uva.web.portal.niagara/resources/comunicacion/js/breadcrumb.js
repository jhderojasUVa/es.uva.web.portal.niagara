'use strict';


class UVaNavegacionBreadcrumb extends HTMLElement {
  // Elemento de navegacion vertical
  static get is() {
    return 'uva-navegacion-breadcrumb';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw 'Error al crear el elemento de la navegacion vertical ' + e;
    } finally {
       // Variables por defecto del objeto
      this._uridata = undefined;
      this._data = undefined;
      this._localedata = "es";
      this._data_locale = undefined;
      this._startLevel = 0;
      this._levels = 99;
      // Bindeamos al objeto las funciones/metodos para crearlos facilmente
      this._onclick = this._onclick.bind(this);
      //this._onenter = this._onenter.bind(this);
      //this._onover = this._onover.bind(this);
      //this._onleave = this._onleave.bind(this);
      this._find_element= this._find_element.bind(this);
      this._cleanArray= this._cleanArray.bind(this);
      // Creamos el shadow del elemento
      let shadowRoot = this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML  = `
      <style>
        /* Contenedor generico total */
        :host {
          padding: 0;
          margin: 0;
        }
      </style>
      <ul id="content" class="pull-left breadcrumb">
        <li itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/">Inicio</a></li>
      </ul>
      `;
    }
  }

  connectedCallback() {
    // Cuando aparezca, hacemos el yogurt del objeto
    // Cargamos los parmametros
    if (this.getAttribute('onlyone'))
      this._onlyone = true;

    // Si no tiene de donde coger el JSON, lo "provocamos"
    if (this.getAttribute('data')) {
      this._uridata = this.getAttribute('data');
    } else {
      this._uridata = '/ws/menu.json';
    }
    // La uri
    if (this.getAttribute('uri'))
      this._uri = this.getAttribute('uri');
    // El nivel inicial
    if (this.getAttribute('startLevel'))
      this._startLevel = parseInt(this.getAttribute('startLevel'));
    // Hasta donde bajamos en los niveles
    if (this.getAttribute('levels'))
      this._levels = this.getAttribute('levels');
    // El idioma, el locale
    if (this.getAttribute('locale'))
      this._localedata = this.getAttribute('locale');
    // Añadimos los eventos
    this.addEventListener('nav_click', this._onclick);
    this.addEventListener('nav_enter', this._onenter);
    this.addEventListener('nav_leave', this._onleave);

    // Carga del JSON
    loadJSON(this._uridata).then(response => {
      this.data = response;
    });
  }

  disconnectedCallback() {
    // Quitamos los listener de los eventos si eliminamos del DOM
    this.removeEventListener('nav_click', this._onclick);
    this.removeEventListener('nav_enter', this._onenter);
    this.removeEventListener('nav_leave', this._onleave);
  }

  adoptedCallback() {

  }

  static get observedAttributes() {
    return ['locale'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Si cambia el idioma, re-renderizamos todo, obviamente
    //if (oldValue !== newValue) {
      if (name === "locale") {
        this._localedata = newValue;
      }
    //}

    // Ejecutamos el render
    this._render();
   }

  set data(val) {
    // Modificamos los datos de la navegación
    this._data = val;
    //Iniciaamos la renderizacion
    this._render();
    //<li itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/">Inicio</a></li>
				
  }

  _render() {

    // Cargamos el locale en una variable
    let locale = this._localedata;

    // Si no hay datos o no hay URI, unos apaños
    if (this._data === undefined) return;
    if (this._uri === undefined) this._uri="/";

    //Establecemos el locale
    if (this._data!==undefined && this._localedata!==undefined) {
      let actual=this._data.find(function(element) {
        return element.locale===locale;
      });
      this._data_locale=actual.elements;
    }


    if (this._uri !==undefined && this._uri !== "/") {
      let aux=this._uri;
      let aux_element=undefined;
      let uris=this._uri.split("/");
      for (let i=0;i<uris.length;i++) {
        let uri_buscada="";
        for (let j=0; j<=i; j++) {
          if (uris[j] && uris[j].length>0) {
            uri_buscada=uri_buscada+"/"+uris[j];
          }
        }
        uri_buscada=uri_buscada+"/";
        this._uri=uri_buscada;
        let element=undefined;
        if (!aux_element) {
          element=this._data_locale.find(this._find_element);
          aux_element=element;
        } else {
          element=aux_element.elements.find(this._find_element);
          aux_element=element;
        }
        if (element) {
          let el=new UVaNavegacionBreadcrumbElement();
          if (element.navTree+1<this._startLevel) {
            element.href="undefined";
          }
          el.data=element;
          this.shadowRoot.getElementById("content").appendChild(el);
        }
      }
      this._uri=aux;
    }
  }

  

  _onclick(event)  {
  }

  _onenter() {
    
  }

  _onleave() {

  }

  _find_element(element, index, array) {
    //console.log("--> _find_element ","element ",element," index ",index," array ", array);
    if (this._uri !==undefined && this._uri !== "/") {
      let uris=this._uri.split("/");
      let elements=element.href.split("/");
      //Eliminamos los elementos vacios
      elements=this._cleanArray(elements);
      uris=this._cleanArray(uris);
      //console.log("--- _find_element  ",elements,uris);
      //let req= /[-.\w]+@([\w-]+\.)+[\w-]{2,20}$/g;
      let reqhtml= /[-.\w]+.html/g;
      let requri= /[-.\w]+/g;
      //Subelemento
      for (let i=0; i<=elements.length;i++) {
        //console.log("--- _find_element for ",i,elements[i],uris[i],elements.length,uris.length);
        if (!requri.test(uris[i]) && uris[i]===elements[i]) {
          //console.log("--- _find_element continue ",uris[i],elements[i]);
          continue;
        } else if (elements[i]!=="" && uris[i]!==elements[i]) {
          //console.log("--- _find_element false ",uris[i],elements[i]);
          return false;
        } else if (reqhtml.test(elements[i]) ) {
          //console.log("--- _find_element ELEMENT HTML ",uris[i],elements[i]);
          //console.log(uris[i]);
          return true;
        } else if (requri.test(uris[i]) ) {
          //console.log("--- _find_element URI HTML ",uris[i],elements[i]);
          //console.log(uris[i]);
          return true;
        /*
        } else if (uris[i].startsWith("index.html") ) {
          console.log("--- _find_element TRUE");
          return true;
        */
        } else if (uris[i]===elements[i] && i===elements.length-1 && i===uris.length-1) {
          //console.log("--- _find_element FOUND ",uris[i],elements[i]);
          return true;
        } else if (uris[i]===elements[i] && i===elements.length-1 && i<uris.length) {
          //console.log("--- _find_element --- elements.length ",uris[i],elements[i]);
          //Buscamos en el subelemento
          return element.elements.find(this._find_element);
        } else if (i===uris.length) {
          //console.log("--- _find_element --- uris.length ",uris[i],elements[i]);
          //Buscamos en el subelemento
          return element.elements.find(this._find_element);
        } else if (uris[i]===elements[i]) {
          //console.log("--- _find_element --- Igual ",uris[i],elements[i]);
          //console.log("--- _find_element --- Igual i ",i," elements.length ",elements.length," uris.length ",uris.length);
          //continue;
        } else {
          console.log("--- _find_element OTRO ",uris[i],elements[i]);
          console.log("--- _find_element OTRO requri test ",requri.test(elements[i]));
          console.log("--- _find_element OTRO requri test ",requri.test(uris[i]));
          console.log("--- _find_element OTRO IGUAL ",uris[i]===elements[i]);
        }
      } 
    }
  }

  _cleanArray( actual ){
    var newArray = new Array();
    for( var i = 0, j = actual.length; i < j; i++ ){
        if ( actual[ i ] && actual[i]!="index.html" && actual[i]!="export" && actual[i]!="sites" && actual[i]!="uva"){
          newArray.push( actual[ i ] );
      }
    }
    return newArray;
  }

}
customElements.define(UVaNavegacionBreadcrumb.is, UVaNavegacionBreadcrumb);


class UVaNavegacionBreadcrumbElement extends HTMLElement {
  // Elemento de un breadcrumb
  static get is() {
    return 'uva-navegacion-breadcrumb-element';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw 'Error al crear el elemento de la navegacion vertical ' + e;
    } finally {
       // Variables por defecto del objeto
      this._data = undefined;
      // Bindeamos al objeto las funciones/metodos para crearlos facilmente
      this._onclick = this._onclick.bind(this);
      //this._onenter = this._onenter.bind(this);
      //this._onover = this._onover.bind(this);
      //this._onleave = this._onleave.bind(this);
     
      // Creamos el shadow del elemento
      let shadowRoot = this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML  = `
      <style>
        /* Contenedor generico total */
        :host {
        }
      </style>
      <li id="elemento" itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a id="elemento_enlace" href="/">ELEMENTO</a></li>
      `;
    }
  }

  connectedCallback() {
  }

  disconnectedCallback() {
  }

  adoptedCallback() {

  }

  static get observedAttributes() {
  }

  attributeChangedCallback(name, oldValue, newValue) {
   }

  set data(val) {
    // Modificamos los datos 
    this._data = val;
    //Iniciaamos la renderizacion
    this._render();
				
  }

  _render() {
    if (this._data.navText && this._data.navText!=undefined) {
      this.shadowRoot.getElementById("elemento_enlace").innerHTML=this._data.navText;
    }
    if (this._data.href && this._data.href!="undefined") {
      this.shadowRoot.getElementById("elemento_enlace").href=this._data.href;
    } else {
      this.shadowRoot.getElementById("elemento_enlace").removeAttribute("href");
    }
  }

  _onclick(event)  {
  }

  _onenter() {
    
  }

  _onleave() {

  }

}
customElements.define(UVaNavegacionBreadcrumbElement.is, UVaNavegacionBreadcrumbElement);