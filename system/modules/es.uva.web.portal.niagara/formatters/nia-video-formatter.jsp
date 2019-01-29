<%@page buffer="none" session="false" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<cms:formatter var="content" val="value" rdfa="rdfa">
	<c:if test="${cms.element.settings.around==true}">
	<div class="video" style="float: left;">
	</c:if>
	<c:if test="${cms.element.settings.around==false}">
	<div class="video">
	</c:if>
		<c:choose>
		<c:when test="${fn:contains(value.Video,'youtube')}">
			<c:if test="${value.Video.exists && value.Video.isSet}">
				<c:set var="cachos_url" value="${fn:substringAfter(value.Video,'v=')}" />
				<c:if test="${fn:contains(cachos_url,'list=')}">
					<c:set var="cachos_url" value="${fn:replace(cachos_url,'&list=','?list=')}" />
				</c:if>
				<iframe width="${cms.element.settings.width}" height="${cms.element.settings.height}" src="http://www.youtube.com/embed/<c:out value='${cachos_url}' />" frameborder="0" style="text-align:center;" allowfullscreen></iframe>

			</c:if>
			<c:if test="${value.Video.exists && not value.Video.isSet}">
				<!--<center>-->
				<iframe width="610" height="320" src="http://www.youtube.com/embed/Bmrx8MFJl6s" frameborder="0" allowfullscreen></iframe>
				<!--</center>-->
			</c:if>
		</c:when>
		<c:when test="${fn:contains(value.Video,'vimeo')}">
			<c:if test="${value.Video.exists && value.Video.isSet}">
				<c:set var="cachos_url" value="${fn:substringAfter(value.Video,'vimeo.com/')}" />
				<center>
					<iframe src="http://player.vimeo.com/video/${cachos_url}?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="${cms.element.settings.width}" height="${cms.element.settings.height}" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
				</center>
			</c:if>
		</c:when>
		<c:otherwise>
			<c:if test="${value.Video.exists && not value.Video.isSet}">
				<!--<center>-->
				<iframe width="610" height="320" src="http://www.youtube.com/embed/Bmrx8MFJl6s" frameborder="0" allowfullscreen></iframe>
				<!--</center>-->
			</c:if>
		</c:otherwise>
		</c:choose>
	</div>
</cms:formatter>