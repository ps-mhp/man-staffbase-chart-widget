# FAQ

Any message that the chart can display instead of the graph should be listed as a question—
with the exact wording so it can be found via search.

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

**Question:** I see the message “No data in the chart yet. Create axes and series in
the settings.”

Answer: Neither axes nor series have been created in the chart editor. In the
Insert a table in the editor or use one of the two buttons: “Load Example”
or “Create Empty Table.”

**Question:** After inserting the table, my metrics appear as series and my
variants as axes—everything is reversed.

Answer: The wrong reading direction was selected below the insertion field. Switch to the
other option under “How is your table oriented?” and click
“Apply Table” again.

**Question:** My axis label is so long that it
squeezes the chart.

Answer: In the axis field, press the Enter key at the desired
location. The line break will be applied to the chart.

**Question:** I see the message “The chart could not be loaded.
Please reload the page.”

Answer: The chart library could not be reloaded, usually due to
an interrupted Internet connection. Reload the page; if the problem
persists, check your network connection.

**Question:** Why is my chart empty even though data has been entered?

Answer: Usually, the block is located in a very narrow column or within a
collapsed element, so the container has a height of 0. The chart
then remains permanently empty because it has no space to draw in. Move
the block to a wider column or expand the element.

**Question:** Why do I see a large
difference in the chart between two values that are almost identical?

Answer: Without a maximum value set, each axis extends to the largest value that
appears on it. If two values are close together but far from zero,
the upper part of the axis uses the entire range—this makes the difference
appear larger than it actually is. Solution: In the chart editor,
manually set the minimum and maximum values for the affected axis.

**Question:** Why is the worse value farther out?

Answer: The “Smaller is better” toggle is missing for this axis. It must be enabled for
all metrics where a smaller value indicates a better
result—such as weight, fuel consumption, or charging time. Enable it in the chart editor for
the respective axis.

**Question:** I don’t see any download buttons below the chart.

Answer: Either “Allow Download” is not
enabled in the settings, or the chart hasn’t finished rendering yet—the
buttons only appear once a graphic is available for download.

**Question:** When I click “As SVG” or “As PNG,” the message “The export
failed. Please try again” appears.

Answer: The export couldn’t find the chart you drew—usually because
it’s currently reloading. Wait a moment and click again; if the problem
persists, reload the page.

**Question:** Can I display more than six series?

Answer: Yes. The MAN color palette has six colors; starting with the seventh series,
the colors repeat. The series remain clearly
distinguishable, however, because each data point displays its value as a label, and
the name and values of each series are shown in the tooltip and legend.

**Question:** What happens to my chart when the page is automatically
translated?

Answer: Titles, footnotes, axis labels, and
series names are translated. Numbers, units, axis limits, colors, and all other
settings remain unchanged.

**Question:** An inserted number is suddenly 1,000 times too large or
too small.

Answer: The chart editor interprets numbers according to German conventions: A period is used as the
thousands separator, and a comma as the decimal separator. So `1.234` becomes
`1234` and not `1,234`. If you insert a table with English notation
(period as the decimal separator), you must convert the affected numbers to
convert them to the German format; otherwise, for example, “1.234” (one thousand)
will be interpreted as “1,234” (one point two three four). If a number contains both
a period and a comma, the last
character is considered the decimal separator regardless of the notation—`1.234,5` and `1,234.5` both result
in `1234,5`.
