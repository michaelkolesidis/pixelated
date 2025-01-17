/*
 *  Pixelated
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

const gridSize = { width: 12, height: 13 };
const colors = ['red', 'blue', 'green', 'yellow', 'purple', '#ffa100'];
const maxMoves = 22;

let grid = [];
let movesLeft = maxMoves;

const boardElement = document.getElementById('board');
const controlsElement = document.getElementById('controls');
const statusElement = document.getElementById('status');
const restartButton = document.getElementById('restart-button');

function initGame() {
  grid = Array.from({ length: gridSize.height }, () =>
    Array.from(
      { length: gridSize.width },
      () => colors[Math.floor(Math.random() * colors.length)]
    )
  );
  renderGrid();
  renderControls();
  movesLeft = maxMoves;
  updateStatus();
}

function renderGrid() {
  boardElement.style.gridTemplateColumns = `repeat(${gridSize.width}, 1fr)`;
  boardElement.innerHTML = '';
  grid.forEach((row, y) => {
    row.forEach((color, x) => {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.style.backgroundColor = color;
      boardElement.appendChild(cell);
    });
  });
}

function renderControls() {
  controlsElement.innerHTML = '';
  colors.forEach((color) => {
    const button = document.createElement('button');
    button.className = 'color-button';
    button.style.backgroundColor = color;
    button.addEventListener('click', () => floodFill(color));
    controlsElement.appendChild(button);
  });
}

function floodFill(newColor) {
  const oldColor = grid[0][0];
  if (newColor === oldColor || movesLeft <= 0) return;

  function fill(x, y) {
    if (
      x < 0 ||
      y < 0 ||
      x >= gridSize.width ||
      y >= gridSize.height ||
      grid[y][x] !== oldColor
    ) {
      return;
    }
    grid[y][x] = newColor;
    fill(x + 1, y);
    fill(x - 1, y);
    fill(x, y + 1);
    fill(x, y - 1);
  }

  fill(0, 0);
  movesLeft--;
  renderGrid();
  updateStatus();

  if (checkWin()) {
    statusElement.innerHTML = `You won with ${movesLeft} moves left!`;
    disableControls();
  } else if (movesLeft <= 0) {
    statusElement.innerHTML = `Game over! Out of moves.`;
    disableControls();
  }
}

function checkWin() {
  const firstColor = grid[0][0];
  return grid.every((row) => row.every((cell) => cell === firstColor));
}

function updateStatus() {
  if (movesLeft === 1) {
    statusElement.innerHTML = `1move left`;
  } else {
    statusElement.innerHTML = `${movesLeft} moves left`;
  }
}

function disableControls() {
  controlsElement
    .querySelectorAll('button')
    .forEach((button) => (button.disabled = true));
}

restartButton.addEventListener('click', () => {
  initGame();
  controlsElement
    .querySelectorAll('button')
    .forEach((button) => (button.disabled = false));
});

initGame();

// Help
const helpButton = document.getElementById('help-button');
const helpContainer = document.getElementById('help-container');
const closeButton = document.getElementById('close-button');

helpButton.addEventListener('click', () => {
  helpContainer.classList.remove('hidden');
  helpContainer.classList.add('visible');
});

closeButton.addEventListener('click', () => {
  helpContainer.classList.add('hidden');
  helpContainer.classList.remove('visible');
});

// Prevent left click
document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});
