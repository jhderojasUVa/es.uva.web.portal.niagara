'use strict';

class UVaHeader extends HTMLElement {

  static get is() {
    return 'uva-header';
  }

  constructor(...args) {
    // Constructor
    try {
      // Si lo puedes crear
      const self = super(...args);
    } catch(e) {
      // El error de turno
      throw 'Error al crear el elemento header: ' + e;
    } finally {
      // Metemos las variables
      this._localedata = 'es';
      // Creamos el elemento, el shadow
      let shadowRoot = this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
        @charset "UTF-8";
        @import url("https://fonts.googleapis.com/css?family=Alegreya:300, 400, 500|Arvo:300, 400, 500|IM+Fell+English+SC:300, 400, 500|Lato:300, 400, 500|Libre+Franklin:300, 400, 500|Montserrat:300, 400, 500|Open+Sans:300, 400, 500|Raleway:300, 400, 500");
        @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
        @import url('https://use.fontawesome.com/releases/v5.6.3/css/all.css');
        .cabecera_uva {
          background-color: #0b1f4a;
          color: white;
          font-size: 1.1em;
        }
        .cabecera_uva .row {
        	height: 52px;
        }
        @media only screen and (max-width: 769px) {
        	.cabecera_uva .row {
      		    height: 88px;
      	 }
        }
        .cabecera_uva h1 {
          color: white;
          font-size: 26px;
        }
        .cabecera_uva a {
          color: white;
        }
        .cabecera_uva a:hover {
          color: white;
          text-decoration: none;
        }
        .cabecera_uva .separador_left {
          border-left: 1px solid #d2d2d2;
          padding-left: 0.5em;
        }
        .cabecera_uva .separador_right {
          border-right: 1px solid #d2d2d2;
          padding-right: 0.5em;
        }
        .cabecera_uva .text-menu {
          font-size: 10px;
          width: 80px;
        }
      </style>
      <div class="container-full cabecera_uva">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-1 text-left d-none d-md-block d-lg-block">
              <a href="http://www.uva.es" role="link" alt="Inicio" aria-label="Inicio"><i class="fas fa-home"></i></a>
            </div>
            <div class="col-md-4 text-center">
      				<img alt="Universidad de Valladolid" src="./img/uva_logo.svg" srcset="./img/uva_logo.svg" />
      			</div>
            <div class="col-md-7 text-right">
              <span class="separador_left"><a href="http://directorio.uva.es/inicio"><span class="text-menu">Directorio</span><img alt="Seleccionar idioma" src="./img/address-book.svg" srcset="./img/address-book.svg" width="20" style="margin-left: 0.3em;"/></a></span>
      			  <span class="separador_left"><a href="http://miportal.uva.es"><span class="text-menu" style="display: inline-block; width: 60px; margin-top: 5px;">Comunidad</span> <i class="fas fa-lock"></i></a></span>
              <span class="separador_left"><a alt="Buscador" aria-label="Buscador" href="#" role="link"><i class="fas fa-search"></i></a></span>
            </div>
          </div>
        </div>
      </div>
      `;
    }
  }

}

customElements.define(UVaHeader.is, UVaHeader);
