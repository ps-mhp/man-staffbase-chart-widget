# Chart

The chart widget displays key metrics as a **radar/web chart**: multiple
axes radiate outward in a star shape from a central point, and each series—for
example, a comparison of vehicles—connects its values on these axes to
form a surface. This allows you to compare multiple metrics from multiple series at a
glance, even if they are measured in completely different units
— kilometers, metric tons, minutes, kilowatts.

The chart is configured using a dedicated editor that opens directly in
the widget settings. A table copied from Excel can be
imported there with a single click; see [Step-by-Step Guide](usage.md).

Additional chart types (e.g., bar or line charts) are planned for future
versions but are **not yet available**—currently, only
the radar/web chart can be selected.

## What Readers See

- The chart itself, with any number of axes and series.
- The values appear directly at the data points; additionally, when
  you hover over a point, a tooltip appears showing all values in the series.
- A legend above or below the chart, depending on the settings.
- Optionally, a title and a footnote.
- If downloading is enabled (see [Settings](settings.md)), two buttons
  below the chart for downloading as an image.
- For screen readers, a complete data table below the
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
double resolution.

## Translation

The chart is included in the automatic page translation. The
title, footnote, axis labels, and series names are translated—exactly the
text that was entered editorially. Numbers, units, axis limits,
colors, and all other settings remain unchanged because they have no
language: A translated unit would be incorrect (“t” does not become “ton”),
and a translated number would be nonsense.

## What You See in the CMS Editor

When you insert the module, the **chart editor** opens automatically:
at the top, you’ll see the chart type selector and a field where you can paste a table copied from Excel
, below that a grid with **one row per axis** and
**one column per series**, and next to it a live preview that shows exactly how
the chart will appear on the page later. As long as nothing has been created
yet, the editor explains the terms and offers “Load Example” as well as
“Create Empty Table.” The text field behind it displays only the technically
stored, encoded form of the data and is never edited manually.

An important feature: The axes have **no visible numerical scale**.
Multiple axes with different units (e.g., kilometers and minutes)
cannot be meaningfully displayed on a single scale. Each axis
is therefore scaled independently internally: from zero to its maximum
value. The actual numbers appear at the data points, in the tooltip, and
in the data table. For more information, see [Settings](settings.md).
