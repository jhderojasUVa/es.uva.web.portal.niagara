'use strict';

class UVaHeader extends HTMLElement {
  static get is() {
    return 'uva-header';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento de la oferta " + e;
    } finally {
      //Variables
      //Funciones
      // Creamos el shadow del elemento
      let shadowRoot = this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
      /* Importamos bootstrap */
      @import url('https://comunicacion-des.uva.es/resources/comunicacion/css/bootstrap.min.css');
      .cabecera_uva {
        background-color: #0b1f4a;
        color: white;
        font-size: 1.1em; }
      .cabecera_uva h1 {
        color: white;
        font-size: 26px; }
      .cabecera_uva a {
        color: white; }
      .cabecera_uva a:hover {
          color: white;
          text-decoration: none; }
      .cabecera_uva .separador_left {
        border-left: 1px solid #d2d2d2;
        padding-left: 0.5em; }
      .cabecera_uva .separador_right {
        border-right: 1px solid #d2d2d2;
        padding-right: 0.5em; }
      .cabecera_uva .text-menu {
        font-size: 10px;
        width: 80px; }
        
      </style>
      <!-- HEADER -->
	    <div class="container-full cabecera_uva">
	      <div class="container">
		      <div class="row align-items-center">
		      	<div class="col-md-1 text-left d-none d-md-block d-lg-block">
				      <a href="./index.html" role="link" alt="Inicio" aria-label="Inicio"><i class="fas fa-home"></i></a>
			      </div>
			      <div class="col-md-4 text-center">
			      	<img alt="Universidad de Valladolid" src="./resources/comunicacion/img/uva1.svg" srcset="./resources/comunicacion/img/uva1.svg">
			      </div>
            <div class="col-md-7 text-right">
              <span class="separador_left">
                <a href="http://directorio.uva.es/inicio">
                  <span class="text-menu">Directorio</span>
                  <img alt="Seleccionar idioma" src="./resources/comunicacion/img/address-book.svg" srcset="./resources/comunicacion/img/address-book.svg" width="20" style="margin-left: 0.3em;">
                </a>
              </span>
              <span class="separador_left">
                <a href="http://miportal.uva.es/">
                  <span class="text-menu" style="display: inline-block; width: 60px; margin-top: 5px;">Comunidad</span>
                  <i class="fas fa-lock"></i>
                </a>
              </span>
              <span class="separador_left">
                <a alt="Buscador" aria-label="Buscador" href="http://www-des.uva.es/buscador.html" role="link">
                  <i class="fas fa-search"></i>
                </a>
              </span>
              <span class="separador_left">
                <a alt="Buscador" aria-label="Buscador" href="/buscador.html" role="link">
                  <i class="fas fa-search"></i>
                </a>
              </span>
            </div>
          </div>
        </div>
	    </div>
      `;

    }
  }

  connectedCallback() {
    console.log("--\x3eUVaNavegacion connectedCallback");
  }

  disconnectedCallback() {
    console.log("--\x3eUVaNavegacion disconnectedCallback");
  }

  adoptedCallback() {  }
  attributeChangedCallback(name, oldValue, newValue) {  }

}
customElements.define(UVaHeader.is, UVaHeader);
