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
| Permitir descarga | Muestra dos botones debajo del diagrama para descargarlo como imagen. El archivo solo contiene el diagrama, no la página. Desactivado por defecto. |

## Encabezado del editor de diagramas

| Configuración | Descripción |
| --- | --- |
| Título | Encabezado sobre el gráfico. Si el campo se deja en blanco, no aparecerá ningún encabezado. |
| Nota al pie | Texto adicional en letra pequeña debajo del título, p. ej., para referencias bibliográficas. |
| Mostrar leyenda | Muestra u oculta la leyenda con los nombres de las series. |
| Posición de la leyenda | «arriba» o «abajo»: dónde se sitúa la leyenda con respecto al gráfico. |
| Número de anillos | Solo en el gráfico de radar: número de anillos concéntricos auxiliares en la red. El valor predeterminado es 5. Es meramente estético, no modifica los valores. |
| Rellenar área | Solo en el gráfico de radar: rellena el área detrás de cada línea de serie con un color semitransparente. Desactivado por defecto. |

## Por categoría (eje)

| Ajuste | Descripción |
| --- | --- |
| Etiqueta | Nombre del eje, tal y como aparece en el gráfico y en la tabla de datos. |
| Unidad | Se añade a cada número de este eje (punto de datos, información sobre herramientas, tabla), p. ej., «kWh». |
| Decimales | Número de decimales que se muestran. Si no se especifica, se utiliza el número de decimales introducido realmente. |
| Mínimo | Límite inferior del eje. Si no se especifica, se utiliza el valor más pequeño que aparece en este eje. |
| Máximo | Límite superior del eje. Si no se especifica, se utiliza el valor más alto que aparezca en este eje. |
| Cuanto menor, mejor | Invierte el eje: el valor más pequeño queda entonces más alejado. Para indicadores en los que un valor menor es mejor —peso, consumo, tiempo de carga—. |

## Por serie

| Configuración | Descripción |
| --- | --- |
| Nombre de la serie | Nombre tal y como aparece en la leyenda, la información sobre herramientas y la tabla de datos. |
| Color | Anula el color asignado automáticamente de la paleta MAN para esta serie en concreto. |

## Escalado automático

Los ejes no muestran una escala numérica visible; esto no tiene sentido cuando hay varios ejes
con unidades diferentes. Si no se establecen valores mínimos
y máximos, cada eje se extiende automáticamente entre el
valor más pequeño y el más grande que aparece en él. Esto hace que las diferencias
entre las series sean claramente visibles, pero también puede hacer que pequeñas diferencias, en la práctica
insignificantes, parezcan grandes a simple vista. Si no se desea esto,
se deben establecer manualmente el mínimo y el máximo del eje en cuestión —por ejemplo, 0 y 600
para un rango, en lugar de establecerlo entre el valor más pequeño y el más grande
que aparezca.

Un mínimo o máximo establecido manualmente también limita el trazado:
un valor fuera de estos límites se representa exactamente en el borde, en lugar de
sobresalir de la cuadrícula. El número que aparece en el punto de datos y en la tabla sigue siendo
el introducido: el límite solo modifica la imagen, nunca el valor. Así pues, quien
establezca un eje de 0 a 600 e introduzca 700, verá el punto en el extremo
más alejado y el 700 junto a él.
