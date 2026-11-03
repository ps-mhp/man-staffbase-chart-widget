# Paso a paso

Tomando como ejemplo una comparación de vehículos (MAN eTGX frente a un competidor) a través de
seis indicadores con unidades diferentes.

## Configurar el diagrama

1. Coloca el widget **Diagrama** en la página. Se abrirán los ajustes del widget
   y, en ellos, aparecerá inmediatamente el **editor de diagramas** sobre el
   propio campo.
2. En la parte superior aparece el **tipo de gráfico**. Por el momento, solo hay «Gráfico de red
   (radar / araña)»; el texto que hay debajo indica para qué está pensado ese tipo.
3. Mientras no haya datos, la sección **«Ejes y
   series»** ofrece dos opciones: **«Cargar ejemplo»** rellena la
   comparación ya preparada entre el MAN eTGX y el Mercedes-Benz eActros 600, que simplemente
   se puede sobrescribir, y **«Crear tabla vacía»** propone tres ejes y dos
   series para rellenar.
4. Sin embargo, la opción recomendada es **«Importar datos desde una tabla»**, situada en la
   parte superior: selecciona la tabla comparativa en Excel, PowerPoint o Word,
   cópiala y pégala en el campo. Debajo, especifica **cómo está organizada la tabla
  **: la configuración predeterminada es «un indicador por fila, una
  variante por columna», es decir, tal y como aparece la tabla en el editor que hay debajo.
  A continuación, haz clic en **«Importar tabla»**.
5. En la cuadrícula, **cada fila es un eje** y **cada columna de la derecha es una
   serie**. En la parte superior de cada columna de serie aparecen el nombre, el color y las flechas para
   reordenar; al final de cada fila de eje, las flechas y la cruz correspondientes a ese
   eje.
6. Introduce la **unidad** para cada eje (p. ej., «kWh»). Un **salto de línea en el
   nombre del eje** —con la tecla Intro— se aplica en el gráfico y
   permite que las etiquetas largas sean legibles.
7. En los ejes en los que un **valor menor es mejor** —peso,
   consumo, tiempo de carga—, activa en la columna **Dirección** el conmutador
   **«menor es mejor»**. Sin él, el valor peor
   (mayor) quedaría más hacia el exterior, y la imagen diría exactamente lo contrario de
   lo que se quiere decir: en una comparación, siempre debe aplicarse «más hacia el exterior =
   mejor».
8. Los **decimales**, el **mínimo** y el **máximo** de cada eje se configuran tras
   el botón **«Ajustes precisos por eje»**. En el caso normal no son necesarios;
   si están en blanco, significa que «se deducen de los valores».
9. En **«Título, leyenda y presentación»**, introduce el título y la nota al pie,
   coloca o oculta la **leyenda** y, en el diagrama de red, configura las
   **líneas auxiliares en la red** y el **relleno de áreas**.
10. La **vista previa** de la derecha muestra en todo momento cómo se ve el diagrama en la página
    y se mantiene fija al desplazarse.
11. Ajusta la **altura** del diagrama (véase [Configuración](settings.md)).
12. Si quieres que el diagrama se pueda descargar como imagen, activa el botón
    **«Permitir descarga»** (véase [Configuración](settings.md)).
    Debajo del diagrama aparecerán entonces dos botones: «Como SVG» y
    «Como PNG».
13. Haz clic en **Guardar** y, a continuación, en **Cerrar**. Solo al hacer clic en «Guardar» se transfieren
    los datos al widget; mientras aparezca junto a los botones «Cambios no guardados»,
    no se habrá aplicado ningún cambio.

## Modificar posteriormente

1. Vuelve a abrir la configuración del widget: el editor de gráficos aparecerá
   de nuevo con el estado guardado por última vez.
2. Sobrescribe los valores directamente en la cuadrícula o vuelve a
   insertar una tabla actualizada. Los ejes y series con el mismo nombre conservan sus
   unidades, orientaciones y colores ya establecidos; solo se
   sustituyen los valores.
3. Guarda y cierra como se ha indicado anteriormente.

## Si algo no funciona

1. Si en lugar del gráfico aparece un mensaje de aviso, en él ya se indica la
   causa; consulta las [Preguntas frecuentes](faq.md) para ver todas las posibles explicaciones.
2. Si no se puede aplicar la tabla insertada, comprueba si tiene
   encabezados en la primera fila y en la primera columna. Si
   los ejes y las series aparecen invertidos en la cuadrícula, es que la dirección de lectura debajo del
   campo de inserción se ha seleccionado incorrectamente; cámbiala y vuelve a aplicar los cambios.
3. Si, tras la inserción, el gráfico muestra cifras erróneas (por ejemplo, desplazadas por un factor de
   1000), suele deberse al separador de miles en
   números procedentes de una fuente no alemana; consulta las indicaciones sobre números en
   [Configuración](settings.md) y [Preguntas frecuentes](faq.md).
