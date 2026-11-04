# Ajustes

En el cuadro de diálogo de configuración solo hay técnicamente dos campos: **Diagrama** y
**Altura en píxeles**. El campo «Diagrama» no se edita directamente; en su lugar,
se abre automáticamente el **editor de diagramas**, donde se encuentran el resto de
ajustes.

## Campos del cuadro de diálogo de configuración

| Ajuste | Descripción |
| --- | --- |
| Diagrama | Contiene la definición completa del diagrama, codificada técnicamente. Se edita exclusivamente a través del editor de diagramas, nunca a mano. |
| Altura en píxeles | Altura del diagrama en la página. Se admiten valores entre 160 y 1200 píxeles; el valor predeterminado es 420. La anchura siempre se ajusta a la columna. |
| Permitir descarga | Muestra debajo del diagrama dos botones para descargarlo como imagen. El archivo solo contiene el diagrama, no la página. Desactivado por defecto. |

## El cuadro de diálogo del editor

En la parte superior hay una barra de control con **Guardar**, **Ayuda** y **Cerrar**;
esta permanece fija al desplazarse, para que se pueda guardar incluso cuando el
cuadro de datos. Mientras el borrador difiera de la versión guardada,
aparecerá junto a él «Cambios no guardados». El botón de Ayuda abre
un panel deslizante con las mismas explicaciones que en esta página, directamente en
el cuadro de diálogo; se cierra mediante el botón o la tecla «Esc».

Si el cuadro de diálogo es estrecho, la vista previa se desplaza debajo de la cuadrícula de entrada y,
cuando el ancho del contenedor es inferior a unos 700 píxeles, la cuadrícula se convierte en un gráfico
por cada eje. El cuadro de diálogo nunca se desplaza horizontalmente.

## Tipo de gráfico

La selección situada en la parte superior del editor determina el tipo de gráfico:

| Tipo | Adecuado para |
| --- | --- |
| Gráfico de red (radar / araña) | Comparación de pocas variantes a través de varios valores característicos con unidades posiblemente diferentes. |
| Diagrama de barras (columnas) | Comparación de valores en unas pocas categorías con una unidad común. |
| Diagrama de líneas (tendencia) | Evolución a lo largo de una serie ordenada, p. ej., años. |
| Diagrama circular (pastel / anillo) | División de un todo en segmentos; solo traza la primera serie. |

Al cambiar de tipo no se pierden datos: el título, la nota al pie, la leyenda, los ejes y
las series se conservan. Los ajustes específicos de cada tipo que se hayan guardado (p. ej.,
mínimo/máximo en el gráfico de radar) también se conservan y vuelven a aplicarse
en cuanto se vuelve a seleccionar el tipo correspondiente; es decir, no se
borran, sino que simplemente se ocultan.

## Qué campos aparecen en cada tipo

| Campo | Radar | Barra | Línea | Circular |
| --- | :-: | :-: | :-: | :-: |
| Unidad, decimales | ✓ | ✓ | ✓ | ✓ |
| Mínimo, máximo | ✓ | – | – | – |
| Dirección («cuanto menor, mejor») | ✓ | – | – | – |
| Color por eje (color del segmento) | – | – | – | ✓ |
| Columnas de serie en la cuadrícula | todas | todas | todas | solo la primera |

**Por qué el mínimo, el máximo y «cuanto menor, mejor» solo aparecen en el gráfico de radar
:** Se definen por eje y, en un
—como la que dibujan las gráficas de barras y de líneas— no se pueden representar. En los gráficos circulares
no hay ningún eje. Además, «cuanto menor, mejor» es un
concepto propio del gráfico de radar: en un eje de valores real no se invierte ningún eje, sino que
se ordena o se etiqueta.

## Importar datos de una tabla

| Configuración | Descripción |
| --- | --- |
| Campo de inserción | Incorpora una tabla copiada de Excel, PowerPoint o Word. Reconoce el tabulador, el punto y coma y la coma como separadores de columnas. |
| ¿Cómo está organizada su tabla? | Establece la dirección de lectura. La configuración predeterminada es «un indicador por fila, una variante por columna», tal y como aparece la tabla en la cuadrícula de abajo. La otra opción la invierte al importarla. |
| Aplicar tabla | Sustituye ejes, series y valores. Los ejes y series con el mismo nombre conservan la unidad, la dirección del eje y el color. |

La inserción desde Excel es independiente del tipo y funciona igual con los cuatro tipos.

## Introducción sin datos

Mientras no se hayan creado ni ejes ni series, el editor explica los
conceptos y ofrece dos botones: **«Cargar ejemplo»** rellena la tabla con un
ejemplo adecuado al tipo seleccionado (p. ej., en el radar, la comparación entre el MAN
eTGX frente al Mercedes-Benz eActros 600; en el gráfico circular, un desglose de los costes de la flota
), que se puede sobrescribir; **«Crear tabla vacía»** crea ejes
y series para rellenar.

## Por eje (una fila en la cuadrícula)

