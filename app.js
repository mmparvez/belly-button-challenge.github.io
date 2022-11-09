// const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// // Save JASON data to a file
// d3.json(url).then(function(data) {
//     console.log(data);
//     // Save data to a file
//     d3.writeFile("samples.json", JSON.stringify(data), function(err) {
//       if (err) {
//         return console.log(err);
//       }
//       console.log("The file was saved!");
//     });
// });
// Load JASON data from a file

//Function to plot the bar chart
function barPlot(selectedID) {
 //Read the data from the JSON file
  d3.json("data/samples.json").then(function(data) {
    //Seperate data for plotting
    let samples = data.samples;
    //Filter the data for the selected ID
    let resultArray = samples.filter(sampleObj => sampleObj.id == selectedID);
    let result = resultArray[0];
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    //Create trace in a list for the bar chart
    let barData = [{
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    }];
    //Create layout for the bar chart
    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t:100, l: 160 }
    };
    //Plot the bar chart
    Plotly.newPlot("bar", barData, barLayout);
  });
};

barPlot(940);

//Function for Demographic Info
function demoInfo(selectedID) {
    //Read the data from the JSON file
    d3.json("data/samples.json").then(function(data) {
        //Seperate data for plotting
        let metadata = data.metadata;
        //Filter the data for the selected ID
        let resultArray = metadata.filter(sampleObj => sampleObj.id == selectedID);
        let result = resultArray[0];
        //Select the panel for the demographic info
        let PANEL = d3.select("#sample-metadata");
        //Clear the existing data
        PANEL.html("");
        //Add the demographic info
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
};

demoInfo(940);

//Function for Bubble Chart
function bubbleChart(selectedID) {
    //Read the data from the JSON file
    d3.json("data/samples.json").then(function(data) {
        //Seperate data for plotting
        let samples = data.samples;
        //Filter the data for the selected ID
        let resultArray = samples.filter(sampleObj => sampleObj.id == selectedID);
        let result = resultArray[0];
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
        //Create trace in a list for the bubble chart
        let bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }];
        //Create layout for the bubble chart
        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t:30}
        };
        //Plot the bubble chart
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
};

bubbleChart(940);

//Function for Gauge Chart
function gaugeChart(selectedID) {
    //Read the data from the JSON file
    d3.json("data/samples.json").then(function(data) {
        //Seperate data for plotting
        let metadata = data.metadata;
        //Filter the data for the selected ID
        let resultArray = metadata.filter(sampleObj => sampleObj.id == selectedID);
        let result = resultArray[0];
        let wfreq = result.wfreq;
        //Create trace in a list for the gauge chart
        let gaugeData = [{
            value: wfreq,
            title: { text: "Belly Button Washing Frequency <br> Scrubs per Week" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 9] },
                bar: { 
                    color: "green",  
                    thickness: 0.2
                },
                steps: [
                    { range: [0, 1], color: "rgb(248, 243, 236)" },
                    { range: [1, 2], color: "rgb(239, 234, 220)" },
                    { range: [2, 3], color: "rgb(230, 225, 205)" },
                    { range: [3, 4], color: "rgb(218, 217, 190)" },
                    { range: [4, 5], color: "rgb(204, 209, 176)" },
                    { range: [5, 6], color: "rgb(189, 202, 164)" },
                    { range: [6, 7], color: "rgb(172, 195, 153)" },
                    { range: [7, 8], color: "rgb(153, 188, 144)" },
                    { range: [8, 9], color: "rgb(132, 181, 137)" },
                ]
            }
        }];
   
        //Create layout for the gauge chart
        let gaugeLayout = { 
            width: 600, 
            height: 500, 
            margin: { t: 0, b: 0 },
            showlegend: false,
            // shapes: [{
            //     type: 'point',
            //     showarrow: true,
            //     arrowhead: 9,
            //     x0: 1,
            //     y0: 0,
            //     x1: 0.6,
            //     y1: 0.6,
            //     line: {
            //       color: 'black',
            //       width: 3
            //     }
            //   }]
        };
        //Plot the gauge chart
        Plotly.newPlot("gauge", gaugeData, gaugeLayout);
    });
};

gaugeChart(940);

//Function for the change event
function optionChanged(newID) {
    barPlot(newID);
    demoInfo(newID);
    bubbleChart(newID);
    gaugeChart(newID);
};

//Function for the initial data rendering
function init() {
    //Select the dropdown menu
    let dropdown = d3.select("#selDataset");
    //Read the data from the JSON file
    d3.json("data/samples.json").then(function(data) {
        //Get the ID data to the dropdwon menu
        data.names.forEach(function(id) {
            dropdown.append("option").text(id).property("value");
        });
        //Call the functions to display the data and the plots to the page
        optionChanged(data.names[0]);
    });
};

init();

