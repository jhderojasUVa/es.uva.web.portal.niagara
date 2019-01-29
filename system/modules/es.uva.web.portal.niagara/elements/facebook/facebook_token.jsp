<%@ page import="java.util.*" %><% 
%><%@ page import="java.text.SimpleDateFormat" %><% 
%><%@ page import="org.opencms.file.CmsResource" %><% 
%><%@ page import="org.opencms.file.CmsObject" %><% 
%><%@ page import="org.opencms.util.CmsUUID" %><% 
%><%@ page import="org.opencms.util.CmsStringUtil" %><% 
%><%@ page import="org.opencms.main.*" %><% 
%><%@ page import="org.opencms.jsp.*" %><% 
%><%@ page import="org.opencms.file.*" %><% 
%><%@ page import="org.opencms.file.types.*" %><% 
%><%@ page import="org.opencms.xml.*" %><% 
%><%@ page import="org.opencms.xml.content.*" %><% 
%><%@ page import="org.opencms.xml.types.*" %><% 
%><%@ page import="org.opencms.lock.*" %><% 
%><%@ page import="org.opencms.db.CmsResourceState" %><% 
%><%@ page import="org.opencms.xml.content.CmsXmlContent" %><% 
%><%@ page import="org.opencms.mail.CmsSimpleMail" %><% 
%><%@ page import="java.net.*" %><% 
%><%@ page import="java.text.DateFormat" %><% 
%><%@ page import="java.text.SimpleDateFormat" %><% 
%><%@ page import="java.util.Date" %><% 
%><%@ page import="java.io.*" %><% 
%><%@ page import="javax.net.ssl.*" %><% 
%><%@ page import="javax.json.*" %><% 
%><%@ page import="javax.servlet.jsp.*" %><% 
%><%
// Variables
// Necesario e impepinable enviar el URL
//String url = request.getParameter("url");

// Recordar cambiar esto para las definitivas
String APP_ID = "1962905404011346";
String APP_SECRET = "abf042892d978e519dcc636711378472";

// Creamos la URL

String url = "https://graph.facebook.com/oauth/access_token?client_id=" + APP_ID + "&client_secret=" + APP_SECRET + "&grant_type=client_credentials";

String USER_AGENT = "Mozilla/5.0";

try {
	// Creamos el proxy y la conexion
	InetSocketAddress proxyInet = new InetSocketAddress("proxy.uva.es",80);
	Proxy proxy = new Proxy(Proxy.Type.HTTP, proxyInet);
	URL obj = new URL(url);
	HttpURLConnection con = (HttpURLConnection) obj.openConnection(proxy);
	
	// Añadimos el header
	con.setRequestMethod("POST");
	con.setRequestProperty("User-Agent", USER_AGENT);
	con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");
	
	// Enviamos el post para que sepa el tamaño de vuelta
	con.setDoOutput(true);
	DataOutputStream wr = new DataOutputStream(con.getOutputStream());
	wr.flush();
	wr.close();
	
	// Respuesta
	int responseCode = con.getResponseCode();
	
	BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
	String inputLine;
	StringBuffer respuesta = new StringBuffer();
	
	// Leemos leemos y leemos
	while ((inputLine = in.readLine()) != null) {
		// ¿Quien es mi respuesta?
		// Tu eres mi respuesta!
		// ¿Quien es mi respuesta?
		// Tu eres mi respuesta!
		// ¿Quien es mi respuesta?
		// Tu eres mi respuesta!
		respuesta.append(inputLine);
	}
	// Cerramos la conexión
	in.close();
	
	//CmsXmlContent xmlContent = (CmsXmlContent)value.respuesta();
	
	// Escupimos todo por pantalla
	out.print(respuesta.toString());
	out.flush();
	
} catch(Exception e) {
	// Ha ocurrido un error
	out.println("<strong>Atencion</strong>: Ha ocurrido un error. Por favor, pruebe mas tarde<br/>");
	out.println("<strong>Error</strong>:");
	out.println(e.toString());
	e.printStackTrace();
}

%>