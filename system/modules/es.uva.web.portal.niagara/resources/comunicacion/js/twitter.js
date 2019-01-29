'use strict';

class UVaTwitter extends HTMLElement {
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
      //Variables
      this._urldata=undefined;
      this._datanum=4;
      this._data=undefined;
      //Funciones
      // Creamos el shadow del elemento
      let shadowRoot = this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
      :host {
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
        
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;

        webkit-flex-wrap: nowrap;
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
        -webkit-justify-content: flex-start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-align-content: stretch;
        -ms-flex-line-pack: stretch;
        align-content: stretch;
        -webkit-align-items: flex-start;
        -ms-flex-align: start;
        align-items: flex-start;
      }

      @media all and (min-width: 1200px) {
        :host {
          -webkit-flex-direction: row;
          -ms-flex-direction: row;
          flex-direction: row;
        }
      }

      @media all and (max-width: 1199px) {
        :host {
          -webkit-flex-direction: row;
          -ms-flex-direction: row;
          flex-direction: row;
        }
      }
    
      @media all and (max-width: 999px) {
        :host {
          -webkit-flex-direction: row;
          -ms-flex-direction: row;
          flex-direction: row;
        }
      }

      @media all and (max-width: 769px) {
        :host {
          -webkit-flex-direction: column;
          -ms-flex-direction: column;
          flex-direction: column;
        }
      }
      
      @media all and (max-width: 400px) {
        :host {
          -webkit-flex-direction: column;
          -ms-flex-direction: column;
          flex-direction: column;
        }
      }
      
      </style>
      `;
    }
  }

  connectedCallback() {
    console.log("--> UVaTwitter connectedCallback");
    this.addEventListener('click', this._onclick);
    
    this._urldata = this.getAttribute('data');
    this._datanum = this.getAttribute('num');
    this._loadDatos();
  }

  disconnectedCallback() {
    console.log("--> UVaTwitter disconnectedCallback");
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
      console.log(doc);
      let tweet = new UVATweet();
      tweet.doc=doc;
      this.shadowRoot.appendChild(tweet);
  });
  }

  _onclick(event)  {
    console.log("UVaTwitter ON CLICK");
  }
}
customElements.define(UVaTwitter.is, UVaTwitter);

class UVATweet extends HTMLElement {
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
        //Variables
        this._doc=undefined;
        // Creamos el shadow del elemento
        let shadowRoot = this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
        :host {
          -webkit-order: 0;
          -ms-flex-order: 0;
          order: 0;
          -webkit-flex: 0 1 auto;
          -ms-flex: 0 1 auto;
          flex: 0 1 auto;
          -webkit-align-self: auto;
          -ms-flex-item-align: auto;
          align-self: auto;

          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
        }
      
        a, a:link, a:visited, a:hover, a:active  {
          color: black;
          text-decoration: none;
        }

        </style>
        <a target="_blank" id="link" href="">
          <div class="headline">
            <h2 id="name">NAME</h2>
            <p id="text">TEXT</p>
          </div>
         </a>
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
    this._doc=val;

    let element = this.shadowRoot.getElementById('name');
    element.innerHTML=val.user_name;

    element = this.shadowRoot.getElementById('text');
    element.innerHTML=val.text;

    element=this.shadowRoot.getElementById('link');
    // https://twitter.com/statuses/1075311699236937728
    let link="https://twitter.com/"+element.user_screenname+"/status/"+element.id;
    element.href="https://twitter.com/CampusMDelibes/status/1075311699236937728";
    element.href="https://twitter.com/"+val.user_screenname+"/status/"+val.id;
    element.href="https://twitter.com/statuses/"+val.id;
  }

}
customElements.define(UVATweet.is, UVATweet);