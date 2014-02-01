width = 900
height = 500

x = 
  d3.scale.linear()
    .range([0, width])

y =
  d3.scale.linear()
    .range([height, 0])

chart = 
  d3.select(".chart")
    .attr("width", width)
    .attr("height", height)

d3.tsv "data.tsv",
  (d) ->
    type(d) 
  ,
  (error, data) ->
    y.domain([0, d3.max(data, (d) -> d.value)])

    barWidth = width / data.length

    bar = 
      chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", (d, i) -> "translate(#{i * barWidth}, 0)")

    bar.append("rect")
      .attr("y", (d) -> y(d.value))
      .attr("height", (d) -> height - y(d.value))
      .attr("width", barWidth - 1)

    bar.append("text")
      .attr("x", barWidth / 2)
      .attr("y", (d) -> y(d.value) + 3)
      .attr("dy", ".75em")
      .text((d) -> d.value)

type = (d) ->
  d.value = +d.value
  d