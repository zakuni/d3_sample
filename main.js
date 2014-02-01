(function() {
  var chart, height, type, width, x, y;

  width = 900;

  height = 500;

  x = d3.scale.ordinal().rangeRoundBands([0, width], .1);

  y = d3.scale.linear().range([height, 0]);

  chart = d3.select(".chart").attr("width", width).attr("height", height);

  d3.tsv("data.tsv", function(d) {
    return type(d);
  }, function(error, data) {
    var bar;
    x.domain(data.map(function(d) {
      return d.name;
    }));
    y.domain([
      0, d3.max(data, function(d) {
        return d.value;
      })
    ]);
    bar = chart.selectAll("g").data(data).enter().append("g").attr("transform", function(d, i) {
      return "translate(" + (x(d.name)) + ", 0)";
    });
    bar.append("rect").attr("y", function(d) {
      return y(d.value);
    }).attr("height", function(d) {
      return height - y(d.value);
    }).attr("width", x.rangeBand());
    return bar.append("text").attr("x", x.rangeBand() / 2).attr("y", function(d) {
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
