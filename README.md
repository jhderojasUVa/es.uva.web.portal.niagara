# es.uva.web.portal.niagara

Refactorización de la web del Gabinete de Comunicacion Universidad de Valladolid (Portada y mas...). Osea, la nueva web de http://comunicacion.uva.es o https://comunicacion.uva.es (porque se pasara a https).

# En que

Responsive con Bootstrap. AAA por ley (de ahi que los colores sean feos).

Web Components en vanilla ES6. Componentes auto mantenidos, es decir, en el componente tiene que estar todo.

Como estamos en proceso, se esta cambiando "internamente" mucho la documentacion con lo que decir algo de como ha de funcionar y ser... es complicado por ahora. Lo unico es que se ES5aliza via babel cuando se piensa que el componente esta finalizado (luego se re-refactoriza y se manda al guano...).

# Front end

Simple. Componentes en vanilla Javascript ES6 y ES7 (lo que se pueda). Es decir en la vista del OpenCMS (de su modelo) añadimos los componentes que creamos.

La idea es que el modulo en cuestion, los formateadores generen el tag correspondiente del objeto del componente que leera sus propiedades de los atributos y operara como haga falta segun sea el tamaño del visor, el que tenga que hacer y lo que deba hacer.

# Back end

Se usa OpenCMS como gestor, luego como OpenCMS es Java, pues Java sera. Hay mezcla entre librerias/tags creados para algunos elementos y JSTL para los modulos con sus XSD para los modelos de datos.

OpenCMS usa su propio MVC que aqui se usa.

# Forma de uso

Es un modulo de OpenCMS 10.5.3, usese como cualquier modulo.

# Estado

Verde, muy verde... esta en working progress de toda la vida, luego el Master puede funcionar o no (mas bien no).
