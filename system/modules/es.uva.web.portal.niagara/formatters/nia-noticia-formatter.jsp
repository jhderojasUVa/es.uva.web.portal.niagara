<%@page buffer="none" session="false" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@page buffer="none" session="false" taglibs="c,cms,fn,fmt" %>
<!-- Formateador Noticia 2 -->
<cms:formatter var="content" val="value" rdfa="rdfa">
<div class="container">
<div class="row">
<div class="col-md-12">
<p>
NOTICIA
</p>

<!-- titulo -->

<div id="noticia">
	<div id="fb-root"></div>
	<script>(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/es_ES/sdk.js#xfbml=1&appId=126825837330348&version=v2.0";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	</script>
	<div id="volver"><a href="javascript:history.go(-1);"><img src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/images/back.png</cms:link>" border="0" align="absmiddle" alt="volver"/> volver</a></div>
	<div id="subtitulo" ${rdfa.Texto}><p>${value.Titulo}</p></div>
	<c:forEach var="elem" items="${content.valueList['Subtitulo']}">
		<div id="subtitulo2" ${rfda.elem}><p>${elem}</p></div>
	</c:forEach>
	<div id="entradilla" ${rfa.Entradilla}>${value.Entradilla}</div>
		
		<table width="620">
			<tr>
				<td width="250" valign="top">
					<div id="fecha" style="float:left;" ${rfda.Fecha}>
						<c:set var="fecha" value="${value.Fecha}" />
						<fmt:formatDate var="fecha_corta" value="${cms:convertDate(fecha)}" type="date" pattern="dd/MM/yyyy"/>
						<fmt:formatDate var="fecha_larga" value="${cms:convertDate(fecha)}" type="date" pattern="MMMMM yyyy"/>
						[<c:out value="${fecha_corta}" />] ${fecha_larga}
						<br />
						<div id="fuente" ${rfda.Fuente}>${value.Fuente}</div>
						<div id="lugar" ${rfda.Lugar}>${value.Lugar}</div>
					</div>
				</td>
				<td width="400" align="right" valign="bottom">
					<c:forEach var="elem" items="${content.valueList['RedSocial']}">
						<c:choose>
							<c:when test="${elem.value['Twitter'].exists}">
								<a href="${elem.value['Twitter']}"><img src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/images/twitter.png</cms:link>" alt="Twitter"/></a>
							</c:when>
							<c:when test="${elem.value['Facebook'].exists}">
								<a href="${elem.value['Facebook']}"><img src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/images/facebook.png</cms:link>" alt="Facebook"/></a>
							</c:when>
							<c:when test="${elem.value['Youtube'].exists}">
								<a href="${elem.value['Youtube']}"><img src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/images/youtube.png</cms:link>" alt="Youtube"/></a>
							</c:when>
							<c:when test="${elem.value['Blogger'].exists}">
								<a href="${elem.value['Blogger']}"><img src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/images/blogspot.png</cms:link>" alt="Blogger"/></a>
							</c:when>
							<c:when test="${elem.value['Wordpress'].exists}">
								<a href="${elem.value['Wordpress']}"><img src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/images/youtube.png</cms:link>" alt="Wordpress"/></a>
							</c:when>
							<c:when test="${elem.value['Googleplus'].exists}">
								<a href="${elem.value['Googleplus']}"><img src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/images/gplus.png</cms:link>" alt="Google plus"/></a>
							</c:when>
							<c:when test="${elem.value['Linkedin'].exists}">
								<a href="${elem.value['Linkedin']}"><img src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/images/linkedin.png</cms:link>" alt="Linkedin"/></a>
							</c:when>
						</c:choose>
					</c:forEach>
					&nbsp;<a href="#" onclick="javascript:window.print();"><img src="<cms:link>/system/modules/es.uva.web.portal.niagara/resources/images/print.png</cms:link>" border="0" width="25" alt="imprimir" /></a>
				</td>
			</tr>
		</table>
		<div class="clear"></div>
		
		<div class="texto" ${rfda.Cuerpo}>${value.Cuerpo}</div>
		
		<c:if test="${value.Recuadro.exists}">
			<div class="recuadro" ${rfda.Recuadro}>${value.Recuadro}</div>
		</c:if>
		<%-- Existe imagen --%>
		<c:if test="${value.Imagen.exists}">
				<c:set var="titulo" value="${value.Imagen.value.Titulo}" />
				<c:set var="imagen" value="${value.Imagen.value.Image}" />
				<c:set var="pie_imagen" value="${value.Imagen.value.Pie}" />
				<c:set var="alt" value="${value.Imagen.value.Alt}" />
		</c:if>
		
		<%-- No existe imagen --%>
		<c:if test="${!value.Imagen.exists}">
			<c:set var="imagen" value="" />
		</c:if>
		
		<c:if test="${imagen!='' && imagen ne ''}">
			<!-- imagen -->
			<center><img src="<cms:link>${imagen}</cms:link>" alt="${alt}" width="610" class="imagen_nota"/></center>
			<c:if test="${pie_imagen!=''}">
				<div class="pie_imagen">[${pie_imagen}]</div>
			</c:if>
			<c:if test="${value.Ladillo.exists}">
				<div class="ladillo">${value.Ladillo}</div>
			</c:if>
		</c:if>
		
		<!-- choice noticias -->
		<!-- Elementos del choice zona central -->
		<c:set var="elementos" value="${content.valueList.Elementos}" scope="request"/>
		<%--
		<cms:include file="/system/modules/es.uva.web.portal.opencms.v85.tipos.choicegenerico/elements/plantilla_center.jsp"/>
		--%>
		
		<!-- redes sociales y hashtags asociados -->
		<c:if test="${fn:length(content.valueList['RedSocial'])>0}">
			<div id="redes_sociales">
			
				<h2>Puedes encontrar en la red</h2>
				<c:forEach var="elem" items="${content.valueList['RedSocial']}">
					<c:choose>
						<c:when test="${elem.value['Twitter'].exists}">
							<p>Twitter: <a href="${elem.value['Twitter']}">Enlace a Twitter</a></p>
						</c:when>
						<c:when test="${elem.value['Facebook'].exists}">
							<p>Facebook: <a href="${elem.value['Facebook']}">Enlace a Facebook</a></p>
						</c:when>
						<c:when test="${elem.value['Youtube'].exists}">
							<p>Youtube: <a href="${elem.value['Youtube']}">Video de Youtube</a></p>
						</c:when>
						<c:when test="${elem.value['Blogger'].exists}">
							<p>Blogger: <a href="${elem.value['Blogger']}">Blog en Blogger</a></p>
						</c:when>
						<c:when test="${elem.value['Wordpress'].exists}">
							<p>Wordpress: <a href="${elem.value['Wordpress']}">Blog en Wordpress</a></p>
						</c:when>
						<c:when test="${elem.value['Googleplus'].exists}">
							<p>Googleplus: <a href="${elem.value['Googleplus']}">Enlace a Google+</a></p>
						</c:when>
						<c:when test="${elem.value['Linkedin'].exists}">
							<p>Linkedin: <a href="${elem.value['Linkedin']}">Enlace a Linkedin</a></p>
						</c:when>
					</c:choose>
				</c:forEach>
				<div class="clear"></div>
			</div>
		</c:if>
		
		<div id="iconos2">
			<table>
				<tr>
				<td>
				<!-- twitter -->
				<a href="https://twitter.com/share?via=UVa_es&hashtags=UVA" data-count="none" class="twitter-share-button" data-lang="es">Tweet</a>
				<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script> 
				</td>
				<td>
				<div class="fb-like" data-href="<cms:info property="opencms.url" />" data-layout="standard" data-action="like" data-show-faces="true" data-share="true"></div>
				<!-- facebook 
				<iframe src="http://www.facebook.com/plugins/like.php?href=YOUR_URL" scrolling="no" frameborder="0" style="border:none; width:83px; height:24px"></iframe>
				-->
				</td>
				
				</tr>
			</table>
		</div>
</div>	
</div>
</div>
</div>
</cms:formatter>