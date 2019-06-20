
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

    // Create variables and store them into an array
    const table = document.getElementById("data-table");
    let label = document.getElementById("label").value;
    let labelColour = document.getElementById("label-colour").value;
    let value = document.getElementById("value").value;
    let barColour = document.getElementById("bar-colour").value;
    let inputData = [];

    // If any of the inputs are missing, alert user
    if (label === "" || labelColour === "" || value === "" || barColour === ""){
        alert("One or more necessary information is missing");
    } else {
        //push all the inputs into an array then clear the input text boxes
        inputData.push(label);
        inputData.push(labelColour);
        inputData.push(value);
        inputData.push(barColour);
        document.getElementById("label").value = "";
        document.getElementById("label-colour").value = "";
        document.getElementById("value").value = "";
        document.getElementById("bar-colour").value = "";

       
        if (data.length === 0){
            //Create a new table row when the add button is pushed so the user can see what has been inputted so far
            let newRow = document.createElement("tr");
            //create a new column for each input
            for ( let i = 0; i< inputData.length; i++){
                let newCell = document.createElement("td");
                newCell.appendChild(document.createTextNode(inputData[i]));
                newRow.appendChild(newCell);
            }
            table.appendChild(newRow);
        } else {
            //If the label is repeated, alert user
            for (let i =0; i<data.length; i++){
                if (data[i].includes(inputData[0])){
                    alert ("label has already been used");
                    break;
                } else {
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
            }
        }

    }

    //Create a nested array to access different data for customization
    data.push(inputData);
    
}

//when add button is clicked, add the data into an array to find the values later
addButton.addEventListener("click", addData)

//Create bar graph with given data

const createButton = document.querySelector("#create");

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

    //alert if graph title or x-axis label or y-axis label is missing
    if (graphTitle === "" || xAxisLabel === "" || yAxisLabel === ""){
        alert ("One or more necessary information is missing");
    } else {
        const barChart = document.createElement('table');
        // Create a space for the title
        let titleRow = document.createElement('tr');
        let titleData = document.createElement('th');
        // Create the title
        titleData.appendChild(document.createTextNode(graphTitle));
        titleData.setAttribute('colspan', data.length);
        titleData.setAttribute('class', 'chart-title');
        titleRow.appendChild(titleData);
        barChart.appendChild(titleRow);

        //Start creating the bar chart
        for ( let i = 0; i < data.length; i++){
            
        }


    }
}

createButton.addEventListener("click", createGraph);

