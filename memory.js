const gameContainer = document.getElementById("game");
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
var count = 0;
var first;
var firstColor;
var wincount = 0;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
 

// TODO: Implement this function!
function handleCardClick(event) {  
    var target = event.target;
    var cname = event.target.className;

    if(event.target == first || target.isFlipped == true){
        return;
    }

  // no more than 2 cards flipped at once
    count = count + 1;
    if(count >2){
        return;
    }

  // change to the class name on click
  target.style.backgroundColor = cname;

  // store color of the first click
  if(count == 1){
  first = event.target;
  firstColor = first.className;
}

// compared the colors
if(firstColor == cname && count == 2){
    setTimeout(function(){
        console.log("match");
        count = 0;
        first = null;
        }, 1000);
    wincount = wincount + 1;
    target.isFlipped = true;
    first.isFlipped = true;
    return;
}

// if they don't match, flip them back
 if(firstColor != cname && count == 2){
  // timeout to flip back and returns cards to white
        setTimeout(function(){
        target.style.backgroundColor = "white";
        first.style.backgroundColor = "white";
        count = 0;
        first = null;
        }, 1000);
        target.isFlipped = false;
  }
  
}

if(wincount > 4){
    console.log("you won!");
}

// when the DOM loads
createDivsForColors(shuffledColors);
