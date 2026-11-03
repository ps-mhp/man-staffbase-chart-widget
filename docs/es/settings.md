# Ajustes

En el cuadro de diálogo de configuración solo hay técnicamente dos campos: **Diagrama** y
**Altura en píxeles**. El campo «Diagrama» no se edita directamente; en su lugar,
se abre automáticamente el **editor de diagramas**, donde se encuentran el resto de
ajustes.

## Campos del cuadro de diálogo de configuración

| Ajuste | Descripción |
| --- | --- |
| Diagrama | Contiene la definición completa y codificada técnicamente del diagrama. Se edita exclusivamente a través del editor de diagramas, nunca a mano. |
| Altura en píxeles | Altura del diagrama en la página. Se admiten valores entre 160 y 1200 píxeles; el valor predeterminado es 420. El ancho siempre se ajusta a la columna. |
| Permitir descarga | Muestra dos botones debajo del gráfico para descargarlo como imagen. El archivo solo contiene el gráfico, no la página. Desactivado por defecto. |

## Tipo de gráfico

La selección situada en la parte superior del editor determina el tipo de gráfico. Actualmente solo
existe el **diagrama de red (radar / araña)**; la lista se amplía con cada nuevo
tipo compatible. Los ajustes específicos de cada tipo —en el caso del radar, por ejemplo, las
líneas de ayuda— solo aparecen mientras esté seleccionado el tipo correspondiente.

## Importar datos de una tabla

| Configuración | Descripción |
| --- | --- |
| Campo de inserción | Incorpora una tabla copiada de Excel, PowerPoint o Word. Reconoce la tabulación, el punto y coma y la coma como separadores de columnas. |
| ¿Cómo está organizada su tabla? | Establece la dirección de lectura. La configuración predeterminada es «una cifra por fila, una variante por columna», tal y como aparece la tabla en la cuadrícula inferior. La otra opción invierte el orden al importar. |
| Aplicar tabla | Sustituye ejes, series y valores. Los ejes y series con el mismo nombre conservan la unidad, la dirección del eje y el color. |

## Introducción sin datos

Mientras no se hayan creado ni ejes ni series, el editor explica los
conceptos y ofrece dos botones: **«Cargar ejemplo»** rellena una
comparación completa (MAN eTGX frente a Mercedes-Benz eActros 600), que
se puede sobrescribir; **«Crear tabla vacía»** establece tres ejes y dos
series para rellenar.

## Por eje (una fila en la cuadrícula)

| Configuración | Descripción |
| --- | --- |
| Eje | Nombre del eje, tal y como aparece en el gráfico y en la tabla de datos. Varias líneas: la tecla Intro genera un salto de línea que también aparece en el gráfico. |
| Unidad | Se añade a cada número de este eje (punto de datos, información sobre herramientas, tabla), p. ej., «kWh». |
| Dirección («cuanto menor, mejor») | Invierte el eje: el valor más pequeño queda entonces más hacia fuera. Para indicadores en los que un valor menor es mejor —peso, consumo, tiempo de carga—. |
| Decimales | Solo si están activados los **ajustes precisos por eje**: Número de decimales que se muestran. Si no se especifica, se utiliza el número de decimales introducido realmente. |
| Mínimo | Solo si están activados los ajustes precisos: límite inferior del eje. Si no se especifica, el eje comienza en cero; en el caso de valores negativos, en el menor de ellos. |
| Máximo | Solo si están activados los ajustes de precisión: límite superior del eje. Si no se especifica, se utiliza el valor más grande que aparece en ese eje. |
| ↑ ↓ ✕ | Desplaza el eje en círculo o lo elimina junto con sus valores. |

## Por serie (una columna de la cuadrícula)

| Ajuste | Descripción |
| --- | --- |
| Nombre de la serie | Nombre tal y como aparece en la leyenda, la información sobre herramientas y la tabla de datos. |
| Color | Sobrescribe el color asignado automáticamente de la paleta MAN para esta serie en concreto. |
| ← → ✕ | Desplaza la serie —el orden determina el color de la paleta y el orden en la leyenda— o la elimina. |

## Título, leyenda y presentación

| Configuración | Descripción |
| --- | --- |
| Título | Encabezado situado encima del gráfico. Si el campo se deja en blanco, no aparecerá ningún encabezado. |
| Nota al pie | Texto adicional en letra pequeña debajo del título, p. ej., para citar fuentes. |
| Leyenda | «sobre el gráfico», «debajo del gráfico» o «ocultar». |
| Líneas auxiliares en la red | Solo en el gráfico de radar: número de anillos auxiliares concéntricos. El valor predeterminado es 5. Es meramente visual, no modifica ningún valor. |
| Rellenar áreas | Solo en el gráfico de radar: rellena el área situada detrás de cada línea de la serie con un color semitransparente. Desactivado por defecto. |

## Escalado automático

Los ejes no muestran una escala numérica visible; esto no tiene sentido cuando hay varios ejes
con unidades diferentes. Si no se especifica lo contrario,
cada eje comienza en **cero** y llega hasta su mayor
valor posible. La longitud de un rayo se comporta, por tanto, como el propio valor:
la mitad del recorrido hacia el exterior corresponde también a la mitad de la cantidad.

Si en un eje hay valores negativos, este comienza por el más pequeño de ellos —
de lo contrario, el punto quedaría fuera de la cuadrícula.

Quien desee resaltar más las diferencias entre las series, debe establecer
manualmente el mínimo y el máximo del eje en cuestión — p. ej., 400 y 600 en lugar de
0 y 600. Esto aumenta las distancias visibles, pero también hace que las pequeñas
diferencias, insignificantes en la práctica, parezcan grandes.

Un mínimo o máximo establecido manualmente también limita el trazado:
un valor fuera de estos límites se representa exactamente en el borde, en lugar de
sobresalir de la cuadrícula. El número que aparece en el punto de datos y en la tabla sigue siendo
el introducido; el límite solo modifica la imagen, nunca el valor. Así pues, quien
establezca un eje de 0 a 600 e introduzca 700, verá el punto en el
extremo y el 700 junto a él.
