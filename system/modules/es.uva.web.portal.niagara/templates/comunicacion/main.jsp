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
	<title>Escuela de Doctorado - <cms:info property="opencms.title" /> - Universidad de Valladolid</title>
	
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
	<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
	<!-- font awesome -->
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
	
	
	<cms:headincludes type="css" closetags="false" defaults="%(link.weak:/system/modules/com.alkacon.bootstrap.formatters/resources/css/style.css)
		|%(link.weak:/system/modules/com.alkacon.bootstrap.formatters/resources/css/responsive.css)
		|%(link.weak:/system/modules/com.alkacon.bootstrap.formatters/resources/css/headers/header1.css)
		|%(link.weak:/system/modules/com.alkacon.bootstrap.formatters/resources/css/search.css)" />
		
	<c:set var="colortheme"><cms:property name="bs.page.color" file="search" default="orange" /></c:set>
	<c:set var="pagelayout"><cms:property name="bs.page.layout" file="search" default="9" /></c:set>
	<link rel="stylesheet" href="<cms:link>/system/modules/com.alkacon.bootstrap.formatters/resources/css/themes/${colortheme}.css</cms:link>">
	<link rel="stylesheet" href="<cms:link>/system/modules/com.alkacon.bootstrap.formatters/resources/css/themes/headers/header1-${colortheme}.css</cms:link>">
	<link rel="stylesheet" href="<cms:link>%(link.weak:/system/modules/com.alkacon.bootstrap.formatters/resources/css/page.css)</cms:link>">
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.esduva/resources/css/responsivedoctorado.css</cms:link>">
	<cms:headincludes type="javascript" defaults="%(link.weak:/system/modules/com.alkacon.bootstrap.formatters/resources/plugins/jquery-1.10.2.min.js)
		|%(link.weak:/system/modules/com.alkacon.bootstrap.formatters/resources/plugins/jquery-migrate-1.2.1.min.js)
		|%(link.weak:/system/modules/com.alkacon.bootstrap.formatters/resources/plugins/bootstrap/js/bootstrap.min.js)
		|%(link.weak:/system/modules/com.alkacon.bootstrap.formatters/resources/plugins/hover-dropdown.min.js)
		|%(link.weak:/system/modules/com.alkacon.bootstrap.formatters/resources/plugins/back-to-top.js)" />
	<script type="text/javascript" src="<cms:link>/system/modules/com.alkacon.bootstrap.formatters/resources/js/locale.js</cms:link>"></script>
	<script type="text/javascript" src="<cms:link>/system/modules/com.alkacon.bootstrap.formatters/resources/js/app.js</cms:link>"></script>
	<script type="text/javascript" src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.template/resources/js/cookies.js</cms:link>"></script>
	<script type="text/javascript" src="<cms:link>/system/modules/es.uva.web.portal.doctorado/resources/js/ajax/functions.js</cms:link>"></script>
	<script type="text/javascript" src="<cms:link>/system/modules/es.uva.web.portal.doctorado/resources/js/translate/functions.js</cms:link>"></script>
	

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

	
	<script type="text/javascript">
		jQuery(document).ready(function() {
			App.init();
		});
	</script>
	<!--[if lt IE 9]>
    	<script src="<cms:link>%(link.weak:/system/modules/com.alkacon.bootstrap.formatters/resources/plugins/respond.js)</cms:link>"></script>
	<![endif]-->
	<%--<cms:include file="%(link.weak:/system/modules/com.alkacon.bootstrap.formatters/search/config.jsp)" />--%>
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.esduva/resources/css/doctorado.css</cms:link>">
	<link rel="stylesheet" href="<cms:link>/css/fichas.css</cms:link>">
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.esduva/resources/css/header.css</cms:link>">
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.esduva/resources/css/footer.css</cms:link>">
	<%--<link rel="stylesheet" href="/opencms/css/flag-icon.min.css">--%>
	
	<!-- Web components bundle -->
	<!--
	<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.1.3/custom-elements-es5-adapter.js"></script>
	-->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.1.3/webcomponents-bundle.js" integrity="sha256-4jOg/7MBayBO2wu7hBlS/rMaGUrVPNRzx2ADOR8kv9M=" crossorigin="anonymous"></script>
	<script defer src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.1.3/webcomponents-loader.js" integrity="sha256-fI6z+sLaCFubkWLyW3aedgwl+7++Xt16NU3vjuC+vms=" crossorigin="anonymous"></script>
	<!-- Polyfill -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/js-polyfills/0.1.42/polyfill.js" integrity="sha256-bXiN+GW47t3Gf2R1yZ6ldDMv8bbAmmnyhxmaTKfZDfU=" crossorigin="anonymous"></script>
	
	
	<script>
		function handleLoad(e) {
			//console.log('Loaded import: ' + e.target.href);
		}
		function handleError(e) {
			console.log('Error loading import: ' + e.target.href);
		}
	</script>
	

</head><body>

<div class="page-wrap">

<c:if test="${not cms.requestContext.currentProject.onlineProject}">
<!--=== Placeholder for OpenCms toolbar in the offline project ===-->
<div style="background: lightgray; height: 35px">&nbsp;</div>
</c:if>
<c:if test="${cms.isEditMode}">
	<!--=== Placeholder for OpenCms toolbar in edit mode ===-->
	<div style="background: lightgray; height: 52px">&nbsp;</div>
</c:if>
<h1>
CONTENT
</h1>
<cms:container name="content" type="content" width="1200" />



</div><!--/page-wrap-->


</body>
</html>