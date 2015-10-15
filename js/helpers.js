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
            roundn(5)(13)
*/
var roundn = function(n) {
    return function(m) {
        return(Math.round(m/n)*n);
    }
}



/*
    If given an svg selection and an object of settings, appends a bar chart and returns it
*/
function horizontalBarChart(el, static, dynamic) {

var instance = {};

var dummyData = range(2015,2040)
                    .map(function(d,i) { return 1500 + Math.round(Math.random() * 1000); })
                    .map(function(d,i) { return { key: i + 2015, value: d }; });

/*
var static = {
  start: 2015,
  end: 2040,
  barSize: 75,
  width: 800,
  height: 150,
}

var dynamic = {
  xDomain: range(2015,2040),
  yDomain: [0,2500],
  xmin: 2020,
  xmax: 2030,  
  data: dummyData
}
*/

console.table(dynamic.data);

var svg = d3.select(el);


var bars = svg.selectAll('rect')
            .data(static.data, function(d) { return d.key; });



// RENDER
instance.render = function() {

var xScale = d3.scale.ordinal()
                .domain(static.xDomain)
                .rangeRoundBands([0,800], 0.05);                
var yScale = d3.scale.linear()
                .domain(static.yDomain)
                .range([0,static.barSize]);

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
                    .style('fill', function(d) {
                        return ((d.key >= dynamic.xmin) && (d.key <= dynamic.xmax)) ? '#00b5e2' : '#b5b5b5';                    
                    });  

        var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient('bottom')
                    .tickValues(range(2015,2040,5));
            svg.append('g')
                    .attr('class', 'xAxis')
                    .attr('transform', 'translate(0,' + (static.barSize + 5) + ')')
                    .call(xAxis);

    return instance;
 };
 
 // UPDATE
 instance.update = function(newSettings) {

console.log('updating yChart...');
console.table(newSettings.data);

var xScale = d3.scale.ordinal()
                .domain(static.xDomain)
                .rangeRoundBands([0,800], 0.05);                
var yScale = d3.scale.linear()
                .domain(static.yDomain)
                .range([0,static.barSize]);

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

/*
        var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient('bottom')
                    .tickValues(range(2015,2040,5));
            svg.append('g')
                    .attr('class', 'xAxis')
                    .attr('transform', 'translate(0,' + (static.barSize + 5) + ')')
                    .call(xAxis);
*/

    return instance;
 };
 
 

return instance;
                                       
}                    