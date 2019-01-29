<%@page buffer="none" session="false" trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
	//CmsListConfiguration cms = new CmsListConfiguration(pageContext, request, response);
	//pageContext.setAttribute("list", cms);
%>
<fmt:setLocale value="${cms.locale}" />
<cms:bundle basename="es.uva.web.portal.uva.lists">

<c:set var="showtitle">${cms.element.settings.showtitle}</c:set>
<c:set var="showpagination"><%=request.getParameter("showpagination")%></c:set>

<c:set var="fileid"></c:set>
<c:if test="${fileid=='' or fileid=='null'}">
	<c:set var="fileid">${cms:vfs(pageContext).resource[cms.element.sitePath].structureId}</c:set>
</c:if>
<div class="container">
<div class="row">
  <div class="col-md-12">
    <div class="lista">
	<div class="box-${cms.element.settings.estilo}">
	  <cms:formatter var="listbox" rdfa="rdfa">

		  <%-- Set the items per page --%>
		  <c:set var="itemsperpage" value="5" />
		  <c:if test="${listbox.value['ItemsPerPage'].isSet}">
			  <c:set var="itemsperpage" value="${listbox.value['ItemsPerPage'].stringValue}" />	
		  </c:if>

		  <%-- Title of the list box - cut&paste de una propiedad que ahora no tienen las listas --%>
		  <c:if test="${showtitle != 'false'}">
			  <div class="titulo_pag" ${rdfa.Title}>
				  <c:out value="${listbox.value['Title']}" escapeXml="false" />
			  </div>
		  </c:if>
		  
		<div class="boxbody">

			<c:set var="solrFilter">${listbox.value.Parameter}</c:set>
			<c:set var="createPath">${listbox.value.Createpath}</c:set>
			<c:set var="createType">${listbox.value.TypeToCreate.stringValue}</c:set>
			<c:choose>
				<c:when test="${cms.element.inMemoryOnly}">
					<!-- Only in memory -->
					<div class="alert"><fmt:message key="list.message.new" /></div>
				</c:when>
				<c:when test="${empty solrFilter}">
					<!-- Empty collectorparam -->
					<div class="alert"><fmt:message key="list.message.edit" /></div>
				</c:when>
				<c:otherwise>
					<!-- Resultados -->
					<c:set var="searchconfig">
						{
						"ignorequery" : true,
						"extrasolrparams" : "<c:out value="${solrFilter}" escapeXml="false" />",
						"pagesize" : 20,
						}	
					</c:set>
					<!--
					${searchconfig}
					${solrFilter}
					${createPath}
					${createType}
					-->
					<div class="elementos_lista">
						<cms:search configString="${searchconfig}" var="search"	addContentInfo="true" />
						<c:choose>
							<c:when test="${search.numFound > 0}">
								<!-- elementos de la lista -->
								<c:forEach var="result" items="${search.searchResults}">
									<div class="elemento_elementos_lista">
									<c:catch var ="catchException">
										<!-- ${result.xmlContent.filename} -->
										<cms:display value='${result.xmlContent.filename}' editable="true" create="true" delete="true"/>
									</c:catch>
									<c:if test = "${catchException != null}">
										<!--Exception: ${catchException} -->
										<!--Exception2: ${catchException.message}-->
									</c:if>
									</div>
								</c:forEach>
							</c:when>
							<c:otherwise>
								<!-- crear elementos de la lista -->
								<cms:edit createType="${createType}" create="true" creationSiteMap="${createPath}">
									<div class="elemento_elementos_lista">
										<fmt:message key="list.message.create" />  ${createType}.						
									</div>
								</cms:edit>
							</c:otherwise>
						</c:choose>
					</div>
				</c:otherwise>
			</c:choose>
		</div>
	</cms:formatter>
	</div>
	</div>
	</div>
	</div>
	</div>
</cms:bundle>

