# Preguntas frecuentes

Cada mensaje que el diagrama pueda mostrar en lugar del gráfico, como una pregunta —
con el texto exacto, para que se pueda encontrar mediante la búsqueda.

**Pregunta:** Veo el mensaje «Aún no se ha configurado ningún diagrama. Abra
la configuración del componente».

Respuesta: Aún no se ha guardado ninguna configuración para este componente.
Abra la configuración del widget, rellene el editor de diagramas y guarde los cambios.

**Pregunta:** Veo el mensaje «No se ha podido leer el diagrama.
Vuelva a configurarlo en los ajustes».

Respuesta: Los datos guardados están dañados o se han modificado manualmente.
Abra los ajustes del widget y vuelva a configurar el diagrama en el editor,
si es necesario, mediante una tabla recién insertada.

**Pregunta:** Me aparece el mensaje «El tipo de gráfico «…» no es compatible con esta versión del
módulo. Actualice el módulo.» (o, sin
mencionar el nombre del tipo: «El tipo de gráfico configurado no es compatible con esta versión del
módulo. Actualice el módulo.»)

Respuesta: El gráfico se ha configurado con una versión más reciente del módulo
que reconoce un tipo de gráfico que esta versión aún no
admite. Actualice el módulo a la última versión.

**Pregunta:** Me aparece el mensaje «Aún no hay datos en el diagrama. Cree
ejes y series en la configuración».

Respuesta: No se han creado ni ejes ni series en el editor de diagramas. En el
editor, inserte una tabla o utilice uno de los dos botones «Cargar ejemplo»
o «Crear tabla vacía».

**Pregunta:** Tras la inserción, mis indicadores aparecen como series y mis
variantes como ejes; todo está al revés.

Respuesta: Debajo del campo de inserción se había seleccionado la dirección de lectura incorrecta. Cambie a la
otra opción en «¿Cómo está orientada su tabla?» y vuelva a hacer clic en
«Aplicar tabla».

**Pregunta:** El texto de mi eje es tan largo que comprime el gráfico.

Respuesta: En el campo del eje, pulsa la tecla Intro en el lugar deseado.
El salto de línea se aplicará al gráfico.

**Pregunta:** Me aparece el mensaje «No se ha podido cargar el gráfico.
Por favor, actualice la página».

Respuesta: No se ha podido volver a cargar la biblioteca de gráficos, normalmente debido a
una conexión a Internet interrumpida. Actualice la página; si el problema
persiste, compruebe la conexión de red.

**Pregunta:** ¿Por qué mi diagrama está vacío aunque se hayan introducido datos?

Respuesta: Normalmente, el bloque se encuentra en una columna muy estrecha o en un
elemento contraído, por lo que el contenedor tiene una altura de 0. El gráfico
permanece entonces vacío de forma permanente, ya que no dispone de espacio para dibujarse. Mueve
el bloque a una columna más ancha o despliega el elemento.

**Pregunta:** ¿Por qué veo una gran
diferencia en el gráfico entre dos valores casi iguales?

Respuesta: Si no se establece un máximo, cada eje se extiende hasta el valor más alto que
aparece en él. Si hay dos valores muy próximos entre sí, pero muy alejados de cero,
la parte superior del eje ocupa todo el espacio, por lo que la diferencia
parece mayor de lo que realmente es. Solución: En el editor de gráficos, establece manualmente
el mínimo y el máximo para el eje en cuestión.

**Pregunta:** ¿Por qué el valor peor se encuentra más alejado?

Respuesta: En este eje falta el botón «Cuanto menor, mejor». Debe activarse en
todos los indicadores en los que un valor menor suponga un mejor
resultado —por ejemplo, peso, consumo o tiempo de carga—. Actívalo en el editor de gráficos en
el eje correspondiente.

**Pregunta:** No veo ningún botón para descargar debajo del gráfico.

Respuesta: O bien la opción «Permitir descarga» no está
activada en la configuración, o bien el gráfico aún no se ha completado: los
botones solo aparecen cuando hay un gráfico disponible para descargar.

**Pregunta:** Al hacer clic en «Como SVG» o «Como PNG» aparece el mensaje «La exportación ha
fallado. Inténtalo de nuevo».

Respuesta: La exportación no ha podido encontrar el gráfico dibujado —normalmente porque
se está recargando en ese momento—. Espera un momento y vuelve a hacer clic; si el problema
persiste, actualiza la página.

**Pregunta:** ¿Puedo mostrar más de seis series?

Respuesta: Sí. La paleta de colores de MAN tiene seis colores; a partir de la séptima serie,
los colores se repiten. No obstante, las series siguen siendo claramente
distinguibles, ya que cada punto de datos lleva su valor como etiqueta y
el nombre y los valores de cada serie aparecen en la información sobre herramientas y en la leyenda.

**Pregunta:** ¿Qué ocurre con mi gráfico cuando se realiza la
traducción automática de la página?

Respuesta: Se traducen el título, la nota al pie, las etiquetas de los ejes y
los nombres de las series. Los números, las unidades, los límites de los ejes, los colores y el resto de
ajustes se mantienen sin cambios.

**Pregunta:** Un número insertado de repente es 1000 veces mayor o
menor de lo que debería.

Respuesta: El editor de gráficos interpreta los números según la convención alemana: el punto se considera
separador de miles y la coma, separador decimal. Por lo tanto, `1.234` se convierte en
`1234` y no en `1,234`. Si se inserta una tabla con el formato inglés
(punto como separador decimal), hay que ajustar los números afectados al
adaptar al formato alemán; de lo contrario, por ejemplo, «1.234» (mil)
se interpretará como «1,234» (uno coma dos tres cuatro). Si en un número aparecen tanto
el punto como la coma, independientemente del formato, el último
carácter se considera el separador decimal: tanto `1.234,5` como `1,234.5` dan como resultado
`1234,5`.
