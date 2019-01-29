<%@page buffer="none" session="false" trimDirectiveWhitespaces="true"%>
<%@ page import="java.util.Date" %>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<cms:formatter var="content" val="value" rdfa="rdfa">

	<!-- Slideshow -->
	<uva-slideshow auto="true">
		<c:forEach var="elemento" items="${content.valueList.Elementos}">
			<c:if test="${elemento.value.Imagen.exists && elemento.value.Imagen.isSet}">
				<c:set var="imagen" value="${elemento.value.Imagen}"/>
				<uva-slideshow-img src="${imagen.value.Image}" alt="${imagen.value.Alt}" title="${imagen.value.Alt}" ></uva-slideshow-img>
				</c:if>
		</c:forEach>
	</uva-slideshow>
<%--

	<div id="slideshow">

		<div class="container">
			<div class="row">
				<div class="col-md-12" class="slideshow">
					<c:forEach var="elemento" items="${content.valueList.Elementos}">
						<div class="slide">
							<c:if test="${elemento.value.Imagen.exists && elemento.value.Imagen.isSet}">
								<c:set var="imagen" value="${elemento.value.Imagen}"/>
								<c:set var="target" value="_blank"/>
								<c:if test="${(imagen.value.Link.exists) && ((not imagen.value.Link.value.Target.isSet) || (imagen.value.Link.value.Target == 'Nueva ventana'))}">
									<c:set var="target" value="_blank"/>
								</c:if>
								<c:if test="${(imagen.value.Link.exists) && (imagen.value.Link.value.Target.isSet) && (imagen.value.Link.value.Target != 'Nueva ventana')}">
									<c:set var="target" value="_self"/>
								</c:if>
								<c:if test="${imagen.value.Link.exists}">
									<a href="${fn:trim(imagen.value.Link.value.Link)}" target="${target}">
										<figure>
											<cms:img src="${imagen.value.Image}" cssclass="img-fluid" alt="${imagen.value.Alt}" title="${imagen.value.Alt}"/>
										</figure>
									</a>
								</c:if>
								<c:if test="${!imagen.value.Link.exists}">
									<cms:img src="${imagen.value.Image}" cssclass="img-fluid" alt="${imagen.value.Alt}" title="${imagen.value.Alt}"/>
								</c:if>
							</c:if>

						</div>
					</c:forEach>
				</div>
			</div>

		</div>

		<div class="container">
			<div class="row">
				<div class="col-md-12 text-center dots">
					<c:forEach var="elemento" items="${content.valueList.Elementos}" varStatus="i">
						<slideshow-span class="dot" indice=${i.count}></slideshow-span>
					</c:forEach>
				</div>
			</div>
		</div>
		
	</div>
--%>
</cms:formatter>