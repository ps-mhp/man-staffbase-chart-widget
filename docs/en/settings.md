# Settings

All settings are located in the **Chart Editor**, which automatically opens in full-screen mode when you open the
widget settings. In the Staffbase dialog
behind it, only the **Chart** field remains, with its technically encoded
definition; it is never edited manually.

## The Editor

At the top is the header, as with all MAN widgets: Name and Title on the left, in the
center the view **Editor · Desktop · Tablet · Mobile**, and on the right
**Undo**, **Redo**, **Help**, **Cancel**, and
**Apply**. Next to these is a message indicating what has changed—such as “Chart type
changed” or “Data changed”—or why the changes cannot yet
be applied.

Below that are two sections:

- **On the left, the data grid** with a bar above it.
- **On the right, the “Chart” panel** with four tabs: **Data**,
  **Design**, **Axis**, and **Behavior**.

In the Desktop, Tablet, and Mobile views, the grid is replaced by
a device-width preview; the panel on the right remains, so that each
setting takes effect right next to it.

“Apply” transfers the current settings to the Staffbase dialog; they are not
permanently saved until you click **Save** in Studio. If no changes are made,
“Apply” remains disabled.

| Key | Effect |
| --- | --- |
| ⌘/Ctrl S | Apply |
| ⌘/Ctrl ↵ | Apply and close |
| ⌘/Ctrl Z, ⇧⌘/Ctrl Z | Undo, Redo (outside text fields) |
| F1 | Help |
| Esc | Close, with confirmation prompt if changes are unsaved |

## Data Grid

Each **row** is an **axis** (a metric; in a pie chart, a segment),
each **column** on the right is a **series** (a variant; earlier versions
used the term “series”). At the top of each series column is a colored dot and a name.

| Column | Description |
| --- | --- |
| No. | Selects the axis. Clicking in any field in the row does the same. |
| Axis | Name of the axis, as it appears on the chart and in the data table. Pressing Enter creates a line break, which also appears on the chart. |
| Unit | Appended to every number on this axis (data point, tooltip, table), e.g., “kWh.” For bar and line charts, the shared value axis displays the unit only if **all** axes with values share the same unit. |
| Per Series | The values, formatted in the German style: comma before the decimal places, period between the thousands. |

For pie charts, the grid shows **only the first series**—a note
below indicates that additional series are saved but not
displayed.

**Values from Excel:** Copy cells in Excel, select a cell in the grid,
⌘ V (Ctrl V). The block starts at this cell; missing axes and rows
are added. For pie charts, it fills only the one visible row.

## Bar above the grid

| Element | Description |
| --- | --- |
| Axis 2 of 5 · Name | The selected axis. |
| ↑ ↓ | Moves the selected axis along with its values. For the radar chart, the order determines the position within the circle; for the bar chart, the order determines the position on the baseline. |
| Duplicate | Places a copy of the axis, including values and settings, directly behind it. |
| Delete | Removes the axis along with its values. Undo with ⌘/Ctrl Z. |
| + Axis | Appends an empty axis and places the cursor in its name. |
| + Row | Appends an empty row. |
| Insert from Excel | Opens a panel on the right to import an entire table (see below). |
| Load Example | Replaces the data with an example for the selected type. Height and download remain. Undo with ⌘/Ctrl Z. |

## Insert from Excel

| Setting | Description |
| --- | --- |
| Table | Imports a table copied from Excel, PowerPoint, or Word. The first row and first column are headers. Recognizes tabs, semicolons, and commas as column delimiters. |
| How is the table oriented? | **Axes in Rows** (default): one metric per row, one variant per column—as in the grid. **Axes in Columns**: the opposite; the table is rotated when imported. |
| Import Table | Replaces axes, rows, and values. Axes and rows with the same name retain their units, boundaries, direction, and color. |

## Getting Started Without Data

As long as neither axes nor rows have been created, the grid explains the
terms and offers two buttons: **“Load Example”** populates the table with an
example matching the selected type (e.g., for the radar chart, a comparison of the MAN
eTGX versus the Mercedes-Benz eActros 600; for the pie chart, a fleet cost
breakdown), and **“Create Empty Table”** creates axes and rows to
be filled in.

## “Data” Tab

The rows are displayed as a list; clicking one expands it.

| Setting | Description |
| --- | --- |
| ← → | Moves the row. The order determines the palette color and legend; for pie charts, the row at the front is plotted. |
| Delete | Removes the row along with its values. |
| Name | How it appears in the legend (except for pie charts), tooltip, and data table. |
| Color | Overrides the palette color for this row; “Palette” restores the original color. Not available for pie charts—there, the segment color varies by axis. |
| + Add Row | Appends an empty row and expands it. |

## “Design” Tab

| Setting | Description |
| --- | --- |
| Type | **Grid**, **Bar**, **Line**, or **Pie**. The sentence below explains what the type is used for. |
| Title | Heading above the chart. Blank: no heading. |
| Footnote | Additional text in small print, e.g., for source citations. |
| Legend | **Above**, **Below**, or **Hide**. For pie charts, the legend lists the axes (slices); for other charts, it lists the series. |
| Type-specific section | Features unique to the selected type; see below. |
| Height in px | Height of the chart on the page, 160 to 1200 pixels, default 420. The width always follows the column. A height outside these limits cannot be applied. |

