//globally grab area where data will be rendered
const cocktailList = document.querySelector(`.cocktail-list`);

//make axios request for data console.log to check for results
// call renderList from eventListener and pass it to axios
async function getCocktailData(input) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
  try {
    const response = await axios.get(url);
    const returnedData = response.data.drinks;
    renderList(returnedData);
  } catch (error) {
    console.error(error);co
  }
}

// DATA
// write a func called renderList that forEach cocktail object recieved the name, recipe, ingredents, measurements are taken give an element to hold it in and appened to DOM
function renderList(data) {
  //identify ojects in array with paramenter(aka give it a name)
  data.forEach((cocktail) => {
    const cocktailDiv = document.createElement("div");
    cocktailDiv.classList.add("cocktail-content");
    cocktailList.append(cocktailDiv);


    //RETRIEVE COCKTAIL NAME (strDrink):
    //create vari to store cocktail name data from array object retreived from api
    const cocktailName = cocktail.strDrink;
    //create  vari that makes a h3 tag element to store name data collected
    let nameTag = document.createElement("h3");
    // put data from array collected into created h3 tag
    nameTag.textContent = `${cocktailName}`;
    //move data to the dom
    cocktailDiv.append(nameTag);
    

    //RETRIEVE IMAGE(strDrinkThumb):
    //create a vari to store image data in
    const drinkPic = cocktail.strDrinkThumb;
    //create an img element stored in a vari
    const imageTag = document.createElement("img");
    //move newly created tag into div created previously for holding data
    cocktailDiv.append(imageTag);
    // console.log(imageTag)
    //add a class name to above tag
    imageTag.classList.add("drink-thumb");
    //set imageTag with proper attributes ('src' , data path)
    imageTag.setAttribute("src", cocktail.strDrinkThumb);

    //RETIREVE INGREDENTS/MEASUREMENTS:
    //create vari for ingredient data
    const recipeWraper = document.createElement('section')
    cocktailDiv.append(recipeWraper)
    recipeWraper.classList.add('ingredMeas')

    const sectionIng = document.createElement('div')
    sectionIng.classList.add('ingredients')
    //create vari for measurement data
    const sectionMea = document.createElement('div')
    sectionMea.classList.add('measurements')
    for (i in cocktail) {
      if (i.substring(0, 6) === "strIng") {
        if (cocktail[i] !== null) {
          const recipeTag = document.createElement("p");
          recipeTag.textContent = `${cocktail[i]}`
          sectionIng.append(recipeTag);
        }
      }
    }
    for (i in cocktail) {
      if (i.substring(0, 6) === "strMea") {
        //filter data for null values
        if (cocktail[i] !== null) {
          //create a tag to store data in
          const recipeTag = document.createElement("p");
          //insert data collected into above tag
          recipeTag.textContent = `${cocktail[i]}`
          //move data to dom
          sectionMea.append(recipeTag);
          
        }
      }
    }
    recipeWraper.appendChild(sectionIng)
    recipeWraper.appendChild(sectionMea)
    
    //RETIREVE INSTRUCTIONS(strInstructions):
    //create vari for instruction data
    const instructionSec = document.createElement('div')
    cocktailDiv.append(instructionSec)
    instructionSec.classList.add('instructions')

    const instructions = cocktail.strInstructions
    //filter data for null and other lang values
    //create a tag to store data in
    const instructionTag = document.createElement('p')
    //insert data collected into above tag
    instructionTag.textContent = `INSTRUCTIONS: ${instructions}`
    //move data to dom
    instructionSec.append(instructionTag)
    // instructionSec.append(recipeWraper)
    // recipeWraper.appendChild(instructionSec)
  });
}
//EVENTLISTENER
// create vari for button id
const send = document.querySelector(`form`);
//used button vari to add click event listenter with anonomous func
send.addEventListener("submit", (e) => {
  e.preventDefault();
  //grab area where user inputs request value with id
  const inputValue = document.querySelector("#blank");
  //created a vari to store the value of the input field
  const userInput = inputValue.value;
  //when new input is recived from api remove old data
  removeData();
  //call func
  getCocktailData(userInput);
});

//change to drop down menu or create a user validation func to insure that input is not empty when send button is clicked

//REMOVE OLD DATA
//write a function to remove old data before new data is rendered
function removeData() {
  while (cocktailList.lastChild) {
    cocktailList.removeChild(cocktailList.lastChild);
  }
}
