
// Use navbar to change text

const tabs = document.querySelector(".tabs");
const texts = document.querySelectorAll (".text");
const navs = document.querySelectorAll(".nav")

function changeText (event){
    let targetText = document.querySelector(event.target.dataset.target);

    navs.forEach(function(nav){
        if (nav === event.target){
            nav.classList.add("active");
        } else {
            nav.classList.remove("active");
        }
    });

    texts.forEach(function(text){
        if (text === targetText){
            text.classList.add("active");
        } else {
            text.classList.remove("active");
        }
    });
}

// Make it so that the customize bar cannot be pressed until a bar is generated
tabs.addEventListener("click", changeText);

// Gathering data

let data = [];
let previousLabels = [];

const addButton = document.querySelector("#add");

function addData(){

    // Create variables and store them into an array
    const table = document.getElementById("data-table");
    let label = document.getElementById("label").value;
    let labelColour = document.getElementById("label-colour").value;
    let value = parseInt(document.getElementById("value").value, 10);
    let barColour = document.getElementById("bar-colour").value;
    let inputData = [];

    // If any of the inputs are missing, alert user
    if (label === "" || labelColour === "" || value === "" || barColour === ""){
        alert("One or more necessary information is missing");
        return data;
    } else if (isNaN(value) === true){ //if value is not a number, alert user
        alert ("The input for value is not a number");
        return data;
    } else if ( previousLabels.includes(label) === true){ // if label has already been used, alert user
        alert ("The label has already been used");
        return data;
    } else {
        //push all the inputs into an array then clear the input text boxes
        inputData.push(label);
        previousLabels.push(label);
        inputData.push(labelColour);
        inputData.push(value);
        inputData.push(barColour);
        document.getElementById("label").value = "";
        document.getElementById("label-colour").value = "";
        document.getElementById("value").value = "";
        document.getElementById("bar-colour").value = "";

        //Create a new table row when the add button is pushed so the user can see what has been inputted so far
        let newRow = document.createElement("tr");
        //create a new column for each input
        for ( let i = 0; i< inputData.length; i++){
            let newCell = document.createElement("td");
            newCell.appendChild(document.createTextNode(inputData[i]));
            newRow.appendChild(newCell);
        }
        table.appendChild(newRow);
        } 

    //Create a nested array to access different data for customization
    data.push(inputData);
    return data;
    
}

//when add button is clicked, add the data into an array to find the values later
addButton.addEventListener("click", addData);

//Create bar graph with given data

const createButton = document.querySelector("#create");
const childNode = document.querySelector("#barChartArea");
const barGraph = document.getElementById("bar-chart");
const barChart = document.createElement('table');

function createGraph(){
    
    console.log(barGraph.hasChildNodes(childNode));
    // Find the largest value in the data set
    let largestValue = 0;
    for (let i = 0; i< data.length; i++){
        if(data[i][2] > largestValue){
            largestValue = data[i][2];
        }
    }

    // create variables for graph title, x-axis label, and y-axis label
    let graphTitle = document.getElementById("graph-title").value;
    let xAxisLabel = document.getElementById("x-axis-label").value;
    let yAxisLabel = document.getElementById("y-axis-label").value;

    //create a function to draw the graph
    function drawGraph(){
        barChart.setAttribute('id', 'bar-chart-area');
        barChart.style.height = "100%";
        // Create a space for the title
        const titleRow = document.createElement('tr');
        const titleData = document.createElement('th');
        // Create the title
        titleData.appendChild(document.createTextNode(graphTitle));
        titleData.setAttribute('colspan', data.length);
        titleData.setAttribute('id', 'chart-title');
        titleRow.appendChild(titleData);
        barChart.appendChild(titleRow);

        //Start creating the bar chart
        let maxHeight = 90;
        let prefix = "%"
        let barRow = document.createElement('tr');
        barRow.setAttribute('class', 'bar-row');
        barRow.style.height = maxHeight + prefix;
        for ( let i = 0; i < data.length; i++){
            //Create the bars
            let barData = document.createElement('td');
            let bar = document.createElement('div');
            bar.setAttribute('class', 'individual-bar')
            bar.style.backgroundColor = data[i][3];
            bar.style.height = (maxHeight *(data[i][2]/largestValue)) + prefix;
            barData.appendChild(bar);

            //put the value inside the bar
            let barValue = document.createElement('div');
            barValue.setAttribute('class', 'bar-value');
            barValue.innerText = data[i][2];
            bar.appendChild(barValue);

            //Label each bar
            let barName = document.createElement('div');
            barName.setAttribute('class', 'bar-name');
            barName.style.color = data[i][1];
            barName.innerText = data[i][0];
            barData.appendChild(barName);
            barData.style.width = (100 / data.length) + prefix;

            barRow.appendChild(barData);
            barChart.appendChild(barRow);
            
        }
        barGraph.appendChild(barChart);

        //Create space for the x-axis title
        let xAxisRow = document.createElement('tr');
        let xAxisData = document.createElement('td');
        //Create the x-axis title
        xAxisData.appendChild(document.createTextNode(xAxisLabel));
        xAxisData.setAttribute('colspan', data.length);
        xAxisData.setAttribute('id', 'x-axis-title');
        xAxisRow.appendChild(xAxisData);
        barChart.appendChild(xAxisRow);
    }

    //alert if graph title or x-axis label or y-axis label is missing
    if (graphTitle === "" || xAxisLabel === "" || yAxisLabel === ""){
        alert ("One or more necessary information is missing");
    } else {
        drawGraph();
    }
    
}

//if create is pressed multiple times, remove previously generated bar graphs
createButton.addEventListener("click", createGraph);




