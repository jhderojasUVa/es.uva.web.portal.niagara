'use strict';

class UVaNavegacion extends HTMLElement {

  static get is() {
    return 'uva-navegacion';
  }

  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento navegacion " + e;
    } finally {
      // Variables por defecto del objeto
      //if (!this.id)
      //   this.id = this.is + `-${uvaNavegacionCounter++}`;
      this._uridata = undefined;
      this._data = undefined;
      this._localedata = "es";
      this._data_locale = undefined;
      this._onlyone = false;
      this._startLevel = 0;
      this._levels = 99;
      this._lastmenu = undefined;

      // Bindeamos al objeto las funciones/metodos para crearlos facilmente
      this._onclick = this._onclick.bind(this);
      this._onenter = this._onenter.bind(this);
      this._onover = this._onover.bind(this);
      this._onleave = this._onleave.bind(this);
      this._find_element = this._find_element.bind(this);
      this._find_element_byid = this._find_element_byid.bind(this);
      // Creamos el shadow del elemento
      let shadowRoot = this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
        /* Contenedor generico total */
        :host {
          padding: 0;
          margin: 0;
        }
      </style>
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
    this._render_tree();
   }

  set data(val) {
    // Modificamos los datos de la navegación
    this._data = val;
  }

  _render_tree() {
    // Pintamos el arbol
    // Empezamos desde cero
    let count = 0;

    // Buscamos la URI y definimos variables a "nada"
    let arbol = undefined;
    let actual = undefined;

    // Cargamos el locale en una variable
    let locale = this._localedata;

    // Si no hay datos o no hay URI, unos apaños
    if (this._data === undefined) return;
    if (this._uri === undefined) this._uri="/";

    //Establecemos el locale
    if (this._data!==undefined && this._localedata!==undefined) {
      actual=this._data.find(function(element) {
        return element.locale===locale;
      });
      this._data_locale=actual.elements;
    }

    // Si empezamos desde el principio (el objeto)
    if (this._startLevel === 0) {
      // Usamos los datos actuales (en otra variable)
      actual = this._data;
      // De forma que si no estan definidos
      if (this._data !== undefined) {
        actual = this._data.find(function(element) {
          // Devolvemos el locale para que los carge al cambiar este
          return element.locale === locale;
        });

        this._data_locale = actual.elements
        actual = this._data_locale;
      }
    }

    // Si hay URI y no es el raiz... hay que empezar por ahi
    if (this._uri !== undefined && this._uri !== "/" && this._startLevel > 0) {
      // Buscamos el los datos ese elemento en los datos para empezar desde el
      actual = this._data_locale.find(this._find_element);
      //Si es vacio hay un error
      if (actual === undefined) {
        console.warn("--- Elemento de la URI "+this._uri +" no encontrado");
        return;
      }
      // Vemos el nivel y los elementos
      if (parseInt(actual.navTree) === parseInt(this._startLevel) - 1) {
        arbol = actual.elements;
      }
      // Los recorremos
      while (actual && actual.elements && actual.elements.length > 0) {
        let aux = actual.elements.find(this._find_element);
        if (aux !== undefined) {
          actual = aux;
          if (parseInt(actual.navTree) === parseInt(this._startLevel) - 1) {
            arbol = actual.elements;
          }
        } else {
          break;
        }
      }
      //Tenemos el elemento de nivel 1
    }

    // Si no empezamos de cero
    if (this._startLevel > 0) {
      // Estamos en un subarbol. Lo construimos a partir del actual
      if (actual === undefined) {
        return;
      }
    } else {
      // Arbol de datos segun nos lleguemos en el idioma
      arbol = this._data_locale;
    }

    let el = {
      id: 'navbarNav',
      elements: arbol,
      navTree: 0
    }

    // Definidos los datos, definimos el donde lo metemos
    let eldiv = this.shadowRoot.getElementById("navbarNav");
    // Y creamos el arbol segun para que
    this._render_tree_element(el, eldiv, "pc", true);
  }

  _render_tree_element(element, eldiv, type, first = false, last = true, child = false) {
    // Dibuja un nivel determinado
    // element = elemento de los datos
    // eldiv = div donde lo pinta
    // type =
    // first = si es el primer elemento (false)
    // last = si es el ultimo elemento (true)
    // child = si es un hijo
    let count = 0;
    let el = undefined;

    // Si no es el ultimo... ponemos el last a false
    if (element.navTree < this._startLevel+this._levels-1) last=false;

    // Si hay elementos y no es el ultimo
    if (element.elements && element.elements.length >0 && !last) {
      el = new UVaNavegacionMenu();
      el.last = last;
      el.child = child;
      el.data = element;
      if (!first) {
        // Si no es el primero, lo escondemos
        el.style.display = 'none';
      } else {
        // Si lo es, lo expandimos
        el.expanded = true;
      }
    } else {
      // Si es un elemento final
      if (!child) {
        el = new UVaNavegacionElemento();
        el.last = last;
        el.child = child;
        el.data = element;
        if (!first) {
          el.style.display = 'none';
        }
      }
    }
    // Devolvemos el elemento
    return el;
  }

  _onclick(event)  {
    // Evento de si hace click devolvemos a que hace click
    let el = event.composedPath()[0];
    return el;
  }

  _onenter(event)  {
    // Evento de si entra (pulsa enter) a que lo hace
    let el = event.composedPath()[0];
    return el;
  }

  _onover(event)  {
    // Evento del mouse over de si pone el raton encima a que
    let el = event.composedPath()[0];
    return el;
  }

  _onleave(event)  {
    let el = event.composedPath()[0];
    //console.log("--> _onleave ",el," Detail ",el.detail);
  }


  _find_element(element, index, array) {
    //console.log("--> _find_element ","element ",element," index ",index," array ", array);
    //console.log("--- _find_element URI ELEMENTO ",element.href, " BUSCADA ", this._uri);
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

  _find_element_byid(elementid, array) {
    //Buscamos el elemento por identificador
    let actual=array;
    let res=undefined;
    //Para todos los elementos del array miramos si coincide el identificador. 
    // También buscamos en los subelementos
    array.forEach(element => {
      if (element.id==elementid) {
        res=element;
        return element;
      } else {
        if (element.elements) {
          let resk=this._find_element_byid(elementid,element.elements);
          if (resk) {
            res=resk;
            return resk;
          }
        }
      }
    });
    return res;
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
customElements.define(UVaNavegacion.is, UVaNavegacion);

class UVaNavegacionHorizontal extends UVaNavegacion {
  static get is() {
    return 'uva-navegacion-horizontal';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento de la oferta " + e;
    } finally {
      this.setAttribute('navegacion', 'horizontal');
      this.shadowRoot.innerHTML = `
      <style>
      /* Menu horizontal */
      @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
      :host {
        all: initial;
        padding-top: 0.5em;

        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: top;
      }
      </style>
      `;
    }
  }

  set data(val) {
    //Modificamos los datos de la navegación
    this._data = val;
    this._render_tree();
  }

  _render_tree_element(element, eldiv, type, first=false, last=true) {
    let res = super._render_tree_element(element, eldiv, type, first, last, false);

    // Asi no repintamos los niveles en la primera carga, niveles que no usamos para nada
    // Porque cada milisegundo vale su peso en oro de Plank
    if (res && element.navTree <= 1) {
      this.shadowRoot.appendChild(res);
      if (element.elements && element.elements.length > 0) {
        element.elements.forEach(subelement => {
          let subdiv = this.shadowRoot;
          let tree_childs = this._render_tree_element(subelement, subdiv, type, false, last, false);
        });
      }
    }
  }

  _onclick(event)  {
    super._onclick(event);

    // Quien o donde se ha hecho el click
    let htmlel = event.composedPath()[0];

    // Datos del contenido
    let elementData = event.detail.data;

    // Buscamos el submenu
    let elhtml = this.shadowRoot.getElementById(elementData.id);

    if (this._onlyone) {
      // Si el objeto es un _onlyone
      // Lo seleccionamos
      let elements = this.shadowRoot.querySelectorAll(':scope uva-navegacion-menu:not([style*="display: none"])');
      // Lo recorremos
      elements.forEach(element => {
        // Y si no es un navbarNav (osea de arriba), lo escondemos
        if (element.id != "navbarNav") element.style.display = "none";
      });
    }

    if (elementData && elementData.elements && elementData.elements.length > 0) {
      if (elementData.navTree <= this._startLevel+this._levels-1) {
        //mostramos el elemento
        let submenu = this.shadowRoot.querySelector("uva-navegacion-menu[id='" + elementData.id + "']");
        //console.log("submenu ",submenu);
        if (submenu) {
          if (submenu.style.display === 'none') {
            // Mejor que coja el display del padre
            submenu.style.display = 'inherit';
          } else {
            // Se esconde
            submenu.style.display = 'none';
          }
        } else {
          //Es un elemento final. Hacemos click
          if (elementData.href && elementData.href.length>0) {
            window.location.href=elementData.href;
          }
        }
      }
    } else {
      // Click en elemento final
      if (elementData.href && elementData.href.length>0) {
        window.location.href=elementData.href;
      }
    }

    // Ponemos el elemento en negro (estamos jugando)
    // Para ello quitamos el active de todos, recorriendo todos todos todos los cacharros
    let elementosMenuHorizontal = document.querySelectorAll('uva-navegacion-horizontal')[0].shadowRoot.querySelectorAll('uva-navegacion-menu');
    elementosMenuHorizontal.forEach((elemento) => {
      // Sacamos su interior (que mal suena esto)
      let el2 = elemento.shadowRoot.querySelectorAll('uva-navegacion-elemento');
      el2.forEach((navegacion_elemento) => {
        // Recorremos los elementos finales que es donde pongo el active y quitamos el active
        navegacion_elemento.classList.remove('active');
      });
    });
    // Lo ponemos en negro (donde hemos hecho click que lo hemos sacado al principio)
    htmlel.classList.add('active');
  }

}
customElements.define(UVaNavegacionHorizontal.is, UVaNavegacionHorizontal);

class UVaNavegacionVertical extends UVaNavegacion {
  // Elemento de navegacion vertical
  static get is() {
    return 'uva-navegacion-vertical';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw 'Error al crear el elemento de la navegacion vertical ' + e;
    } finally {
      this.setAttribute('navegacion', 'vertical');
      this.shadowRoot.innerHTML  = `
      <style>
      /* Menu vertical */
      :host {
        all: initial;
        padding: 0;
        margin: 0;

        display: flex-column;
        border: none;

        text-transform: uppercase;
      }
      </style>
      `;
    }
  }

  set data(val) {
    // Modificamos los datos de la navegación
    this._data = val;
    this._render_tree();
  }

  _render_tree_element(element, eldiv, type, first = false, last = true) {
    // Metodo de renderizado de un elemento
    // elemento = elemento en concreto del menu
    // eldiv = a donde pertenece o el padre o como se quiere llamar
    // type = tipo de elemento
    // first = si es el primero (false)
    // last = si es el ultimo (true)

    // Sacamos el padre
    let res = super._render_tree_element(element, eldiv, type, first, last, true);
    
    //Comprobamos si tenemos que marcarlo como activo
    let active=false;
    if (res && res!=undefined && this._uri && this._uri.length>0) {
      //Miramos si estamos dentro de la URI
      let el = element.elements.find(this._find_element);
      //SI tenemos URI mostramos el elemento
      if (el ) {
        res.style.display="block";
      }
    }

    // Si tiene padre y tiene hijos
    if (res && element.navTree <= this._startLevel+this._levels-1) {

      if (first) {
        // Si es el primero, lo añadimos al primer elemento
        this.shadowRoot.appendChild(res);
      } else if (eldiv) {
        // Si no es el primero y pertenece a uno se lo añadimos a quien pertenece
        eldiv.shadowRoot.appendChild(res);
      }

      if (element.elements && element.elements.length > 0) {
        // Si tiene contenido...
        element.elements.forEach(subelement => {
          // Lo recorremos
          // Leemos el id del subelemento
          let subdiv = res.shadowRoot.getElementById(subelement.id);
          // Lo pintamos
          let tree_childs = this._render_tree_element(subelement, subdiv, type, false, last, true);
        });
      }
    }
  }

  _onclick(event)  {
    // Metodo del evento de click

    // Heredamos los del padre
    let el=super._onclick(event);
    // Sacamos el elemento al que hacemos click
    let htmel = event.composedPath()[0];

    // Sacamos los datos de a donde hace click (el destino del click)
    let element = event.detail.data;

    // Lo ponemos en negro (por ahora)
    // Este funciona diferente porque se queda negro y si hace click otra vez se pone blanco
    // Mejor se haria detectando si esta expandido o no!!!! (refactorizar punto com)
    if (htmel.classList.contains('active') == true) {
      htmel.classList.remove('active');
    } else {
      htmel.classList.add('active');
    }
  
    if (element && element.elements && element.elements.length>0) {
      if (element.navTree <= this._startLevel+this._levels-1) {
      }
    } else {
      // Click en elemento final
      if (element.href && element.href.length>0) {
        window.location.href=element.href;
      }
    }
  }

  _hideAll(element) {
    // Metodo que esconde todos los elementos de uno determinado
  }

}
customElements.define(UVaNavegacionVertical.is, UVaNavegacionVertical);

