const squares = document.getElementsByTagName("td");
const result = document.getElementsByClassName("result");
const tableRows = document.getElementById("gameBoard").rows;


/*

Adds event listeners on squares and handles the actions of assigning a letter to that square

*/

//Adds listener to each square
for (const square of squares) {
  square.addEventListener("click", squareClickHandler);
}

//Handles click on square, delegating letter assignment to helper function and calling helper function to check for winner
function squareClickHandler(event) {
  event.target.innerHTML = nextLetter(lastLetter);
  checkWin(lastLetter);
  checkFullBoard();
}

//variable and helper function for assigning alternating Xs and Os
var lastLetter = 'O';
function nextLetter(letter) {
  if (letter === 'X') {
    lastLetter = 'O';
    return 'O';
  } else {
    lastLetter = 'X';
    return 'X';
  }
}


/*

Adds variable for reset button and event listeners and handlers for the button

*/
const button = document.getElementById("reset");

button.addEventListener('click', resetClickHandler);

function resetClickHandler() {
  for (const square of squares) {
    square.innerHTML = '';
    result[0].innerHTML = '';
  }
}

/*

Function and helpers for checking for a winner

*/

//checks all three winning options
function checkWin(piece) {
  if (rowCheck(piece) || columnCheck(piece) || diagonalCheck(piece)) {
    result[0].innerHTML = `${piece} is the Winner`;
  }
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

/*

Function and helpers for checking for a full board (i.e. no winner)

*/
function checkFullBoard() {

}