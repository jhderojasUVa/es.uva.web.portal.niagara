<%@page buffer="none" session="false" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<cms:formatter var="content">
<!-- Formateador Noticia 1 -->
<div class="noticia">
	<h3 ${content.rdfa.Titulo}>
		<a target="_blank" href="<cms:link>${content.filename}</cms:link>">${content.value.Titulo}</a>
	</h3>
</div>
</cms:formatter>