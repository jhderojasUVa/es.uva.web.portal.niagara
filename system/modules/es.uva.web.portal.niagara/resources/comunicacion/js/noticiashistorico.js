'use strict';

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

if (!Date.prototype.toISOString) {

  Date.prototype.toISOString = function() {

    var d = this;

    // Padding functions 
    function pad(n) {return (n<10? '0' :  '') + n}
    function padd(n){return (n<100? '0' : '') + pad(n)}

    return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) +
           'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + 
           pad(d.getUTCSeconds()) + '.' + padd(d.getMilliseconds()) + 'Z';
  }
}

const defaultOptions = {
    timeout: 20000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null,
  };
  
  function generateCallbackFunction() {
    return `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
  }
  
  function clearFunction(functionName) {
    // IE8 throws an exception when you try to delete a property on window
    // http://stackoverflow.com/a/1824228/751089
    try {
      delete window[functionName];
    } catch (e) {
      window[functionName] = undefined;
    }
  }
  
  function removeScript(scriptId) {
    const script = document.getElementById(scriptId);
    if (script) {
      document.getElementsByTagName('head')[0].removeChild(script);
    }
  }
  
  function fetchJsonp(_url, options = {}) {
    // to avoid param reassign
    let url = _url;
    const timeout = options.timeout || defaultOptions.timeout;
    const jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;
  
    let timeoutId;
  
    console.log("--> fetchJsonp");
    console.log(_url);
    console.log(timeout);
    console.log(jsonpCallback);


    return new Promise((resolve, reject) => {
      const callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
      const scriptId = `${jsonpCallback}_${callbackFunction}`;
  
      window[callbackFunction] = (response) => {
        resolve({
          ok: true,
          // keep consistent with fetch API
          json: () => Promise.resolve(response),
        });
  
        if (timeoutId) clearTimeout(timeoutId);
  
        removeScript(scriptId);
  
        clearFunction(callbackFunction);
      };

      console.log(url);
      console.log(_url);
      if (url!=undefined) {
        // Check if the user set their own params, and if not add a ? to start a list of params
        url += (url.indexOf('?') === -1) ? '?' : '&';
      } else {
        console.warn("URL EMPTY");
        resolve({
            ok: false,
            // keep consistent with fetch API
            json: {},
          });
      }

      console.log(url);

      const jsonpScript = document.createElement('script');
      //jsonpScript.setAttribute('src', `${url}${jsonpCallback}=${callbackFunction}`);
      jsonpScript.setAttribute('src', `${url}json.wrf=${callbackFunction}&${jsonpCallback}=${callbackFunction}`);
      if (options.charset) {
        jsonpScript.setAttribute('charset', options.charset);
      }
      jsonpScript.id = scriptId;
      document.getElementsByTagName('head')[0].appendChild(jsonpScript);
  
      timeoutId = setTimeout(() => {
        reject(new Error(`JSONP request to ${_url} timed out`));
  
        clearFunction(callbackFunction);
        removeScript(scriptId);
        window[callbackFunction] = () => {
          clearFunction(callbackFunction);
        };
      }, timeout);
  
      // Caught if got 404/500
      jsonpScript.onerror = () => {
        reject(new Error(`JSONP request to ${_url} failed`));
  
        clearFunction(callbackFunction);
        removeScript(scriptId);
        if (timeoutId) clearTimeout(timeoutId);
      };
    });
  }

class UVAHistoricoNoticias extends HTMLElement {
  static get is() {
    return 'uva-noticias-historico';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento UVAHistoricoNoticias " + e;
    } finally {
      //Variables
      this._baseuri="https://comunicacion-des.uva.es/opencms/handleSolrSelect?fq=type:nia-noticia&fq=parent-folders:/sites/comunicacion&wt=json"
      //this._baseuri="http://comunicacion.uva.es/opencms/handleSolrSelect?fq=type:noticias&fq=parent-folders:/sites/comunicacion&wt=json&json.wrf=noticias&callback=noticias"
      //?rows=20&
      //&fq=campo.tipo_prop:(*1*)
      this._data=undefined;
      this._config={};
      this._tipodata="";
      this._tipos=[
        {"id":"","title": "Todos"},
        {"id":1,"title": "La Uva informa"},
        {"id":2,"title": "Agenda"},
        {"id":3,"title": "Fueron portada"},
        {"id":4,"title": "Nota de prensa"},
        {"id":5,"title": "Comunicado para la prensa"},
        //{"id":6,"title": "Ven a la UVa"},
        //{"id":7,"title": "Portada Web"},
        //{"id":8,"title": "Historia y patrimonio"},
        //{"id":9,"title": "Permanente"}
      ]
      //Funciones
      this._onclick = this._onclick.bind(this);
      this._get_mindate= this._get_mindate.bind(this);
      this._get_maxdate= this._get_maxdate.bind(this);

      // Creamos el shadow del elemento
      let shadowRoot = this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
        /* Importamos bootstrap */
        @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css');
        .separacion_bloques {
          /*margin-bottom: 3em;*/
          margin-top: 3em;
        }
        .cabecera_bloque {
          border-top: 3px solid #0b1f4a; 
        }
        .cabecera_bloque h1 {
          color: #0b1f4a;
          margin-left: -15px;
          margin-right: -15px;
          font-size: 2em; 
        }
        .no-margins {
          margin-left: -30px;
          margin-right: -30px;
          margin-top: 15px;
          margin-bottom: 15px;
        }
        .types {
          display: block;
          clear: both;
        }
        .years {
          display: block;
          clear: both;
        }
      </style>
      <p>Noticias historico</p>
      <div class="row">
        <div class="search col-md-3">
          <div id="types" class="types"></div>
          <div id="years" class="years"></div>
        </div>
        <div id="content" class="col-md-9"></div>
      </div>
      `;

    }
  }

  connectedCallback() {
    this.addEventListener('click', this._onclick);
    
    if (this.getAttribute('tipo')) {
      this._tipodata = this.getAttribute('tipo');
    }
    this._loadDatos();
  }

  disconnectedCallback() {
  	this.removeEventListener('click', this._onclick);
  }

  adoptedCallback() {  }
  attributeChangedCallback(name, oldValue, newValue) {  }

  set data(val) {
      console.log("--> set Data")
    //Modificamos los datos de la navegación
    this._data=val;
  }

  _loadDatos() {
    console.log("--> ESDUVANoticias loadDatos");
    console.log(this._urldata);

    //Hacemos el fetch de las URLs
    let data = Promise.all(
      [
        this._get_mindate(),
        this._get_maxdate()
      ]
    ).then(respuestas => {
      respuestas.forEach(element => {
        for(var item in element) {
          if (Object.keys(this._config).indexOf(item)<0) {
            this._config[item]=element[item];
          }
        }
      });
    }).then(respuesta=>{
      this._render();
    })
    .catch(reason => {
      console.warn(reason);
    })
    

  }

  _get_mindate() {
    console.log("--> _get_mindate");
    var url=this._baseuri+"&rows=1&fq=campo.tipo_prop:(*"+this._tipodata+"*)&sort=released%20asc";
    console.log(url);
    return loadJSONComunicacion(url)
    .then(function(json) {
      if (json.response.docs && json.response.docs.length==1) {
        return {
          "mindate": json.response.docs[0].timestamp,
          "num":json.response.numFound
        };
      }
      return undefined;
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });
  }

  _get_maxdate() {
    console.log("--> _get_maxdate");
    var url=this._baseuri+"&rows=1&fq=campo.tipo_prop:(*"+this._tipodata+"*)&sort=released%20desc";
    console.log(url);
    return loadJSONComunicacion(url)
    .then(function(json) {
      console.log(json);
      if (json.response.docs && json.response.docs.length==1) {
        return {
          "maxdate": json.response.docs[0].timestamp,
          "num":json.response.numFound
        }
      }
      return undefined;
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });
  }

  _get_results(param) {
    console.log("--> _get_results");
    //PTE: AUMENTAR NUMERO
    var url=this._baseuri+"&rows=10&fq=campo.tipo_prop:(*"+this._tipodata+"*)&sort=released%20desc"+param;
    console.log(url);
    return loadJSONComunicacion(url)
    .then(function(json) {
      return json;
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });
  }

  _render() {
    console.log("--> Render");
    this._render_types();
    this._render_years();
    this._render_now();
  }

  _render_types() {
    let type=new UVAHistoricoNoticiaTipos();
    type.data=this._tipos;
    this.shadowRoot.getElementById("types").appendChild(type);
  }

  _render_years() {
    let res=[];
    //Create element for year
    let minutcdate=this._config.mindate;
    let maxutcdate=this._config.maxdate;
    //Date.toISOString()
    var mindate = new Date(minutcdate);
    var maxdate = new Date(maxutcdate);
    for (let y=parseInt(mindate.getUTCFullYear());y<=parseInt(maxdate.getUTCFullYear());y++) {
      let month_ini=1;
      let month_fin=12;
      if (y=== parseInt(mindate.getUTCFullYear())) {
        month_ini= parseInt(mindate.getUTCMonth());
      }
      if (y=== parseInt(maxdate.getUTCFullYear())) {
        month_fin= parseInt(maxdate.getUTCMonth());
      }
      let primerdia = new Date("01/01/"+y);
      let ultimodia=new Date(primerdia.getFullYear()+1, 0, 0);
      let res_year= {
        "months": [],
        "name": y,
        "uri_param": '&fq=lastmodified:['+primerdia.toISOString()+' TO '+ultimodia.toISOString()+']',
      }

      for (let m=month_ini;m<=month_fin;m++) {
        let primerdia = new Date(m+"/01/"+y),
        locale =  navigator.language || navigator.userLanguage,
        month = primerdia.toLocaleString(locale, { month: "long" });
        let ultimodia=new Date(primerdia.getFullYear(), primerdia.getMonth() + 1, 0);
        let res_month= {
          "uri_param": '&fq=lastmodified:['+primerdia.toISOString()+' TO '+ultimodia.toISOString()+']',
          "name": month,
          "date_ini": primerdia.toISOString(),
          "date_fin": ultimodia.toISOString()
        }
        res_year.months.push(res_month);
        //http://comunicacion.uva.es/opencms/handleSolrSelect?rows=1&fq=lastmodified:[2017-01-01T00:00:00Z TO 2017-02-01T00:00:00Z]&fq=campo.tipo_prop:(*1*)&fq=type:noticias&sort=released%20desc&fq=parent-folders:/sites/comunicacion&wt=json
        //
      }
      res.push(res_year);
    }
    this._data=res;

    let type=new UVAHistoricoNoticiasYears();
    type.data=this._data;
    this.shadowRoot.getElementById("years").appendChild(type);
   
    this._data.forEach(element => {
      if (element.months) {
        let month=new UVAHistoricoNoticiasMonths();
        month.year=element;
        month.data=element.months;
        this.shadowRoot.getElementById("years").appendChild(month);
      }
    });

    //Load this date
    let fecha = new Date();
  }

  _render_now() {
    console.log("--> _render_now");

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    //let elsel=this.shadowRoot.getElementById("uva-historico-noticia-years-"+yyyy);
    let elsel=this.shadowRoot.getElementById("uva-historico-noticia-months-"+yyyy);
    if (elsel) {
      elsel.style.display="";
    }

  }

  _render_results() {
    console.log("--> _render_results");
    this.shadowRoot.getElementById("content").innerHTML="";
    this._data.forEach(element => {
      let el=new UVAHistoricoNoticia();
      el.data=element;
      this.shadowRoot.getElementById("content").appendChild(el);
    });

  }

  _onclick(event)  {
    console.log("--> UVAHistoricoNoticias _onclick");
    let count=0;
    let el=event.composedPath()[count];
    while (el.tagName !== "UVA-HISTORICO-NOTICIA-YEAR" && el.tagName !== "UVA-HISTORICO-NOTICIA-MONTH" && el.tagName !== "UVA-HISTORICO-NOTICIA-TIPO") {
      console.log(el.tagName);
      count++;
      el=event.composedPath()[count]
    }

    if (el.tagName === "UVA-HISTORICO-NOTICIA-YEAR") {
      //Mostramos el elemento con los meses del año
      let year=el.getAttribute("year");
      let elsel=this.shadowRoot.getElementById("uva-historico-noticia-months-"+year);
      console.log(elsel);
      //Ocultamos toso los meses
      let elhtml=this.shadowRoot.querySelectorAll('uva-historico-noticia-months');
      elhtml.forEach(element => {
        element.style.display="none";
      });
      //Mostramos el mes seleccionado
      elsel.style.display="";
    } else if (el.tagName === "UVA-HISTORICO-NOTICIA-MONTH") {
      //Mostramos el elemento con los meses del año
      console.log(el);
      console.log(el.getAttribute("uri"));
      let param=el.getAttribute("uri");
      console.log(param);
      this._get_results(param)
      .then(data=>{
        this._data=data.response.docs;
        console.log(data.response.docs);
        this._render_results();
      });
    } else if (el.tagName === "UVA-HISTORICO-NOTICIA-TIPO") {
      //Mostramos el elemento con los meses del año
      console.log(el);
      this._tipodata=el.id;
    }
  }
}
customElements.define(UVAHistoricoNoticias.is, UVAHistoricoNoticias);

