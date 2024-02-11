let title = document.getElementById("title")
const backgroundImg =  document.body

// cellDivs saves the value of divs within an array
const cellDivs = Array.from(document.getElementsByClassName("board-cells-class"));
// imgElmAll for rstBtnFunction to make every img hidden
const imgElmAll = Array.from(document.getElementsByTagName("img"));
const resetBtn = document.getElementById("reset-btn");
// pop-up div
const winnerText = document.getElementById("winner-announcer");
const announcerPopup = document.getElementById("winner-announcer-popup-container");

const continueBtn = document.getElementById("continue-btn");

const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [0,4,8]
]

const resetScore = document.getElementById("reset-score-btn")

const xScoreElm = document.getElementById("x-scores");
const oScoreElm = document.getElementById("o-scores");


let scores = {
  x: 0,
  o: 0,
};
// Alternative --- let xScore = 0, oScore = 0;
const storedData = JSON.parse(localStorage.getItem("scores"));

// If any values were saved in the storage, changes the scores
if (storedData) {
  scores = storedData;
};

 
// shows the scores
oScoreElm.innerHTML  = `O: ${scores.o}`
xScoreElm.innerHTML  = `X: ${scores.x}`;


// ASSISTED --- increments with every click in order to show Tie
let clickCounter = 0;


// changes game turn
let playerTurn = "O";
// When true, game ends and pop up pops!
let endGame = 0;



// ASSISTED --- 9 NULLs representing nine divs
let spaces = Array(9).fill(null)
//Alternative --- let spaces = ["", "", "", "", "", "", "", "", ""]

//EVENTLISTENER --- makes every cellDivs clickable
for (i = 0; i < cellDivs.length; i++) {
  cellDivs[i].addEventListener("click", handleCellClick);
}
// Alternative --- for (const cell of cellDivs) {
//     cell.addEventListener("click", handleCellClick);
// }


// ASSISTED --- WHEN CLICKED makes O or X visible based on playerTurn
function handleCellClick(event) {
  const clickedCell = event.target;

  const clickedCellId = event.target.id
  
  const imgElementO = clickedCell.querySelector(".board-cells-img-O");
  const imgElementX = clickedCell.querySelector(".board-cells-img-x");





  spaces[clickedCellId] = playerTurn;

// changes the background based on player`s turn

  if (endGame !== 1) {
    if (playerTurn === "O") {
      imgElementO.style.visibility = "visible";
      playerTurn = "X";
      changeGameBg();
      clickCounter++
    } else if (playerTurn === "X") {
      imgElementX.style.visibility = "visible";
      playerTurn = "O";
      changeGameBg();
      clickCounter++
    }
  }
  

  // Shows a pop up declaring the winner and the scores

    if(playerWon() !==false){
      endGame = 1;
      announcerPopup.style.visibility = "visible"

      if (playerTurn === "O") {
        scores.x++
        xScoreElm.innerHTML = `X: ${scores.x}`;
        winnerText.innerHTML = "X won the game";
        saveGame();
        

      } else {
        scores.o++
        oScoreElm.innerHTML  = `O: ${scores.o}`
        winnerText.innerHTML = "O won the game";
        saveGame();
        
      }
    } else if (playerWon() === false && clickCounter === 9){
      title.innerHTML = "Tie!";
      endGame = 1;
    }
} 


 //RESET --- hides all the images and resets playerTurn
resetBtn.addEventListener("click", rstBtnFunction) 

function rstBtnFunction() {
  for (i = 0; i < imgElmAll.length; i++) {
    imgElmAll[i].style.visibility = "hidden"
    
  }

  for (i = 0; i < spaces.length; i++) {
    spaces[i] = null;
  }

  playerTurn = "O";
  changeGameBg();
  title.innerText = "TIC TAC TOE";
  endGame = 0;
  announcerPopup.style.visibility = "hidden";
  clickCounter = 0;

  
}


// ASSISTED --- winning conditon
function playerWon() {

  for (const combos of winningCombos) {
    [a, b, c] = combos

    if (spaces[a] !== null && spaces[a] == spaces[b]  && spaces[a] == spaces[c]) {

      return [a,b,c]
      
    
    }
    
  } 
  
  return false

}



//background changing function

function changeGameBg() {
  if (playerTurn === "O") {
    document.body.style.backgroundImage = "url(O.png)";
    title.innerText = "O's turn"
  } else if (playerTurn === "X") {
    document.body.style.backgroundImage = "url(X.png)";
    title.innerText = "X's turn"
  }
}

continueBtn.addEventListener("click", rstBtnFunction);



//Resets the score in the pop up
resetScore.addEventListener("click", rstScore);

function rstScore() {
  scores.x = 0;
  scores.o = 0;
  oScoreElm.innerHTML  = `O: ${scores.o}`;
  xScoreElm.innerHTML  = `X: ${scores.x}`;
  saveGame();
}

//saves the game in local storage

function saveGame() {
  
  localStorage.setItem("scores", JSON.stringify(scores))

}








