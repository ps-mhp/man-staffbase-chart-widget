# Step by Step

Using the example of a vehicle comparison (MAN eTGX vs. a competitor) based on
six metrics with different units.

## Setting Up the Chart

1. Place the **Chart** widget on the page. The widget settings
   open, and the **Chart Editor** immediately appears above the
   actual field.
2. At the top is the **Chart Type**. Currently, only “Network Chart
   (Radar / Spider)” is available there; the text below explains what the type is intended for.
3. As long as no data is available yet, the **“Axes and
   Series”** section offers two options: **“Load Example”** populates the chart with the completed
   comparison between the MAN eTGX and the Mercedes-Benz eActros 600, which you can simply
   overwrite, and **“Create Empty Table”** provides three axes and two
   series for you to fill in.
4. However, the recommended method is **“Import data from a table”** at the very
   top: Select the comparison table in Excel, PowerPoint, or Word,
   copy it, and paste it into the field. Below that, specify **how the table
   is formatted**—the default is “one metric per row, one
   variant per column,” which is how the table appears in the editor below.
   Then click **“Import Table”**.
5. In the grid, **each row is an axis** and **each column on the right is a
   series**. At the top of each series column are the name, color, and arrows for
   reordering; at the end of each axis row are the arrows and the X for that
   axis.
6. Enter the **unit** for each axis (e.g., “kWh”). A **line break in the
   axis name**—using the Enter key—is carried over to the chart and
   keeps long labels readable.
7. For axes where a **smaller value is better**—weight,
   consumption, charging time—turn on the
   **“smaller is better”** switch in the **Direction** column. Without it, the worse
   (larger) value would be farther out, and the chart would convey exactly the opposite of
   what is intended: In a comparison, “farther out =
   better” should always apply.
8. **Decimal places**, **minimum**, and **maximum** for each axis are set behind
   the **“Fine adjustments per axis”** switch. These are not needed in most cases;
   leaving them blank means “derived from the values.”
9. Under **“Title, Legend, and Display”**, enter the title and footnote,
   position or hide the **legend**, and for the grid chart, configure the
   **gridlines** and **fill areas**.
10. The **Preview** on the right shows how the diagram will look on the page
    at all times and remains in place while scrolling.
11. Adjust the **height** of the diagram (see [Settings](settings.md)).
12. If you want the diagram to be downloadable as an image, turn on the
    **“Allow Download”** toggle (see [Settings](settings.md)).
    Two buttons will then appear below the diagram: “As SVG” and
    “As PNG”.
13. Click **Save**, then **Close**. Only clicking “Save” transfers
    the data to the widget; as long as “Unsaved
    Changes” appears next to the buttons, nothing has been applied yet.

## Making Changes Later

1. Reopen the widget settings—the chart editor will reappear
   with the last saved state.
2. Overwrite values directly in the grid or reinsert an updated table.
   Axes and series with the same names retain their previously
   set units, axis directions, and colors—only the values are
   replaced.
3. Save and close as described above.

## If something isn’t working

1. If a message appears instead of the chart, it already contains the
   cause — see [FAQ](faq.md) for every possible message.
2. If the inserted table cannot be applied, check whether it
   has headers in the first row and the first column. If
   the axes and series are swapped in the grid, the reading direction below the
   paste field was selected incorrectly—change it and apply again.
3. If the chart displays incorrect numbers after pasting (e.g., shifted by a factor of
   1,000), this is usually due to the thousands separator in
   numbers from a non-German source—see the notes on numbers in
   [Settings](settings.md) and [FAQ](faq.md).
