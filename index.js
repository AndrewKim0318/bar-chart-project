
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

const addButton = document.querySelector("#add");

function addData(){

    // Create variables and arrays to store the variables
    const table = document.getElementById("data-table");
    let label = document.getElementById("label").value;
    let labelColour = document.getElementById("label-colour").value;
    let value = parseInt(document.getElementById("value").value, 10);
    let barColour = document.getElementById("bar-colour").value;
    let inputData = [];
    let previousLabels = [];

    // Create a function to delete inputted data
    function deleteData(e){

        console.log(data);

        let parent = e.target.parentElement;
        let grandparent = parent.parentElement;
        grandparent.setAttribute('id', 'deleteData');
        let label = document.getElementById('deleteData').cells[0].innerHTML;
        table.removeChild(grandparent);
        
        //remove the input data from the data array
        for (let i = 0; i< data.length; i++){
            if (data[i][0] === label){
                data.splice(i,1);
                break;
            }
        }

        console.log(data);
    }


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
        //Start at i = 1 because id does not need to be included
        for ( let i = 0; i< inputData.length; i++){
            let newCell = document.createElement("td");
            newCell.appendChild(document.createTextNode(inputData[i]));
            newRow.appendChild(newCell);
        }
        //Add delete button to the input table
        let deleteButtonLocation = document.createElement("td");
        let deleteButton = document.createElement('button')
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener('click', deleteData);
        deleteButtonLocation.appendChild(deleteButton);
        newRow.appendChild(deleteButtonLocation);
        
        //Add the newly created row into the table
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
const barGraph = document.getElementById("bar-chart");
const barChart = document.createElement('table');

function createGraph(){
    
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
        titleData.setAttribute('colspan', data.length + 1);
        titleData.setAttribute('id', 'chart-title');
        titleRow.appendChild(titleData);
        barChart.appendChild(titleRow);

        //Start creating the bar chart
        let maxHeight = 95;
        let prefix = "%"

        //Start creating rows for the bar and the bar name
        let barRow = document.createElement('tr');
        let barNameRow = document.createElement('tr');

        //Set attributes to the rows to add styling
        barRow.setAttribute('class', 'bar-row');
        barRow.style.height = maxHeight + prefix;
        barNameRow.setAttribute('class', 'bar-name-row');

        //Create space for y-axis-title
        let yAxisLocation = document.createElement('td');
        let yAxisData = document.createElement('div');
        yAxisLocation.setAttribute('id', 'y-axis-location');
        yAxisData.setAttribute('id', 'y-axis-title');
        yAxisData.appendChild(document.createTextNode(yAxisLabel));
        yAxisLocation.appendChild(yAxisData);
        barRow.appendChild(yAxisLocation);

        //Create an empty space in barNameRow to create space for y-axis-title
        let emptySpace = document.createElement('td')
        barNameRow.appendChild(emptySpace);

        for ( let i = 0; i < data.length; i++){
            //Create the bars
            let barData = document.createElement('td');
            barData.setAttribute('class', 'bar-graph-location');
            let bar = document.createElement('div');
            bar.setAttribute('class', 'individual-bar');
            bar.style.backgroundColor = data[i][3];
            bar.style.height = (maxHeight *(data[i][2]/largestValue)) + prefix;
            barData.appendChild(bar);

            //put the value inside the bar
            let barValue = document.createElement('div');
            barValue.setAttribute('class', 'bar-value');
            barValue.innerText = data[i][2];
            bar.appendChild(barValue);

            //Label each bar
            let barNameData = document.createElement('td');
            let barName = document.createElement('div');
            barName.setAttribute('class', 'bar-name');
            barName.style.color = data[i][1];
            barName.innerText = data[i][0];
            barNameData.appendChild(barName);
            barNameData.style.width = (100 / data.length) + prefix;

            barRow.appendChild(barData);
            barNameRow.appendChild(barNameData);
            barChart.appendChild(barRow);
            barChart.appendChild(barNameRow);
            
        }
        barGraph.appendChild(barChart);

        //Create space for the x-axis title
        let xAxisRow = document.createElement('tr');
        let xAxisData = document.createElement('td');
        //Create the x-axis title
        xAxisData.appendChild(document.createTextNode(xAxisLabel));
        xAxisData.setAttribute('colspan', data.length + 1);
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