| Type | Setting | Description |
| --- | --- | --- |
| Grid | Gridlines | Number of concentric rings. Default is 5. For visual purposes only. |
| Grid | Fill Areas | Fills the area behind each line with a semi-transparent version of its color. Default is off. |
| Bar | Direction | **Vertical** (categories at the bottom) or **Horizontal** (categories on the left). Default: vertical. |
| Bar | Stacked | Rows stacked on top of each other instead of side by side. Default: off. |
| Line | Smoothed | Rounds the curve instead of drawing a straight line between values. Default: off. |
| Line | Fill Area | Fills the area beneath each line. Default: off. |
| Line | Show Points | Marks each value. Default: on. |
| Pie | Inner Radius in % | 0 results in a full circle; a larger value (e.g., 45) results in a ring. Default: 0. |
| Pie | Segment Label | **Percent**, **Value**, **Both**, or **None**. Default: Percent. |

Changing the chart type does not lose any **data**: the title, footnote, legend, axes, and
series remain, as do the axis labels. The **settings for the
**type**, however, apply only to that specific chart: A chart always carries only one set
of these settings—those of the currently selected type. If you set gridlines
in a grid chart, switch to a bar chart, make changes there, and then switch back, you’ll find
the grid chart has reverted to its default settings.

## “Axis” Tab

Fine-tuning options for the axis selected in the grid.

| Setting | Type | Description |
| --- | --- | --- |
| Label | All | The name of the axis, multi-line. |
| Unit | All | As in the grid. |
| Decimal Places | All | How many decimal places are displayed. Blank: as many as entered. |
| Minimum, Maximum | Grid | Limits of the axis. Blank: derived from the values (from zero to the largest value). The maximum must be greater than the minimum; otherwise, the setting cannot be applied. |
| Smaller is better | Grid | Reverses the axis: the smaller value is on the outside. For weight, consumption, loading time. |
| Segment color | Pie | Color of the segment for this axis; “Palette” resets it. |

**Why Minimum, Maximum, and “Smaller is better” only appear in the Grid
view:** They are defined per axis and cannot be displayed when using a shared
value axis—as used by bar and line charts. In the
pie chart, there is no axis at all. Hidden values remain
saved and take effect again as soon as the chart type is selected once more.

## “Behavior” tab

| Setting | Description |
| --- | --- |
| Allow Download | Displays two buttons below the chart: “As SVG” and “As PNG.” The file contains only the chart, not the page. Off by default. |

The widget version is listed below—if you report a bug, you’ll find it
here.

## Validation

“Apply” rejects a state that the page could not display correctly.
The header states the reason, the tab displays a red mark, the affected
axis is highlighted in the grid, and the field explains what to do.

| Message | Cause |
| --- | --- |
| Axis “…”: Maximum too small | For the grid, the maximum is not greater than the minimum. |
| “…”: Negative share in the pie chart | A value in the first row is negative; a pie chart only shows shares greater than zero. |
| Height: 160 to 1200 pixels allowed | The height is outside the limits. |

## Existing Charts

Up to version 0.3, **Height** and **Allow Download** were separate fields
in the Staffbase dialog. These fields are now hidden; their values remain
in effect until otherwise set in the editor. Upon opening,
the editor adopts them as the default—an existing chart looks exactly the same
after opening and applying the changes as it did before. If the old checkbox was not
visible, the “Behavior” tab indicates this below the button.

## Automatic Scaling

**For the radar chart**, the axes do not have a visible numerical scale ��� It cannot be meaningfully displayed when
there are multiple axes with different units. Unless
otherwise specified, each axis starts at **zero** and extends to
its maximum value. The length of a ray thus behaves
like the value itself: half the distance outward is also half the quantity.

If negative values occur on an axis, it starts at the smallest of them—
otherwise, the point would lie outside the grid.

If you want to emphasize the differences between the rows more strongly, set
the minimum and maximum values for the relevant axis manually—e.g., 400 and 600 instead of
0 and 600. This increases the visible spacing but also makes small,
practically insignificant differences appear large.

A manually set minimum or maximum also limits the plot:
A value outside these limits is displayed exactly on the edge, rather than
extending beyond the grid. The number at the data point and in the table remains
the one entered—the limit only changes the appearance, never the value. So if
you set an axis to 0 to 600 and enter 700, you’ll see the point all the
way at the edge and the 700 next to it.

**For bar and line charts**, ECharts automatically draws a value axis with
a visible scale; it is anchored at zero and cannot be manually
limited. **For pie charts**, there is no value axis—each segment shows
its proportion of the whole. A negative value is not a
display issue here, but a data error: The editor does not allow it to
be accepted, and an older chart displays a note on the page regarding
the affected axis instead of drawing a distorted pie chart.
