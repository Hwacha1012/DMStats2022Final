// Part 1: 

var svg = d3.select("#chart-area1")
    .append("svg")
    .attr("width", 800)
    .attr("height", 200)
    .append("g");

var textLine = svg.append("text")
    .attr("x", 20)
    .attr("y", 100)
    .text("Orders");


// this function is being called from data-generator.js
function updateVisualization(orders) {
    console.log(orders);

    // Step 1: Append new circles for new orders
    // The color of the circle should be brown for coffee orders and green for tea
    // Radius should vary with the price

    circle = d3.select("#chart-area1").select("svg").selectAll("circle")
        .data(orders);
    circle.enter().append("circle")
        .merge(circle)
        .attr("r", function (d){
            return d.price * 5
        })
        .attr("fill", function(d){
            if (d.product == 'coffee'){
                return "brown"
            }
            else{
                return "green"
            }
        })
        .attr("cx", function (d, i){
            return 30 + i * 50

        })
        .attr("cy", 25);
    console.log("drawn?")
    // Step 2: Delete elements that have been removed from orders
    circle.exit().remove();

    // Step 3: Update the text label
    //textLine.data(orders);
    textLine.enter().append("text").merge(textLine)
        .text("Orders: " + orders.length);
    textLine.exit().remove();

}

// -------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------


// Part 2: Assignment - Synthesis of everything we've learned!

loadData();

d3.select("#ranking-type").on("change", updateSchoolsVisualization());

// Create a 'data' property under the window object
// to store the coffee chain data
Object.defineProperty(window, 'data', {
    // data getter
    get: function() { return _data; },
    // data setter
    set: function(value) {
        _data = value;
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


function loadData() {
    d3.csv("data/house-signups.csv", function(error, csv) {

        // Step 3: Get the data ready: change numeric fields to being numbers!
        csv.forEach(function(d){

            d.population = +d.population;
            d.percent_signup = +d.percent_signup;
        });
        //return(data);

        // Store csv data in global variable
        data = csv;
        console.log(data)
        // updateSchoolsVisualization gets automatically called within the data = csv call;
        // basically(whenever the data is set to a value using = operator);
        // see the definition above: Object.defineProperty(window, 'data', { ...

    });
}

// Render visualization
function updateSchoolsVisualization() {

    // Step 5: Sort the Harvard houses by population,
    // and display the sorted data in the bar chart. Use the sort function
    // and provide it with an anonymous function.



    // Step 6: Get the currently selected option from the select box using D3



    // Step 7: Change the scales, the sorting and the dynamic
    // properties in a way that they correspond to the selected option
    // (population or signup percentage).
    // Hint: You can access JS object properties with bracket notation (product["price"])



    // Step 4: Implement the bar chart for number of population
    // -  Specify domains for the two scales
    // -  Implement the enter-update-exit sequence for rect elements
    // -  Use class attribute bar for the rects

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


    // Step 9: Add transitions to the bars/rectangles of your chart


    // Step 10: Add transitions to the x and y axis
}