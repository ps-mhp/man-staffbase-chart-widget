# FAQ

Any message that the chart can display instead of the graph should be listed as a question—
using the exact wording so it can be found via search.

**Question:** I see the message “No chart set up yet. Open
the widget’s settings.”

Answer: No configuration has been saved for this widget yet.
Open the widget settings, fill out the chart editor, and save.

**Question:** I see the message “The chart could not be read.
Please reconfigure it in the settings.”

Answer: The saved data is corrupted or has been manually modified.
Open the widget settings and reconfigure the chart in the editor—
if necessary, using a newly inserted table.

**Question:** I see the message “The chart type ‘…’ is not recognized by this version of the
component. Please update the component.” (or, without
the type name specified: “The configured chart type is not recognized by this version of the
module. Please update the module.”)

Answer: The chart was set up using a newer version of the module
that recognizes a chart type not yet
supported by this version. Update the module to the latest version.

**Question:** I see the message “No data in the chart yet. Create
axes and series in the settings.”

Answer: Neither axes nor series have been created in the chart editor. In the
editor, import a table using “Insert from Excel” or use one of the
two buttons: “Load Example” or “Create Empty Table.”

**Question:** After inserting the data, my metrics appear as series and my
variants as axes—everything is reversed.

Answer: The wrong reading direction was selected in the “Insert from Excel”
bar. Under “Table Orientation,” switch to the other option and
click “Import Table” again.

**Question:** My axis label is so long that it
squeezes the chart.

Answer: In the axis name—in the grid or under “Axis” in
“Label”—press the Enter key at the desired location. The
line break will be applied to the chart.

**Question:** I see the message “‘…’ has a negative value. A
pie chart cannot display negative percentages.” (or, without a specific
category mentioned: “A pie chart cannot display negative percentages.”)

Answer: A pie chart shows the breakdown of a whole; a negative
proportion has no equivalent in it. Correct the specified category in the
chart editor to a value greater than zero—or switch to
**bar charts**, which can display negative values. The editor does not
allow a negative segment to be included in the pie chart in the first place; the message
can only appear in a chart from an older version.

The message intentionally blocks the entire chart instead of simply omitting the negative
segment: A pie chart distributes the remaining values across the
entire circle, so the result would be a chart that appears complete but with
implicitly inflated percentages.

**Question:** I see the message “The chart could not be loaded.
Please reload the page.”

Answer: The chart library could not be reloaded, usually due to
an interrupted internet connection. Reload the page; if the problem
persists, check your network connection.

**Question:** Why is my chart empty even though data has been entered?

Answer: Usually, the module is located in a very narrow column or in a
collapsed element, so that the container has a height of 0. The chart
then remains permanently empty because it has no space to draw in. Move the
Move the block to a wider column or expand the element.

**Question:** Why do I see a large
difference in the chart between two values that are almost the same?

Answer: Without a maximum value set, each axis extends to the largest value that
appears on it. If two values are close together but far from zero,
the upper part of the axis uses the entire range—this makes the difference
appear larger than it actually is. Solution: In the chart editor,
select the affected axis and manually set the minimum and maximum
under “Axis.”

**Question:** Why is the worse value farther out?

Answer: The “Smaller is better” toggle is missing on this axis. It must be enabled for
all metrics where a smaller value indicates a better
result—such as weight, consumption, or charging time. In the chart editor,
select the axis and enable it under “Axis.”

**Question:** I don’t see any download buttons below the chart.

Answer: Either “Allow Download” in the chart editor under
“Behavior” is not enabled, or the chart hasn’t finished rendering yet—the
buttons only appear once a graphic is available for download.

**Question:** When I click “As SVG” or “As PNG,” the message “The export
failed. Please try again” appears.

Answer: The export couldn’t find the chart you drew—usually because
it’s currently reloading. Wait a moment and click again; if the problem
persists, reload the page.

**Question:** Can I display more than six rows?

Answer: Yes. The MAN color palette has six colors; starting with the seventh row,
the colors repeat. The rows remain clearly
distinguishable, however, because each data point displays its value as a label, and
the name and values of each row are shown in the tooltip and legend. Under “Data,”
you can also assign a unique color to each row.

**Question:** What happens to my chart when the page is automatically
translated?

Answer: Titles, footnotes, axis labels, and
series names are translated. Numbers, units, axis limits, colors, and all other
settings remain unchanged.

**Question:** A number I inserted is suddenly 1,000 times too large or
too small.

Answer: The chart editor interprets numbers in the German format—when typing, when
inserting into the grid, and when using “Insert from Excel”: A period is used as the
a thousands separator, and a comma as a decimal separator. So `1.234` becomes
`1234` and not `1,234`. If you insert a table formatted in English
(with a period as the decimal separator), you must convert the affected numbers to
before pasting to match the German format; otherwise, for example, “1.234” (one thousand)
will be read as “1,234” (one point two three four). If a number contains both
a period and a comma, the last
character is considered the decimal separator regardless of the notation—`1.234,5` and `1,234.5` both result
in `1234,5`.

**Question:** Where have the “Height in Pixels” and “Allow Download” fields gone in the
Staffbase dialog?

Answer: Both are now in the chart editor: the height under
“Design,” and the download option under “Behavior.” The old fields are
hidden. Older charts retain their values; the editor imports them
when the chart is opened, and unless changed, the chart remains on the page as it was.

**Question:** “Apply” does nothing; at the top it says “Axis ‘…’: Maximum too small.”

Answer: For this axis in the grid, a maximum value has been entered that is not
greater than the minimum. The axis is highlighted in the grid; under “Axis,”
increase the maximum or clear the field—leaving it blank means “derived from the values
.”
