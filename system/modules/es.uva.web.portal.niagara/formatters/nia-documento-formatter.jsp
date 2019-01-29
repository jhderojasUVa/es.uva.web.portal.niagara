<%@page buffer="none" session="false" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<cms:formatter var="content" val="value" rdfa="rdfa">
<div class="row">
	<div class="col-md-12">
		<c:if test="${value.Fichero.exists}">
			<c:if test="${value.Fichero.isSet}">
				<table width="620">
				<tr>
					<td width="24" valign="top" align="center"><img src="<cms:link>/system/modules/es.uva.web.portal.opencms.v85.tipos.documentos/resources/doc_3.png</cms:link>" border="0" alt="descargar documento" align="absmiddle" width="20" /></td>
					<td class="doc"><a title="${value.Texto}" alt="${value.Texto}" href="<cms:link>${value.Fichero}</cms:link>">${value.Texto}</a></td>
				</tr>
				</table>
			</c:if>
			<c:if test="${! value.Fichero.isSet}">
				<li ${rdfa.Texto}>Debe incluir un fichero en el documento</li>
			</c:if>
		</c:if>
		<c:if test="${! value.Fichero.exists}">
			<li ${rdfa.Texto}>${value.Texto}</li>
		</c:if>
	</div>
</div>
</cms:formatter>