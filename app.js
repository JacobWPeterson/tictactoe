/*******************************************************
Element variables
*******************************************************/

const squares = document.getElementsByTagName("td");
const result = document.getElementsByClassName("result");
const tableRows = document.getElementById("gameBoard").rows;
const button = document.getElementById("reset");


console.log(result[0].innerHTML)

/*******************************************************

Adds/removes event listeners on squares and handles the
actions of assigning a letter to that square

*******************************************************/

//Adds listener to each square
function setBoardListeners() {
  for (const square of squares) {
    square.addEventListener("click", squareClickHandler, {once: true});
  }
}
setBoardListeners();

//removes all event listeners following a winning combination
function removeBoardListeners() {
  for (const square of squares) {
    square.removeEventListener("click", squareClickHandler);
  }
}

//Handles click on square, delegating letter assignment to helper function and calling helper function to check for winner
function squareClickHandler(event) {
  piecesPlaced++;
  event.target.innerHTML = nextLetter(lastLetter);
  if (checkWin(lastLetter)) {
    removeBoardListeners();
    result[0].innerHTML = `${lastLetter} is the Winner`;
  } else {
    if (piecesPlaced === 9) {
      result[0].innerHTML = 'It\'s a tie';
    }
  }
}

//variable and helper function for assigning alternating Xs and Os
var firstPlay = true;
var lastLetter;
function nextLetter(letter) {
  if (firstPlay) {
    result[0].innerHTML = `0\'s Turn`;
    lastLetter = 'X';
    firstPlay = false;
    return 'X';
  }
  if (letter === 'X') {
    result[0].innerHTML = `${lastLetter}\'s Turn`;
    lastLetter = 'O';
    return 'O';
  } else {
    result[0].innerHTML = `${lastLetter}\'s Turn`;
    lastLetter = 'X';
    return 'X';
  }
}



/*******************************************************

Adds variable for reset button and event
listeners and handlers for the button

*******************************************************/

button.addEventListener('click', resetClickHandler);

function resetClickHandler() {
  for (const square of squares) {
    square.innerHTML = '';
    result[0].innerHTML = 'X to Play First';
    setBoardListeners();
    piecesPlaced = 0;
    firstPlay = true;
  }
}



/*******************************************************

Function and helpers for checking for a winner or ties

*******************************************************/

//keeps track of pieces played rather than helper fn to check for a full board
var piecesPlaced = 0;

//checks all three winning options
function checkWin(piece) {
  return rowCheck(piece) || columnCheck(piece) || diagonalCheck(piece);
}

//checks for a row win
function rowCheck(piece) {
  var connectedRow = false;
  for (var i = 1; i < tableRows.length; i++) {
    var matchedPieces = 0
    for (var j = 0; j < tableRows[i].cells.length; j++) {
      if (tableRows[i].cells[j].innerHTML === piece) {
        matchedPieces++;
      }
    }
    if (matchedPieces === 3) {
      connectedRow = true;
    }
  }
  return connectedRow;
}

//checks for a column win
function columnCheck(piece) {
  var connectedLine = false;
  for (var i = 0; i < tableRows[1].cells.length; i++) {
    var matchedPieces = 0;
    for (var j = 1; j < tableRows.length; j++) {
      if (tableRows[j].cells[i].innerHTML === piece) {
        matchedPieces++;
      }
    }
    if (matchedPieces === 3) {
      connectedLine = true;
    }
  }
  return connectedLine;
}

//checks for a diagonal win running from top-left to bottom-right and from bottom-left to top-right
function diagonalCheck(piece) {
  var hasDiagonalLine = false;
  if ((tableRows[1].cells[0].innerHTML === piece
    && tableRows[2].cells[1].innerHTML === piece
    && tableRows[3].cells[2].innerHTML === piece)
    ||
    (tableRows[1].cells[2].innerHTML === piece
      && tableRows[2].cells[1].innerHTML === piece
      && tableRows[3].cells[0].innerHTML === piece)) {
      hasDiagonalLine = true
    }

  return hasDiagonalLine
}
