# Settings

Technically, there are only two fields in the configuration dialog: **Diagram** and
**Height in Pixels**. "Diagram" cannot be edited directly—instead,
the **Diagram Editor** opens automatically, where all other
settings are located.

## Fields in the Configuration Dialog

| Setting | Description |
| --- | --- |
| Diagram | Contains the complete, technically encoded diagram definition. Edited exclusively via the Diagram Editor, never manually. |
| Height in pixels | Height of the chart on the page. Valid values range from 160 to 1200 pixels; the default is 420. The width always depends on the column. |
| Allow download | Displays two buttons below the chart for downloading it as an image. The file contains only the chart, not the page. Off by default. |

## The Editor Dialog

At the top is a toolbar with **Save**, **Help**, and **Close**;
it remains stationary when scrolling so that saving remains accessible even with a long
data grid. As long as the draft differs from the saved version,
“Unsaved Changes” appears next to it. The Help button opens
a slider with the same explanations as on this page, directly in
the dialog; it closes via the button or the “Escape” key.

If the dialog is narrow, the preview moves below the input grid, and
when the container width is less than about 700 pixels, the grid becomes a chart
per axis. The dialog never scrolls horizontally.

## Chart Type

The selection at the very top of the editor determines the type of chart:

| Type | Suitable for |
| --- | --- |
| Network Chart (Radar / Spider) | Comparing a few variants across multiple metrics with potentially different units. |
| Bar Chart (Columns) | Comparing values across a few categories with a common unit. |
| Line Chart (Trend) | Trend over an ordered series, e.g., years. |
| Pie chart (circle / ring) | Division of a whole into segments; plots only the first series. |

Changing chart types does not lose any **data**: the title, footnote, legend, axes, and
series are preserved. This also applies to the information associated with an axis
— minimum, maximum, “lower is better,” and the segment color. These
are simply hidden when switching to a different chart type and become active again as soon as the
original chart type is selected.

The **display settings** for a chart type, however, do not survive a change.
If you have set “Gridlines” and “Fill Areas” for a grid chart,
switch to a bar chart, and save, you will find the default settings restored
the next time you switch back. The same applies to stacking
and direction for bar charts, to smoothing, area, and points for line charts,
and to inner radius and segment labels for pie charts. A chart
always carries only one set of display settings—namely, those of the
currently selected type.

## Which fields appear for which chart type

| Field | Radar | Bar | Line | Pie |
| --- | :-: | :-: | :-: | :-: |
| Unit, decimal places | ✓ | ✓ | ✓ | ✓ |
| Minimum, Maximum | ✓ | – | – | – |
| Direction (“smaller is better”) | ✓ | – | – | – |
| Color per axis (segment color) | – | – | – | ✓ |
| Series columns in the grid | all | all | all | only the first |

**Why minimum, maximum, and “smaller is better” only appear for radar
charts:** They are defined per axis and cannot be mapped on a shared
value axis—as used in bar and line charts—they cannot be displayed. In pie charts,
there is no axis at all. “Smaller is better” is also a
radar-specific concept: With a true value axis, you do not reverse the axis, but rather
sort or label the data.

## Import Data from a Table

| Setting | Description |
| --- | --- |
| Paste Field | Imports a table copied from Excel, PowerPoint, or Word. Recognizes tabs, semicolons, and commas as column delimiters. |
| How is your table oriented? | Sets the reading direction. The default is “one metric per row, one variant per column”—just as the table appears in the grid below. Selecting the other option flips the orientation when importing. |
| Import Table | Replaces axes, series, and values. Axes and series with the same name retain their units, axis direction, and color. |

Pasting from Excel is type-neutral and works the same for all four types.

## Getting Started Without Data

As long as neither axes nor series have been created, the editor explains the
terms and offers two buttons: **“Load Example”** populates the chart with an
example matching the selected type (e.g., for the radar chart, a comparison of the MAN
eTGX versus Mercedes-Benz eActros 600 for the radar chart, or a fleet cost
breakdown for the pie chart), which you can overwrite; **“Create Empty Table”** creates axes
and series for you to fill in.

## Per axis (one row in the grid)

