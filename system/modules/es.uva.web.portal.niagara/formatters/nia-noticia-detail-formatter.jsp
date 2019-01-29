<%@page buffer="none" session="false" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<fmt:setLocale value="${cms.locale}" />
<cms:formatter var="content" val="value" rdfa="rdfa">
<div id="noticia" class="container">
	<div class="row">
		<div class="col-md-12">
			<a href="javascript:history.go(-1);"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.noticias/resources/images/back.png</cms:link>" border="0" align="absmiddle" alt="volver"/> volver</a>
		</div>
	</div>
	<!-- Categorias -->
	<!-- Titulo -->
	<div class="row">
		<div class="col-md-12">
			<h1 ${rdfa.Texto}>${value.Titulo}</h1>
		</div>
	</div>
	<!-- Autor, lugar, fecha, redes sociales -->
	
	<%-- Existe imagen destacada --%>
	<c:if test="${value.ImagenDestacada.exists}">
	<!-- Imagen destacada -->
		<div class="row">
			<div class="col-md-12">
				<center><img src="<cms:link>${value.ImagenDestacada}</cms:link>"  /></center>
			</div>
		</div>
	</c:if>
	<!-- Subtitulos -->
	<c:forEach var="elem" items="${content.valueList['Subtitulo']}">
		<div class="row">
			<div class="col-md-12">
				<h2 ${rfda.elem}>${elem}</h2>
			</div>
		</div>
	</c:forEach>
	<!-- Entradilla -->
	<div class="row">
		<div class="col-md-12">
			<h4 ${rfa.Entradilla}>${value.Entradilla}</h4>
		</div>
	</div>
	<!-- Cuerpo -->
	<div class="row">
		<div class="col-md-12 texto" ${rfda.Cuerpo}>
			${value.Cuerpo}
		</div>
	</div>
	<!-- Elementos -->
	<c:set var="elementos" value="${content.valueList.Elementos}" scope="request"/>
	<c:forEach var="elementoa" items="${elementos}">
		<div class="row">
			<div class="col-md-12">
			
				<c:if test="${elementoa.value.Parrafo.exists}">
					<!-- Parrafo -->
					<c:set var="parrafo" value="${elementoa.value.Parrafo}"/>
					<c:if test="${parrafo.value.Titulo.exists && parrafo.value.Titulo.isSet}">
						<h3>${parrafo.value.Titulo}</h3>
					</c:if>
					<c:if test="${parrafo.value.Texto.exists && parrafo.value.Texto.isSet}">
						<p>${parrafo.value.Texto}</p>
					</c:if>
				</c:if>
				
				<c:if test="${elementoa.value.Fecha.exists}">
					<!-- Fecha -->
					<c:set var="fecha" value="${elementoa.value.Fecha}"/>
					<c:if test="${fecha.value.Titulo.exists && fecha.value.Titulo.isSet}">
						<h2 class="noseparado">${fecha.value.Titulo}</h2>
					</c:if>
					<c:if test="${!fecha.value.Titulo.exists && !fecha.value.Titulo.isSet}">
						<h2 class="noseparado">Fecha</h2>
					</c:if>
					<table class="noborde">
						<tr>
							<td valign="top" class="titulo">
								<c:if test="${fecha.value.Titulo.exists && fecha.value.Titulo.isSet}">
									${fecha.value.Titulo}
								</c:if>
								<c:if test="${!fecha.value.Titulo.exists && !fecha.value.Titulo.isSet}">
									Fecha
								</c:if>
							</td>
							<td valign="top">
								<c:if test="${fecha.value.Date.exists && fecha.value.Date.isSet}">
									<fmt:formatDate value="${cms:convertDate(fecha.value.Date)}" dateStyle="SHORT" timeStyle="SHORT" type="both" />
								</c:if>
							</td>
						</tr>
					</table>
				</c:if>
				
				<c:if test="${elementoa.value.Plazo.exists}">
					<!-- Plazo -->
					<c:set var="plazo" value="${elementoa.value.Plazo}"/>
					<h2 class="noseparado">Plazo</h2>
					<table class="noborde">
						<tr>
							<td valign="top" class="titulo">
								<c:if test="${plazo.value.Titulo.exists && plazo.value.Titulo.isSet}">
									${plazo.value.Titulo}
								</c:if>
								<c:if test="${!plazo.value.Titulo.exists && !plazo.value.Titulo.isSet}">
									Plazo
								</c:if>
							</td>
							<td valign="top">
								<c:if test="${plazo.value.Inicio.exists && plazo.value.Inicio.isSet}">
									de <span class="fecha"><fmt:formatDate value="${cms:convertDate(plazo.value.Inicio)}" dateStyle="SHORT" timeStyle="SHORT" type="both" /></span>
								</c:if>
								<c:if test="${plazo.value.Fin.exists && plazo.value.Fin.isSet}">
									hasta <span class="fecha"><fmt:formatDate value="${cms:convertDate(plazo.value.Fin)}" dateStyle="SHORT" timeStyle="SHORT" type="both" /></span>
								</c:if>
							</td>
						</tr>
					</table>
				</c:if>
				
				
				<c:if test="${elementoa.value.Imagen.exists}">	
					<!-- Imagen -->
					<c:set var="imagen" value="${elementoa.value.Imagen}"/>
					<c:if test="${imagen.value.Image.exists && imagen.value.Image.isSet}">

								<div class="imagen_izq">
									<c:if test="${(imagen.value.Link.exists)}">
										<a href="<cms:link>${imagen.value.Link.value.Link}</cms:link>" target="${imagen.value.Link.value.Target}">
									</c:if>
									<cms:img src="${imagen.value.Image}" width="${imgwidth}" cssclass="${imgclass}">
										<cms:param name="alt">${imagen.value.Alt}</cms:param>
										<cms:param name="title">${imagen.value.Alt}</cms:param>
										<cms:param name="class">center</cms:param>
										<cms:param name="width">500</cms:param>
									</cms:img>
									<c:if test="${imagen.value.Link.exists}">
									</a>
									</c:if>
									<c:if test="${imagen.value.Pie.exists}">
										<c:if test="${imagen.value.Pie !=''}">
											<p class="pieimagen" ${rdfa.Pie}>${imagen.value.Pie}</p>
										</c:if>
									</c:if>

								</div> <!-- fin de la imagen -->
								<div class="clear"></div>
					</c:if>
				</c:if>
				

				<c:if test="${elementoa.value.Enlace.exists}">
					<!-- Enlace -->
					<c:set var="enlace" value="${elementoa.value.Enlace}"/>
					<h2 class="noseparado">Enlace</h2>
					<table class="noborde">
						<tr>
							<td class="titulo" valign="top">
								<c:if test="${enlace.value.Titulo.exists && enlace.value.Titulo.isSet}">
									${enlace.value.Titulo}
								</c:if>
								<c:if test="${!enlace.value.Titulo.exists && !enlace.value.Titulo.isSet}">
									Enlace
								</c:if>
							</td>
							<td valign="top">
								<c:if test="${(enlace.value.Link.exists)}">
									<a href="<cms:link>${enlace.value.Link}</cms:link>" target="${enlace.value.Target}"> 
								</c:if>

								<c:if test="${(enlace.value.Texto.exists) && (enlace.value.Texto.isSet)}">
									${enlace.value.Texto}
								</c:if>
								<c:if test="${(not enlace.value.Texto.exists) || (not enlace.value.Texto.isSet)}">
									${enlace.value.Link}
								</c:if>
								<c:if test="${(enlace.value.Link.exists)}">
									</a>
								</c:if>
							</td>
						</tr>
					</table>
				</c:if>
				
				
				<c:if test="${elementoa.value.Documento.exists}">
					<!-- Documento -->
					<c:set var="documento" value="${elementoa.value.Documento}"/>
					<h2 class="noseparado">Documento</h2>
					<table class="noborde">
						<tr>
							<td class="titulo" valign="top">
								<c:if test="${documento.value.Titulo.exists && documento.value.Titulo.isSet}">
									${documento.value.Titulo}
								</c:if>
								<c:if test="${!documento.value.Titulo.exists && !documento.value.Titulo.isSet}">
									Documento/Fichero
								</c:if>
							</td>
							<td valign="top">
								<c:if test="${(documento.value.Texto.exists) && (documento.value.Texto.isSet)}">
									<a href="<cms:link>${documento.value.Document}</cms:link>">${documento.value.Texto}</a>
								</c:if>
								<c:if test="${(not documento.value.Texto.exists) || (not documento.value.Texto.isSet)}">
									<a href="<cms:link>${documento.value.Document}</cms:link>">${documento.value.Document}</a>
								</c:if>
							</td>
						</tr>
					</table>
				</c:if>
			
			
				<c:if test="${elementoa.value.Video.exists}">
					<!-- Video -->
					<c:set var="video" value="${elementoa.value.Video}"/>
					<c:set var="cachos_url" value="${fn:substringAfter(video.value.Video,'v=')}" />
					<center><iframe width="620" height="307" src="http://www.youtube.com/embed/<c:out value='${cachos_url}' />" frameborder="0" allowfullscreen>${elem.value.Video.value.Titulo}: <a href="http://www.youtube.com/embed/<c:out value='${cachos_url}' />">Ver en Youtube</a></iframe></center>
				</c:if>
			</div>
		</div>
	</c:forEach>
	
