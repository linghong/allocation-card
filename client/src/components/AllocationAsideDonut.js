/*
* donut chart used to draw the allocation
* color matches with the color of the correlated list's left-border
* there are many ways to connect react to d3, here, we just simply destroy the chart before each redraw
*/

import { pie, arc } from 'd3-shape';
import { select } from 'd3-selection';

let donut = {};

donut.create = (data, el) => {
  const margin = 80;
  const width = document.getElementById('chart').offsetWidth - 2 * margin;
  const height = width;
  var radius = width * 0.8 / 2;

  var svg = select(el)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +
    ',' + (height / 2) + ')');

  var donutArc = arc()
    .innerRadius(radius * 0.40)
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
      return d.data.color;
    });
};

donut.destroy = (el) => {
  const div = select(el);
  div.select('svg').remove();
};

export default donut;
