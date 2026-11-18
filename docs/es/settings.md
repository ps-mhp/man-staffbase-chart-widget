# Ajustes

Todos los ajustes se encuentran en el **Editor de gráficos**, que se abre automáticamente a pantalla completa al abrir los
ajustes del widget. En el cuadro de diálogo de Staffbase
que aparece detrás solo queda el campo **Gráfico** con la
; nunca se edita manualmente.

## El editor

En la parte superior se encuentra el encabezado, como en todos los widgets MAN: nombre y título a la izquierda, en el
centro la vista **Editor · Ordenador · Tableta · Móvil**, a la derecha
**Deshacer**, **Repetir**, **Ayuda**, **Cancelar** y
**Aplicar**. Junto a ello aparece lo que se ha modificado —por ejemplo, «Tipo de diagrama
modificado» o «Datos modificados»— o el motivo por el que aún no se puede
aplicar el estado.

Debajo hay dos áreas:

- **A la izquierda, la cuadrícula de datos** con una barra en la parte superior.
- **A la derecha, el panel «Gráfico»** con cuatro pestañas: **Datos**,
  **Diseño**, **Eje** y **Comportamiento**.

En las vistas de escritorio, tableta y móvil, la cuadrícula se sustituye por
la vista previa a ancho de dispositivo; el panel de la derecha permanece, de modo que cada
ajuste se aplica justo al lado.

«Aplicar» transfiere el estado al cuadro de diálogo de Staffbase; solo se
guarda de forma permanente al hacer clic en **Guardar** en Studio. Si no se realizan cambios,
«Aplicar» permanece desactivado.

| Tecla | Efecto |
| --- | --- |
| ⌘/Ctrl S | Aplicar |
| ⌘/Ctrl ↵ | Aplicar y cerrar |
| ⌘/Ctrl Z, ⇧⌘/Ctrl Z | Deshacer, Rehacer (fuera de los campos de texto) |
| F1 | Ayuda |
| Esc | Cerrar, con confirmación si hay cambios pendientes |

## Cuadrícula de datos

Cada **fila** es un **eje** (un indicador; en el gráfico circular, un segmento),
cada **columna** de la derecha es una **serie** (una variante; en versiones anteriores
se denominaba «serie»). En la cabecera de cada columna de serie aparecen un punto de color y un nombre.

| Columna | Descripción |
| --- | --- |
| N.º | Selecciona el eje. Hacer clic en cualquier campo de la fila tiene el mismo efecto. |
| Eje | Nombre del eje, tal y como aparece en el gráfico y en la tabla de datos. La tecla Intro genera un salto de línea, que también aparece en el gráfico. |
| Unidad | Se añade a cada número de este eje (punto de datos, información sobre herramientas, tabla), p. ej., «kWh». En los gráficos de barras y de líneas, el eje de valores común solo muestra la unidad si **todos** los ejes con valores tienen la misma unidad. |
| por fila | Los valores, con el formato alemán: coma antes de los decimales, punto entre los miles. |

En el gráfico circular, la cuadrícula muestra **solo la primera fila**; una nota
debajo indica que el resto de filas se guardan, pero no
se dibujan.

**Valores de Excel:** copia las celdas de Excel, selecciona un campo en la cuadrícula,
⌘ V (Ctrl V). El bloque se coloca a partir de ese campo; se añaden los ejes y filas
que falten. En el gráfico circular, solo rellena la única fila visible.

## Barra situada encima de la cuadrícula

| Elemento | Descripción |
| --- | --- |
| Eje 2 de 5 · Nombre | El eje seleccionado. |
| ↑ ↓ | Desplaza el eje seleccionado junto con sus valores. En el gráfico de radar, el orden determina la posición en el círculo; en el gráfico de barras, el orden en la línea de base. |
| Duplicar | Coloca una copia del eje, con sus valores y ajustes, justo detrás. |
| Eliminar | Elimina el eje junto con sus valores. Se puede deshacer con ⌘/Ctrl Z. |
| + Eje | Añade un eje vacío y coloca el cursor en su nombre. |
| + Fila | Añade una fila vacía. |
| Insertar desde Excel | Abre una barra a la derecha para importar una tabla completa (véase más abajo). |
| Cargar ejemplo | Sustituye los datos por un ejemplo del tipo seleccionado. Se mantienen la altura y la descarga. Se deshace con ⌘/Ctrl Z. |

## Insertar desde Excel

