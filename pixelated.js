const gridSize = { width: 12, height: 13 };
const colors = ['red', 'blue', 'green', 'yellow', 'purple', '#ffa100'];
const maxMoves = 22;

let grid = [];
let movesLeft = maxMoves;

const boardElement = document.getElementById('board');
const controlsElement = document.getElementById('controls');
const statusElement = document.getElementById('status');
const restartButton = document.getElementById('restart-btn');

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
    button.className = 'color-btn';
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
    statusElement.textContent = `You won with ${movesLeft} moves left!`;
    disableControls();
  } else if (movesLeft <= 0) {
    statusElement.textContent = `Game over! Out of moves.`;
    disableControls();
  }
}

function checkWin() {
  const firstColor = grid[0][0];
  return grid.every((row) => row.every((cell) => cell === firstColor));
}

function updateStatus() {
  statusElement.textContent = `${movesLeft} moves left`;
}

function disableControls() {
  controlsElement
    .querySelectorAll('button')
    .forEach((btn) => (btn.disabled = true));
}

restartButton.addEventListener('click', () => {
  initGame();
  controlsElement
    .querySelectorAll('button')
    .forEach((btn) => (btn.disabled = false));
});

initGame();
