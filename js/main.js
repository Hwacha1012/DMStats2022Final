
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
var height = 400;
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

//var barScale = d3.scaleLinear();
var myColor = d3.scaleLinear().domain([0,4]).range(["#D7525B", "white"]);

//var myColor2 = d3.scaleLinear().domain([0,100]).range(["#D7525B", "white"]);
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
        //console.log(data);
        //console.log(window.data)
        // updateSchoolsVisualization gets automatically called within the data = csv call;
        // basically(whenever the data is set to a value using = operator);
        // see the definition above: Object.defineProperty(window, 'data', { ...

    });



}

var selectedBox = 0;
var reDraw = false;


//for drawing scale
scale = d3.scaleBand();
scale.domain(["More Matches", "Fewer Matches"])
    .range([-20, 245]);
axis = d3.axisBottom().scale(scale);

var colors = [ '#D7525B', 'rgb(255,255,255)' ];

var svg = d3.select('#legend')
    .append('svg')
    .attr('width', 250)
    .attr('height', 60);

var grad = svg.append('defs')
    .append('linearGradient')
    .attr('id', 'grad')
    .attr('x1', '0%')
    .attr('x2', '100%')
    .attr('y1', '0%')
    .attr('y2', '0%');

grad.selectAll('stop')
    .data(colors)
    .enter()
    .append('stop')
    .style('stop-color', function(d){ return d; })
    .attr('offset', function(d,i){
        return 100 * (i / (colors.length - 1)) + '%';
    })

svg.append('rect')
    .attr('x', 1)
    .attr('y', 25)
    .attr('width', 230)
    .attr('height', 25)
    .attr("stroke", "#1F1717")
    .attr("stroke-width", 1)
    .style('fill', 'url(#grad)');
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(1, 0)")
    .call(axis);







