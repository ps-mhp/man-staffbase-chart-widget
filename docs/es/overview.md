# Gráfico

El widget de gráficos muestra los indicadores en cuatro tipos: **gráfico radial
(radar), de barras, de líneas y circular**. Cada tipo se configura mediante
el mismo editor, que se abre directamente en la configuración del widget; una
tabla copiada de Excel se puede importar allí con un solo clic; consulta
[Paso a paso](usage.md).

## Los cuatro tipos

**Diagrama radial (radar / araña).** Varios ejes se extienden en forma de estrella
desde un punto central, y cada serie —por ejemplo, una comparación de vehículos—
conecta sus valores en estos ejes para formar un área. De este modo, se pueden
comparar de un vistazo varios indicadores de varias series, incluso si se
miden en unidades muy diferentes: kilómetros, toneladas,
minutos, kilovatios. Solo en el radar hay valores mínimos, máximos y el selector
«cuanto menor, mejor» para cada eje, además de las opciones de visualización de líneas auxiliares en la red
y relleno de áreas.

**Gráfico de barras (columnas).** Compara valores entre unas pocas categorías.
Todas las barras comparten un eje de valores común, que el propio ECharts
calcula y etiqueta; a diferencia del gráfico de radar, este eje solo tiene
sentido si todas las categorías utilizan la misma unidad. Como
opciones de visualización están disponibles el apilado (series una encima de otra en lugar de una al lado de otra) y
la orientación (vertical u horizontal).

**Gráfico de líneas (tendencia).** Muestra una evolución a lo largo de una
serie ordenada, por ejemplo, a lo largo de los años de construcción. El orden de los ejes en la cuadrícula es
el mismo que el de la línea. Opciones de visualización: suavizar líneas, rellenar el área bajo
la línea, mostrar puntos en los vértices.

**Gráfico circular (pastel / anillo).** Muestra la distribución de un todo:
los segmentos son los ejes (categorías) y sus valores determinan el tamaño de los segmentos.
**Solo se dibuja la primera serie**; las demás series
permanecen guardadas y vuelven a aparecer en cuanto se cambia a otro tipo
de gráfico; el editor lo indica expresamente. Cada categoría puede tener un
color de segmento propio. Opciones de visualización: radio interior (0 da como resultado un
círculo completo; un valor mayor, un anillo o una rosquilla) y la etiqueta del segmento
(porcentaje, valor absoluto, ambos o oculta). Los valores negativos
no suponen un problema de visualización en `pie`, sino un error de datos; en ese caso,
el gráfico muestra un aviso en lugar de un gráfico circular erróneo.

Al cambiar el tipo de gráfico en el editor no se pierden datos: el título, la nota al pie,
la leyenda, los ejes y las series se conservan, al igual que los valores de los campos específicos
de cada tipo; simplemente no se muestran mientras se haya seleccionado otro tipo.

## Lo que ven los lectores

- El propio gráfico, con tantos ejes y series como se desee.
- Los valores aparecen directamente en el gráfico (en el caso de `pie`, según la configuración, como
  porcentaje, valor absoluto o ambos); además, al pasar el cursor
  por encima de un punto o segmento, aparece una información sobrevolada con los valores correspondientes.
- Una leyenda encima o debajo del gráfico, según la configuración.
  En el caso de `pie`, la leyenda enumera las categorías (segmentos); en los demás
  tipos, las series.
- Opcionalmente, un título y una nota al pie.
- Si se permite la descarga (véase [Configuración](settings.md)), dos botones
  debajo del gráfico para descargarlo como imagen.
- Para lectores de pantalla, además, una tabla de datos completa debajo del
  gráfico. Está oculta visualmente, pero está presente; de este modo, el gráfico
  se puede utilizar incluso sin percepción visual.

## Exportación de imágenes

Si la descarga está activada, aparecen dos botones debajo del gráfico:
«Como SVG» y «Como PNG». El archivo descargado contiene **solo el
diagrama**, no el resto de la página: título, leyenda, ejes y valores
tal y como se muestran en ese momento, con fondo blanco (incluso si
la propia página tiene un fondo transparente u oscuro). El SVG se puede
ampliar sin pérdida de calidad; el PNG es adecuado para lugares que no pueden
incorporar SVG (por ejemplo, la mayoría de los programas de presentaciones) y se genera en
doble resolución. La exportación funciona igual con los cuatro tipos
: se basa en la imagen dibujada y no distingue el tipo de gráfico.

## Traducción

El gráfico se incluye en la traducción automática de la página. Se traducen
el título, la nota al pie, las etiquetas de los ejes y los nombres de las series —precisamente los
textos que se han introducido manualmente—. Los números, las unidades, los límites de los ejes,
los colores y el resto de ajustes permanecen inalterados, ya que no tienen
idioma: una unidad traducida sería incorrecta («t» no se convierte en «ton»),
un número traducido no tendría sentido.

## Lo que ves en el editor del CMS

Al insertar el módulo, se abre automáticamente el **editor de gráficos**
con una barra de control en la parte superior (Guardar, Ayuda, Cerrar) en lugar de un
pie de página; de este modo, la opción de guardar sigue estando accesible incluso con una tabla de datos larga,
ya que la barra permanece fija al desplazarse. En la parte superior, la selección del tipo de gráfico
y un campo en el que se pega una tabla copiada de Excel; debajo,
una cuadrícula con **una fila por eje** y **una columna por serie**
(en el caso de `pie`, solo una columna de series), junto a ella una vista previa en tiempo real que muestra exactamente
cómo aparecerá el gráfico posteriormente en la página. Mientras no se haya
creado nada, el editor explica los conceptos y ofrece las opciones «Cargar ejemplo»
y «Crear tabla vacía», cada una con un ejemplo diferente
que se adapta al tipo seleccionado. El campo de texto situado detrás solo muestra la forma técnicamente
almacenada y codificada de los datos y nunca se edita manualmente.

Si el cuadro de diálogo es estrecho (por ejemplo, en pantallas pequeñas), la
vista previa se desplaza por debajo de la cuadrícula y —a partir de unos 700 píxeles de ancho—
la cuadrícula se convierte en una sucesión de gráficos, uno por cada eje. El cuadro de diálogo
nunca se desplaza horizontalmente.

Una característica importante del radar: sus ejes **no tienen una escala numérica visible**
**escala numérica visible**. No es posible representar de forma adecuada en una escala común
varios ejes con unidades diferentes (p. ej.,
kilómetros y minutos). Por ello, cada eje se estira internamente de forma independiente: desde cero hasta
su valor máximo. Las cifras reales aparecen en los puntos de datos,
en la información sobre herramientas y en la tabla de datos. Los gráficos de barras y de líneas,
por el contrario, muestran un eje de valores real, calculado y etiquetado por ECharts.
Más información en [Configuración](settings.md).
