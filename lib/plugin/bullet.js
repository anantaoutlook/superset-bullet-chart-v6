"use strict";

exports.__esModule = true;
exports.default = BullectChart;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@superset-ui/core");

var d3 = _interopRequireWildcard(require("d3"));

var d3Scale = _interopRequireWildcard(require("d3-scale"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var categorialSchemeRegistry = (0, _core.getCategoricalSchemeRegistry)();

function BullectChart(props) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  // console.log('child props', props.props);
  // Often, you just want to get a hold of the DOM and go nuts.
  // Here, you can do that with createRef, and the useEffect hook.
  // const svgRef = createRef<SVGSVGElement>();
  (0, _react.useEffect)(() => {
    d3.select('#graphic').selectAll('svg').remove();
    props.props.data.forEach((selectedDatasetata, index) => {
      var selectedDataset = {
        data: selectedDatasetata,
        height: props.props.height,
        width: props.props.width,
        colorScheme: props.props.colorScheme,
        orderDesc: props.props.orderDesc,
        bulletColorScheme: props.props.bulletColorScheme,
        chartIndex: index,
        years: props.props.years
      };
      render(selectedDataset);
    });
  }, [props]);

  var render = selectedDataset => {
    // custom colors theme
    var customColors;
    var colorsValues = categorialSchemeRegistry.values();
    var filterColors = colorsValues.filter(c => c.id === selectedDataset.colorScheme);
    var findLegendColorScheme = colorsValues.filter(c => c.id === selectedDataset.bulletColorScheme);

    if (filterColors[0]) {
      customColors = [...filterColors[0].colors];
    }

    var legendBulletColor = [];

    if (findLegendColorScheme[0]) {
      legendBulletColor = [...findLegendColorScheme[0].colors];
    }

    var groupData = (data, total) => {
      var cumulative = 0;

      var _data = data.map(d => {
        cumulative += d.metricpossiblevalues;
        return {
          metricpossiblevalues: d.metricpossiblevalues,
          cumulative: cumulative - d.metricpossiblevalues,
          metricvalue: d.metricvalue,
          period: d.period,
          company: d.company,
          metricpossible: d.metricpossible,
          percent: (d.metricpossiblevalues / total * 100).toFixed(2)
        };
      }).filter(d => d.metricpossiblevalues > 0);

      return _data;
    };

    var config = {
      f: d3.format('.1f'),
      margin: {
        top: 10,
        right: 0,
        bottom: 0,
        left: 20
      },
      barHeight: 20
    };
    var {
      f,
      margin,
      barHeight
    } = config; // const w = selectedDataset.width;

    var w = selectedDataset.width / (selectedDataset.years.length + 0.1);
    var h = selectedDataset.height;
    var halfBarHeight = barHeight; //

    var getMetricPossible = data => {
      var rectangles = selection.selectAll('rect') || null;
      data.each(function () {
        var filterVal = rectangles[0].filter((d, eleIndex) => data[0].indexOf(this) === eleIndex);

        if (filterVal.length > 0) {
          wrap(this, parseFloat(filterVal[0].attributes[4].value) + 5);
        }
      });
    }; // wrap text


    var wrap = (txt, data) => {
      var width = data;
      var text = d3.select(txt);
      var words = text.text().split(/\s+/).reverse();
      var word;
      var line = [];
      var lineNumber = 0;
      var lineHeight = 1.1; // ems

      var x = text.attr('x');
      var y = text.attr('y');
      var dy = parseFloat(text.attr('dy')) || 0;
      var tspan = text.text('').append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em');

      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(' '));
        var tspanWidth = tspan.node().getComputedTextLength() + 1;

        if (tspanWidth > width) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text.append('tspan').attr('x', x).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
        }
      }
    }; // find unique metric value


    function creatUniqueArray() {
      var unique = [];
      var distinct = []; // const result = [];

      for (var i = 0; i < selectedDataset.data.length; i++) {
        if (selectedDataset.data[i].metricpossible) {
          if (!unique[selectedDataset.data[i].metricpossible]) {
            distinct.push(selectedDataset.data[i]);
            unique[selectedDataset.data[i].metricpossible] = 1;
          }
        }
      }

      return distinct;
    } // find unique metric value


    function createCompanyArray() {
      var unique = [];
      var distinct = [];

      for (var i = 0; i < selectedDataset.data.length; i++) {
        if (selectedDataset.data[i].company) {
          if (!unique[selectedDataset.data[i].company]) {
            distinct.push(selectedDataset.data[i]);
            unique[selectedDataset.data[i].company] = 1;
          }
        }
      }

      for (var index = 0; index < distinct.length; index++) {
        distinct[index].color = legendBulletColor[index];
      }

      return distinct;
    }

    var resultset = creatUniqueArray();
    var uniqueCompanies = createCompanyArray(); // draw indicator conditionally

    var getCompanyIndicator = data => {
      var matchingMatricValue = uniqueCompanies.filter(d => d.metricvalue === data.metricpossible);
      return matchingMatricValue.length > 0 ? matchingMatricValue[0] : {};
    };

    var total = d3.sum(resultset, d => d.metricpossiblevalues);
    selectedDataset.orderDesc ? resultset.sort((a, b) => a.orderby - b.orderby) : resultset.sort((a, b) => b.orderby - a.orderby); // const middleIndex = resultset.indexOf(resultset[Math.round((resultset.length - 1) / 2)]);
    // const middle =
    //   resultset.length / 2 +
    //   (resultset.length % 2 === 0 ? 1 : resultset.length % 2);
    // const middleIndex: any = parseInt(middle + '');

    var _data = groupData(resultset, total);

    var checkMinimums = _data.filter(d => d.percent < 5);

    if (checkMinimums.length < 6) {
      h = 130;
    }

    if (checkMinimums.length < 3) {
      h = 110;
    }

    if (checkMinimums.length === 1) {
      h = 80;
    }

    if (_data.length === 1) {
      h = 70;
    } //generate random number

    /* const randomIntFromInterval = (index: number, min: number, max: number) => {
      // min and max included
      let num = Math.floor(Math.random() * (max - (min + index)) + min);
      if (num % 5 === 0) {
        return num;
      } else {
        num = Math.round(num / 8) * 8;
        return num;
      }
    }; */
    //genratePoints to draw ppolylines and flip according to x position to left/right


    var pointsArray = [];
    var yPoints = [];
    var count = 1;
    var secondCount = 1;

    var generatePoints = (d, index) => {
      var pointFirstX = xScale(d.cumulative) + xScale(d.metricpossiblevalues) / 2 - 12; // const pointFirstY = h / 2 + halfBarHeight * lineHeight - 20;

      var pointFirstY = 40;
      var pointSecondX = pointFirstX; // let pointSecondY = randomIntFromInterval(index, pointFirstY + 15, h - 15);

      var pointSecondY = 0;

      if (pointFirstX < w / 2) {
        pointSecondY = h - 15 - 12 * count;
        count++;
      } else {
        pointSecondY = pointFirstY + 12 * secondCount;
        secondCount++;
      }

      if (yPoints.indexOf(pointSecondY) === -1) {
        yPoints.push(pointSecondY);
        pointsArray.push({
          index: index,
          x: pointSecondX,
          y: pointSecondY,
          percent: d.percent,
          points: pointFirstX + " " + pointFirstY + " " + pointSecondX + " " + pointSecondY
        });
      }

      return true;
    }; //getPoints to draw text alignment


    var getTextAlignment = (d, index) => {
      var pointFirstX = xScale(d.cumulative) + xScale(d.metricpossiblevalues) / 2 - 12;
      var alignPos = '';

      if (pointFirstX < w / 2) {
        alignPos = 'start';
      } else {
        alignPos = 'end';
      }

      return alignPos;
    };

    var getPoints = (data, index) => {
      var newArray = [...pointsArray];
      var originalArray = [...pointsArray];
      newArray.sort((a, b) => b.y - a.y);
      newArray.forEach((na, naIndex) => {
        originalArray.forEach(oa => {
          if (na.index === oa.index) oa.y = na.y;
        });
      });
      var res = originalArray.filter(d => d.index === index && d.percent === data.percent);
      return res[0].points;
    }; // find polyline endX position to place text at same X postion


    var getPolylineEndX = (selectionS, d, index) => {
      var filter = pointsArray.filter(d => d.index === index);
      return filter.length > 0 ? filter[0].x : 0;
    }; // find polyline endY position to place text at same Y postion


    var getPolylineEndY = (d, index) => {
      var filter = pointsArray.filter(d => d.index === index);
      return filter.length > 0 ? filter[0].y + 8 : 0;
    }; // set up scales for horizontal placement


    var xScale = d3Scale.scaleLinear().domain([0, total]).range([0, w - 20]); // create svg in passed in div
    // d3.select("#graphic").selectAll('svg').remove();

    var selection = d3.select('#graphic').append('svg').attr('id', '#svg' + selectedDataset.chartIndex) // .attr('style', 'outline: thin solid #187581;')
    .attr('width', w).attr('height', h).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // legend on top company, period

    selection.selectAll('.legend-label-top').data(_data).enter().append('text').attr('class', 'legend-label-top') // .attr('text-anchor', 'end')
    .attr('font-size', '10px').attr('font-weight', 'bold').attr('x', -15) // .attr('y', (d: any, i) => h / 2 - halfBarHeight * 2.2)
    .attr('y', 0).text((d, index) => index === 0 ? d.company + ', ' + d.period : ''); // stack rect for each data value
    // d3.selectAll('rect').remove();

    selection.selectAll('rect').data(_data).enter().append('rect').attr('class', 'rect-stacked').attr('x', d => xScale(d.cumulative) - 12) // .attr('y', h / 2 - halfBarHeight)
    .attr('y', 20).attr('height', barHeight).attr('width', d => xScale(d.metricpossiblevalues)).style('fill', (d, i) => customColors[i + 4]).text(d => f(d.percent) < 5 ? f(d.percent) + '%, ' + ' ' + d.metricpossible : f(d.percent) + '%'); // add image on top of bar(indicator)
    // d3.selectAll(
    //   '.indicator-row-one',
    // ).remove();

    selection.selectAll('.indicator-row-one').data(_data).enter().append('text').attr('class', 'indicator-row-one').attr('text-anchor', 'middle').attr('font-size', '14px').attr('x', d => xScale(d.cumulative) + xScale(d.metricpossiblevalues) / 2 - 12) // .attr('y', (d: any, i) => h / 2 - halfBarHeight * 1.1)
    .attr('y', (d, i) => 20).text(d => getCompanyIndicator(d).metricvalue === d.metricpossible ? '▼' : ''); // add some labels for percentages
    // d3.selectAll('.text-percent').remove();

    selection.selectAll('.text-percent').data(_data).enter().append('text').attr('class', 'text-percent').attr('text-anchor', 'middle').attr('font-size', '11px').attr('x', d => xScale(d.cumulative) + xScale(d.metricpossiblevalues) / 2 - 12).attr('y', h / 2 - halfBarHeight / 2.5).text(d => f(d.percent) > 5 ? '' : ''); // add the labels below bar
    // d3.select('#svg' + selectedDataset.chartIndex)
    //   .selectAll('text-label')
    //   .remove();

    selection.selectAll('text-label').data(_data).enter().append('text').attr('class', 'text-label').attr('text-anchor', 'middle').attr('font-size', '9px').attr('x', d => xScale(d.cumulative) + xScale(d.metricpossiblevalues) / 2 - 12) // .attr('y', h / 2 + 15)
    .attr('y', 50).style('fill', '#000').attr('width', d => xScale(d.metricpossiblevalues) / 3).html(d => f(d.percent) < 5 ? '' : d.metricpossible + ', <span style="font-weight: bold;">' + f(d.percent) + '%</span>').call(getMetricPossible); // generate polyline points
    // d3.selectAll('polyline').remove();

    selection.selectAll('polylines').data(_data).enter().append('text').style('stroke', 'white').style('fill', 'none').attr('stroke-width', 0).attr('points', (d, index) => f(d.percent) < 5 ? generatePoints(d, index) : ''); // draw polylines

    selection.selectAll('polyline').data(_data).enter().append('polyline').style('stroke', 'black').style('fill', 'none').attr('stroke-width', 0.6).attr('points', (d, index) => f(d.percent) < 5 ? getPoints(d, index) : ''); // append text at the end of line
    // d3.selectAll('line-text').remove();

    selection.selectAll('line-text').data(_data).enter().append('text').attr('class', 'line-text') // .attr('text-anchor', 'middle')
    .attr('text-anchor', (d, index) => getTextAlignment(d, index)).attr('font-size', '9px').attr('x', (d, index) => isNaN(getPolylineEndX(selection, d, index)) ? '' : getPolylineEndX(selection, d, index)).attr('y', (d, index) => getPolylineEndY(d, index) + 2).text(d => f(d.percent) < 5 ? d.metricpossible + ', ' + f(d.percent) + '%' : '');
  };

  return null;
}