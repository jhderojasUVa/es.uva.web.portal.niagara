<%@page buffer="none" session="false" trimDirectiveWhitespaces="true" %><%
%><%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms" %><%
%><%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %><%
%><%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %><%
%><%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %><%
%><%@ page import="java.util.*" %><%
%><%@ taglib prefix="util" tagdir="/WEB-INF/tags" %><%
%><fmt:setLocale value="${cms.locale}" /><!DOCTYPE html>
<html lang="es">
<head>
<%--
	<util:googleAccount pagecontext="${pageContext}" />
--%>
	<title>Comunicación - <cms:info property="opencms.title" /> - Universidad de Valladolid</title>
	
	<meta charset="${cms.requestContext.encoding}">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="google-site-verification" content="<cms:property name="googleSiteVerification" file="search" default="" />">
	<meta name="description" content="<cms:property name="Description" file="search" default="" />">
	<meta name="keywords" content="<cms:property name="Keywords" file="search" default="" />">
	<meta name="robots" content="index, follow">
	<meta name="revisit-after" content="7 days">
	<%-- Cache --%>
	<meta http-equiv="Expires" content="0">		 
	<meta http-equiv="Last-Modified" content="0">
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache, no-store" />

	<cms:enable-ade/>
	<!-- Bootrstrap -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
	<!-- font awesome -->
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
	
	<!-- CSS -->
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/comunicacion/css/header.css</cms:link>">
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/comunicacion/css/footer.css</cms:link>">
	
	<c:set var="colortheme"><cms:property name="bs.page.color" file="search" default="orange" /></c:set>
	<c:set var="pagelayout"><cms:property name="bs.page.layout" file="search" default="9" /></c:set>

	
	<link rel="shortcut icon" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/img/favicon.ico</cms:link>" />
	
	
	<!-- Storage -->
	<script src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/comunicacion/js/storage.js</cms:link>"></script>
   	<!-- Service Worker -->
	<script src="<cms:link>/sites/comunicacion/worker.js</cms:link>" defer></script>
	<!-- Web components bundle -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.1.3/webcomponents-bundle.js" integrity="sha256-4jOg/7MBayBO2wu7hBlS/rMaGUrVPNRzx2ADOR8kv9M=" crossorigin="anonymous"></script>
    <!-- Polyfill -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-polyfills/0.1.42/polyfill.js" crossorigin="anonymous"></script>
	<!-- Custom elements -->
	<!-- 
	<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.0.3/custom-elements-es5-adapter.js"></script>
	-->
	<!-- Web components -->
	<script type="module" src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/comunicacion/js/header.js</cms:link>" defer></script>
	<script type="module" src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/comunicacion/js/navegacion.js</cms:link>" defer></script>
	<script type="module" src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/comunicacion/js/breadcrumb.js</cms:link>" defer></script>
	<script type="module" src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/comunicacion/js/slideshow.js</cms:link>" defer></script>
   	<script type="module" src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/comunicacion/js/noticias.js</cms:link>" defer></script>
	<script type="module" src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/comunicacion/js/eventos.js</cms:link>" defer></script>
	<script type="module" src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/comunicacion/js/flickr.js</cms:link>" defer></script>
	<script type="module" src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/comunicacion/js/twitter.js</cms:link>" defer></script>
	<!-- CSS compomnents -->
	
  </head>
  <body>

