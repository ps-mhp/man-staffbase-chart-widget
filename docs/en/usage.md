# Step by Step

Using the example of a vehicle comparison (MAN eTGX vs. a competitor) based on
six metrics with different units.

## Set Up the Chart

1. Place the **Chart** widget on the page. The widget settings
   open, and the **Chart Editor** immediately appears above the
   actual field.
2. Select and copy the comparison data from Excel: **first row** contains the
   categories (axes, e.g., “Range [km],” “Charging time [min]”), **first
   column** the series (e.g., the vehicle names). In the editor, paste them into the
   **“Insert Table”** field and click **“Apply Table”**.
   The values will then appear in the grid above and in the preview.
3. For each category (axis column in the grid), set the **unit** and
   **decimal places**—this determines how the number appears at the
   data points, in the tooltip, and in the table, e.g., “125.5 kWh.”
4. For categories where a **smaller value is better**—weight,
   consumption, charging time—turn on the **“Smaller is better”** toggle
   for that axis. Without this toggle, the worse (larger) value
   would be farther out on the axis, and the chart would convey the exact opposite of
   what is intended: In a comparison, “farther out = better”
   should always apply.
5. Enter the **title** and **footnote**, turn the legend on or off, and choose its
   position (top/bottom).
6. Adjust the **height** of the chart (see [Settings](settings.md)).
7. If you want the chart to be downloadable as an image, turn on the
   **“Allow Download”** toggle (see [Settings](settings.md)).
   Two buttons will then appear below the chart: “As SVG” and
   “As PNG.”
8. Click **Save**, then **Close**. Only clicking “Save” transfers
   the data to the widget; as long as “Unsaved
   Changes” appears next to the buttons, nothing has been applied yet.

## Making Changes Later

1. Open the widget settings again—the chart editor will reappear
   with the last saved state.
2. Overwrite values directly in the grid or reinsert an updated table.
   Categories and series with the same names retain their previously
   set units, axis orientations, and colors—only the values are
   replaced.
3. Save and close as described above.

## If something isn’t working

1. If a message appears instead of the chart, it already contains the
   cause—see [FAQ](faq.md) for every possible message.
2. If the inserted table cannot be applied, check whether the first
   row contains the categories and the first column contains the series names.
3. If the chart displays incorrect numbers after insertion (e.g., shifted by a factor of
   1,000), this is usually due to the thousands separator in
   numbers from a non-German source—see the notes on numbers in
   [Settings](settings.md) and [FAQ](faq.md).
