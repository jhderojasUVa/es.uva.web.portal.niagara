<%@page buffer="none" session="false" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<cms:formatter var="content" val="value" rdfa="rdfa">
<div class="row">
	<div class="col-md-12">
		<div class="titulo_pag Raya"><h1>${value.Titulo}</h1></div>
		<p class="parrafo_in">${value.Descripcion}</p>
		<div class="grid" data-masonry='{ "columnWidth": 180, "itemSelector": ".grid-item" }' style="margin-bottom: 15px">
		
		<c:forEach var="elemento" items="${content.valueList.Red}">
			<div class="redes_sociales grid-item" style="margin-bottom: 20px">
				<h1>${elemento.value.TituloRed}</h1>
				<c:forEach var="elemento2" items="${elemento.valueList.ElementoRed}">
					<c:if test="${elemento2.value.Blogger.exists && elemento2.value.Blogger.isSet}">
						<a href="<cms:link>${elemento2.value.Blogger}</cms:link>" role="link"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.redessociales/resources/img/icons/64-blogger.png</cms:link>" class="red" alt="Blogger"></a>
					</c:if>
					<c:if test="${elemento2.value.Facebook.exists && elemento2.value.Facebook.isSet}">
						<a href="<cms:link>${elemento2.value.Facebook}</cms:link>" role="link"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.redessociales/resources/img/icons/64-facebook.png</cms:link>" class="red" alt="Facebook"></a>
					</c:if>
					<c:if test="${elemento2.value.Flickr.exists && elemento2.value.Flickr.isSet}">
						<a href="<cms:link>${elemento2.value.Flickr}</cms:link>" role="link"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.redessociales/resources/img/icons/64-flickr.png</cms:link>" class="red" alt="Flickr"></a>
					</c:if>
					<c:if test="${elemento2.value.Googleplus.exists && elemento2.value.Googleplus.isSet}">
						<a href="<cms:link>${elemento2.value.Googleplus}</cms:link>" role="link"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.redessociales/resources/img/icons/64-googleplus.png</cms:link>" class="red" alt="Google Plus"></a>
					</c:if>
					<c:if test="${elemento2.value.Linkedin.exists && elemento2.value.Linkedin.isSet}">
						<a href="<cms:link>${elemento2.value.Linkedin}</cms:link>" role="link"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.redessociales/resources/img/icons/64-linkedin.png</cms:link>" class="red" alt="Linkedin"></a>
					</c:if>
					<c:if test="${elemento2.value.Vimeo.exists && elemento2.value.Vimeo.isSet}">
						<a href="<cms:link>${elemento2.value.Vimeo}</cms:link>" role="link"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.redessociales/resources/img/icons/64-vimeo.png</cms:link>" class="red" alt="Vimeo"></a>
					</c:if>
					<c:if test="${elemento2.value.Twitter.exists && elemento2.value.Twitter.isSet}">
						<a href="<cms:link>${elemento2.value.Twitter}</cms:link>" role="link"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.redessociales/resources/img/icons/64-twitter.png</cms:link>" class="red" alt="Twitter"></a>
					</c:if>
					<c:if test="${elemento2.value.Pinterest.exists && elemento2.value.Pinterest.isSet}">
						<a href="<cms:link>${elemento2.value.Pinterest}</cms:link>" role="link"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.redessociales/resources/img/icons/64-pinterest.png</cms:link>" class="red" alt="Pinterest"></a>
					</c:if>
					<c:if test="${elemento2.value.Youtube.exists && elemento2.value.Youtube.isSet}">
						<a href="<cms:link>${elemento2.value.Youtube}</cms:link>" role="link"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.redessociales/resources/img/icons/64-youtube.png</cms:link>" class="red" alt="Youtube"></a>
					</c:if>
					<c:if test="${elemento2.value.Soundcloud.exists && elemento2.value.Soundcloud.isSet}">
						<a href="<cms:link>${elemento2.value.Soundcloud}</cms:link>" role="link"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.redessociales/resources/img/icons/64-soundcloud.png</cms:link>" class="red" alt="SoundCloud"></a>
					</c:if>
					<c:if test="${elemento2.value.RSS.exists && elemento2.value.RSS.isSet}">
						<a href="<cms:link>${elemento2.value.RSS}</cms:link>" role="link"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.redessociales/resources/img/icons/64-rss.png</cms:link>" class="red" alt="RSS"></a>
					</c:if>
					<c:if test="${elemento2.value.Instagram.exists && elemento2.value.Instagram.isSet}">
						<a href="<cms:link>${elemento2.value.Instagram}</cms:link>" role="link"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.redessociales/resources/img/icons/64-instagram.png</cms:link>" class="red" alt="Instagram"></a>
					</c:if>
					<c:if test="${elemento2.value.Web.exists && elemento2.value.Web.isSet}">
						<a href="<cms:link>${elemento2.value.Web}</cms:link>" role="link"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.redessociales/resources/img/icons/64-www.png</cms:link>" class="red" alt="WWW"></a>
					</c:if>
				</c:forEach>
				<p>${elemento.value.DescripcionRed}</p>
			</div>
		</c:forEach>
		</div>
	</div>
</div>
</cms:formatter>