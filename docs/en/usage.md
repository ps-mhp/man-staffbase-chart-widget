# Step by Step

Using the example of a vehicle comparison (MAN eTGX vs. a competitor) based on
six key metrics with different units, presented as a network diagram; the
steps apply mutatis mutandis to the other three types.

## Setting Up the Chart

1. Place the **Chart** widget on the page. The widget settings
   open, and the **Chart Editor** immediately appears above the
   actual field. At the top is a control bar with **Save**,
   **Help** (opens a slider with the same explanations as in this
   documentation), and **Close**; it remains stationary when scrolling, even
   with a long data grid.
2. At the top of the editor is the **chart type**: **Network Chart (Radar /
   Spider)**, **Bar Chart (Columns)**, **Line Chart (Trend)**, or
   **pie chart (pie / ring)**; the text below explains what the
   selected type is intended for. Changing the type later does not lose any
   data—axes, series, titles, and legends are preserved; only the
   type-specific fields (e.g., minimum/maximum for the radar chart) are
   hidden until that type is selected again.
3. As long as no data has been entered yet, the **“Axes and
   Series”** offers two options: **“Load Example”** populates the chart with an example
   suited to the selected chart type, which you can simply overwrite, and
   **“Create Empty Table”** sets up axes and series for you to fill in.
4. However, the recommended method is **“Import Data from a Table”** at the very
   top: Select the comparison table in Excel, PowerPoint, or Word,
   copy it, and paste it into the field. Below that, specify **how the table
   is oriented**—the default is “one metric per row, one
   variant per column,” which is how the table also appears in the editor below.
   Then click **“Import Table”**. This step is the same for all
   four types.
5. In the grid, **each row is an axis** and **each column on the right is a
   series** — for the pie chart, the grid shows **only the first
   series column**; a note below makes it clear that additional series
   are saved but not plotted, so it doesn’t look like
   data loss. At the top of each series column are the name, color, and
   the arrows for reordering; at the end of each axis row are the arrows and the
   cross for that axis.
6. Enter the **unit** for each axis (e.g., “kWh”). A **line break in the
   axis label**—using the Enter key—is carried over to the chart and
   keeps long labels readable. For pie charts, you can
   also set a separate **segment color** for each axis.
7. For network diagrams only: For axes where a **smaller value
   is better**—weight, consumption, charging time—turn on the **“smaller is better”**
   switch in the **Direction** column. Without it, the
   worse (larger) value would be farther out, and the chart would convey exactly the
   opposite of what is intended.
8. **Decimal places** per axis are set via the
   **“Fine adjustments per axis”** toggle; **Minimum** and **Maximum** there
   appear only in the network diagram because bars and lines share a common
   value axis calculated by ECharts. In most cases, they are not needed;
   leaving them blank means “derived from the values.”
9. Under **“Title, Legend, and Display”**, enter the title and footnote,
   position or hide the **legend** (for pie charts, it lists the
   axes; otherwise, the series), and set the display options appropriate for the chart type
   : for radar charts, **Gridlines** and **Fill Areas**;
   for bar charts, **Stack** and **Orientation** (vertical/horizontal); for line charts,
   **Smooth Lines**, **Fill area** and **Show points**; for pie charts,
   **Inner radius** (0 = full circle, larger = ring) and
   **Segment label** (percentage, absolute value, both, or off).
10. The **Preview** shows what the chart looks like on the page
    at all times and stays in place while scrolling. If the dialog is wide enough
    (starting at about 900 pixels), it appears next to the input field; below that, it moves
    below the grid, and below about 700 pixels, the grid becomes
    a sequence of cards, one per axis. The dialog never scrolls
    horizontally.
11. Set the **height** of the chart (see [Settings](settings.md)).
12. If you want to be able to download the chart as an image, turn on the
    **“Allow Download”** toggle (see [Settings](settings.md)).
    Two buttons will then appear below the chart: “As SVG” and
    “As PNG”—this works the same way for all four types.
13. Click **Save**, then **Close**. Only clicking “Save” transfers
    the data to the widget; as long as “Unsaved
    Changes” appears next to the buttons, nothing has been applied yet.

## Making Changes Later

1. Open the widget settings again—the chart editor will reappear
   with the last saved state, including the chart type.
2. Overwrite values directly in the grid or reinsert an updated table.
   Axes and series with the same names retain their previously
   set units, axis directions, and colors—only the values are
   replaced.
3. Save and close as described above.

## If something isn’t working

1. If a message appears instead of the chart, it already contains the
   cause—see [FAQ](faq.md) for every possible message.
2. If the inserted table cannot be applied, check whether it
   has headers in the first row and first column. If
   the axes and series are swapped in the grid, the reading direction below the
   insertion field was selected incorrectly—switch it and try again.
3. If the chart displays incorrect numbers after insertion (e.g., shifted by a factor of
   1,000), this is usually due to the thousands separator in
   numbers from a non-German source—see the notes on numbers in
   [Settings](settings.md) and [FAQ](faq.md).
4. In a pie chart, the area remains empty even though values have been entered
   : Either all values in the first series are zero or
   missing (`null`), or at least one value is negative—in this case,
   the chart displays a custom message with the name of the affected
   axis instead of a distorted pie chart.