| Configuración | Descripción |
| --- | --- |
| Tabla | Incorpora una tabla copiada de Excel, PowerPoint o Word. La primera fila y la primera columna son encabezados. Reconoce la tabulación, el punto y coma y la coma como separadores de columnas. |
| ¿Cómo está orientada la tabla? | **Ejes en filas** (por defecto): un indicador por fila, una variante por columna, como en la cuadrícula. **Ejes en columnas**: al revés; la tabla se gira al importarla. |
| Importar tabla | Sustituye ejes, filas y valores. Los ejes y filas con el mismo nombre conservan la unidad, los límites, la dirección y el color. |

## Introducción sin datos

Mientras no se hayan creado ni ejes ni filas, la cuadrícula explica los
conceptos y ofrece dos botones: **«Cargar ejemplo»** rellena con un
ejemplo adecuado al tipo seleccionado (p. ej., en el radar, la comparación entre el MAN
eTGX y el Mercedes-Benz eActros 600; en el gráfico circular, una
), **«Crear tabla vacía»** crea ejes y series para
rellenarlas.

## Pestaña «Datos»

Las series aparecen como una lista; al hacer clic en una, se despliega.

| Configuración | Descripción |
| --- | --- |
| ← → | Mueve la fila. El orden determina el color de la paleta y la leyenda; en el gráfico circular, se dibuja la primera fila. |
| Eliminar | Elimina la fila junto con sus valores. |
| Nombre | Tal y como aparece en la leyenda (excepto en el gráfico circular), en la información sobre herramientas y en la tabla de datos. |
| Color | Sobrescribe el color de la paleta para esta fila; «Paleta» recupera su propio color. No está disponible en el gráfico circular, donde el color de los segmentos varía según el eje. |
| + Añadir fila | Añade una fila vacía y la despliega. |

## Pestaña «Diseño»

| Configuración | Descripción |
| --- | --- |
| Tipo | **Malla**, **Barra**, **línea** o **circular**. La frase que aparece debajo indica para qué sirve cada tipo. |
| Título | Encabezado sobre el gráfico. Vacío: sin encabezado. |
| Nota al pie | Texto adicional en letra pequeña, p. ej., para referencias bibliográficas. |
| Leyenda | **Arriba**, **Abajo** o **Ocultar**. En el gráfico circular, la leyenda enumera los ejes (segmentos); en los demás casos, las series. |
| Sección del tipo | Lo que solo es específico del tipo seleccionado; véase más abajo. |
| Altura en px | Altura del gráfico en la página, de 160 a 1200 píxeles; valor predeterminado: 420. La anchura siempre se ajusta a la columna. No se puede aplicar una altura fuera de estos límites. |

| Tipo | Configuración | Descripción |
| --- | --- | --- |
| Cuadrícula | Líneas auxiliares | Número de anillos concéntricos. Valor predeterminado: 5. Puramente estético. |
| Cuadrícula | Rellenar áreas | Rellena el área detrás de cada línea con un color semitransparente. Desactivado por defecto. |
| Barra | Dirección | **Vertical** (categorías abajo) o **Horizontal** (categorías a la izquierda). Valor predeterminado: vertical. |
| Barra | Apiladas | Filas una encima de otra en lugar de una al lado de otra. Valor predeterminado: desactivado. |
| Línea | Suavizada | Redondea el trazado, en lugar de trazar una línea recta entre los valores. Desactivado por defecto. |
| Línea | Rellenar área | Rellena el área debajo de cada línea. Desactivado por defecto. |
| Línea | Mostrar puntos | Marca cada valor. Activado por defecto. |
| Circular | Radio interior en % | 0 da como resultado un círculo completo; un valor mayor (p. ej., 45), un anillo. Predeterminado: 0. |
| Circular | Etiquetas de los segmentos | **Porcentaje**, **valor**, **ambos** o **ninguno**. Por defecto, porcentaje. |

Al cambiar de tipo no se pierden **datos**: el título, la nota al pie, la leyenda, los ejes y
las series se mantienen, al igual que la información de los ejes. Por el contrario, los **ajustes del
tipo**, en cambio, solo se aplican a él: un gráfico siempre lleva consigo un único conjunto
de ellos, el del tipo seleccionado en ese momento. Quien configure líneas de ayuda
en la red, cambie a barras, modifique algo allí y vuelva a cambiar, encontrará
de nuevo los valores predeterminados en la red.

## Pestaña «Eje»

Los ajustes detallados del eje seleccionado en la cuadrícula.

