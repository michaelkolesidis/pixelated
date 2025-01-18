/*
 *  Pixelated
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

(() => {
  const gridSize = { width: 12, height: 13 };
  const colors = ['blue', 'red', 'green', 'yellow', '#ffa100', 'purple'];
  const maxMoves = 22;

  let grid = [];
  let movesLeft = maxMoves;

  const boardElement = document.getElementById('board');
  const controlsElement = document.getElementById('controls');
  const statusElement = document.getElementById('status');
  const restartButton = document.getElementById('restart-button');
  const helpButton = document.getElementById('help-button');
  const helpContainer = document.getElementById('help-container');
  const closeButton = document.getElementById('close-button');

  const toggleHelpModal = (isVisible) => {
    helpContainer.classList.toggle('hidden', !isVisible);
    helpContainer.classList.toggle('visible', isVisible);
  };

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
    boardElement.innerHTML = grid
      .flatMap((row, y) =>
        row.map(
          (color, x) =>
            `<div class="cell" style="background-color:${color}"></div>`
        )
      )
      .join('');
  }

  function renderControls() {
    // Render color buttons
    controlsElement.innerHTML = colors
      .map(
        (color) =>
          `<button class="color-button" style="background-color:${color}" data-color="${color}"></button>`
      )
      .join('');
    Array.from(controlsElement.children).forEach((button) =>
      button.addEventListener('click', () => floodFill(button.dataset.color))
    );

    // Set up help modal functionality
    helpButton.addEventListener('click', () => toggleHelpModal(true));
    closeButton.addEventListener('click', () => toggleHelpModal(false));
  }

  function floodFill(newColor) {
    const oldColor = grid[0][0];
    if (newColor === oldColor || movesLeft <= 0) return;

    const fill = (x, y) => {
      if (
        x < 0 ||
        y < 0 ||
        x >= gridSize.width ||
        y >= gridSize.height ||
        grid[y][x] !== oldColor
      )
        return;
      grid[y][x] = newColor;
      fill(x + 1, y);
      fill(x - 1, y);
      fill(x, y + 1);
      fill(x, y - 1);
    };

    fill(0, 0);
    movesLeft--;
    renderGrid();
    updateStatus();

    if (checkWin()) {
      statusElement.textContent = `You won with ${
        movesLeft === 1 ? '1 move' : `${movesLeft} moves`
      } left!`;
      disableControls();
    } else if (movesLeft <= 0) {
      statusElement.textContent = `Game over! Out of moves.`;
      disableControls();
    }
  }

  function checkWin() {
    return grid.every((row) => row.every((cell) => cell === grid[0][0]));
  }

  function updateStatus() {
    statusElement.textContent = `${movesLeft} move${
      movesLeft === 1 ? '' : 's'
    } left`;
  }

  function disableControls() {
    Array.from(controlsElement.children).forEach(
      (button) => (button.disabled = true)
    );
  }

  restartButton.addEventListener('click', initGame);

  initGame();
})();