| Configuración | Descripción |
| --- | --- |
| Eje | Nombre del eje, tal y como aparece en el gráfico y en la tabla de datos. Si ocupa varias líneas: la tecla Intro genera un salto de línea que también se muestra en el gráfico. |
| Unidad | Se añade a cada número de este eje (punto de datos, información sobre herramientas, tabla), p. ej., «kWh». En los gráficos de barras y de líneas, el eje de valores común solo muestra la unidad si **todos** los ejes con valores tienen la misma unidad. |
| Dirección («cuanto menor, mejor») | Solo en el gráfico de radar. Invierte el eje: el valor menor queda entonces más hacia el exterior. Para indicadores en los que un valor menor es mejor —peso, consumo, tiempo de carga—. |
| Color | Solo en el gráfico de tarta. Establece el color del segmento correspondiente y anula el color de la paleta asignado automáticamente. |
| Decimales | Solo si están activados los **ajustes avanzados por eje**: cuántos decimales se muestran. Si no se especifica, se utiliza el número de decimales introducido realmente. |
| Mínimo | Solo en el gráfico de radar, con los ajustes precisos activados: límite inferior del eje. Si no se especifica, el eje comienza en cero; en el caso de valores negativos, en el menor de ellos. |
| Máximo | Solo en el radar, con los ajustes de precisión activados: límite superior del eje. Si no se especifica, se utiliza el valor más alto que aparece en este eje. |
| ↑ ↓ ✕ | Desplaza el eje o lo elimina junto con sus valores. |

## Por serie (una columna de la cuadrícula)

En el gráfico circular, la cuadrícula muestra **solo la primera columna de la serie**; una
nota debajo aclara que el resto de series se guardan, pero
no se representan.

| Ajuste | Descripción |
| --- | --- |
| Nombre de la serie | Nombre tal y como aparece en la leyenda (excepto en los gráficos circulares, véase más abajo), en la información sobre herramientas y en la tabla de datos. |
| Color | Sobrescribe el color asignado automáticamente de la paleta MAN para esta serie en concreto. No tiene efecto en los gráficos circulares: en ellos, el color varía según el eje (véase más arriba). |
| ← → ✕ | Mueve la serie —el orden determina el color de la paleta y el orden en la leyenda— o la elimina. |

## Título, leyenda y presentación

| Ajuste | Descripción |
| --- | --- |
| Título | Encabezado sobre el gráfico. Si el campo se deja en blanco, no aparecerá ningún encabezado. |
| Nota al pie | Texto adicional en letra pequeña debajo del título, p. ej., para referencias bibliográficas. |
| Leyenda | «sobre el gráfico», «debajo del gráfico» o «ocultar». En los gráficos circulares, la leyenda enumera los ejes (segmentos); en los demás tipos, las series. |

### Opciones de visualización por tipo

| Tipo | Campos | Descripción |
| --- | --- | --- |
| Radar | Líneas auxiliares en la red | Número de anillos auxiliares concéntricos. El valor predeterminado es 5. Es puramente estético, no modifica los valores. |
| Radar | Rellenar áreas | Rellena el área detrás de cada línea de serie con un color semitransparente. Desactivado por defecto. |
| Barras | Apilar | Dibuja las series unas encima de otras en lugar de una al lado de otra. Desactivado por defecto. |
| Barra | Orientación | «vertical» (categorías abajo) o «horizontal» (categorías a la izquierda). Por defecto: vertical. |
| Línea | Suavizar líneas | Redondea el trazado de la línea en lugar de trazarla recta entre los puntos de apoyo. Por defecto: desactivado. |
| Línea | Rellenar área | Rellena el área debajo de la línea con su color. Desactivado por defecto. |
| Línea | Mostrar puntos | Muestra un punto en cada punto de control. Activado por defecto. |
| Circular | Radio interior | Porcentaje del agujero en el gráfico circular. 0 da como resultado un círculo completo; un valor mayor (p. ej., 45), un anillo o una rosquilla. Predeterminado: 0. |
| Gráfico circular | Etiqueta de segmento | «Porcentaje», «Valor absoluto», «Ambos» o «Ocultar». Por defecto, «Porcentaje». |

## Escalado automático

**En el gráfico de radar**, los ejes no tienen una escala numérica visible, ya que
no es posible representarla de forma significativa cuando hay
varios ejes con unidades diferentes. Si no
se especifica lo contrario, cada eje comienza en **cero** y llega hasta
su valor máximo. La longitud de un rayo se comporta, por tanto,
como el propio valor: la mitad del recorrido hacia el exterior corresponde a la mitad de la cantidad.

Si en un eje aparecen valores negativos, este comienza por el menor de ellos —
de lo contrario, el punto quedaría fuera de la cuadrícula.

Quien desee resaltar más las diferencias entre las series, debe establecer
manualmente el mínimo y el máximo del eje en cuestión —por ejemplo, 400 y 600 en lugar de
0 y 600. Esto aumenta las distancias visibles, pero también hace que las pequeñas
diferencias, insignificantes en la práctica, parezcan grandes.

Un mínimo o máximo establecido manualmente también limita el trazado:
un valor fuera de estos límites se representa exactamente en el borde, en lugar de
sobresalir de la cuadrícula. El número que aparece en el punto de datos y en la tabla sigue siendo
el introducido; el límite solo modifica la imagen, nunca el valor. Así pues, quien
establezca un eje de 0 a 600 e introduzca 700, verá el punto en el extremo
más alejado y el 700 junto a él.

**En los gráficos de barras y de líneas**, ECharts dibuja automáticamente un eje de valores con
una escala visible; este se fija en cero y no se puede limitar manualmente
. **En el gráfico circular** no hay eje de valores: cada segmento muestra
su proporción respecto al total. Un valor negativo no supone allí un
problema de representación, sino un error en los datos: el gráfico muestra entonces una
nota sobre el eje afectado, en lugar de dibujar un gráfico circular
distorsionado.
