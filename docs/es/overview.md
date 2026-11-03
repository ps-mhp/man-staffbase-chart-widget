# Gráfico

El widget de gráficos representa los indicadores en forma de **gráfico radial o de red**: varios
ejes se extienden en forma de estrella desde un punto central, y cada serie —por
ejemplo, un vehículo en comparación— conecta sus valores en estos ejes para
formar un área. De este modo, se pueden comparar de un
solo vistazo varios indicadores de varias series, incluso si se miden en unidades muy diferentes
—kilómetros, toneladas, minutos, kilovatios—.

El diagrama se configura mediante un editor propio que se abre directamente en
la configuración del widget. Una tabla copiada de Excel se puede
importar allí con un solo clic; consulta [Paso a paso](usage.md).

Se prevén otros tipos de gráficos (por ejemplo, gráficos de barras o de líneas) para futuras
versiones, pero **aún no están disponibles**; actualmente solo se puede
seleccionar el gráfico radial o de red.

## Lo que ven los lectores

- El propio gráfico, con tantos ejes y series como se desee.
- Los valores aparecen directamente en los puntos de datos; además, al
  pasar el cursor por encima de un punto, aparece una información sobrevolada con todos los valores de la serie.
- Una leyenda encima o debajo del gráfico, según la configuración.
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
doble resolución.

## Traducción

El gráfico se incluye en la traducción automática de la página. Se traducen
el título, la nota al pie, las etiquetas de los ejes y los nombres de las series —precisamente los
textos que se han introducido editorialmente—. Los números, las unidades, los límites de los ejes,
los colores y el resto de ajustes permanecen inalterados, ya que no tienen
idioma: una unidad traducida sería incorrecta («t» no se convierte en «ton»),
un número traducido no tendría sentido.

## Lo que ves en el editor del CMS

Al insertar el módulo, se abre automáticamente el **editor de gráficos**:
en la parte superior, la selección del tipo de gráfico y un campo en el que se puede pegar una tabla copiada de Excel
, debajo una cuadrícula con **una fila por eje** y
**una columna por serie**, y junto a ella una vista previa en tiempo real que muestra exactamente cómo
aparecerá el gráfico posteriormente en la página. Mientras no se haya creado nada
todavía, el editor explica los conceptos y ofrece las opciones «Cargar ejemplo» y
«Crear tabla vacía». El campo de texto que hay detrás solo muestra la forma técnicamente
almacenada y codificada de los datos y nunca se edita manualmente.

Una característica importante: los ejes **no tienen una escala numérica visible**.
No es posible representar de forma adecuada en una escala común varios ejes con unidades diferentes (por ejemplo, kilómetros y minutos).
Por lo tanto, Por lo tanto, cada eje
se extiende internamente de forma independiente entre su valor mínimo y su valor máximo;
las cifras reales aparecen en los puntos de datos, en la información sobre herramientas y
en la tabla de datos. Más información al respecto en [Configuración](settings.md).
