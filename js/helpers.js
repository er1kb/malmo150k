/* 
    Generates a range of numbers for use with axis labels etc.
        Examples:
            range(0,10,2) === [0,2,4,6,8,10];
            range(0,10,4) === [0,4,8]; 
*/
var range = function(from,to,step) { 
                        step = step || 1;
                        from = from || 0;                        
                        to = to || 1;
                        
                        var len = to - from + 1;
                        
                        return Array.apply(null, Array(len)).map(function (_, i) {return from+i;})
                                    .filter(function(n,i) { return ((n - from) % step) == 0; } ); 
                                    };
                                    
                                    
/*
    Returns a function which rounds a number to the nearest multiple of another number
        Example:
            var round5 = roundn(5);
            round5(13) === 15;
        same as:
            roundn(5)(13);
*/
var roundn = function(n) {
    return function(m) {
        return(Math.round(m/n)*n);
    }
}



/*
    Cumulative sum of an array. 
        Example:
            cumsum([1,2,3]) === [1,3,6];
*/
var cumsum = function(arr) { return (arr.map(function(n,i) { return arr.slice(0,i+1).reduce(function(x,y) { return x + y; }); })); }



/*
    If given an svg selection and two objects of settings, appends a bar chart and returns it
*/
function horizontalBarChart(el, static, dynamic) {

var instance = {};
var svg = d3.select(el);
var bars = svg.selectAll('rect')
            .data(static.data, function(d) { return d.key; });

var xScale = d3.scale.ordinal()
                .domain(static.xDomain)
                .rangeRoundBands([0,800], static.gap);                
var yScale = d3.scale.linear()
                .domain(static.yDomain)
                .range([0,static.barSize]);


// RENDER CHART
instance.render = function() {

                bars
                    .enter()
                    .append('rect')
                    .attr({ width: xScale.rangeBand(),
                        height: function(d) { return yScale(d.value); },
                        x: function(d) { return xScale(d.key); },
                        y: function(d) { return 75 - yScale(d.value); },   //-----//
                        year: function(d) { return d.key; },
                        value: function(d) { return d.value; }                   
                    })
                    .style('fill', 'white');  

        var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient('bottom')
                    .tickValues(static.tickValues);
            svg.append('g')
                    .attr('class', 'xAxis')
                    .attr('transform', 'translate(0,' + (static.barSize + 5) + ')')
                    .call(xAxis);

            svg.append('text')
                .text(static.xLabel)
                .style('font-size', 18)
                .attr({ x: 0, y: 20 });    

    return instance;
 };
 
// UPDATE CHART
instance.update = function(newSettings) {


/*
var xScale = d3.scale.ordinal()
                .domain(static.xDomain)
                .rangeRoundBands([0,800], 0.05);                
var yScale = d3.scale.linear()
                .domain(static.yDomain)
                .range([0,static.barSize]);
*/

                bars
                    .attr({ width: xScale.rangeBand(),
                        height: function(d) { return yScale(d.value); },
                        x: function(d) { return xScale(d.key); },
                        y: function(d) { return 75 - yScale(d.value); },   //-----//
                        year: function(d) { return d.key; },
                        value: function(d) { return d.value; }                   
                    })
                    .style('fill', function(d) {
                        return ((d.key >= newSettings.xmin) && (d.key <= newSettings.xmax)) ? '#00b5e2' : '#b5b5b5';                    
                    });

                bars.exit().remove();


    return instance;
 };

return instance;
                                       
}                    







/*
    If given an svg selection and two objects of settings, appends a bar chart and returns it
*/
function verticalBarChart(el, static, dynamic) {

var instance = {};
var svg = d3.select(el);
var bars = svg.selectAll('rect')
            .data(static.data, function(d) { return d.key; });

var xScale = d3.scale.ordinal()
                .domain(static.xDomain)
                .rangeRoundBands([static.height,0], static.gap);                
var yScale = d3.scale.linear()
                .domain(static.yDomain)
                .range([0,static.barSize]);


// RENDER CHART
instance.render = function() {

                bars
                    .enter()
                    .append('rect')
                    .attr({ height: xScale.rangeBand(),
                        width: function(d) { return Math.abs(yScale(d.value)); },
                        y: function(d) { return xScale(d.key); },
                        x: function(d) { return yScale(d.value) >= 0 ? static.barSize - yScale(d.value) : static.barSize; },   //-----//
                        age: function(d) { return d.key; },
                        value: function(d) { return d.value; }                   
                    })
                    .style('fill', 'white');  

        var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient('right')
                    .tickValues(static.tickValues);
            svg.append('g')
                    .attr('class', 'xAxis')
                    .attr('transform', 'translate(' + (static.barSize + 5) + ',0)')
                    .call(xAxis);

            svg.append('text')
                .text(static.xLabel)
                .style('font-size', 18)
                .attr({ x: 10, y: 20 });    

    return instance;
 };
 
// UPDATE CHART
instance.update = function(newSettings) {

console.log('updating aChart...');

/*
var xScale = d3.scale.ordinal()
                .domain(static.xDomain)
                .rangeRoundBands([0,800], 0.05);                
var yScale = d3.scale.linear()
                .domain(static.yDomain)
                .range([0,static.barSize]);
*/

                bars
                    .attr({ height: xScale.rangeBand(),
                        width: function(d) { return Math.abs(yScale(d.value)); },
                        y: function(d) { return xScale(d.key); },
                        x: function(d) { return yScale(d.value) >= 0 ? static.barSize - yScale(d.value) : static.barSize; },   //-----//
                        age: function(d) { return d.key; },
                        value: function(d) { return d.value; }                   
                    })
                    .style('fill', function(d) {
                        return ((d.key >= newSettings.xmin) && (d.key <= newSettings.xmax)) ? '#00b5e2' : '#b5b5b5';                    
                    });  

                bars.exit().remove();


    return instance;
 };

return instance;
                                       
}                    

