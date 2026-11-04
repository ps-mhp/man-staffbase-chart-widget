# Paso a paso

Tomando como ejemplo una comparación de vehículos (MAN eTGX frente a un competidor) a través de
seis indicadores con diferentes unidades en forma de diagrama de red; los
pasos se aplican, por analogía, a los otros tres tipos.

## Configurar el diagrama

1. Coloca el widget **Diagrama** en la página. Se abrirán los ajustes del widget
   y, en ellos, aparecerá inmediatamente el **editor de diagramas** sobre el
   campo propiamente dicho. En la parte superior hay una barra de control con **Guardar**,
   **Ayuda** (abre un panel deslizante con las mismas explicaciones que en esta
   documentación) y **Cerrar**; permanece fija al desplazarse, incluso
   en una tabla de datos extensa.
2. En la parte superior del editor aparece el **tipo de gráfico**: **gráfico de red (radar /
   araña)**, **gráfico de barras (columnas)**, **gráfico de líneas (tendencia)** o
   **gráfico circular (pastel / anillo)**; el texto que aparece debajo indica para qué
   está pensado el tipo seleccionado. Si se cambia de tipo posteriormente, no se pierden
   datos: los ejes, las series, el título y la leyenda se conservan, y también la
   indicaciones de los ejes (p. ej., mínimo/máximo en el radar) solo
   se ocultan hasta que se vuelve a seleccionar ese tipo. Sin embargo,
   **los ajustes de visualización** del tipo anterior se pierden;
   más información al respecto en «Ajustes».
3. Mientras aún no haya datos, la sección **«Ejes y
   series»** ofrece dos opciones: **«Cargar ejemplo»** rellena un ejemplo adecuado para el
   tipo seleccionado, que se puede sobrescribir fácilmente, y
   **«Crear tabla vacía»** crea los ejes y las series para rellenarlos.
4. Sin embargo, la opción recomendada es **«Importar datos desde una tabla»**,
   arriba: selecciona la tabla comparativa en Excel, PowerPoint o Word,
   cópiala y pégala en el campo. A continuación, indica **cómo está organizada la tabla
  ** — la opción predeterminada es «un indicador por fila, una
   variante», es decir, tal y como aparece la tabla en el editor que hay debajo.
   A continuación, haz clic en **«Importar tabla»**. Este paso es el mismo para los
   cuatro tipos.
5. En la cuadrícula, **cada fila es un eje** y **cada columna de la derecha es una
   serie**; en el gráfico circular, la cuadrícula muestra **solo la primera
   columna de serie**; una nota debajo aclara que el resto de series
   permanecen guardadas, pero no se dibujan, para que no parezca que
   se han perdido datos. En la parte superior de cada columna de serie aparecen el nombre, el color y
   las flechas para reordenar; al final de cada fila de eje, las flechas y la
   cruz correspondientes a ese eje.
6. Introduce la **unidad** para cada eje (p. ej., «kWh»). Un **salto de línea en el
   nombre del eje** —con la tecla Intro— se aplica en el gráfico y
   permite que las etiquetas largas sean legibles. En el gráfico circular se puede
   establecer además un **color de segmento** propio para cada eje.
7. Solo en el diagrama de red: en los ejes en los que un **valor menor
   es mejor** —peso, consumo, tiempo de carga—, en la columna **Dirección**
   activa el conmutador **«menor es mejor»**. Sin él, el
   valor peor (mayor) quedaría más hacia fuera, y la imagen diría exactamente lo
   contrario de lo que se quiere decir.
8. Los **decimales** por eje se configuran tras el botón
   **«Ajustes precisos por eje»**; **Mínimo** y **Máximo** allí
   solo aparecen en el diagrama de red, porque las barras y la línea trazan un eje de valores común,
   calculado por ECharts. En el caso normal no son necesarios;
   si están vacíos, significa «derivado de los valores».
9. En **«Título, leyenda y representación»**, introduce el título y la nota al pie,
   coloca o oculta la **leyenda** (en los gráficos circulares enumera los
   ejes; en los demás, las series) y configura las opciones de visualización adecuadas para cada tipo
   : en el gráfico de radar, **líneas auxiliares en la cuadrícula** y **rellenar áreas**;
   en el de barras, **apilar** y **orientación** (vertical/horizontal); en el de líneas,
   **suavizar líneas**, **rellenar área** y **mostrar puntos**; en el gráfico circular,
   **radio interior** (0 = círculo completo, mayor = anillo) y
   **etiqueta de segmento** (porcentaje, valor absoluto, ambos o desactivado).
10. La **vista previa** muestra en todo momento cómo se ve el diagrama en la página
    y se mantiene fija al desplazarse. Si el cuadro de diálogo es lo suficientemente ancho
    (a partir de unos 900 píxeles), se sitúa junto al campo de entrada; por debajo de esa anchura, se desplaza
    por debajo de la cuadrícula, y por debajo de unos 700 píxeles, la cuadrícula se convierte
    en una sucesión de tarjetas, una por cada eje. El cuadro de diálogo nunca se desplaza
    horizontalmente.
11. Ajusta la **altura** del gráfico (consulta [Configuración](settings.md)).
12. Si quieres que el gráfico se pueda descargar como imagen, activa el botón
    **«Permitir descarga»** (véase [Configuración](settings.md)).
    A continuación, aparecerán dos botones debajo del gráfico: «Como SVG» y
    «Como PNG»; el procedimiento es el mismo para los cuatro tipos.
13. Haz clic en **Guardar** y, a continuación, en **Cerrar**. Solo al hacer clic en «Guardar» se transfieren
    los datos al widget; mientras aparezca junto a los botones «Cambios no guardados»,
    no se habrá aplicado ningún cambio.

## Modificar posteriormente

1. Vuelve a abrir la configuración del widget: el editor de gráficos volverá a aparecer
   con el estado guardado por última vez, incluido el tipo de gráfico.
2. Sobrescribe los valores directamente en la cuadrícula o vuelve a
   insertar una tabla actualizada. Los ejes y series con el mismo nombre conservan sus
   unidades, orientaciones y colores ya establecidos; solo se
   sustituyen los valores.
3. Guarda y cierra como se ha indicado anteriormente.

## Si algo no funciona

1. Si en lugar del gráfico aparece un mensaje de aviso, en él ya se indica la
   causa; consulta las [preguntas frecuentes](faq.md) para ver todos los mensajes posibles.
2. Si no se puede aplicar la tabla insertada, comprueba si tiene
   encabezados en la primera fila y en la primera columna. Si
   los ejes y las series aparecen invertidos en la cuadrícula, es que se ha seleccionado incorrectamente la dirección de lectura debajo del
   campo de inserción; cámbiala y vuelve a aplicar.
3. Si el gráfico muestra cifras erróneas tras la inserción (por ejemplo, con un desfase de
   un factor de 1000), suele deberse al separador de miles en
   números procedentes de una fuente no alemana; consulta las indicaciones sobre números en
   [Configuración](settings.md) y [Preguntas frecuentes](faq.md).
4. En el gráfico circular, el área permanece vacía aunque se hayan introducido valores
   : o bien todos los valores de la primera serie son cero o
   faltan (`null`), o bien al menos un valor es negativo; en este caso,
   el gráfico muestra un mensaje propio con el nombre del eje afectado
   en lugar de un gráfico circular erróneo.
