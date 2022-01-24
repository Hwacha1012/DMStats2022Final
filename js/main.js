
curr_School = 'Harvard'


loadData();

d3.select("#ranking-type").on("change", updateSchoolsVisualization);

// var _data = [];
// Create a 'data' property under the window object
// to store the coffee chain data
Object.defineProperty(window, 'data', {
    // data getter
    get() { return this._data; },
    // data setter
    set(value) {
        //console.log(_data);
        this._data = value;
        // update the visualization each time the data property is set by using the equal sign (e.g. data = [])
        updateSchoolsVisualization()
    }
});



// Step 1: Define an SVG drawing area with our margin conventions. Append
// the drawing area to the div with id chart-area2
var margin = {top: 30, right: 30, left: 30, bottom: 50};
svgSchools = d3.select("#chart-area2").append("svg")
    .attr("width", 800 + margin.left + margin.right)
    .attr("height", 200 + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Step 2: Create scales for x and y.
// Hint: You should use scaleBand() for x. What should you use for y?
// var xExtent = d3.extent(data, function(d) { return d.songs; }),
//    xRange = xExtent[1] - xExtent[0],
//    yExtent = d3.extent(data, function(d) { return d.streams_in_mils; }),
//    yRange = yExtent[1] - yExtent[0];

//var padding = 20;
var houseScale = d3.scaleBand();
    //.domain([xExtent[0] - (xRange * .1), xExtent[1] + (xRange * .1)])
    //.range([padding, width-padding]);
var yScale = d3.scaleLinear();
    //.domain([yExtent[0] - (yRange * .1), yExtent[1] + (yRange * .1)])
    //.range([padding, height-padding]);

//console.log(`data/${curr_School}MatchData.csv`);

function loadData() {
    d3.csv(`data/${curr_School}MatchData.csv`, function(error, csv) {

        // Step 3: Get the data ready: change numeric fields to being numbers!
        csv.forEach(function(d){
            d.Value1 = +d.Value1;
            d.Value2 = +d.Value2;
            d.Value3 = +d.Value3;
            d.Value4 = +d.Value4;
            d.Value5 = +d.Value5;

        });
        //return(data);

        // Store csv data in global variable
        //console.log(csv)
        data = csv;
        console.log(data)
        //console.log(window.data)
        // updateSchoolsVisualization gets automatically called within the data = csv call;
        // basically(whenever the data is set to a value using = operator);
        // see the definition above: Object.defineProperty(window, 'data', { ...

    });
}

// Render visualization
function updateSchoolsVisualization() {
    // console.log(data)
    var data = window.data;
    // Step 5: Sort the Harvard houses by population,
    // and display the sorted data in the bar chart. Use the sort function
    // and provide it with an anonymous function.
    //console.log(data)
    sortedData = data.slice().sort((a, b) => d3.descending(a.population, b.population))
    console.log(sortedData)



    // Step 6: Get the currently selected option from the select box using D3
    var selectedOption = d3.select('#ranking-type').property('value')
    //var test2= test.select(this).property('value')
    // console.log(test)


    // Step 7: Change the scales, the sorting and the dynamic
    // properties in a way that they correspond to the selected option
    // (population or signup percentage).
    // Hint: You can access JS object properties with bracket notation (product["price"])
    var yExtent;
    if (selectedOption == "population"){
        sortedData = data.slice().sort((a, b) => d3.descending(a.population, b.population));
        yExtent = d3.extent(sortedData, function(d) { return d.population; });
    }
    else if (selectedOption == "signup-percent"){
        sortedData = data.slice().sort((a, b) => d3.descending(a.percent_signup, b.percent_signup));
        yExtent = d3.extent(sortedData, function(d) { return d.percent_signup; });
    }
    console.log(sortedData)

    // Step 4: Implement the bar chart for number of population
    // -  Specify domains for the two scales
    // -  Implement the enter-update-exit sequence for rect elements
    // -  Use class attribute bar for the rects
   // console.log("data ");
    //console.log(window.data);

//var xExtent = d3.extent(sortedData, function(d) { return d.house; }),
//   xRange = xExtent[1] - xExtent[0],;

   // var yRange = yExtent[1] - yExtent[0];
console.log(yExtent[0]);
console.log(yExtent[1]);


var padding = 20;
var height = 200;
var width = 800;
// houseScale
//     .domain([xExtent[0] - (xRange * .1), xExtent[1] + (xRange * .1)])
//     .range([padding, width-padding]);
// yScale
//     .domain([yExtent[0] - (yRange * .1), yExtent[1] + (yRange * .1)])
//     .range([padding, height-padding]);
houseScale.domain(["Leverett", "Adams", "Quincy", "Eliot", "Lowell", "Winthrop", "Kirkland", "Dunster", "Cabot", "Mather", "Currier", "Pfoho"])
    .range([padding, width-padding]);
yScale.domain([yExtent[0], yExtent[1]]).range([height-padding, padding]);

console.log(yScale(0));
console.log(yScale(300));
console.log(yScale(499));
console.log(houseScale("one"));

var myColor = d3.scaleLinear().domain([0,11]).range(["red", "white"]);
var myColor2 = d3.scaleLinear().domain([0,11]).range(["purple", "white"]);

houses = d3.select("#chart-area2").select("svg").selectAll("rect")
    .data(sortedData);
if (selectedOption == "population"){

    houses.enter().append("rect")
        .merge(houses)
        .attr("id", "bar")
        .attr("width", houseScale.bandwidth())
        .transition().duration(2000).attr("height", function(d) { return height - yScale(d.population); }).attr("fill", function(d, i){ return myColor(i)})
        .attr("x", function(d, i) { return i * houseScale.bandwidth(); })
        .attr("y", function(d) { return yScale(d.population); })
        //.transition().duration(1000)

    houses.exit().remove();

}
else if (selectedOption == "signup-percent"){
    houses.enter().append("rect")
        .merge(houses)
        .attr("id", "bar")
        .attr("width", houseScale.bandwidth())
        .transition().duration(2000).attr("height", function(d) { return height - yScale(d.percent_signup); }).attr("fill", function(d, i){ return myColor2(i)})
        .attr("x", function(d, i) { return i * houseScale.bandwidth(); })
        .attr("y", function(d) { return yScale(d.percent_signup); })


    houses.exit().remove();
}

    /* You can use this code to position the elements

        .attr("x", function(d) { return x(d.house); })
        .attr("y", function(d) { return y(d.population); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.population); }) 
    
    */



    // Step 8: Append dynamic axes.
    // Use the following HTML class attributes:
    // x-axis and axis for the x-axis
    // y-axis and axis for the y-axis
    if (selectedOption == "population"){
        houseScale.domain(["Leverett", "Adams", "Quincy", "Eliot", "Lowell", "Winthrop", "Kirkland", "Dunster", "Cabot", "Mather", "Currier", "Pfoho"])
            .range([padding, width-padding]);
    }
    else if (selectedOption == "signup-percent"){
        houseScale.domain(["Adams", "Dunster", "Eliot", "Quincy", "Cabot", "Leverett", "Mather", "Winthrop", "Lowell", "Currier", "Kirkland", "Pfoho"])
            .range([padding, width-padding]);
    }
    var xAxis = d3.axisBottom().scale(houseScale);
    var yAxis = d3.axisRight().scale(yScale);
    d3.select("#chart-area2").select("svg").selectAll("g").remove()
    //console.log(width)
    d3.select("#chart-area2").select("svg")
        .append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(-" + (houseScale.bandwidth() / 3)+ ", 0)")
        .transition().duration(2000).call(xAxis);
    d3.select("#chart-area2").select("svg")
        .append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate("+(width-padding)+",0)")
        //.attr("transform", "translate("+(padding)+",)")
        .transition().duration(2000).call(yAxis);

    // function updateAxes(){
    //     var xAxis = d3.axisBottom().scale(houseScale);
    //     var yAxis = d3.axisRight().scale(yScale);
    //     d3.select("#chart-area2").select("svg").selectAll("g").remove()
    //     //console.log(width)
    //     d3.select("#chart-area2").select("svg")
    //         .append("g")
    //         .attr("class", "xAxis")
    //         .attr("transform", "translate(-" + (houseScale.bandwidth() / 3)+ ", 0)")
    //         .call(xAxis);
    //     d3.select("#chart-area2").select("svg")
    //         .append("g")
    //         .attr("class", "yAxis")
    //         .attr("transform", "translate("+(width-padding)+",0)")
    //         //.attr("transform", "translate("+(padding)+",)")
    //         .call(yAxis);
    // }

   // yAxe.exit().remove();
    // Step 9: Add transitions to the bars/rectangles of your chart
    //added these earlier up under step 8


    // Step 10: Add transitions to the x and y axis
    //added these earlier up under step 4
}