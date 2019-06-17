import { pie, arc } from 'd3-shape';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { select, selectAll } from 'd3-selection';

let donut = {};

donut.create = (data, el) => {
  var width = 180;
  var height = 180;
  var radius = Math.min(width, height) / 2;

  var color = scaleOrdinal(schemeCategory10);
  // var color = scaleOrdinal(d3.interpolateGreys(t));
  var svg = select(el)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +
    ',' + (height / 2) + ')');

  var donutWidth = 50;

  var donutArc = arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius);

  var donutPie = pie()
    .value(function (d) { return d.value; })
    .sort(null);

  svg.selectAll('path')
    .data(donutPie(data))
    .enter()
    .append('path')
    .attr('d', donutArc)
    .attr('fill', function (d, i) {
      return color(d.data.name);
    });
};

donut.destroy = (el) => {
  const div = select(el);
  div.select('svg').remove();
  div.selectAll('g').remove();
  div.selectAll('path').remove();
};

export default donut;
