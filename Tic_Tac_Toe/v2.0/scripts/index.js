const resetButton = document.querySelector(".status button");
const gameFieldsElem = document.querySelectorAll(".gameFields");
const message = document.querySelector(".status p");

let gameActive = true;
let currentPlayer = "X";
let gameState = new Array(9).fill("");
let winResults = ["012", "345", "678", "036", "147", "258", "048", "246"];

const drawAudio = new Audio("./sound-effects/draw.wav");
const winAudio = new Audio("./sound-effects/win.wav");

// Draw symbol X or O in the current cell which is clicked
function drawSymbol(clickedCell, cellIndex) {
    gameState[cellIndex] = currentPlayer;
    colorSymbol = (currentPlayer === "X") ? "#87ceeb" : "#ffa500";
    clickedCell.style.color = colorSymbol;
    clickedCell.innerHTML = currentPlayer;
    drawAudio.play();
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    message.innerHTML = "It's " + currentPlayer + "'s turn";
}

// Check winning conditions or if game is a draw
function winConditions() {
    for(let i = 0; i < winResults.length; i++) {
        let a = gameState[winResults[i][0]];
        let b = gameState[winResults[i][1]];
        let c = gameState[winResults[i][2]];

        if(a !== "" && a === b && b === c) {
            message.innerHTML = currentPlayer + " wins";
            resetButton.classList.add("animation");
            gameActive = false;
            setTimeout(() => {
                winAudio.volume = 0.15;
                winAudio.play();
            }, 300);
            return;
        }
    }
    if(!gameState.includes("")) {
        message.innerHTML = "It's a draw";
        resetButton.classList.add("animation");
        gameActive = false;
        return;
    }
    changePlayer();
}

function playGame(element) {
    let clickedCell = element.target;
    let cellIndex = clickedCell.dataset.index;

    if(gameState[cellIndex] !== "" || !gameActive) 
        return;

    drawSymbol(clickedCell, cellIndex);
    winConditions();
}

function resetGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = new Array(9).fill("");
    message.innerHTML = "It's " + currentPlayer + "'s turn";
    resetButton.classList.remove("animation");
    gameFieldsElem.forEach(cell => cell.innerHTML = "");
}

gameFieldsElem.forEach(cell => cell.addEventListener("click", playGame));
resetButton.addEventListener("click", resetGame);