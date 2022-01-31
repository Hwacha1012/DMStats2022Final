
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
        //updateVisualization2()
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

var selectedBox = 0;
var reDraw = false;
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
        //var inForeign = false;

        console.log(values4);

        /*
        while (reDraw){
            console.log("redraw");
            updateVisualization();

            reDraw = false;
        }

         */
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
            .attr("stroke-width", 3)
            .on('mouseover', function(d, i) {
                //console.log("in")
                selectedBox = i+1;
                //reDraw = true;
                //updateVisualization();

                d3.select(this)
                    .transition()
                    .attr("width", 200)
                    .attr("height", 300);
                draw2();
                //updateVisualization2();

                //d3.selectAll(".textBox").remove()
                //d3.selectAll(".textBox").update



                //.attr("x", function(d,i){ return ((i) * 250) + 3});
                //reD();
                // setTimeout(100);
                // reD();
            })
            .on('mouseout', function(d, i) {
                //console.log("out")
                //setTimeout(10000);
                selectedBox = 0;
                d3.select(this)
                    .transition()
                    .attr("width", 200)
                    .attr("height", 200);

                draw2();


                //.attr("x", function(d,i){ return ((i) * 250) + 3});
            });
        boxes.exit().remove();
        draw2();

        function draw2(){
            boxes.enter().append("foreignObject")
                .merge(boxes)
                .attr("width", 200-2*padding)
                .attr("height", 200-2*padding)
                .attr("x", function(d,i){ return (i) * 200 + padding})
                .attr("y", padding)
                .attr("fill", "none")
                .style("pointer-events", "none")
                .append("xhtml:body")
                .attr("class", "textBox")
                .style("font", "18px 'Helvetica Neue'")
                .style("color", "black")
                .style("background-color", function(d, i){ return myColor(colorIndex[i])})

                //.style("pointer-events", "none")
                .html(function(d, i) {
                    if (i == 0){
                        //console.log("i is 0?")
                        if (selectedBox == 1){
                            //console.log("hi")
                            return "A: " + surveyV[0][indexQ].A.answer_text + "<br>" + "hi1";
                        }
                        else{
                            //console.log("hey")
                            return "A: " + surveyV[0][indexQ].A.answer_text;
                        }

                    }
                    else if (i == 1){
                        if (selectedBox == 2){
                            //console.log("hi")
                            return "B: " + surveyV[0][indexQ].B.answer_text + "<br> " + "hi2";
                        }
                        else{
                            //console.log("hey")
                            return "B: " + surveyV[0][indexQ].B.answer_text;
                        }

                    }
                    else if (i == 2){
                        if (selectedBox == 3){
                            //console.log("hi")
                            return "C: " + surveyV[0][indexQ].C.answer_text + "<br>" + "hi3";
                        }
                        else{
                            //console.log("hey")
                            return "C: " + surveyV[0][indexQ].C.answer_text;
                        }
                    }
                    else if (i == 3){
                        if (selectedBox == 4){
                            //console.log("hi")
                            return "D: " + surveyV[0][indexQ].D.answer_text + "\n" + "hi4";
                        }
                        else{
                            //console.log("hey")
                            return "D: " + surveyV[0][indexQ].D.answer_text;
                        }
                    }
                    else if (i == 4){
                        if (selectedBox == 5){
                            //console.log("hi")
                            return "E: " + surveyV[0][indexQ].E.answer_text + "\n" + "hi5";
                        }
                        else{
                            //console.log("hey")
                            return "E: " + surveyV[0][indexQ].E.answer_text;
                        }
                    }
                });
            boxes.exit().remove();

        }

        boxes.exit().remove();
        //draw2();

    });


    //console.log(percentDiff)
    //console.log(indexQ)



}

console.log("here?")
function reD(){
    console.log("redraw2");
    updateVisualization();

    reDraw = false;
}
