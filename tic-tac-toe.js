let title = document.getElementById("title")

console.log(title)

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

// let xScore = 0, oScore = 0;
const scores = {
  x: 0,
  o: 0,
} 

oScoreElm.innerHTML  = `O: ${scores.o}`
xScoreElm.innerHTML  = `X: ${scores.x}`;


// changes game turn
let playerTurn = "O";

let endGame = 0;



// ASSISTED --- 9 NULLs representing nine divs
let spaces = Array(9).fill(null)
//SUBSTITUTION --- let spaces = ["", "", "", "", "", "", "", "", ""]


//EVENTLISTENER --- makes every cellDivs clickable
for (i = 0; i < cellDivs.length; i++) {
  cellDivs[i].addEventListener("click", handleCellClick);
}
// SUBSTITUTION --- for (const cell of cellDivs) {
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
    } else if (playerTurn === "X") {
      imgElementX.style.visibility = "visible";
      playerTurn = "O";
      changeGameBg();
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
      

    } else {
      scores.o++
      oScoreElm.innerHTML  = `O: ${scores.o}`
      winnerText.innerHTML = "O won the game";
      
      
    }
  }
  // saveGame()
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
  title.innerText = "TIC TAC TOE"
  endGame = 0;
 announcerPopup.style.visibility = "hidden"
  
}


// ASSISTED --- winning conditon
function playerWon() {

  for (const combos of winningCombos) {
    [a, b, c] = combos

    if (spaces[a] && spaces[a] == spaces[b]  && spaces[a] == spaces[c]) {

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
  oScoreElm.innerHTML  = `O: ${scores.o}`
  xScoreElm.innerHTML  = `X: ${scores.x}`
}


// To B Added
// function saveGame() {
  
//   localStorage.setItem("scores", JSON.stringify("scores"))

// }

// TO B fixed: small overlating bug

// TO B fixed: not showing tie condition

