# Settings

Technically, there are only two fields in the configuration dialog: **Diagram** and
**Height in Pixels**. "Diagram" cannot be edited directly—instead,
the **Diagram Editor** opens automatically, where all other
settings are located.

## Fields in the Configuration Dialog

| Setting | Description |
| --- | --- |
| Diagram | Contains the complete, technically encoded diagram definition. Edited exclusively via the Diagram Editor, never manually. |
| Height in pixels | Height of the diagram on the page. Valid values range from 160 to 1200 pixels; the default is 420. The width always depends on the column. |
| Allow Download | Displays two buttons below the chart to download it as an image. The file contains only the chart, not the page. Default: off. |

## Chart Editor Header

| Setting | Description |
| --- | --- |
| Title | Heading above the chart. If the field is left blank, no heading appears. |
| Footnote | Additional text in small print below the title, e.g., for source citations. |
| Show Legend | Toggles the display of the legend with the series names. |
| Legend Position | “top” or “bottom” — where the legend is positioned relative to the chart. |
| Number of Rings | Radar only: Number of concentric auxiliary rings in the grid. The default is 5. This is purely visual and does not change any values. |
| Fill Area | Radar only: Fills the area behind each series line semi-transparently in its color. Default is off. |

## Per Category (Axis)

| Setting | Description |
| --- | --- |
| Label | Name of the axis as it appears on the chart and in the data table. |
| Unit | Appended to every number on this axis (data point, tooltip, table), e.g., “kWh”. |
| Decimal Places | How many decimal places are displayed. If not specified, the number of decimal places actually entered is used. |
| Minimum | Lower limit of the axis. If not specified, the smallest value occurring on this axis is used. |
| Maximum | Upper limit of the axis. If not specified, the largest value on this axis is used. |
| Lower is better | Reverses the axis: The smaller value is then located farther out. For metrics where lower is better—weight, consumption, charging time. |

## Per Series

| Setting | Description |
| --- | --- |
| Series Name | Name as it appears in the legend, tooltip, and data table. |
| Color | Overrides the automatically assigned color from the MAN palette for this specific series. |

## Automatic Scaling

The axes do not display a visible numerical scale—it cannot be meaningfully displayed when there are multiple axes
with different units. Without specified minimum
and maximum values, each axis instead automatically spans the
smallest and largest values that appear on it. This makes differences
between the series clearly visible, but it can also make small differences—which are
insignificant in practice—appear large visually. If you do not want this,
set the minimum and maximum values for the relevant axis manually—e.g., 0 and 600
for a range—instead of spanning it between the smallest and largest
values that occur.

A manually set minimum or maximum also limits the plot:
A value outside these limits is displayed exactly at the edge, rather than
extending beyond the grid. The number at the data point and in the table remains
the one entered—the limit only changes the display, never the value. So if
you set an axis to 0 to 600 and enter 700, you’ll see the point all
the way at the edge and the 700 next to it.