| Ajuste | Tipo | Descripción |
| --- | --- | --- |
| Denominación | todos | El nombre del eje, en varias líneas. |
| Unidad | todos | Igual que en la cuadrícula. |
| Decimales | todos | Cuántos decimales se muestran. En blanco: tantos como se hayan introducido. |
| Mínimo, Máximo | Cuadrícula | Límites del eje. En blanco: se deducen a partir de los valores (desde cero hasta el valor más grande). El máximo debe ser mayor que el mínimo; de lo contrario, no se puede aplicar la configuración. |
| Cuanto menor, mejor | Red | Invierte el eje: el valor más pequeño se sitúa en el extremo exterior. Para peso, consumo, tiempo de carga. |
| Color del segmento | Circular | Color del segmento de este eje; «Paleta» lo restablece. |

**Por qué el mínimo, el máximo y «Cuanto menor, mejor» solo aparecen en la red
:** Se definen por eje y, en un eje de valores común
—como el que utilizan los gráficos de barras y de líneas—, no se pueden representar. En el
gráfico circular no hay ningún eje. Los valores ocultos permanecen
guardados y vuelven a aplicarse en cuanto se vuelve a seleccionar el tipo.

## Pestaña «Comportamiento»

| Ajuste | Descripción |
| --- | --- |
| Permitir descarga | Muestra debajo del gráfico dos botones: «Como SVG» y «Como PNG». El archivo solo contiene el gráfico, no la página. Desactivado por defecto. |

Abajo aparece la versión del widget; quien informe de un error, la encontrará
aquí.

## Comprobación

«Aplicar» rechaza un estado que la página no podría mostrar tal cual.
El encabezado indica el motivo, la pestaña lleva una marca roja, el
eje afectado aparece resaltado en la cuadrícula y el campo indica qué hay que hacer.

| Mensaje | Causa |
| --- | --- |
| Eje «…»: máximo demasiado pequeño | En la red, el máximo no es mayor que el mínimo. |
| «…»: proporción negativa en el gráfico circular | Un valor de la primera fila es negativo; un gráfico circular solo muestra proporciones a partir de cero. |
| Altura: se permiten entre 160 y 1200 píxeles | La altura está fuera de los límites. |

## Gráficos existentes

Hasta la versión 0.3, **Altura** y **Permitir descarga** aparecían como campos independientes
en el cuadro de diálogo de Staffbase. Ahora estos campos están ocultos; sus valores siguen siendo válidos
hasta que se configure otra cosa en el editor. Al abrirlo,
el editor los adopta como valores iniciales: un gráfico existente tiene el mismo aspecto tras
abrirlo y aplicar los cambios que antes. Si la antigua casilla de selección no se
podía leer, la pestaña «Comportamiento» lo indica debajo del botón.

## Escalado automático

**En el gráfico de radar**, los ejes no tienen una escala numérica visible ��� No se puede representar de forma adecuada cuando
hay varios ejes con unidades diferentes. Si no
se especifica lo contrario, cada eje comienza en **cero** y llega hasta
su valor máximo. La longitud de un rayo se comporta, por tanto,
igual que el propio valor: la mitad del recorrido hacia el exterior es también la mitad de la cantidad.

Si en un eje hay valores negativos, este comienza por el más pequeño de ellos;
de lo contrario, el punto quedaría fuera de la malla.

Si se desea resaltar más las diferencias entre las series, se deben establecer
manualmente el mínimo y el máximo del eje en cuestión —por ejemplo, 400 y 600 en lugar de
0 y 600—. Esto aumenta las distancias visibles, pero también hace que las pequeñas
diferencias, insignificantes en la práctica, parezcan grandes.

Un mínimo o máximo establecido manualmente también limita el trazado:
un valor fuera de estos límites se representa exactamente en el borde, en lugar de
sobresalir de la cuadrícula. El número que aparece en el punto de datos y en la tabla sigue siendo
el introducido; el límite solo modifica la imagen, nunca el valor. Así pues, quien
establezca un eje de 0 a 600 e introduzca 700, verá el punto en el extremo
más alejado y el 700 junto a él.

**En los gráficos de barras y de líneas**, ECharts dibuja automáticamente un eje de valores con
una escala visible; este se fija en cero y no se puede limitar manualmente
. **En los gráficos circulares** no hay eje de valores: cada segmento muestra
su proporción respecto al total. Un valor negativo no supone allí ningún
problema de representación, sino un error de datos: el editor no permite
aceptarlo, y un gráfico más antiguo muestra en la página una indicación sobre
el eje afectado, en lugar de dibujar un gráfico circular erróneo.
