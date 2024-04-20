const gameBoard = document.querySelector('.game-board');
const cells = [];
let currentPlayer = 'X';
let gameWon = false;

// Create the game board cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => makeMove(cell));
    cells.push(cell);
    gameBoard.appendChild(cell);
}

// Function to handle player moves
function makeMove(cell) {
    if (!cell.textContent && !gameWon) {
        cell.textContent = currentPlayer;
        if (checkWin()) {
            displayMessage(`${currentPlayer} wins!`);
            gameWon = true;
            showEndScreen(`${currentPlayer} wins!`);
        } else if (cells.every(cell => cell.textContent !== '')) {
            displayMessage('It\'s a draw!');
            showEndScreen('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Function to check for a win
function checkWin() {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winCombos.some(combo => {
        const [a, b, c] = combo;
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
    });
}

// Function to display game messages
function displayMessage(message) {
    const messageElement = document.querySelector('.message');
    messageElement.textContent = message;
}

// Function to show the end screen
function showEndScreen(message) {
    const endScreen = document.createElement('div');
    endScreen.classList.add('end-screen');
    endScreen.innerHTML = `
        <div class="rectangle"></div>
        <div class="end-message">${message}</div>
        <button class="new-game-btn" onclick="resetGame()">New Game</button>
    `;
    document.body.appendChild(endScreen);
}


// Function to reset the game
function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    gameWon = false;
    currentPlayer = 'X';
    displayMessage('');
    const endScreen = document.querySelector('.end-screen');
    if (endScreen) {
        document.body.removeChild(endScreen);
    }
}

resetGame();
