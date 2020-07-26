var marginRegionBar = { top: 40, right: 30, bottom: 30, left: 50 },
    marginRegionWidth = 460 - marginRegionBar.left - marginRegionBar.right,
    marginRegionHight = 320 - marginRegionBar.top - marginRegionBar.bottom;

var greyColor = "#898989";
var barColor = d3.interpolateInferno(0.4);
var highlightColor = d3.interpolateInferno(0.3);

var formatPercent = d3.format("s");

var svgBar = d3.select("regionsGraphDiv").append("svg")
    .attr("width", marginRegionWidth + marginRegionBar.left + marginRegionBar.right)
    .attr("height", marginRegionHight + marginRegionBar.top + marginRegionBar.bottom)
    .append("g")
    .attr("transform", "translate(" + marginRegionBar.left + "," + marginRegionBar.top + ")");

var xBar = d3.scaleBand()
    .range([0, marginRegionWidth])
    .padding(0.4);
var yBar = d3.scaleinear()
    .range([marginRegionHight, 0]);

var xAxisBar = d3.axisBottom(xBar).tickSize([]).tickPadding(5);
var yAxisBar = d3.axisLeft(yBar).tickFormat(formatPercent);

var datasetBarChart = [{ "region": "Africa", "value": 59979, "year": 1990 }, { "region": "Americas", "value": 9650773, "year": 1980 }, { "region": "Asia", "value": 3659432, "year": 1987 }, { "region": "Europe", "value": 7344447, "year": 1994 }, { "region": "Oceania", "value": 1134890, "year": 1998 }];

xBar.domain(datasetBarChart.map(d => { return d.region; }));
// y.domain([0, d3.max(dataset,  d => { return d.value; })]);
yBar.domain([0, 9650773]);

svgBar.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + marginRegionHight + ")")
    .call(yAxisBar);
svgBar.append("g")
    .attr("class", "y axis")
    .call(yAxis);

svgBar.selectAll(".bar")
    .data(dataset)
    .enter().append("rect")
    .attr("class", "bar")
    .style("display", d => { return d.value === null ? "none" : null; })
    .style("fill", d => {
        return color(d.region)
    })
    .attr("x", d => { return xBar(d.region); })
    .attr("width", xBar.bandwidth())
    .attr("y", d => { return marginRegionHight; })
    .attr("height", 0)
    .transition()
    .duration(750)
    .delay(function(d, i) {
        return i * 150;
    })
    .attr("y", d => { return yBar(d.value); })
    .attr("height", d => { return marginRegionHight - yBar(d.value); });

svgBar.selectAll(".label")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class", "label")
    .style("display", d => { return d.value === null ? "none" : null; })
    .attr("x", (d => { return xBar(d.year) + (x.bandwidth() / 2) - 8; }))
    .style("fill", d => {
        return d.value === d3.max(dataset, d => { return d.value; }) ?
            highlightColor : greyColor
    })
    .attr("y", d => { return marginRegionHight; })
    .attr("height", 0)
    .transition()
    .duration(750)
    .delay((d, i) => { return i * 150; })
    .text(d => { return formatPercent(d.value); })
    .attr("y", d => { return yBar(d.value) + .1; })
    .attr("dy", "-.7em");