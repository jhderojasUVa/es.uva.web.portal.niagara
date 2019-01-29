'use strict';

class UVaDicyt extends HTMLElement {
  static get is() {
    return 'uva-dicyt';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento UVaDicyt " + e;
    } finally {
      //Variables
      this._urldata=undefined;
      this._datanum=4;
      this._data=undefined;
      //Funciones
      // Creamos el shadow del elemento
      let shadowRoot = this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
      </style>
      <p>DICYT</p>
      <div id="content" class="app-grid article-grid fade-in"></div>
      `;
    }
  }

  connectedCallback() {
    console.log("--\x3eUVaNavegacion connectedCallback");
    this.addEventListener('click', this._onclick);
    
    this._urldata = this.getAttribute('data');
    this._datanum = this.getAttribute('num');
    this._loadDatos();
  }

  disconnectedCallback() {
    console.log("--\x3eUVaNavegacion disconnectedCallback");
  	this.removeEventListener('click', this._onclick);
  }

  adoptedCallback() {  }
  attributeChangedCallback(name, oldValue, newValue) {  }

  _loadDatos() {
    loadJSONComunicacion(this._urldata)
    .then((element) =>  {
      this._data=element;
      this._render();
    })
    .catch( (error) =>  {
      console.warn('Error al consultar los datos ', error);
    });
  }

  _render() {
    let count=1;
    this._data.forEach(doc => {
      if (count > parseInt(this._datanum)) return;
      count++;
      let feed = new UVARSSFeed();
      feed.doc=doc;
      this.shadowRoot.getElementById("content").appendChild(feed);
      
  });
  }

  _onclick(event)  {
    console.log("UVaDicyt ON CLICK");
  }
}
customElements.define(UVaDicyt.is, UVaDicyt);