class UVaNavegacionMenu extends HTMLElement {
  static get is() {
    return 'uva-navegacion-menu';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento contenedor de la navegacion " + e;
    } finally {
      this._last = undefined;
      this._show = false;
      this._child = false; //Define si los hijos hay que crearlos dentro del elemento o no
      this._data = undefined;

      this._expanded = false;
      // Funciones
      this._onclick = this._onclick.bind(this);
      //Shadow
      let shadowRoot = this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
      /* Contenedor de menu */
      :host {
        /* Heredamos del padre */
        display: inherit;
        flex-wrap: wrap;
      }
      </style>
      `
    }
  }

  connectedCallback() {
    // Cuando aparezca en el DOM
    // Parmametros
    // Funciones, eventos, esas cosas
    this.addEventListener('nav_click', this._onclick);
  }

  disconnectedCallback() {
    // Cuando lo quitemos del DOM
    this.removeEventListener('nav_click', this._onclick);
  }

  adoptedCallback() {
    // Cuando lo movemos en el durumdumdumdum
  }

  static get observedAttributes() {
    // Observable! del locale
    return ['locale'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Si cambia algo
   }

  set data(val) {
    // Modificamos los datos de la navegación
    // Cogemos los valores
    this._data = val;
    // Y renderizamos
    this._render();
  }
  set last(val) {
    // El ultimo nivel
    this._last = val;
  }
  set child(val) {
    // Si tiene hijos
    this._child = val;
  }
  set expanded(val) {
    // Si esta expandido o no
    this._expanded = val;
  }

  _render() {
    // Pintado de la navegacion

    // Ponemos el ID
    this.id = this._data.id;
    // Ponemos el class
    this.className = "navigation-menu";
    // Para todos los elementos que contiene
    this._data.elements.forEach(element => {
      // Creamos el objeto elemento de navegacion
      let el = new UVaNavegacionElemento();
      // Le damos de comer
      el.actions = this._last;
      el.data = element;
      // Aqui podriamos definir si es horizontal o vertical (la procedencia) para poner un estilo u otro
      // ideas... pero como no hay nada definido...
      // Y lo ponemos en el durumdumdumdum
      this.shadowRoot.appendChild(el);
    });
  }

  _onclick(event) {
    // Metodo del evento del click
    // Primero sacamos el elemento sobre el que hace click
    let htmlel = event.composedPath()[0];

    // Si es el elemento en concreto (osea si es si mismo)
    if (this._data.id === event.detail.data.id) {
      // Le damos la vuelta a "esta expandido"
      this._expanded =! this._expanded;
    }
  }
}
customElements.define(UVaNavegacionMenu.is, UVaNavegacionMenu);

class UVaNavegacionElemento extends HTMLElement {
  static get is() {
    return 'uva-navegacion-elemento';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento de navegacion-elemento " + e;
    } finally {
      // Valores por defecto del objecto
      this._data = undefined;
      this._actions = undefined;
      this._expanded = false;

      // Funciones
      this._onclick = this._onclick.bind(this);

      // El elemento en si, la base
      let shadowRoot = this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
      :host {
        font-family: 'Montserrat', sans-serif;
        margin: 0;
        padding: 0;
      }

      p {
        margin: 0;
        padding: 0;
      }

      .green {
        border-top: 5px solid green;
      }

      .blue {
        border-top: 5px solid blue;
      }

      .yellow {
        border-top: 5px solid yellow;
      }

      .pink {
        border-top: 5px solid pink;
      }

      .red {
        border-top: 5px solid red;
      }

      .level0 {
        min-width: 100px;

        margin-left: 0.5em;
        margin-right: 0.5em;
        margin-bottom: 1em;

        padding-top: 0.5em;

        font-family: 'Montserrat', sans-serif;
      }

      p.level0 {
        padding: 0.5em 1em;
      }

      p.level0:hover, :host(.active) p.level0 {
        background-color: black;
        color: white;
        cursor: pointer;
      }

      p.level1 {
        min-width: 100px;
        background-color: #e5e5e5;
        padding: 1em 0.5em;
        text-align: center;
      }

      p.level1:hover {
        cursor: pointer;
        text-decoration: underline;
      }

      </style>
      <p id="content"></p>
      `;
    }
  }

  connectedCallback() {
    //Parmametros
    this.addEventListener('click', this._onclick);
    this.addEventListener('mouseenter', this._onenter);
    this.addEventListener('mouseover', this._onover);
    this.addEventListener('mouseout', this._onleave);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._onclick);
    this.removeEventListener('mouseenter', this._onenter);
    this.removeEventListener('mouseover', this._onover);
    this.removeEventListener('mouseout', this._onleave);
  }

  adoptedCallback() {
  }

  static get observedAttributes() {
    return ['locale'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Si algo cambia
   }

  set data(val) {
    //Modificamos los datos de la navegación
    this._data = val;
    // Pintamos los cambios
    this._render();
  }

  set actions(val) {
    //Modificamos la accion de la navegacion
    this._actions = val;
  }

  _render() {
    // Metodo de "pintado"

    // Esto habra que definirlo algun dia, es una chapuza
    let array_colores = ['green', 'blue', 'yellow', 'pink', 'red'];

    // Identificador del elemento
    this.id = this._data.id;
    // Identificador de la clase del elemento
    this.className = 'navigation-element';
    // Atributos que ponemos al elemento, la posicion y el nivel en el que esta
    this.setAttribute('position', this._data.navPos);
    this.setAttribute('level', this._data.navTree);

    if (this._data.navTree === 1) {
      // Si es el primero menu hay que hacer cosas cochinas con el, como los colorines y tal
      this.shadowRoot.getElementById('content').classList.add('level0');
      this.shadowRoot.getElementById('content').classList.add(array_colores[Math.floor(Math.random()*5)]);

    } else {
      // Si no lo es, pues oye, es lo que hay, pintarlo bien
      this.shadowRoot.getElementById('content').classList.add('level1');
    }

    // Añadimos el yogurt al asunto (el nombre, la identificacion para encontrarlo... lo normal oye)
    this.shadowRoot.getElementById('content').innerText = this._data.navText;
    this.shadowRoot.getElementById('content').id = this._data.id;
  }

  _onclick(event) {
    // Metodo del click

    // Primero, en donde hacemos click
    let htmlel = event.composedPath()[0];
    //console.log(htmlel.id);

    // Luego, a donde hacemos click
    let element = event.detail.data;

    // Si estamos haciendo click en uno "de los nuestros"
    if (htmlel.nodeName === "P") {
      // Sacamos el id
      let htmlid = htmlel.id;
      // Y si soy yo (que hay muchis)
      if (htmlid === this._data.id) {
        // Cambiamos el expanded de si a no y viceversa
        this._expanded =! this._expanded;
      }
    }

    // Buscamos el padre, el contenedor de navegacion padre, esto funciona para el vertical por como lo estamos pintando, obviamente
    let elementsnav = this.shadowRoot.querySelectorAll(':scope uva-navegacion-menu');

    elementsnav.forEach(elnav => {
      if (this._expanded) {
        // Si esta expandido o visible (usamos visible para las transiciones)
        // Tenemos que jugar mas con las transiciones, para que negarlo
        elnav.style.display = 'grid';
        elnav.style.visibility = 'visible';
      } else {
        // Si no lo esta...
        elnav.style.display = 'none';
        elnav.style.visibility = 'hidden';
      }
    });

    // Disparamos el evento de click en la navegacion
    let ev = new CustomEvent("nav_click", {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: { data: this._data}
    });

    this.dispatchEvent(ev);
  }

  _onenter(event) {
    // Metodo de cuando se hace enter con el teclado
    if (this._actions) {
      let ev = new CustomEvent("nav_enter",{
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: { data: this._data}
      });
      this.dispatchEvent(ev);
    }
  }

  _onover(event) {
  }

  _onleave(event) {
    // Metodo para el evento de sacar el raton fuera
    if (this._actions) {
      let ev = new CustomEvent("nav_leave",{
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: { data: this._data}
      });
      this.dispatchEvent(ev);
    }
  }
}
customElements.define(UVaNavegacionElemento.is, UVaNavegacionElemento);