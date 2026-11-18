# Paso a paso

Tomando como ejemplo una comparación de vehículos (MAN eTGX frente a un competidor) a través de
seis indicadores con diferentes unidades en forma de diagrama de red; los
pasos se aplican, por analogía, a los otros tres tipos.

## Configurar el diagrama

1. Coloca el widget **Diagrama** en la página. Se abrirán los ajustes del widget
   y, en ellos, aparecerá inmediatamente el **editor de diagramas** a pantalla completa. A la izquierda
   se encuentra la cuadrícula de datos y, a la derecha, el panel **«Diagrama»** con las pestañas
   Datos, Diseño, Eje y Comportamiento. La opción **Ayuda** de la parte superior abre las mismas
   explicaciones que esta documentación.
2. En el panel, en **Diseño**, selecciona el **Tipo**: **Tabla**, **Barra**,
   **Línea** o **Circular**; la frase que aparece debajo indica para qué sirve cada tipo
  . Si se cambia más adelante, no se pierden datos: los ejes, las series y el título
   y la leyenda se conservan; los datos de los ejes (p. ej., mínimo y máximo
   en la tabla) simplemente se ocultan. Sin embargo, la **configuración del tipo** solo se aplica
   a este; véase [Configuración](settings.md).
3. Mientras aún no haya datos, la cuadrícula ofrece dos opciones:
   **«Cargar ejemplo»** rellena un ejemplo adecuado al tipo, que se puede
   sobrescribir; **«Crear tabla vacía»** crea los ejes y las filas para
   rellenarlas.
4. Sin embargo, la opción recomendada es **«Insertar desde Excel»**, situada en la esquina superior derecha,
   encima de la cuadrícula: selecciona la tabla comparativa en Excel, PowerPoint o Word,
   cópiala y pégala en el campo de la barra. Debajo,
   especificar **cómo está organizada la tabla**; la configuración predeterminada es **ejes en filas**,
   es decir, tal y como aparece la tabla en la cuadrícula. A continuación, **«Aplicar tabla»**.
   Este paso es el mismo para los cuatro tipos.
5. En la cuadrícula, **cada fila es un eje** y **cada columna de la derecha es una
   serie**. En el gráfico circular, la cuadrícula muestra **solo la primera serie**;
   una nota debajo indica que el resto de series se guardan, pero
   no se dibujan.
6. Sobrescribe valores individuales directamente en la cuadrícula. También se pueden pegar bloques desde Excel
: copia las celdas, selecciona un campo en la cuadrícula y pulsa ⌘ V (Ctrl+V).
7. Introduce la **unidad** para cada eje (p. ej., «kWh»). Un **salto de línea en el
   nombre del eje** —con la tecla Intro— se aplica al gráfico y
   permite que las etiquetas largas se mantengan legibles.
8. Al hacer clic en una fila se selecciona el eje. La barra situada encima lo identifica
   («Eje 2 de 6 · Peso de la batería») y ofrece las opciones **hacia arriba**, **hacia
   abajo**, **duplicar** y **eliminar**. En el panel bajo **Eje**
   se encuentran sus ajustes avanzados: nombre, unidad, decimales,
   para la red **Mínimo**, **Máximo** y **«Cuanto menor, mejor»**, y para el
   gráfico circular, el **color del segmento**.
9. Solo en el caso de la red: en los ejes en los que un **valor menor es mejor** —
  peso, consumo, tiempo de carga—, activa **«Cuanto menor, mejor»**.
   Sin esta opción, el valor peor (mayor) quedaría más alejado, y la imagen
   transmitiría lo contrario de lo que se pretende.
10. En **Datos**, asigna un nombre a las series; si es necesario, establece un **color** propio
    y cambia su orden —esto determina el color de la paleta y
    la leyenda—.
11. En **Diseño**, introduce el título y la nota al pie; coloca la **leyenda** encima
    o debajo del gráfico, u ocultarla, y seleccionar la configuración del
    tipo: en la red, **líneas de ayuda** y **rellenar áreas**; en las
    barras, **dirección** y **apiladas**; en la línea, **suavizada**,
    **relleno de área** y **mostrar puntos**; en el gráfico circular, **radio interior** y
    **etiquetas de los segmentos**. En la parte inferior, la **altura en píxeles** (de 160 a
    1200).
12. Si quieres que el gráfico se pueda descargar como imagen, en
    **Comportamiento**, activa **«Permitir descarga»**. Debajo del gráfico
    aparecerán entonces dos botones: «Como SVG» y «Como PNG».
13. En la parte superior, selecciona **Ordenador**, **Tableta** o **Móvil**: la
    vista previa muestra el gráfico tal y como aparece en la página, y el panel
    de la derecha permanece junto a él.
14. **Aplicar** —o ⌘/Ctrl ↵ para aplicar y cerrar—. A continuación, en
    Studio, **Guardar**; solo así se guarda la página.

## Modificar posteriormente

1. Vuelve a abrir la configuración del widget: el editor aparecerá con el
   último estado guardado, incluido el tipo.
2. Sobrescribe los valores directamente en la cuadrícula o vuelve a aplicar una tabla actualizada mediante
   «Insertar desde Excel». Los ejes y series con el mismo nombre
   conservan las unidades, los límites, la dirección y los colores; solo se sustituyen
   los valores.
3. Cada paso se puede deshacer con ⌘/Ctrl Z; **Deshacer** descarta
   todo lo realizado desde la última aplicación.
4. Aplica los cambios y guárdalos en Studio como se ha indicado anteriormente.

## Si algo no funciona

1. Si en la página aparece un mensaje de aviso en lugar del gráfico, en él
   ya se indica la causa; consulta las [Preguntas frecuentes](faq.md) para ver todos los mensajes posibles.
2. Si no se puede ejecutar «Aplicar», el encabezado indica el motivo y la
  pestaña afectada aparece marcada en rojo —por ejemplo, «Eje «…»: máximo demasiado
  pequeño». Consulta «Comprobación» en [Configuración](settings.md).
3. Si no se puede aplicar la tabla insertada, comprueba si tiene
   encabezados en la primera fila y en la primera columna. Si
   los ejes y las filas están invertidos en la cuadrícula, se ha seleccionado una dirección de lectura
   incorrecta: invierte el orden y vuelve a aplicar.
4. Si, tras insertarlo, el gráfico muestra cifras erróneas (por ejemplo, con un desfase de
   un factor de 1000), suele deberse al separador de miles en
   cifras procedentes de una fuente no alemana; véase [Preguntas frecuentes](faq.md).
5. En el gráfico circular, el área permanece vacía aunque se hayan introducido
   valores: en ese caso, todos los valores de la primera fila son cero o faltan.
