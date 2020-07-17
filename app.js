// Create Dino Constructor
// Takes an index, data and returns specifc info for the dino
function Dino(index, data) {
    this.data = data;
    this.index = index;
    const newData = Object.entries(data.Dinos);
    const dino = newData.filter(species => species[0] == index)[0][1];
    return dino;
}

// Create Dino Objects
//Insert human at a particular index (middle)
function insertAt(array, index, ...elementsArray) {
    array.splice(index, 0, ...elementsArray);
}

// Get data
const dinos = async () => {
    let response = await fetch("dino.json");
    let data = await response.json();
    return data;
};

// Create Human class 
class Human {
    constructor() {
      this.name =  document.getElementById("name").value;
      this.feet = document.getElementById("feet").value;
      this.weight = document.getElementById("weight").value;
      this.diet = document.getElementById("diet").value;
    }
  }


// Use IIFE to get human data from form
const humanData = async () => {

    let name = document.getElementById("name").value;
    let feet = document.getElementById("feet").value;
    let weight = document.getElementById("weight").value;
    let diet = document.getElementById("diet").value;
    const arr = []
    arr.push(name, feet, weight, diet)
    return arr
};

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareHeight = async (idx, data) => {
    const human = await humanData()
    dinoDataHeight = parseInt(data);
    humanDataFeet = parseInt(document.getElementById("feet").value)  || 0;
    humnaDataInches = parseInt(document.getElementById("inches").value) || 0;
    totalHumanHeight = humanDataFeet * 12 + humnaDataInches;
    return `It's height: ${dinoDataHeight}, your height: ${totalHumanHeight} inches`;
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareWeight = async (idx, data) => {
    dinoDataWeight = parseFloat(data);
    humanDataWeight = parseFloat(document.getElementById("weight").value) || 0;
    return `Dino weight: ${dinoDataWeight} Your weight: ${humanDataWeight} lbs`;
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareDiet = async (idx, data) => {
    dinoDiet = data;
    humanDiet = document.getElementById("diet").value || "both?";
    return `Dino diet: ${dinoDiet} Your diet: ${humanDiet} `;
};

// Generate Tiles for each Dino in Array
const createTile = async () => {
    return `<h2> ${name}</h2>                    
            <p> ${fact} </p>
            <h5> ${rFact} </h5>
            <img src=./images/${image}.png />`;
};

// Add tiles to DOM, create div to add tiles to
const addToDom = async () => {
    let grid = document.getElementById("grid");
    let div = document.createElement("div");
    div.className = "grid-item";
    grid.append(div);
    // call create tile method, and add tiles 
    div.innerHTML = await createTile();
};

// Remove form from screen
const removeForm = async () => {
    form = document.getElementById("dino-compare");
    form.style.display = "none";
};

// On button click, prepare and display infographic
document.getElementById("btn").onclick = async () => {

    // remove form, and prepare to show data 
    removeForm();

    // create human object 
    const human = new Human()

   // get dino data 
    let data = await dinos();

   
    // Insert Human data into the array 
    insertAt(data["Dinos"], 4, { species: human.name });

    for (x in data["Dinos"]) {

        //Instantiate dino object
        dino = new Dino(x, data);

        if (x == 4) {
            name = human.name;
            image = "human";
            fact = "";
            compareH = "";
            compareW = "";
            compareD = "";
        } else {
            name = dino.species;
            image = name.toLowerCase();
            fact = dino.fact;
            dinoHeight = dino.height;
            dinoWeight = dino.weight;
            dinoDiet = dino.diet;
            compareH = await compareHeight(x, dinoHeight);
            compareW = await compareWeight(x, dinoWeight);
            compareD = await compareDiet(x, dinoDiet);
        }

        // Randomly assign one fact
        randomFact = [compareH, compareW, compareD];
        rFact = randomFact[Math.floor(Math.random() * randomFact.length)];

        // Add tile to DOM. Use closure to send the varibles data used by the DOM
        await addToDom();
    }
};