<div class="page-wrap">

	<c:if test="${cms.isEditMode}">
		<div style="background: lightgray; height: 52px">&nbsp;</div>
	</c:if>
	
	<!-- HEADER -->
    <header>
      <uva-header id="header" locale="es">
	  	<p>Lo sentimos, su navegador <strong>es muy antiguo</strong>.</p>
	  </uva-header>
    </header>
	
	<div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-3">
          <img alt="Universidad de Valladolid" src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/comunicacion/img/logo_uva.png</cms:link>" />
        </div>
        <div class="col-md-9 d-none d-md-block">
          <h1 style="position: absolute; bottom: 0; right: 0; color: #0b1f4a;"><strong>Universidad</strong>de<strong>Valladolid</strong></h1>
        </div>
      </div>
    </div>

	<!--=== Content Part ===-->
	<%-- CABECERA --%>
	<cms:container name="top-wide" type="content-wide" width="1200" maxElements="5" />
	<cms:container name="top" type="content-full" width="1200" />
	
	<!-- LISTA DE EDICION -->
	<c:if test="${cms.isEditMode}">
		<cms:container name="content-list" type="content" width="1200" maxElements="5"  />
	</c:if>
	
	<script src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/comunicacion/js/webcomponents-bundle.js</cms:link>"  crossorigin="anonymous"></script>
	<script src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/comunicacion/js/webcomponents-loader.js</cms:link>"  crossorigin="anonymous"></script>
	<!-- Storage -->
	<script src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/comunicacion/js/storage.js</cms:link>" defer></script>
	<!-- Service Worker -->
	<!-- 
	<script src="<cms:link>/sites/comunicacion/worker.js</cms:link>" defer></script>
	-->
	
	<!-- Comunicacion Bundle -->
	<%--
	<script src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/comunicacion/js/custom-elements-es5-adapter.js</cms:link>" crossorigin="anonymous"></script>
	
	<script src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/comunicacion/js/comunicacion.bundle.js</cms:link>" defer></script>
	--%>
	<!-- Navegacion -->
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<uva-navegacion-horizontal data="<cms:link>/sites/comunicacion/ws/menu.jsp</cms:link>" uri="${cms.requestContext.uri}" startLevel="0" levels=0 onlyone="true" />
			</div>
		</div>
	</div>
	<!-- Slideshow -->
	<cms:container name="slideshow" type="slideshow-content" width="1200" maxElements="1"  />
	
	<!-- NOTICIAS -->
	<div class="container noticias" style="margin-top: 10px;">
		<div class="row">
			<div vlass="col-md-12">
				<uva-noticias title="Noticias" data="https://comunicacion-des.uva.es/ws/noticias.jsp" num="8" locale="es">
					<p>Cargando ultimas noticias... espere por favor</p>
				</uva-noticias>
			</div>
		</div>
	</div>
	<!-- AGENDA -->
	<div class="container" style="margin-top: 10px;">
		<uva-eventos data="https://comunicacion-des.uva.es/ws/eventos.jsp" num="8" show="4" auto="true">
			<p>Cargando eventos de la agenda... espere por favor</p>
		</uva-eventos>
	</div>
	
	
	<!-- Flicker -->
	<div class="container" style="margin-top: 10px;">
		<uva-flickr-albums data="https://comunicacion-des.uva.es/ws/flickr_albums.jsp" num="4">
			<p>Cargando albumes en Flickr... espere por favor</p>
		</uva-flickr-albums>
	</div>
	
	<div class="container" style="margin-top: 10px;">
		<uva-flickr-photoset data="https://comunicacion-des.uva.es/ws/flickr_photos.jsp" num="4">
			<p>Cargando fotos en Flickr... espere por favor</p>
		</uva-flickr-photoset>
	</div>
	
	<!-- Twitter -->
	<div class="container" style="margin-top: 10px;">
		<uva-twitter data="https://comunicacion-des.uva.es/ws/twitter.jsp" num="4">
			<p>Cargando contenido de Twitter... espere por favor</p>
		</uva-twitter>
	</div>
	<%--
	<!-- The conversation -->
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<the-conversation data="https://comunicacion-des.uva.es/ws/theconversation.jsp" num="4"/>
			</div>
		</div>
	</div>
	<!-- Dicyt -->
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<uva-dicyt data="https://comunicacion-des.uva.es/ws/dicyt.jsp" num="4"/>
			</div>
		</div>
	</div>
	--%>
