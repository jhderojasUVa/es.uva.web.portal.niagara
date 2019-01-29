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

// Recordar cambiar esto para las definitivas
String APP_ID = "1962905404011346";
String APP_SECRET = "abf042892d978e519dcc636711378472";

// User ID, el de comunicacion: 187763507920209 o el mio (Tuti): 1431542777

String USER_ID = "187763507920209";

// Limite en la peticion
String LIMIT = request.getParamenter("limit");

// Token
String TOKEN = request.getParameter("token");

// Se supone que ya tenemos el token... se supone, luego simplemente hay que leer el feed

// Creamos la URL

// Ejemplo de URL "https://graph.facebook.com/v3.2/10219163943996067/feed?fields=attachments,message,created_time,likes,story&limit=25&format=json&__paging_token=enc_AdDKT3yFYJNPZA2VKpVqAEHdPCeNOBZC2TRPMGfdMEiL1VVtOMowNAtELEaj67fphZBfs4ZAsCGtufemRkZCYEo5pcTJS&access_token=EAAb5QIdVc1IBAC4PdPZBKDkcZB7c4eyZBfOLx62jOfPPZBI1dIG483N2KJml2zWdOIn9u1jXbVjNT6PAl9CVHY3suaJUoIZAlVqY7Y4ZAmvkk9sZA6ZCPcpzeqr57nEHZALLMGb3zvpDis7RVFjkp8YcSVAvlWXj6VN1QZCyvyjOieZAg0Alq149wzsa2rzDwlqL6ZChKwQA344GTvwR8ZA5mcjK7WcMqbjc1q307vqm2l0oHXwZDZD&until=1545155072"

// Lo cogemos desde el principio
String url = "https://graph.facebook.com/v3.2/"+USER_ID+"/feed?fields=attachments,message,created_time,likes,story&limit="+LIMIT+"&access_token="+TOKEN;

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

// Como deberia ser la respuesta: Usando https://developers.facebook.com/tools/explorer
/*

{
  "data": [
    {
      "created_time": "2019-01-15T05:44:35+0000",
      "id": "10219163943996067_10219170593442299",
      "attachments": {
        "data": [
          {
            "description": "Rodent Research-8 (RR-8) examines the physiology of aging and the effect of age on disease progression using groups of young and old mice flown in space and kept on Earth.",
            "media": {
              "image": {
                "height": 506,
                "src": "https://scontent.xx.fbcdn.net/v/t39.2147-6/c280.0.720.720a/p720x720/50673059_313175669539995_4057749367409344512_n.jpg?_nc_cat=1&_nc_ht=scontent.xx&oh=471726b28ce52f7dd80a119fd6c37b5e&oe=5D011B1D",
                "width": 506
              }
            },
            "target": {
              "url": "https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.nasa.gov%2Fmission_pages%2Fstation%2Fresearch%2Fnews%2Frr8_feature&h=AT1WcVhYVOREtcTlHO51EH3U5B3QWAkrOxV2sD6imEcRXV-c1AN_pSrCAAwaVFVo-QhupaYMgVsD0hmXX4P4k7WVo2MAVOx-4BdZPTciDcA59vKrcUGdZTNqjq0Pvc2Oxpm1nuk&s=1"
            },
            "title": "Aging Faster in Space to Age Better on Earth",
            "type": "share",
            "url": "https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.nasa.gov%2Fmission_pages%2Fstation%2Fresearch%2Fnews%2Frr8_feature&h=AT1WcVhYVOREtcTlHO51EH3U5B3QWAkrOxV2sD6imEcRXV-c1AN_pSrCAAwaVFVo-QhupaYMgVsD0hmXX4P4k7WVo2MAVOx-4BdZPTciDcA59vKrcUGdZTNqjq0Pvc2Oxpm1nuk&s=1"
          }
        ]
      }
    },
    ............................. mas mas mas mas, tantos como se hayan pedido .........................
	],
  "paging": {
    "previous": "https://graph.facebook.com/v3.2/10219163943996067/feed?fields=attachments,message,created_time,likes,story&limit=25&since=1547531075&format=json&__paging_token=enc_AdDmEpxJG9sDPUwpttLq1jWVBSyX3WaCNZBxUdqdqP73GHZCxWbR0TZCeVZC9vF60RilLyIiPlcmX0tonki0rAf4BFKC&__previous=1&access_token=EAAb5QIdVc1IBAC4PdPZBKDkcZB7c4eyZBfOLx62jOfPPZBI1dIG483N2KJml2zWdOIn9u1jXbVjNT6PAl9CVHY3suaJUoIZAlVqY7Y4ZAmvkk9sZA6ZCPcpzeqr57nEHZALLMGb3zvpDis7RVFjkp8YcSVAvlWXj6VN1QZCyvyjOieZAg0Alq149wzsa2rzDwlqL6ZChKwQA344GTvwR8ZA5mcjK7WcMqbjc1q307vqm2l0oHXwZDZD",
    "next": "https://graph.facebook.com/v3.2/10219163943996067/feed?fields=attachments,message,created_time,likes,story&limit=25&format=json&__paging_token=enc_AdB5HpEH4aAJtrtgbZBczbQivllvVpdVkrZCuwrCrua4CHi5BGQNrN6A1MPzJXKocJBpYMCf0fzJXN1HVwogF3XHrq&access_token=EAAb5QIdVc1IBAC4PdPZBKDkcZB7c4eyZBfOLx62jOfPPZBI1dIG483N2KJml2zWdOIn9u1jXbVjNT6PAl9CVHY3suaJUoIZAlVqY7Y4ZAmvkk9sZA6ZCPcpzeqr57nEHZALLMGb3zvpDis7RVFjkp8YcSVAvlWXj6VN1QZCyvyjOieZAg0Alq149wzsa2rzDwlqL6ZChKwQA344GTvwR8ZA5mcjK7WcMqbjc1q307vqm2l0oHXwZDZD&until=1546547524"
  }
}

%>