</div>
<%--
<div id="noticia">

	
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
								<a href="${elem.value['Twitter']}"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.noticias/resources/images/twitter.png</cms:link>" alt="Twitter"/></a>
							</c:when>
							<c:when test="${elem.value['Facebook'].exists}">
								<a href="${elem.value['Facebook']}"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.noticias/resources/images/facebook.png</cms:link>" alt="Facebook"/></a>
							</c:when>
							<c:when test="${elem.value['Youtube'].exists}">
								<a href="${elem.value['Youtube']}"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.noticias/resources/images/youtube.png</cms:link>" alt="Youtube"/></a>
							</c:when>
							<c:when test="${elem.value['Blogger'].exists}">
								<a href="${elem.value['Blogger']}"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.noticias/resources/images/blogspot.png</cms:link>" alt="Blogger"/></a>
							</c:when>
							<c:when test="${elem.value['Wordpress'].exists}">
								<a href="${elem.value['Wordpress']}"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.noticias/resources/images/youtube.png</cms:link>" alt="Wordpress"/></a>
							</c:when>
							<c:when test="${elem.value['Googleplus'].exists}">
								<a href="${elem.value['Googleplus']}"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.noticias/resources/images/gplus.png</cms:link>" alt="Google plus"/></a>
							</c:when>
							<c:when test="${elem.value['Linkedin'].exists}">
								<a href="${elem.value['Linkedin']}"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.noticias/resources/images/linkedin.png</cms:link>" alt="Linkedin"/></a>
							</c:when>
						</c:choose>
					</c:forEach>
					&nbsp;<a href="#" onclick="javascript:window.print();"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.noticias/resources/images/print.png</cms:link>" border="0" width="25" alt="imprimir" /></a>
				</td>
			</tr>
		</table>
		<div class="clear"></div>
		
		<div class="texto" ${rfda.Cuerpo}>${value.Cuerpo}</div>
		
		<c:if test="${value.Recuadro.exists}">
			<div class="recuadro" ${rfda.Recuadro}>${value.Recuadro}</div>
		</c:if>
		<c:if test="${value.Imagen.exists}">
				<c:set var="titulo" value="${value.Imagen.value.Titulo}" />
				<c:set var="imagen" value="${value.Imagen.value.Image}" />
				<c:set var="pie_imagen" value="${value.Imagen.value.Pie}" />
				<c:set var="alt" value="${value.Imagen.value.Alt}" />
		</c:if>
		
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
		<c:forEach var="elementoa" items="${elementos}">
		<!-- Parrafo -->
			<c:if test="${elementoa.value.Parrafo.exists}">
				<c:set var="parrafo" value="${elementoa.value.Parrafo}"/>
				<c:if test="${parrafo.value.Titulo.exists && parrafo.value.Titulo.isSet}">
					<h3>${parrafo.value.Titulo}</h3>
				</c:if>
				<c:if test="${parrafo.value.Texto.exists && parrafo.value.Texto.isSet}">
					<p>${parrafo.value.Texto}</p>
				</c:if>
			</c:if>
			<!-- Fecha -->
			<c:if test="${elementoa.value.Fecha.exists}">
				<c:set var="fecha" value="${elementoa.value.Fecha}"/>
				<c:if test="${fecha.value.Titulo.exists && fecha.value.Titulo.isSet}">
					<h2 class="noseparado">${fecha.value.Titulo}</h2>
				</c:if>
				<c:if test="${!fecha.value.Titulo.exists && !fecha.value.Titulo.isSet}">
					<h2 class="noseparado">Fecha</h2>
				</c:if>
				<table class="noborde">
					<tr>
						<td valign="top" class="titulo">
							<c:if test="${fecha.value.Titulo.exists && fecha.value.Titulo.isSet}">
								${fecha.value.Titulo}
							</c:if>
							<c:if test="${!fecha.value.Titulo.exists && !fecha.value.Titulo.isSet}">
								Fecha
							</c:if>
						</td>
						<td valign="top">
							<c:if test="${fecha.value.Date.exists && fecha.value.Date.isSet}">
								<fmt:formatDate value="${cms:convertDate(fecha.value.Date)}" dateStyle="SHORT" timeStyle="SHORT" type="both" />
							</c:if>
						</td>
					</tr>
				</table>
			</c:if>
			<!-- Plazo -->
			<c:if test="${elementoa.value.Plazo.exists}">
				<c:set var="plazo" value="${elementoa.value.Plazo}"/>
				<h2 class="noseparado">Plazo</h2>
				<table class="noborde">
					<tr>
						<td valign="top" class="titulo">
							<c:if test="${plazo.value.Titulo.exists && plazo.value.Titulo.isSet}">
								${plazo.value.Titulo}
							</c:if>
							<c:if test="${!plazo.value.Titulo.exists && !plazo.value.Titulo.isSet}">
								Plazo
							</c:if>
						</td>
						<td valign="top">
							<c:if test="${plazo.value.Inicio.exists && plazo.value.Inicio.isSet}">
								de <span class="fecha"><fmt:formatDate value="${cms:convertDate(plazo.value.Inicio)}" dateStyle="SHORT" timeStyle="SHORT" type="both" /></span>
							</c:if>
							<c:if test="${plazo.value.Fin.exists && plazo.value.Fin.isSet}">
								hasta <span class="fecha"><fmt:formatDate value="${cms:convertDate(plazo.value.Fin)}" dateStyle="SHORT" timeStyle="SHORT" type="both" /></span>
							</c:if>
						</td>
					</tr>
				</table>
			</c:if>
			<!-- Imagen -->
			<c:if test="${elementoa.value.Imagen.exists}">	
				<c:set var="imagen" value="${elementoa.value.Imagen}"/>
				<c:if test="${imagen.value.Image.exists && imagen.value.Image.isSet}">
							
							<div class="imagen_izq">
								<c:if test="${(imagen.value.Link.exists)}">
									<a href="<cms:link>${imagen.value.Link.value.Link}</cms:link>" target="${imagen.value.Link.value.Target}">
								</c:if>
								<cms:img src="${imagen.value.Image}" width="${imgwidth}" cssclass="${imgclass}">
									<cms:param name="alt">${imagen.value.Alt}</cms:param>
									<cms:param name="title">${imagen.value.Alt}</cms:param>
									<cms:param name="class">center</cms:param>
									<cms:param name="width">500</cms:param>
								</cms:img>
								<c:if test="${imagen.value.Link.exists}">
								</a>
								</c:if>
								<c:if test="${imagen.value.Pie.exists}">
									<c:if test="${imagen.value.Pie !=''}">
										<p class="pieimagen" ${rdfa.Pie}>${imagen.value.Pie}</p>
									</c:if>
								</c:if>
								
							</div> <!-- fin de la imagen -->
							<div class="clear"></div>
				</c:if>
				<div class="clear"></div>
			</c:if>
			<div class="clear"></div>
			<!-- Enlace -->
			<c:if test="${elementoa.value.Enlace.exists}">
				<c:set var="enlace" value="${elementoa.value.Enlace}"/>
				<h2 class="noseparado">Enlace</h2>
				<table class="noborde">
					<tr>
						<td class="titulo" valign="top">
							<c:if test="${enlace.value.Titulo.exists && enlace.value.Titulo.isSet}">
								${enlace.value.Titulo}
							</c:if>
							<c:if test="${!enlace.value.Titulo.exists && !enlace.value.Titulo.isSet}">
								Enlace
							</c:if>
						</td>
						<td valign="top">
							<c:if test="${(enlace.value.Link.exists)}">
								<a href="<cms:link>${enlace.value.Link}</cms:link>" target="${enlace.value.Target}"> 
							</c:if>
							
							<c:if test="${(enlace.value.Texto.exists) && (enlace.value.Texto.isSet)}">
								${enlace.value.Texto}
							</c:if>
							<c:if test="${(not enlace.value.Texto.exists) || (not enlace.value.Texto.isSet)}">
								${enlace.value.Link}
							</c:if>
							<c:if test="${(enlace.value.Link.exists)}">
								</a>
							</c:if>
						</td>
					</tr>
				</table>
			</c:if>
			
			<!-- Documento -->
			<c:if test="${elementoa.value.Documento.exists}">
			<c:set var="documento" value="${elementoa.value.Documento}"/>
			<h2 class="noseparado">Documento</h2>
			<table class="noborde">
				<tr>
					<td class="titulo" valign="top">
						<c:if test="${documento.value.Titulo.exists && documento.value.Titulo.isSet}">
							${documento.value.Titulo}
						</c:if>
						<c:if test="${!documento.value.Titulo.exists && !documento.value.Titulo.isSet}">
							Documento/Fichero
						</c:if>
					</td>
					<td valign="top">
						<c:if test="${(documento.value.Texto.exists) && (documento.value.Texto.isSet)}">
							<a href="<cms:link>${documento.value.Document}</cms:link>">${documento.value.Texto}</a>
						</c:if>
						<c:if test="${(not documento.value.Texto.exists) || (not documento.value.Texto.isSet)}">
							<a href="<cms:link>${documento.value.Document}</cms:link>">${documento.value.Document}</a>
						</c:if>
					</td>
				</tr>
			</table>
			</c:if>
			
			<!-- Video -->
			<c:if test="${elementoa.value.Video.exists}">
			<c:set var="video" value="${elementoa.value.Video}"/>
				<c:set var="cachos_url" value="${fn:substringAfter(video.value.Video,'v=')}" />
				<center><iframe width="620" height="307" src="http://www.youtube.com/embed/<c:out value='${cachos_url}' />" frameborder="0" allowfullscreen>${elem.value.Video.value.Titulo}: <a href="http://www.youtube.com/embed/<c:out value='${cachos_url}' />">Ver en Youtube</a></iframe></center>
			</c:if>
		</c:forEach>
		
		
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
		--%>

</cms:formatter>
