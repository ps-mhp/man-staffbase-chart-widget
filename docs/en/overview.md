# Chart

The chart widget displays metrics in four types—**radar chart
, bar chart, line chart, and pie chart**. Each type is configured using
the same editor, which opens directly in the widget settings; a
table copied from Excel can be imported there with a single click—see
[Step-by-Step Guide](usage.md).

## The Four Types

**Radar chart (spider chart).** Multiple axes radiate star-shaped from
a central point, and each series—for example, a comparison of vehicles—
connects its values on these axes to form a surface. This allows you to
compare multiple metrics from multiple series at a glance, even if they
are measured in very different units—kilometers, metric tons,
minutes, kilowatts. Only the radar chart offers minimum, maximum, and the
“smaller is better” toggle for each axis, along with display options for gridlines
and filling the area.

**Bar chart (columns).** Compares values across a few categories.
All bars share a common value axis, which ECharts calculates
and labels itself—unlike with the radar chart, this axis is therefore
only useful if all categories use the same unit. As
display options include stacking (series stacked on top of each other instead of side by side) and
orientation (portrait or landscape).

**Line Chart (Trend).** Shows a trend across an ordered
series, such as by year of construction. The order of the axes in the grid is
the order on the line. Display options: Smooth lines, fill the area under
the line, show points at the control points.

**Pie chart (pie / ring).** Shows the breakdown of a whole:
Segments are the axes (categories); their values determine the segment sizes.
**Only the first series is plotted**—additional series
remain saved and reappear as soon as you switch to a different chart
type; the editor provides a specific notification to this effect. Each category can be assigned
its own segment color. Display options: inner radius (0 results in a
full circle; a larger value results in a ring/doughnut) and segment labeling
(percentage, absolute value, both, or hidden). Negative values
are not a display issue with `pie`, but rather a data error—the
chart then displays a note instead of a distorted pie chart.

Changing the chart type in the editor does not result in any data loss: the title, footnote,
legend, axes, and series are preserved, as are the values in type-specific
fields—they simply do not take effect as long as a different type is selected.

## What Readers See

- The chart itself, with any number of axes and series.
- The values appear directly on the chart (for `pie`, depending on the settings, as
  a percentage, absolute value, or both); additionally, when you hover
  over a point or segment, a tooltip appears with the corresponding values.
- A legend above or below the chart, depending on the settings.
  For `pie`, the legend lists the categories (slices); for the other
  types, it lists the series.
- Optionally, a title and a footnote.
- If downloading is enabled (see [Settings](settings.md)), two buttons
  below the chart for downloading as an image.
- For screen readers, a complete data table is also provided below the
  chart. It is visually hidden but present—the chart is
  therefore usable even without visual perception.

## Image Export

When downloads are enabled, two buttons appear below the chart:
“As SVG” and “As PNG.” The downloaded file contains **only the
chart**, not the rest of the page—the title, legend, axes, and values
exactly as they are currently displayed, with a white background (even if
the page itself has a transparent or dark background). The SVG can be
scaled up without loss of quality; the PNG is suitable for situations where SVG
cannot be embedded (e.g., most presentation programs) and is generated in
double resolution. Export works the same for all four types
— it operates on the drawn image and does not recognize the chart type.

## Translation

The chart is included in the automatic page translation. The following are translated:
the title, footnote, axis labels, and series names—exactly the
text that was entered editorially. Numbers, units, axis limits,
colors, and all other settings remain unchanged because they have no
language: A translated unit would be incorrect (“t” does not become “ton”),
and a translated number would be nonsense.

## What You See in the CMS Editor

When you insert the module, the **Chart Editor** automatically opens
in full-screen mode, with the same header as all MAN widgets: Apply,
Cancel, Undo, Help, and the **Editor · Desktop · Tablet ·
Mobile** toggle. On the left is a grid with **one row per axis** and **one
column per series** (for pie charts, only the first series), above which is a bar showing
the selected axis and its actions, “Insert from Excel,” and “Load
Example.” On the right is the **“Chart”** panel with the tabs Data, Design,
Axis, and Behavior. In the device views, the editor displays the actual preview at device width instead of the
grid; the panel remains next to it.
As long as nothing has been created yet, the editor explains the terms and offers
“Load Example” and “Create Empty Table”—with a
different, appropriate example depending on the type.

In the Staffbase dialog behind it, only the “Chart” field remains, containing the technically
encoded form of the data; it is never edited manually. The former
fields “Height in Pixels” and “Allow Download” are hidden there—both
are now located in the editor, and older charts retain their values.

An important feature of the radar chart: Its axes have **no visible
numeric scale**. Multiple axes with different units (e.g.,
kilometers and minutes) cannot be meaningfully represented on a single scale
. Each axis is therefore scaled independently internally: from zero to
its maximum value. The actual numbers appear at the data points,
in the tooltip, and in the data table. Bar and line charts, on the other hand,
display a true value axis calculated and labeled by ECharts.
For more information, see [Settings](settings.md).
