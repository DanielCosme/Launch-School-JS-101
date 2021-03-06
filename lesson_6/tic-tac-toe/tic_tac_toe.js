const readline = require('readline-sync');

const EMPTY = " ";
const HORIZONTAL = '---';
const VERTICAL = ' | ';
const PLAYER_MARK = 'X';
const COMPUTER_MARK = 'O';
const POSITIONS = [
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]],
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]]
];

const PLAYER = "Player";
const COMPUTER = "Computer";
const CHOICE = "Choice";

let first = PLAYER;
let gameBoard = createBoard(3);
let gameOver = false;
let play = true;
let score = { player: 0, computer: 0 };
let currentPlayer = first;

while (play) {

  gameBoard = createBoard(3);
  gameOver = false;

  chooseFirst(first);

  do {

    displayBoard();
    playSquare(currentPlayer);
    displayBoard();

    whoWins(currentPlayer);
    checkScore();

    if (getEmpty().length === 0 && !gameOver) {
      gameBoard = createBoard(3);
      console.log('Board Full It\'s a tie!');
      readline.question("Press any key con continue");
    }

  } while (!gameOver);

  playAgain();

}

function chooseFirst(first) {
  if (first === CHOICE) {
    let option = readline.question("Who goes first? (p/c)");
    while (!['p', 'c'].includes(option) && option.length > 1) {
      console.log("Invalid input");
      option = readline.question("Who goes first? (p/c)");
    }
    currentPlayer = option === 'p' ? PLAYER : COMPUTER;
  }
}

function playSquare(player) {
  if (player === PLAYER) {
    playerChooseSquare();
  } else if (player === COMPUTER) {
    computerChooseSquare();
  }
}

function alternatePlayer(player) {
  return player === PLAYER ? COMPUTER : PLAYER;
}

function checkScore() {
  let res;
  if (score.player >= 5) res = PLAYER;
  else if (score.computer >= 5) res = COMPUTER;
  if (res) {
    console.log(`${res} Wins the match!`);
    gameOver = true;
  }
}

function reset() {
  gameBoard = createBoard(3);
  score.player = 0;
  score.computer = 0;
}

function playAgain() {
  let a = readline.question("Do you wan't to play again? (y/n) ");
  while (!['y', 'n'].includes(a.toLowerCase()) && a.length > 1) {
    console.log('Wrong input');
    a = readline.question("Do you wan't to play again? (y/n) ");
  }
  reset();
  play = a[0] === 'y';
}

function whoWins(player) {
  let winner = checkWinner(player);
  if (winner !== 'Nobody') {
    gameBoard = createBoard(3);
    console.log(`${winner} Wins!!`);
    currentPlayer = first;
    readline.question("Press any key to continue");
  } else {
    currentPlayer = alternatePlayer(currentPlayer);
  }
}

function checkWinner(play) {
  let result = 'Nobody';
  let player;
  let mark = play === PLAYER ? PLAYER_MARK : COMPUTER_MARK;

  for (let i = 0; i < POSITIONS.length; i++) {
    let position = POSITIONS[i];

    player = position.every(x => getPlace(x) === mark);
    if (player) {
      result = play;
      score[play.toLowerCase()] += 1;
      break;
    }
  }

  return result;
}

function computerChooseSquare() {
  let empty = getEmpty();
  let rand = empty[random(empty.length)];
  let def = checkMove(PLAYER_MARK);
  let off = checkMove(COMPUTER_MARK);
  let fifth = getPlace([1, 1]) === EMPTY ? [1, 1] : false;
  let position = off || def || fifth || rand;

  updateBoard(position, COMPUTER_MARK);
}

function checkMove(marc) {
  let nonPlayer;
  let move;

  for (let i = 0; i < POSITIONS.length; i++) {
    let winningLane = POSITIONS[i];
    if (winningLane.filter(x => getPlace(x) === marc).length === 2) {
      nonPlayer = winningLane.find(x => getPlace(x) === EMPTY);
      if (nonPlayer) {
        move = nonPlayer;
        break;
      }
    }
  }
  return move;
}


function random(num) {
  return Math.floor(Math.random() * num);
}

function playerChooseSquare() {
  let position;

  do {
    position = getPlayerInput();
  } while (placeChosen(position));

  updateBoard(position, PLAYER_MARK);
}


function getPlayerInput() {
  const map = { a: 0, b: 1, c: 2 };
  let input;

  do {
    input = readline.question("Enter your move, col/row (a-c)(0-2): ");
    if (!hasLetter(input[0])) console.log("Invalid letter");
    if (!hasValidNumber(input[1])) console.log("Invalid number");

  } while (invalidInput(input));

  input = input.split("");
  input[0] = map[input[0]];
  input[1] = Number(input[1]);

  return input;
}

function invalidInput(input) {
  return !hasLetter(input[0]) || !hasValidNumber(input[1]);
}

function hasLetter(char) {
  return ['a', 'b', 'c'].includes(char);
}

function hasValidNumber(char) {
  return Number(char) >= 0 && Number(char) <= 2;
}

function placeChosen(pos) {
  let res = getPlace(pos) !== EMPTY;
  if (res) console.log("Place taken");
  return res;
}

function getPlace(pos) {
  return gameBoard[pos[0]][pos[1]];
}

function getEmpty() {
  let result = [];
  let pos;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      pos = [i, j];
      if (getPlace(pos) === EMPTY) {
        result.push(pos);
      }
    }
  }
  return result;
}

function updateBoard(move, sign) {
  if (getEmpty().length === 0) return;
  let row = move[0];
  let col = move[1];
  gameBoard[row][col] = sign;
}

function createBoard(dimention) {
  let board = [];
  for (let i = 0; i < dimention; i++) {
    let tmp = [];
    for (let j = 0; j < dimention; j++) {
      tmp.push(EMPTY);
    }
    board.push(tmp);
  }
  return board;
}

function displayBoard() {
  console.clear("");

  console.log(`\nPlayer is ${PLAYER_MARK} and AI is ${COMPUTER_MARK}`);

  console.log(`\nPlayer: ${score.player} Computer: ${score.computer}\n`);

  console.log(EMPTY.repeat(3) + ' 0 ' + EMPTY + ' 1 ' + EMPTY + ' 2 \n');
  console.log('a' + getRow('v', gameBoard[0]));
  console.log(EMPTY + getRow());
  console.log('b' + getRow('v', gameBoard[1]));
  console.log(EMPTY + getRow());
  console.log('c' + getRow('v', gameBoard[2]));
  console.log("");
}

function getRow(lineOrientation, arr) {
  if (lineOrientation === 'v') {
    return EMPTY.repeat(3) + arr[0] + VERTICAL + arr[1] + VERTICAL + arr[2];
  } else {
    return (EMPTY.repeat(2) + HORIZONTAL + EMPTY + HORIZONTAL +
      EMPTY + HORIZONTAL + EMPTY);
  }
}