| Setting | Description |
| --- | --- |
| Axis | Name of the axis as it appears on the chart and in the data table. Multi-line: Pressing Enter creates a line break that also appears on the chart. |
| Unit | Appended to every number on this axis (data point, tooltip, table), e.g., “kWh.” For bar and line charts, the shared value axis displays the unit only if **all** axes with values use the same unit. |
| Direction (“lower is better”) | Only for radar charts. Reverses the axis: The lower value is then located farther out. For metrics where lower is better—weight, consumption, charging time. |
| Color | Only for pie charts. Sets the color of the corresponding segment, overriding the automatically assigned palette color. |
| Decimal Places | Only when **Advanced Settings per Axis** are enabled: How many decimal places are displayed. If not specified, the number of decimal places actually entered is used. |
| Minimum | Only for the radar chart, when fine-tuning is enabled: Lower limit of the axis. If not specified, the axis starts at zero—or, for negative values, at the smallest of them. |
| Maximum | Only for Radar, when **Fine Tuning per Axis** is enabled: Upper limit of the axis. If not specified, the largest value occurring on this axis is used. |
| ↑ ↓ ✕ | Moves the axis or removes it along with its values. |

## Per Series (one column in the grid)

In a pie chart, the grid shows **only the first series column**—a
note below it clarifies that additional series remain stored but
are not plotted.

| Setting | Description |
| --- | --- |
| Series Name | Name as it appears in the legend (except for pie charts; see below), tooltip, and data table. |
| Color | Overrides the automatically assigned color from the MAN palette for this specific series. Has no effect on pie charts—there, the color varies by axis (see above). |
| ← → ✕ | Moves the series—the order determines the palette color and legend order—or removes it. |

## Title, Legend, and Display

| Setting | Description |
| --- | --- |
| Title | Heading above the chart. If the field is left blank, no heading appears. |
| Footnote | Additional text in small print below the title, e.g., for source citations. |
| Legend | “Above the chart,” “Below the chart,” or “Hide.” For pie charts, the legend lists the axes (slices); for other chart types, it lists the series. |

### Display Options by Chart Type

| Type | Fields | Description |
| --- | --- | --- |
| Radar | Gridlines | Number of concentric grid rings. Default is 5. Purely visual; does not change any values. |
| Radar | Fill Areas | Fills the area behind each series line semi-transparently in its color. Default: off. |
| Bar | Stack | Plots series on top of each other instead of side by side. Default: off. |
| Bar | Orientation | “Portrait” (categories at the bottom) or “Landscape” (categories on the left). Default: portrait. |
| Line | Smooth Lines | Rounds the line path instead of drawing it straight between the control points. Default: off. |
| Line | Fill Area | Fills the area under the line with its color. Default: off. |
| Line | Show Points | Displays a point at each control point. Default: On. |
| Pie | Inner Radius | Percentage of the pie chart’s area occupied by the hole. 0 results in a full circle; a larger value (e.g., 45) results in a ring or donut. Default: 0. |
| Pie | Segment Label | “Percentage,” “Absolute Value,” “Both,” or “Hide.” Default is “Percentage.” |

## Automatic Scaling

**In radar charts**, the axes do not have a visible numerical scale—it cannot be
meaningfully displayed when
there are multiple axes with different units. Unless
otherwise specified, each axis instead starts at **zero** and extends to
its largest occurring value. The length of a ray thus behaves
like the value itself: half the distance outward also represents half the quantity.

If negative values occur on an axis, it starts at the smallest of them—
otherwise, the point would lie outside the grid.

If you want to emphasize the differences between the series more strongly, set
the minimum and maximum of the relevant axis manually—e.g., 400 and 600 instead of
0 and 600. This increases the visible spacing but also makes small,
practically insignificant differences appear large.

A manually set minimum or maximum also limits the plot:
A value outside these limits is displayed exactly on the edge, rather than
extending beyond the grid. The number at the data point and in the table remains
the one entered—the limit only changes the appearance, never the value. So if
you set an axis to 0 to 600 and enter 700, you’ll see the point all the
way at the edge and the 700 next to it.

**For bar and line charts**, ECharts automatically draws a value axis with
a visible scale; It is anchored at zero and cannot be limited manually. **In a pie chart**, there is no value axis—each segment shows
its proportion of the whole. A negative value is not a
display issue here, but rather a data error: The chart then displays a
note regarding the affected axis instead of drawing a distorted pie
chart.
