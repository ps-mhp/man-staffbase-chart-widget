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

## Chart Type

The selection at the very top of the editor determines the type of chart. Currently,
only **Network Chart (Radar / Spider)** is available; the list will grow with each additional
supported type. Type-specific settings—such as
guides for the Radar chart—appear only when the corresponding type is selected.

## Import Data from a Table

| Setting | Description |
| --- | --- |
| Paste Field | Imports a table copied from Excel, PowerPoint, or Word. Recognizes tabs, semicolons, and commas as column delimiters. |
| How is your table formatted? | Sets the reading direction. The default is “one metric per row, one variant per column”—just as the table appears in the grid below. Selecting the other option flips the table orientation when importing. |
| Apply Table | Replaces axes, series, and values. Axes and series with the same name retain their units, axis direction, and color. |

## Getting Started Without Data

As long as neither axes nor series have been created, the editor explains the
terms and offers two buttons: **“Load Example”** populates a
complete comparison (MAN eTGX vs. Mercedes-Benz eActros 600), which
you can overwrite; **“Create Empty Table”** sets up three axes and two
series for you to fill in.

## Per Axis (one row in the grid)

| Setting | Description |
| --- | --- |
| Axis | Name of the axis, as it appears on the chart and in the data table. Multi-line: Pressing Enter creates a line break, which also appears in the chart. |
| Unit | Appended to every number on this axis (data point, tooltip, table), e.g., “kWh”. |
| Direction (“lower is better”) | Reverses the axis: The lower value is then on the outer side. For metrics where lower is better—weight, consumption, charging time. |
| Decimal Places | Only when **Fine Tuning per Axis** is enabled: How many decimal places are displayed. If not specified, the number of decimal places actually entered is used. |
| Minimum | Only when **Fine Tuning per Axis** is enabled: Lower limit of the axis. If not specified, the axis starts at zero—or, for negative values, at the smallest of them. |
| Maximum | Only when **Fine Tuning per Axis** is enabled: Upper limit of the axis. If not specified, the largest value occurring on this axis is used. |
| ↑ ↓ ✕ | Rotates the axis in a circle or removes it along with its values. |

## Per Series (one column in the grid)

| Setting | Description |
| --- | --- |
| Series Name | Name as it appears in the legend, tooltip, and data table. |
| Color | Overrides the automatically assigned color from the MAN palette for this specific series. |
| ← → ✕ | Moves the series—the order determines the palette color and legend order—or removes it. |

## Title, Legend, and Display

| Setting | Description |
| --- | --- |
| Title | Heading above the chart. If the field is left blank, no heading appears. |
| Footnote | Additional text in small print below the title, e.g., for source citations. |
| Legend | “Above the chart,” “Below the chart,” or “Hide.” |
| Grid Lines | Radar only: Number of concentric grid rings. Default is 5. Purely visual; does not change any values. |
| Fill Areas | For radar charts only: Fills the area behind each series line with a semi-transparent fill in the line’s color. Default is off. |

## Automatic Scaling

The axes do not display a visible numerical scale—it cannot be meaningfully displayed when there are multiple axes
with different units. Unless otherwise specified,
each axis instead starts at **zero** and extends to its largest
occurring value. The length of a ray thus behaves like the value
itself: halfway outward is also half the quantity.

If negative values occur on an axis, it starts at the smallest of them—
otherwise, the point would lie outside the grid.

If you want to emphasize the differences between the series more strongly, set
the minimum and maximum of the relevant axis manually—e.g., 400 and 600 instead of
0 and 600. This increases the visible spacing but also makes small,
practically insignificant differences appear large.

A manually set minimum or maximum also limits the plot:
A value outside these limits is displayed exactly at the edge instead of
extending beyond the grid. The number at the data point and in the table remains
the one you entered—the limit only changes the display, never the value. So if
you set an axis to 0 to 600 and enter 700, you’ll see the point all the
way at the edge and the 700 next to it.