<!--=== Foot ===-->
<cms:container name="foot" type="content-wide" width="1200" maxElements="5" />

	<!-- Footer -->
    <footer style="margin-top: 70px;">

      <!-- mapa -->
      <div class="container-full mapa">
        <div class="container">
          <div class="row">
            <div class="cell-12 col-md-12 gmap">
              <iframe title="Mapa de localización" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11924.299444357766!2d-4.726204847456391!3d41.654124535691764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4712b1b3f53785%3A0xe9ec32442c2575f5!2sPalacio+de+Santa+Cruz!5e0!3m2!1ses!2ses!4v1530607016352" width="100%" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>

      <!-- enlaces -->
      <div class="container-full enlaces">
        <div class="container">
          <div class="row">
            <!--<div class="cell-3 col-md-3">
              
            </div>-->
            <div class="cell-4 col-md-4">
              <h1 class="text-center">Te interesa</h1>
              <ul>
                <li><a href="http://spanishinvalladolid.com/" role="link" rel="noopener noreferrer">Español en Valladolid</a></li>
                <li><a href="http://www.uva.es/5.empresaeinstituciones/5.01.practicasenempresa/5.01.02.estudiantes/" role="link" rel="noopener noreferrer">Prácticas de Estudiantes</a></li>
                <li><a href="http://www.uva.es/1.lauva/1.09.defensordelacomunidad/1.09.01.presentacion/" role="link" rel="noopener noreferrer">Defensor de la Comunidad</a></li>
              </ul>
			  <h1 class="text-center">Divulgación</h1>
              <ul>
                <li><a href="http://ucc.uva.es" role="link">UVaDivulga</a></li>
              </ul>
            </div>
            <div class="cell-4 col-md-4">
              <h1 class="text-center">Descubre</h1>
              <ul>
                <li><a href="http://iee.blogs.uva.es/" role="link" rel="noopener noreferrer">IEE</a></li>
                <li><a href="http://funge.uva.es/idiomas/" role="link" rel="noopener noreferrer">Centro de Idiomas</a></li>
                <li><a href="http://funge.uva.es/palacio/" role="link" rel="noopener noreferrer">Palacio de Congresos</a></li>
				<li><a href="http://www.fundacionjimenezarellano.com/" role="link" rel="noopener noreferrer">Fundación Jimenez Arellano</a></li>
				<li><a href="http://www.relint.uva.es/" role="link" rel="noopener noreferrer">Internacional</a></li>
              </ul>
            </div>
            <div class="cell-4 col-md-4">
              <h1 class="text-center" data-i18n-es="Descubre" data-i18n-en="Discover">UVa</h1>
              <ul>
                <li><a href="http://stic.uva.es" role="link">Servicio de Tecnologías de la Información y las Comunicaciones</a></li>
				<li><a href="http://audiovisuales.uva.es" role="link">Audiovisuales</a></li>
				<li><a href="http://www.uva.es/6.vidauniversitaria/6.04.gabinetemedico/index.html" role="link">Gabinete Médico</a></li>
				<li><a href="http://edicion2.uva.es/6.vidauniversitaria/6.13.alojamientos/6.13.08.alojamientos/index.html" role="link">Alojamientos UVa</a></li>
				<li><a href="https://contrataciondelestado.es/wps/poc?uri=deeplink%3AperfilContratante&idBp=7IJNVbZm%2FMkQK2TEfXGy%2BA%3D%3D" role="link">Perfil del Contratante</a></li>
				<li><a href="http://ods.uva.es" role="link">Sostenible UVa</a></li>
				<li><a href="<cms:link>/mapaweb.html</cms:link>" role="link">Mapa del sitio web</a></li>
              </ul>
            </div>
          </div>
          <div class="row pie_enlaces align-items-center">
		  	
            <div class="cell-6 col-md-6">
			  <div class="col-md-8 text-left">
			  	<a href="<cms:link>/sites/uva/suscripciones.html</cms:link>" role="link" class="btn btn-primary">
				suscripci&oacute;n <i class="fas fa-angle-right"></i>
				</a>
				  
			  </div>
              <span style="text-align: left;">
                <a target="_blank" href="https://es-es.facebook.com/Gabinete-de-Comunicaci%C3%B3n-de-la-Universidad-de-Valladolid-187763507920209/" class="socialicon" role="link" alt="Facebook" aria-label="Facebook"><i class="fab fa-facebook-square" style="font-size: 2em; color: #5af0ff; margin-bottom: 0.5em;"></i></a>&nbsp;&nbsp;
                <a target="_blank" href="https://twitter.com/uva_es?lang=es" class="socialicon" role="link" alt="Twitter" aria-label="Twitter"><i class="fab fa-twitter-square" style="font-size: 2em;; color: #5af0ff; margin-bottom: 0.5em;"></i></a>&nbsp;&nbsp;
                <a href="#" class="socialicon" role="link" alt="Rss" aria-label="Rss"><i class="fas fa-rss-square" style="font-size: 2em; color: #5af0ff; margin-bottom: 0.5em;"></i></a>
              </span>
            </div>
            <div class="cell-6 col-md-6">
              <div class="lema">
              <strong data-i18n-es="800 años de innovación" data-i18n-en="800 years of innovation">800 a&ntilde;os de innovaci&oacute;n</strong><br/>
              Sapientia Aedificavit<br/>
              Sibi Domvm
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- politica -->
      <div class="container-full politica">
        <div class="container">
          <div class="row">
            <div class="cell-12 cell-md-12 text-center">
              <h1>Universidad de Valladolid // Palacio de Santa Cruz, 47002 Valladolid (España)</h1>
              <p>Los contenidos suministrados por la web están sujetos a los derechos de propiedad intelectual e industrial y son titularidad exclusiva de Universidad de Valladolid. La adquisición de algún producto o servicio no confiere al adquiriente ningún derecho de alteración, explotación, reproducción o distribución del mismo fuera de lo estrictamente contratado reservándose Universidad de Valladolid todos los derechos. <a href="http://www.uva.es/export/sites/uva/1.lauva/1.04.secretariageneral/1.04.08.proteccion_datos/index.html" role="link">Más información</a></p>
            </div>
          </div>
        </div>
      </div>

    </footer>

<!--=== End Foot ===-->

</div><!--/page-wrap-->


</body>
</html>