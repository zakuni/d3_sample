(function() {
  var chart, height, type, width, x, y;

  width = 900;

  height = 500;

  x = d3.scale.linear().range([0, width]);

  y = d3.scale.linear().range([height, 0]);

  chart = d3.select(".chart").attr("width", width).attr("height", height);

  d3.tsv("data.tsv", function(d) {
    return type(d);
  }, function(error, data) {
    var bar, barWidth;
    y.domain([
      0, d3.max(data, function(d) {
        return d.value;
      })
    ]);
    barWidth = width / data.length;
    bar = chart.selectAll("g").data(data).enter().append("g").attr("transform", function(d, i) {
      return "translate(" + (i * barWidth) + ", 0)";
    });
    bar.append("rect").attr("y", function(d) {
      return y(d.value);
    }).attr("height", function(d) {
      return height - y(d.value);
    }).attr("width", barWidth - 1);
    return bar.append("text").attr("x", barWidth / 2).attr("y", function(d) {
      return y(d.value) + 3;
    }).attr("dy", ".75em").text(function(d) {
      return d.value;
    });
  });

  type = function(d) {
    d.value = +d.value;
    return d;
  };

}).call(this);

/*
//@ sourceMappingURL=main.js.map
*/