// Render visualization
function updateVisualization() {
    // survey = window.survey2;
    d3.json('data/survey2021.json', function(error, json) {
        survey = json;
        //console.log(survey)
        var data = window.data;
        var indexQ = 0;
        var test = Object.values(data[0]);
        var percentDiff = (Math.max.apply(Math, test))/Math.min.apply(Math, test);
        //console.log(percentDiff);


        data.forEach(function(d, i){
            //console.log("here")
            values = Object.values(d);
            pDiff = Math.max.apply(Math, values)/Math.min.apply(Math, values);
            //console.log(pDiff)
            if (pDiff > percentDiff ){
                percentDiff = pDiff;
                indexQ = i;
            }

        });

        values3 = Object.values(data[indexQ]);
        //console.log(values3)

        surveyV = Object.values(survey);
        //console.log(test[0]);
        var text = "Question " + (indexQ+1) + ": " + surveyV[0][indexQ].question_text;
        //console.log(text);
        d3.selectAll('.container').select('h2').text(text);


        //console.log(values3);
        var colorIndex = [];

        values4 = values3.slice().sort((a, b) => d3.ascending(a, b))
        //console.log(values4);
        values4.forEach(function(d, i){
            for (var x = 0; x < 5; x++){
                if (d == values3[x]){
                    colorIndex.splice(x, 0, i);
                    //console.log(i)
                    //console.log(colorIndex)

                }
            }
        });
        //console.log(colorIndex);

        var highIndex = colorIndex.indexOf(0);
        var lowIndex = colorIndex.indexOf(4);
        colorIndex[highIndex] = 4;
        colorIndex[lowIndex] = 0;

        highIndex = colorIndex.indexOf(1);
        lowIndex = colorIndex.indexOf(3);
        colorIndex[highIndex] = 3;
        colorIndex[lowIndex] = 1;

        var letter;
        if (colorIndex.indexOf(4) == 0){
            letter = "A";
        }
        else if (colorIndex.indexOf(4) == 1){
            letter = "B";
        }
        else if (colorIndex.indexOf(4) == 2){
            letter = "C";
        }
        else if (colorIndex.indexOf(4) == 3){
            letter = "D";
        }
        else if (colorIndex.indexOf(4) == 4){
            letter = "E";
        }


        //
        //console.log(colorIndex);
        //var inForeign = false;

        //console.log(values4);

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
            .attr("stroke", "#1F1717")
            .attr("stroke-width", 3)
            .on('mouseover', function(d, i) {
                selectedBox = i+1;
                d3.select(this)
                    .transition().duration(50)
                    //.transition()
                    .attr("width", 200)
                    .attr("height", 400);
                //setTimeout(10000);
                draw2();



            })
            .on('mouseout', function(d, i) {

                selectedBox = 0;
                d3.select(this)
                    .transition()
                    .attr("width", 200)
                    .attr("height", 200);
                //setTimeout(10000);
                draw3();


            });
        //boxes.exit().remove();
        draw2();

        //console.log(colorIndex);
        //console.log(values3);
        //console.log(values4);
        function draw2(){
            //boxes2 = d3.select("#chart-area2").select("svg").selectAll("rect")
               // .data(values3);
            //
            //setTimeout(1000);
            boxes.enter().append("foreignObject")
                .merge(boxes)
                .attr("height", function(d,i){
                    if (i+1 == selectedBox){
                        return 400-2*padding;
                    }
                    return 200-2*padding;
                })
                .attr("width", 200-2*padding)
                .attr("x", function(d,i){ return (i) * 200 + padding})
                .attr("y", padding)
                .attr("fill", "none")
                .style("pointer-events", "none")
                .append("xhtml:body")
                .attr("class", "textBox")
                .style("font", "18px 'Helvetica Neue'")
                .style("color", "#1F1717")
                .style("background-color", function(d, i){ return myColor(colorIndex[i])})
                .html(function(d, i) {
                    if (i == 0){
                        //console.log("i is 0?")
                        //setTimeout(10000);
                        if (selectedBox == 1){
                            //console.log("hi")
                            if (colorIndex[i] == 4){
                                return "A: " + surveyV[0][indexQ].A.answer_text + "<br> <br> " + "Users who chose this response received on average, fewer matches than users who chose other responses.";
                            }
                            else{
                                return "A: " + surveyV[0][indexQ].A.answer_text + "<br> <br> " + "Users who chose this response got on average, " + Number((values3[i]/values4[0]).toFixed(3)) + "x the matches of users who chose option " + letter + ", which had the fewest matches.";
                            }

                        }
                        else{
                            //console.log("A: " + selectedBox);
                            return "A: " + surveyV[0][indexQ].A.answer_text;
                        }

                    }
                    else if (i == 1){
                        if (selectedBox == 2){
                            //console.log("hi")

                            if (colorIndex[i] == 4){
                                return "B: " + surveyV[0][indexQ].B.answer_text + "<br> <br> " + "Users who chose this response received on average, fewer matches than users who chose other responses.";
                            }
                            else{
                                return "B: " + surveyV[0][indexQ].B.answer_text + "<br> <br> " + "Users who chose this response got on average, " + Number((values3[i]/values4[0]).toFixed(3)) + "x the matches of users who chose option " + letter + ", which had the fewest matches.";
                            }
                        }
                        else{
                            //console.log("B: " + selectedBox);
                            return "B: " + surveyV[0][indexQ].B.answer_text;
                        }

                    }
                    else if (i == 2){
                        if (selectedBox == 3){
                            //console.log("hi")
                            if (colorIndex[i] == 4){
                                return "C: " + surveyV[0][indexQ].C.answer_text + "<br> <br> " + "Users who chose this response received on average, fewer matches than users who chose other responses.";
                            }
                            else{
                                return "C: " + surveyV[0][indexQ].C.answer_text + "<br> <br> " + "Users who chose this response got on average, " + Number((values3[i]/values4[0]).toFixed(3)) + "x the matches of users who chose option " + letter + ", which had the fewest matches.";
                            }
                        }
                        else{
                            //console.log("C: " + selectedBox);
                            return "C: " + surveyV[0][indexQ].C.answer_text;
                        }
                    }
                    else if (i == 3){
                        if (selectedBox == 4){
                            //console.log("hi")
                            if (colorIndex[i] == 4){
                                return "D: " + surveyV[0][indexQ].D.answer_text + "<br> <br> " + "Users who chose this response received on average, fewer matches than users who chose other responses.";
                            }
                            else{
                                return "D: " + surveyV[0][indexQ].D.answer_text + "<br> <br> " + "Users who chose this response got on average, " + Number((values3[i]/values4[0]).toFixed(3)) + "x the matches of users who chose option " + letter + ", which had the fewest matches.";
                            }
                        }
                        else{
                            //console.log("D: " + selectedBox);
                            return "D: " + surveyV[0][indexQ].D.answer_text;
                        }
                    }
                    else if (i == 4){
                        if (selectedBox == 5){
                            //console.log("hi")
                            if (colorIndex[i] == 4){
                                return "E: " + surveyV[0][indexQ].E.answer_text + "<br> <br> " + "Users who chose this response received on average, fewer matches than users who chose other responses.";
                            }
                            else{
                                return "E: " + surveyV[0][indexQ].E.answer_text + "<br> <br> " + "Users who chose this response got on average, " + Number((values3[i]/values4[0]).toFixed(3)) + "x the matches of users who chose option " + letter + ", which had the fewest matches.";
                            }
                        }
                        else{
                            //console.log("E: " + selectedBox);
                            return "E: " + surveyV[0][indexQ].E.answer_text;
                        }
                    }
                });
            boxes.exit().remove();

        }

        function draw3(){
            //boxes2 = d3.select("#chart-area2").select("svg").selectAll("rect")
            // .data(values3);
            //console.log("draw3");
            d3.selectAll(".textBox").remove();
            //setTimeout(1000);
            boxes.enter().append("foreignObject")
                .merge(boxes)
                .attr("height", function(d,i){
                    if (i+1 == selectedBox){
                        return 300-2*padding;
                    }
                    return 200-2*padding;
                })
                .attr("width", 200-2*padding)
                .attr("x", function(d,i){ return (i) * 200 + padding})
                .attr("y", padding)
                .attr("fill", "none")
                .style("pointer-events", "none")
                .append("xhtml:body")
                .attr("class", "textBox")
                .style("font", "18px 'Helvetica Neue'")
                .style("color", "#1F1717")
                .style("background-color", function(d, i){ return myColor(colorIndex[i])})
                .html(function(d, i) {
                    if (i == 0){
                        //console.log("hi")
                        return "A: " + surveyV[0][indexQ].A.answer_text;
                    }
                    else if (i == 1){
                        return "B: " + surveyV[0][indexQ].B.answer_text;
                    }
                    else if (i == 2){
                        return "C: " + surveyV[0][indexQ].C.answer_text;
                    }
                    else if (i == 3){
                        return "D: " + surveyV[0][indexQ].D.answer_text;
                    }
                    else if (i == 4){
                        return "E: " + surveyV[0][indexQ].E.answer_text;
                    }
                });
            boxes.exit().remove();

        }

        //boxes.exit().remove();
        //draw2();

    });


    //console.log(percentDiff)
    //console.log(indexQ)



}

//console.log("here?")

