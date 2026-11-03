# Paso a paso

Tomando como ejemplo una comparación de vehículos (MAN eTGX frente a un competidor) a través de
seis indicadores con unidades diferentes.

## Configurar el gráfico

1. Coloca el widget **Gráfico** en la página. Se abrirán los ajustes del widget
   y, en ellos, aparecerá inmediatamente el **editor de gráficos** sobre el
   propio campo.
2. Selecciona y copia los datos de comparación de Excel: en la **primera fila**, las
   categorías (ejes, p. ej., «Autonomía [km]», «Tiempo de carga [min]»); en la **primera
   **las series** (p. ej., los nombres de los vehículos). En el editor, pégalos en el campo
   **«Insertar tabla»** y haz clic en **«Aplicar tabla»**.
   Los valores aparecerán entonces en la cuadrícula de arriba y en la vista previa.
3. Para cada categoría (columna de ejes en la cuadrícula), establece la **unidad** y
   los **decimales**; esto determina cómo aparecerá el número en los
   puntos de datos, en la información sobre herramientas y en la tabla, p. ej., «125,5 kWh».
4. En las categorías en las que **un valor menor es mejor** —peso,
   consumo, tiempo de carga—, activa el conmutador **«Menor es mejor»** del eje
  . Sin este conmutador, el valor peor (mayor) se situaría
   más hacia el exterior del eje, y la imagen transmitiría exactamente lo contrario de
   lo que se pretende: en una comparación, siempre debe aplicarse «más hacia el exterior = mejor»
  .
5. Introduce el **título** y la **nota al pie**, activa o desactiva la leyenda y elige su
   posición (arriba/abajo).
6. Ajusta la **altura** del gráfico (véase [Configuración](settings.md)).
7. Si quieres que el gráfico se pueda descargar como imagen, activa el botón
   **«Permitir descarga»** (véase [Configuración](settings.md)).
   Debajo del gráfico aparecerán entonces dos botones: «Como SVG» y
   «Como PNG».
8. Haz clic en **Guardar** y, a continuación, en **Cerrar**. Solo al hacer clic en «Guardar» se transfieren
   los datos al widget; mientras junto a los botones «Cambios no guardados»,
   aún no se ha aplicado nada.

## Modificar posteriormente

1. Vuelve a abrir la configuración del widget: el editor de gráficos volverá a aparecer
   con el estado guardado por última vez.
2. Sobrescribe los valores directamente en la cuadrícula o vuelve a
   insertar una tabla actualizada. Las categorías y series con el mismo nombre conservan sus
   unidades, orientaciones de los ejes y colores ya establecidos; solo se
   sustituyen los valores.
3. Guarda y cierra como se ha indicado anteriormente.

## Si algo no funciona

1. Si en lugar del gráfico aparece un mensaje de aviso, en él ya se indica la
   causa; consulta las [Preguntas frecuentes](faq.md) para ver todos los mensajes posibles.
2. Si no se aplica la tabla insertada, comprueba si la primera
   fila contiene las categorías y la primera columna los nombres de las series.
3. Si el gráfico muestra cifras erróneas tras la inserción (por ejemplo, desplazadas por un factor
   1000), suele deberse al separador de miles en
   números procedentes de una fuente no alemana; consulta las indicaciones sobre números en
   [Configuración](settings.md) y [Preguntas frecuentes](faq.md).
