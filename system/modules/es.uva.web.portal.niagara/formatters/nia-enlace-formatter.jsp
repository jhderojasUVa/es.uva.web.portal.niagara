<%@page buffer="none" session="false" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<cms:formatter var="content" val="value" rdfa="rdfa">
	<div class="enlace" ${rdfa.Texto}>
		<table class="noborde" width="750">
			<tr>
				<td>${value.Texto}</td>
				<td width="150" valign="top">
				<c:if test="${value.Link ne '' && value.Target == '1'}">
					<a href="<cms:link>${value.Link}</cms:link>" target="_blank">Enlace</a>
				</c:if>
				<c:if test="${value.Link ne '' && value.Target ne '1'}">
					<a href="<cms:link>${value.Link}</cms:link>" target="_self">Enlace</a>
				</c:if>
				<c:if test="${value.Link eq ''}">
					No existe enlace
				</c:if>
				</td>
			</tr>
		</table>
	</div>
</cms:formatter>