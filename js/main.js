
curr_School = 'Harvard'

var survey;

loadData();


//d3.select("#ranking-type").on("change", updateVisualization);

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
        updateVisualization()
    }
});





// Step 1: Define an SVG drawing area with our margin conventions. Append
// the drawing area to the div with id chart-area2
var padding = 20;
var height = 200;
var width = 1000;

var margin = {top: 30, right: 30, left: 30, bottom: 50};
svgSchools = d3.select("#chart-area2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Step 2: Create scales for x and y.
// Hint: You should use scaleBand() for x. What should you use for y?
// var xExtent = d3.extent(data, function(d) { return d.songs; }),
//    xRange = xExtent[1] - xExtent[0],
//    yExtent = d3.extent(data, function(d) { return d.streams_in_mils; }),
//    yRange = yExtent[1] - yExtent[0];

//var padding = 20;
//var houseScale = d3.scaleBand();
    //.domain([xExtent[0] - (xRange * .1), xExtent[1] + (xRange * .1)])
    //.range([padding, width-padding]);
//var yScale = d3.scaleLinear();
    //.domain([yExtent[0] - (yRange * .1), yExtent[1] + (yRange * .1)])
    //.range([padding, height-padding]);

var barScale = d3.scaleLinear();
var myColor = d3.scaleLinear().domain([0,4]).range(["#D7525B", "white"]);

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
        console.log(data);
        //console.log(window.data)
        // updateSchoolsVisualization gets automatically called within the data = csv call;
        // basically(whenever the data is set to a value using = operator);
        // see the definition above: Object.defineProperty(window, 'data', { ...

    });



}

// Render visualization
function updateVisualization() {
   // survey = window.survey2;
    d3.json('data/survey2021.json', function(error, json) {
        survey = json;
        console.log(survey)
    var data = window.data;
    var indexQ = 0;
    var test = Object.values(data[0]);
    var percentDiff = (Math.max.apply(Math, test))/Math.min.apply(Math, test);
    console.log(percentDiff);


    data.forEach(function(d, i){
        //console.log("here")
        values = Object.values(d);
        pDiff = Math.max.apply(Math, values)/Math.min.apply(Math, values);
        console.log(pDiff)
        if (pDiff > percentDiff ){
            percentDiff = pDiff;
            indexQ = i;
        }

    });

    values3 = Object.values(data[indexQ]);
    console.log(values3)

    test = Object.values(survey);
    console.log(test[0]);
    var text = "Question " + (indexQ+1) + ": " + test[0][indexQ].question_text;
    console.log(text);
    d3.selectAll('.container').select('h2').text(text);

    boxes = d3.select("#chart-area2").select("svg").selectAll("rect")
        .data(values3);
    boxes.enter().append("rect")
        .merge(boxes)
        .attr("id", "bar")
        .attr("width", 200)
        .attr("height", 200)
        .attr("x", function(d,i){ return i * 200})
        .attr("y", 0)
        .attr("fill", function(d, i){ return myColor(i)})




    });


    //console.log(percentDiff)
    //console.log(indexQ)


}

