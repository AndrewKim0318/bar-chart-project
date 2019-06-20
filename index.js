
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
    console.log(data);
}

//when add button is clicked, add the data into an array to find the values later
addButton.addEventListener("click", addData)