class UVAHistoricoNoticiasYears extends HTMLElement {
  static get is() {
    return 'uva-historico-noticia-years';
  }
  constructor(...args) {
      // Constructor
      try {
        const self = super(...args);
      } catch(e) {
        // Si no somos capaces de cargar al padre, error
        throw "Error al crear el elemento UVAHistoricoNoticiasYears " + e;
      } finally {
        //Variables
        this._doc=undefined;
        //Funciones locales
        this._onclick = this._onclick.bind(this);
        // Creamos el shadow del elemento
        let shadowRoot = this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
        :host {
          display: block;
          clear: both;
        }

        </style>
        <p>YEARS</p>
        <div id="content"></div>
        `;
      }
  }

  connectedCallback() {
      this.addEventListener('click', this._onclick);
  }

  disconnectedCallback() {
      this.removeEventListener('click', this._onclick);
  }

  adoptedCallback() {  }
  attributeChangedCallback(name, oldValue, newValue) {  }

  set data(val) {
    this._data=val;
    this._render();
  }

  _render() {
    console.log("--> UVAHistoricoNoticiasYear render");
    console.log(this._data);

    this._data.forEach(element => {
      let year=new UVAHistoricoNoticiasYear();
      year.data=element;
      this.shadowRoot.getElementById("content").appendChild(year);

    
      /*
      element.months.forEach(element => {
        let month=new UVAHistoricoNoticiasMonth();
        month.data=element;
        this.shadowRoot.getElementById("months").appendChild(month);
      });
      */
    });
    //let el_ul= document.createElement("ul");
    /*
    this._data.months.forEach(element => {
      let month=new UVAHistoricoNoticiasMonth();
      month.data=element;
      this.shadowRoot.getElementById("content").appendChild(month);
      /*
      let el_li= document.createElement("li");
      el_li.innerText=element.name;
      el_li.className="historico-element";
      el_li.setAttribute("param",element.uri_param);
      el_ul.appendChild(el_li);
      */
    //});
    //this.shadowRoot.getElementById("content").appendChild(el_ul);
  }

  _onclick(event) {
    console.log("--> UVAHistoricoNoticiasYears onclick");
  }  
}
customElements.define(UVAHistoricoNoticiasYears.is, UVAHistoricoNoticiasYears);


class UVAHistoricoNoticiasYear extends HTMLElement {
    static get is() {
      return 'uva-historico-noticia-year';
    }
    constructor(...args) {
        // Constructor
        try {
          const self = super(...args);
        } catch(e) {
          // Si no somos capaces de cargar al padre, error
          throw "Error al crear el elemento UVAHistoricoNoticiasYear " + e;
        } finally {
          //Variables
          this._doc=undefined;
          //Funciones locales
          this._onclick = this._onclick.bind(this);
          // Creamos el shadow del elemento
          let shadowRoot = this.attachShadow({ mode: 'open' });
          this.shadowRoot.innerHTML = `
          <style>
          div {
            float: left;
          }
          </style>
          <div id="title"></div>
          `;
        }
    }
  
    connectedCallback() {
        this.addEventListener('click', this._onclick);
    }
  
    disconnectedCallback() {
        this.removeEventListener('click', this._onclick);
    }
  
    adoptedCallback() {  }
    attributeChangedCallback(name, oldValue, newValue) {  }
  
    set data(val) {
      this._data=val;
      this.setAttribute("year",this._data.name);
      this._render();
    }

    _render() {
      console.log("--> UVAHistoricoNoticiasYear render");
      console.log(this._data);
      this.shadowRoot.getElementById("title").innerText=this._data.name;
      //let el_ul= document.createElement("ul");
      /*
      this._data.months.forEach(element => {
        let month=new UVAHistoricoNoticiasMonth();
        month.data=element;
        this.shadowRoot.getElementById("content").appendChild(month);
        /*
        let el_li= document.createElement("li");
        el_li.innerText=element.name;
        el_li.className="historico-element";
        el_li.setAttribute("param",element.uri_param);
        el_ul.appendChild(el_li);
        */
      //});
      //this.shadowRoot.getElementById("content").appendChild(el_ul);
    }

    _onclick(event) {
      console.log("--> UVAHistoricoNoticiasYear onclick");
    }  
  }
  customElements.define(UVAHistoricoNoticiasYear.is, UVAHistoricoNoticiasYear);

  class UVAHistoricoNoticiasMonths extends HTMLElement {
    static get is() {
      return 'uva-historico-noticia-months';
    }
    constructor(...args) {
        // Constructor
        try {
          const self = super(...args);
        } catch(e) {
          // Si no somos capaces de cargar al padre, error
          throw "Error al crear el elemento UVAHistoricoNoticiasMonths " + e;
        } finally {
          //Variables
          this._doc=undefined;
          //Funciones locales
          this._onclick = this._onclick.bind(this);
          // Creamos el shadow del elemento
          let shadowRoot = this.attachShadow({ mode: 'open' });
          this.shadowRoot.innerHTML = `
          <style>
          :host {
            display: block;
            clear: both;
          }
          </style>
          <div id="content"></div>
          `;
        }
    }
  
    connectedCallback() {
        this.addEventListener('click', this._onclick);
    }
  
    disconnectedCallback() {
        this.removeEventListener('click', this._onclick);
    }
  
    adoptedCallback() {  }
    attributeChangedCallback(name, oldValue, newValue) {  }
  
    set year(val) {
      this._year=val;
      this.id="uva-historico-noticia-months-"+this._year.name;
    }

    set data(val) {
      this._data=val;
      this._render();
    }
  
    _render() {
      console.log("--> UVAHistoricoNoticiasMonths render");
      console.log(this._data);
      //Ocultamos al crearlo
      this.style.display="none";
  
      this._data.forEach(element => {
        let month=new UVAHistoricoNoticiasMonth();
        month.year=this._year;
        month.data=element;
        this.shadowRoot.getElementById("content").appendChild(month);
        /*
        element.months.forEach(element => {
          let month=new UVAHistoricoNoticiasMonth();
          month.data=element;
          this.shadowRoot.getElementById("months").appendChild(month);
        });
        */
      });
      //let el_ul= document.createElement("ul");
      /*
      this._data.months.forEach(element => {
        let month=new UVAHistoricoNoticiasMonth();
        month.data=element;
        this.shadowRoot.getElementById("content").appendChild(month);
        /*
        let el_li= document.createElement("li");
        el_li.innerText=element.name;
        el_li.className="historico-element";
        el_li.setAttribute("param",element.uri_param);
        el_ul.appendChild(el_li);
        */
      //});
      //this.shadowRoot.getElementById("content").appendChild(el_ul);
    }
  
    _onclick(event) {
      console.log("--> UVAHistoricoNoticiasMonths onclick");
    }  
  }
  customElements.define(UVAHistoricoNoticiasMonths.is, UVAHistoricoNoticiasMonths);

class UVAHistoricoNoticiasMonth extends HTMLElement {
    static get is() {
      return 'uva-historico-noticia-month';
    }
    constructor(...args) {
        // Constructor
        try {
          const self = super(...args);
        } catch(e) {
          // Si no somos capaces de cargar al padre, error
          throw "Error al crear el elemento UVAHistoricoNoticiasMonth " + e;
        } finally {
          //Variables
          this._doc=undefined;
          //Funciones locales
          this._onclick = this._onclick.bind(this);
          // Creamos el shadow del elemento
          let shadowRoot = this.attachShadow({ mode: 'open' });
          this.shadowRoot.innerHTML = `
          <style>
          :host {
            display: block;
          }
          div {
            float: left;
          }
          ul {
            text-align: left;
            width: 100%;
            margin: 0px;
            padding: 0px 0px 0px 20px;
            border: 3px solid #1d1d1d;
            list-style: none;
            position: relative;
            float:left;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            border-radius: 5px;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
    
     
          }
          </style>
          <div id="title"></div>
          `;
        }
    }
  
    connectedCallback() {
        this.addEventListener('click', this._onclick);
    }
  
    disconnectedCallback() {
        this.removeEventListener('click', this._onclick);
    }
  
    adoptedCallback() {  }
    attributeChangedCallback(name, oldValue, newValue) {  }
  
    set data(val) {
      this._data=val;
      this.setAttribute("year",this._year.name);
      this.setAttribute("uri",this._data.uri_param);
      this._render();
    }

    set year(val) {
      this._year=val;
    }

    _render() {
      console.log("--> UVAHistoricoNoticiasMonth render");
      this.shadowRoot.getElementById("title").innerText=this._data.name;
    }

    _onclick(event) {
      console.log("--> UVAHistoricoNoticiasMonth onclick");
    }  
  }
  customElements.define(UVAHistoricoNoticiasMonth.is, UVAHistoricoNoticiasMonth);

  class UVAHistoricoNoticia extends HTMLElement {
    static get is() {
      return 'uva-historico-noticia';
    }
    constructor(...args) {
        // Constructor
        try {
          const self = super(...args);
        } catch(e) {
          // Si no somos capaces de cargar al padre, error
          throw "Error al crear el elemento UVAHistoricoNoticia " + e;
        } finally {
          //Variables
          this._doc=undefined;
          //Funciones locales
          this._onclick = this._onclick.bind(this);
          // Creamos el shadow del elemento
          let shadowRoot = this.attachShadow({ mode: 'open' });
          this.shadowRoot.innerHTML = `
          <style>
          div {
            display: block;
          }
          </style>
          <div>
            <a id="title">TITULO</div>
            <p id="date">FECHA</div>
          </div>
          
          `;
        }
    }
  
    connectedCallback() {
        this.addEventListener('click', this._onclick);
    }
  
    disconnectedCallback() {
        this.removeEventListener('click', this._onclick);
    }
  
    adoptedCallback() {  }
    attributeChangedCallback(name, oldValue, newValue) {  }
  
    set data(val) {
      this._data=val;
      this._render();
    }

    _render() {
      console.log("--> UVAHistoricoNoticia render");

      let el_a= this.shadowRoot.getElementById("title");
      el_a.setAttribute("target","_blank");
      el_a.setAttribute("href",this._data.link);
      el_a.innerHTML=this._data.Title_prop;

      var date = new Date(this._data.timestamp);
      this.shadowRoot.getElementById("date").innerHTML=date.toLocaleDateString();
    }

    _onclick(event) {
      console.log("--> UVAHistoricoNoticia onclick");
    }  
  }
  customElements.define(UVAHistoricoNoticia.is, UVAHistoricoNoticia);


  class UVAHistoricoNoticiaTipos extends HTMLElement {
    static get is() {
      return 'uva-historico-noticias-tipos';
    }
    constructor(...args) {
        // Constructor
        try {
          const self = super(...args);
        } catch(e) {
          // Si no somos capaces de cargar al padre, error
          throw "Error al crear el elemento UVAHistoricoNoticiaTipos " + e;
        } finally {
          //Variables
          this._doc=undefined;
          //Funciones locales
          this._onclick = this._onclick.bind(this);
          // Creamos el shadow del elemento
          let shadowRoot = this.attachShadow({ mode: 'open' });
          this.shadowRoot.innerHTML = `
          <style>
          div {
            display: block;
          }
          </style>
          <div>
            <p>TIPOS DE NOTICIAS</p>
            <div id="content"></div>
          </div>
          
          `;
        }
    }
  
    connectedCallback() {
        this.addEventListener('click', this._onclick);
    }
  
    disconnectedCallback() {
        this.removeEventListener('click', this._onclick);
    }
  
    adoptedCallback() {  }
    attributeChangedCallback(name, oldValue, newValue) {  }
  
    set data(val) {
      this._data=val;
      this._render();
    }

    _render() {
      console.log("--> UVAHistoricoNoticia render");
      this._data.forEach(element => {
        let el=new UVAHistoricoNoticiaTipo();
        el.data=element;
        this.shadowRoot.getElementById("content").appendChild(el);
      });
    }

    _onclick(event) {
      console.log("--> UVAHistoricoNoticia onclick");
    }  
  }
  customElements.define(UVAHistoricoNoticiaTipos.is, UVAHistoricoNoticiaTipos);

  class UVAHistoricoNoticiaTipo extends HTMLElement {
    static get is() {
      return 'uva-historico-noticia-tipo';
    }
    constructor(...args) {
        // Constructor
        try {
          const self = super(...args);
        } catch(e) {
          // Si no somos capaces de cargar al padre, error
          throw "Error al crear el elemento UVAHistoricoNoticiaTipo " + e;
        } finally {
          //Variables
          this._doc=undefined;
          //Funciones locales
          this._onclick = this._onclick.bind(this);
          // Creamos el shadow del elemento
          let shadowRoot = this.attachShadow({ mode: 'open' });
          this.shadowRoot.innerHTML = `
          <style>
          div {
            display: block;
          }
          </style>
          <li id="title">TIPO</li>
          `;
        }
    }
  
    connectedCallback() {
        this.addEventListener('click', this._onclick);
    }
  
    disconnectedCallback() {
        this.removeEventListener('click', this._onclick);
    }
  
    adoptedCallback() {  }
    attributeChangedCallback(name, oldValue, newValue) {  }
  
    set data(val) {
      this._data=val;
      this.id=val.id;
      this._render();
    }

    _render() {
      console.log("--> UVAHistoricoNoticiaTipo render");
      this.shadowRoot.getElementById("title").innerText=this._data.title;
      this.shadowRoot.getElementById("title").setAttribute("value",this._data.id);
    }

    _onclick(event) {
      console.log("--> UVAHistoricoNoticiaTipo onclick");
    }  
  }
  customElements.define(UVAHistoricoNoticiaTipo.is, UVAHistoricoNoticiaTipo);