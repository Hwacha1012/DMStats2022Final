
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
var height = 240;
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
    //console.log(values3)

    surveyV = Object.values(survey);
    console.log(test[0]);
    var text = "Question " + (indexQ+1) + ": " + surveyV[0][indexQ].question_text;
    console.log(text);
    d3.selectAll('.container').select('h2').text(text);


    console.log(values3);
    var colorIndex = [];

    values4 = values3.slice().sort((a, b) => d3.ascending(a, b))
    console.log(values4);
    values4.forEach(function(d, i){
        for (var x = 0; x < 5; x++){
            if (d == values3[x]){
                colorIndex.splice(x, 0, i);
                console.log(i)
                console.log(colorIndex)

            }
        }
    });
    console.log(colorIndex);

    var highIndex = colorIndex.indexOf(0);
    var lowIndex = colorIndex.indexOf(4);
    colorIndex[highIndex] = 4;
    colorIndex[lowIndex] = 0;

    highIndex = colorIndex.indexOf(1);
    lowIndex = colorIndex.indexOf(3);
    colorIndex[highIndex] = 3;
    colorIndex[lowIndex] = 1;
    console.log(colorIndex);
    //colorIndex = colorIndex.reverse();
    /*
    var len = colorIndex.length;
        for (var i = len-1; i>=0; i--){
            for(var j = 1; j<=i; j++){
                if(values3[j-1]>values3[j]){
                    var temp = colorIndex[j-1];
                    colorIndex[j-1] = colorIndex[j];
                    colorIndex[j] = temp;
                }
            }
        }
        //return arr;
        console.log(colorIndex);

     */
        /*

    values3.forEach(function(d, i){


        if (i > 1){
            if (d > values3[colorIndex.length - 1]){
                colorIndex.push(i);
            }
            else{
                colorIndex.unshift(i);
            }
        }
        if (i > 2){
            if (d > values3[colorIndex.length - 1]){
                colorIndex.push(i);
            }
            else if (d > values3[colorIndex.length - 2]){
                colorIndex.splice(colorIndex.length-2, 0, i);
            }
            else{
                colorIndex.unshift(i);
            }
        }
        if (i > 3){
            if (d > values3[colorIndex.length - 1]){
                colorIndex.push(i);
            }
            else if (d > values3[colorIndex.length - 2]){
                colorIndex.splice(colorIndex.length-2, 0, i);
            }
            else if (d > values3[colorIndex.length - 3]){
                colorIndex.splice(colorIndex.length-3, 0, i);

            }
            else{
                colorIndex.unshift(i);
            }
        }
        else{
            colorIndex.push(i);
        }

    });
    */

    console.log(colorIndex)

    boxes = d3.select("#chart-area2").select("svg").selectAll("rect")
        .data(values3);
    /*
    boxes.enter().append("g")
        .merge(boxes)
        .attr("id", "gBox")
        //.attr("x", function(d, i){ return i * 200})
        //.attr("y", 0)
        .attr("transform", function(d, i) { return "translate(" + i * 200 +", 0" + ")"; });

     */
    boxes.enter().append("rect")
        .merge(boxes)
        .attr("id", "bar")
        .attr("width", 200)
        .attr("height", 200)
        .attr("x", function(d,i){ return ((i) * 200) + 3})
        .attr("y", 3)
        .attr("fill", function(d, i){ return myColor(colorIndex[i])})
        .attr("stroke", "black")
        .attr("stroke-width", 3);


    boxes.enter().append("foreignObject")
        .merge(boxes)
        .attr("width", 200-2*padding)
        .attr("height", 200-2*padding)
        .attr("x", function(d,i){ return (i) * 200 + padding})
        .attr("y", padding)
        .append("xhtml:body")
        .style("font", "18px 'Helvetica Neue'")
        .style("color", "black")
        .style("background-color", function(d, i){ return myColor(colorIndex[i])})
        .html(function(d, i) {
            if (i == 0){
                return "A: " + surveyV[0][indexQ].A.answer_text;
            }
            else if (i == 1){
                return "B: " +surveyV[0][indexQ].B.answer_text;
            }
            else if (i == 2){
                return "C: " +surveyV[0][indexQ].C.answer_text;
            }
            else if (i == 3){
                return "D: " +surveyV[0][indexQ].D.answer_text;
            }
            else if (i == 4){
                return "E: " +surveyV[0][indexQ].E.answer_text;
            }
        });

    /*
    boxes.enter().append("text")
        .merge(boxes)
        .attr("x", function(d,i){ return (i) * 200})
        .attr("y", 100)
        .text(function(d, i) {
            if (i == 0){
                return surveyV[0][indexQ].A.answer_text;
            }
            else if (i == 1){
                return surveyV[0][indexQ].B.answer_text;
            }
            else if (i == 2){
                return surveyV[0][indexQ].C.answer_text;
            }
            else if (i == 3){
                return surveyV[0][indexQ].D.answer_text;
            }
            else if (i == 4){
                return surveyV[0][indexQ].E.answer_text;
            }

        });

    */

    });


    //console.log(percentDiff)
    //console.log(indexQ)


}

