# Step by Step

Using the example of a vehicle comparison (MAN eTGX vs. a competitor) based on
six key metrics with different units, presented as a network diagram; the
steps apply mutatis mutandis to the other three types.

## Set Up the Diagram

1. Place the **Chart** widget on the page. The widget settings
   open, and the **Chart Editor** immediately appears in full-screen mode. On the left
   is the data grid; on the right is the **“Chart”** panel with the tabs
   Data, Design, Axis, and Behavior. **Help** in the header opens the same
   explanations as this documentation.
2. In the panel under **Design**, select the **Type**: **Grid**, **Bar**,
   **Line**, or **Pie**; the text below explains what each type is intended
   for. Changing the type later does not lose any data—axes, series, title,
   and legend remain; the information on the axes (e.g., minimum and maximum
   for a grid) is simply hidden. However, the **type settings** apply
   only to that type; see [Settings](settings.md).
3. As long as there is no data yet, the grid offers two options:
   **“Load Example”** fills in an example appropriate for the type, which you
   can overwrite; **“Create Empty Table”** sets up axes and rows for
   you to fill in.
4. However, the recommended method is **“Insert from Excel”** in the upper-right corner above
   the grid: Select the comparison table in Excel, PowerPoint, or Word,
   copy it, and paste it into the field on the toolbar. Below that,
   specify **how the table is oriented**—the default is **Axes in Rows**,
   meaning the table will appear in the grid exactly as it is formatted. Then click **“Apply Table”**.
   This step is the same for all four types.
5. In the grid, **each row is an axis** and **each column on the right is a
   series**. For the pie chart, the grid shows **only the first series**;
   a note below indicates that additional series are saved but
   not displayed.
6. Overwrite individual values directly in the grid. You can also paste blocks from Excel
  : copy cells, select a field in the grid, then press ⌘ V (Ctrl V).
7. Enter the **unit** for each axis (e.g., “kWh”). A **line break in the
   axis label**—using the Enter key—is carried over to the chart and
   keeps long labels readable.
8. Clicking a row selects the axis. The bar above it labels it
   (“Axis 2 of 6 · Battery Weight”) and offers **Move Up**, **Move
   Down**, **Duplicate**, and **Delete**. The panel under **Axis**
   contains its advanced settings: label, unit, decimal places,
   for the grid: **Minimum**, **Maximum**, and **“Smaller is better”**; for the
   pie chart: the **segment color**.
9. For the grid only: For axes where a **lower value is better**—
   weight, consumption, charging time—enable **“Lower is better”**.
   Without it, the worse (larger) value would be farther out, and the chart
   would convey the opposite of what is intended.
10. Under **Data**, name the series; if necessary, assign a separate **color**
    and change their order—this determines the palette color and
    legend.
11. Under **Design**, enter the title and footnote; place the **legend** above
    or below the chart or hide them, and select the settings for the
    type: for the grid, **Guides** and **Fill**; for the
    bar chart, **Direction** and **Stacked**; for the line chart, **Smoothed**,
    **Fill Area** and **Show Points**; for pie charts, **Inner Radius** and
    **Segment Labels**. At the very bottom, set the **Height in px** (160 to
    1200).
12. If you want the chart to be downloadable as an image, under
    **Behavior**, enable **“Allow Download”**. Two buttons will then appear below the chart:
    “As SVG” and “As PNG.”
13. In the header, switch to **Desktop**, **Tablet**, or **Mobile**: The
    preview shows the chart as it appears on the page, with the panel
    on the right remaining next to it.
14. **Apply**—or press ⌘/Ctrl ↵ to apply and close. Then, in
    Studio, click **Save**; this is what saves the page.

## Making Changes Later

1. Reopen the widget settings—the editor appears with the
   last saved configuration, including the type.
2. Overwrite values directly in the grid or reapply an updated table via
   “Insert from Excel.” Axes and rows with the same names
   retain their units, limits, direction, and colors—only the values
   are replaced.
3. You can undo any step with ⌘/Ctrl Z; **Cancel** discards
   everything since the last Apply.
4. Apply and save in Studio as described above.

## If something doesn’t work

1. If a message appears on the page instead of the chart, it will
   already indicate the cause—see [FAQ](faq.md) for every possible message.
2. If “Apply” cannot be executed, the header will state the reason, and the
   affected tab will be marked in red—for example, “Axis ‘…’: Maximum too
   small.” See “Validation” under [Settings](settings.md).
3. If the inserted table cannot be applied, check whether it
   has headers in the first row and first column. If
   the axes and rows are swapped in the grid, the reading direction was selected incorrectly—
   switch them and apply again.
4. If the chart displays incorrect numbers after insertion (e.g., shifted by a factor of
   1,000), this is usually due to the thousands separator in
   numbers from a non-German source—see [FAQ](faq.md).
5. In a pie chart, the area remains empty even though values have been entered
  : This means that all values in the first row are zero or are missing.
