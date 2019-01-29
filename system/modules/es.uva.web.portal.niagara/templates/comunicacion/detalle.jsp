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

	<%--<link rel="shortcut icon" href="favicon.ico"/>--%>
	<link rel="apple-touch-icon" sizes="57x57" href="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.template/resources/images/favico/apple-icon-57x57.png</cms:link>">
	<link rel="apple-touch-icon" sizes="60x60" href="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.template/resources/images/favico/apple-icon-60x60.png</cms:link>">
	<link rel="apple-touch-icon" sizes="72x72" href="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.template/resources/images/favico/apple-icon-72x72.png</cms:link>">
	<link rel="apple-touch-icon" sizes="76x76" href="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.template/resources/images/favico/apple-icon-76x76.png</cms:link>">
	<link rel="apple-touch-icon" sizes="114x114" href="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.template/resources/images/favico/apple-icon-114x114.png</cms:link>">
	<link rel="apple-touch-icon" sizes="120x120" href="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.template/resources/images/favico/apple-icon-120x120.png</cms:link>">
	<link rel="apple-touch-icon" sizes="144x144" href="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.template/resources/images/favico/apple-icon-144x144.png</cms:link>">
	<link rel="apple-touch-icon" sizes="152x152" href="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.template/resources/images/favico/apple-icon-152x152.png</cms:link>">
	<link rel="apple-touch-icon" sizes="180x180" href="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.template/resources/images/favico/apple-icon-180x180.png</cms:link>">
	<link rel="icon" type="image/png" sizes="192x192"  href="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.template/resources/images/favico//android-icon-192x192.png</cms:link>">
	<link rel="icon" type="image/png" sizes="32x32" href="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.template/resources/images/favico/favicon-32x32.png</cms:link>">
	<link rel="icon" type="image/png" sizes="96x96" href="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.template/resources/images/favico/favicon-96x96.png</cms:link>">
	<link rel="icon" type="image/png" sizes="16x16" href="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.template/resources/images/favico/favicon-16x16.png</cms:link>">
	<link rel="manifest" href="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.template/resources/images/favico/manifest.json</cms:link>">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.template/resources/images/favico/ms-icon-144x144.png</cms:link>">
	<meta name="theme-color" content="#ffffff">

	<cms:enable-ade/>
	<!-- Bootrstrap -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
	<!-- font awesome -->
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
	
		
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
        <div class="col-md-3">
          <img alt="Universidad de Valladolid" src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/uva4/img/logo_uva.png</cms:link>" />
        </div>
        <div class="col-md-9">
          <h1 style="position: absolute; bottom: 0; right: 0; color: #0b1f4a;"><strong>Universidad</strong>de<strong>Valladolid</strong></h1>
        </div>
      </div>
    </div>

	
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
				<uva-navegacion-horizontal data=">https://comunicacion-des.uva.es/ws/menu.jsp" uri="${cms.requestContext.uri}" startLevel="0" levels=0 onlyone="true" >
				Cargando navegación
				</uva-navegacion-horizontal>
			</div>
		</div>
	</div>
	<!-- Breadcrumb -->
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<uva-navegacion-breadcrumb 	id="breadcrumb" data="https://comunicacion-des.uva.es/ws/menu.jsp" uri="${cms.requestContext.uri}" startLevel="0" locale="es" >
					Cargando navegación
				</uva-navegacion-breadcrumb>
			</div>
		</div>
	</div>
	
	
	<!-- Noticia Detalle -->
	<cms:container name="contenedor" type="detail" detailview="true" width="1200" />

</div><!--/page-wrap-->


</body>
</html>