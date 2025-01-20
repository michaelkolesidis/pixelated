/*
 *  Pixelated
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

(() => {
  // The dimensions of the board grid
  const GRID_SIZE = { width: 12, height: 13 };

  // The colors used in the game
  const COLORS = [
    '#0000ff', // Blue
    '#ff0000', // Red
    '#008000', // Green
    '#ffff00', // Yellow
    '#ffa500', // Orange
    '#800080', // Purple
  ];

  // Maximum number of moves allowed per game
  const MAX_MOVES = 22;

  /**
   * Creates the initial state object for the game
   * @returns {Object} Initial game state with empty grid, max moves, and zero winning streak
   */
  const createInitialState = () => ({
    grid: [],
    movesLeft: MAX_MOVES,
    winningStreak: 0,
  });

  // Current game state that gets updated throughout the game
  let gameState = createInitialState();

  // Cache of DOM elements used throughout the game
  const elements = {
    board: document.getElementById('board'),
    controls: document.getElementById('controls'),
    status: document.getElementById('status'),
    winningStreak: document.getElementById('winning-streak'),
    newButton: document.getElementById('new-button'),
    helpButton: document.getElementById('help-button'),
    helpContainer: document.getElementById('help-container'),
    helpTitle: document.getElementById('help-title'),
    helpDescription: document.getElementById('help-description'),
    helpObjective: document.getElementById('help-objective'),
    helpInstructions: document.getElementById('help-instructions'),
    helpControls: document.getElementById('help-controls'),
    backButton: document.getElementById('back-button'),
    copyright: document.getElementById('copyright'),
  };

  /**
   * Generates the initial grid with random colors
   * @returns {Array<Array<string>>} 2D array of color hex codes
   */
  const generateGrid = () =>
    Array.from({ length: GRID_SIZE.height }, () =>
      Array.from(
        { length: GRID_SIZE.width },
        () => COLORS[Math.floor(Math.random() * COLORS.length)]
      )
    );

  /**
   * Creates HTML string representation of the game grid
   * @param {Array<Array<string>>} grid - 2D array of color codes
   * @returns {string} HTML string for grid cells
   */
  const createGridHtml = (grid) =>
    grid
      .flatMap((row) =>
        row.map(
          (color) =>
            `<div class="cell" style="background-color:${color}"></div>`
        )
      )
      .join('');

  /**
   * Creates HTML for color control buttons
   * @returns {string} HTML string for color buttons
   */
  const createControlsHtml = () =>
    COLORS.map(
      (color) =>
        `<button class="color-button" style="background-color:${color}" data-color="${color}"></button>`
    ).join('');

  /**
   * Implements flood fill algorithm to update grid colors
   * @param {Array<Array<string>>} grid - Current game grid
   * @param {string} newColor - Color to flood fill with
   * @param {number} startX - Starting X coordinate
   * @param {number} startY - Starting Y coordinate
   * @returns {Array<Array<string>>} New grid with updated colors
   */
  const floodFillGrid = (grid, newColor, startX = 0, startY = 0) => {
    const oldColor = grid[0][0];
    if (newColor === oldColor) return grid;

    const newGrid = grid.map((row) => [...row]);

    const fill = (x, y) => {
      if (
        x < 0 ||
        y < 0 ||
        x >= GRID_SIZE.width ||
        y >= GRID_SIZE.height ||
        newGrid[y][x] !== oldColor
      )
        return;

      newGrid[y][x] = newColor;
      [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ].forEach(([dx, dy]) => fill(x + dx, y + dy));
    };

    fill(startX, startY);
    return newGrid;
  };

  /**
   * Checks if the current grid state is winning (all same color)
   * @param {Array<Array<string>>} grid - Current game grid
   * @returns {boolean} True if game is won
   */
  const isWinningGrid = (grid) => {
    const firstColor = grid[0][0];
    return grid.every((row) => row.every((cell) => cell === firstColor));
  };

  /**
   * Updates the game board display
   */
  const renderGrid = () => {
    elements.board.style.gridTemplateColumns = `repeat(${GRID_SIZE.width}, 1fr)`;
    elements.board.innerHTML = createGridHtml(gameState.grid);
  };

  /**
   * Renders control buttons and attaches click handlers
   */
  const renderControls = () => {
    elements.controls.innerHTML = createControlsHtml();
    elements.controls
      .querySelectorAll('.color-button')
      .forEach((button) =>
        button.addEventListener('click', () =>
          handleColorClick(button.dataset.color)
        )
      );
  };

  /**
   * Updates the moves remaining display
   */
  const updateStatus = () => {
    elements.status.textContent = TEXTS.MOVES_LEFT(gameState.movesLeft);
  };

  /**
   * Updates the winning streak counter and display
   * @param {boolean} reset - Whether to reset streak to zero
   */
  const updateWinningStreak = (reset = false) => {
    gameState = {
      ...gameState,
      winningStreak: reset ? 0 : gameState.winningStreak + 1,
    };

    if (reset) {
      elements.winningStreak.classList.add('hidden');
    } else {
      elements.winningStreak.classList.remove('hidden');
      elements.winningStreak.textContent = `${TEXTS.WINNING_STREAK}${gameState.winningStreak}`;
    }
  };

  /**
   * Initializes or restarts the game while preserving winning streak
   */
  const initGame = () => {
    const currentStreak = gameState.winningStreak;

    gameState = {
      ...createInitialState(),
      grid: generateGrid(),
      winningStreak: currentStreak,
    };

    renderGrid();
    renderControls();
    updateStatus();

    if (currentStreak > 0) {
      elements.winningStreak.classList.remove('hidden');
      elements.winningStreak.textContent = `${TEXTS.WINNING_STREAK}${currentStreak}`;
    } else {
      elements.winningStreak.classList.add('hidden');
    }

    enableControls();
  };

  /**
   * Handles color button clicks and updates game state
   * @param {string} newColor - Selected color hex code
   */
  const handleColorClick = (newColor) => {
    if (gameState.movesLeft <= 0) return;

    gameState = {
      ...gameState,
      grid: floodFillGrid(gameState.grid, newColor),
      movesLeft: gameState.movesLeft - 1,
    };

    renderGrid();
    updateStatus();

    if (isWinningGrid(gameState.grid)) {
      endGame(TEXTS.WIN_MESSAGE(gameState.movesLeft));
      updateWinningStreak(false);
    } else if (gameState.movesLeft <= 0) {
      endGame(TEXTS.LOSS_MESSAGE);
      updateWinningStreak(true);
    }
  };

  /**
   * Handles game end state
   * @param {string} message - End game message to display
   */
  const endGame = (message) => {
    elements.status.textContent = message;
    disableControls();
  };

  /**
   * Toggles help modal visibility
   * @param {boolean} isVisible - Whether to show or hide the modal
   */
  const toggleHelpModal = (isVisible) => {
    elements.helpContainer.classList.toggle('hidden', !isVisible);
    elements.helpContainer.classList.toggle('visible', isVisible);
  };

  /**
   * Disables all color control buttons
   */
  const disableControls = () => {
    elements.controls
      .querySelectorAll('.color-button')
      .forEach((button) => (button.disabled = true));
  };

  /**
   * Enables all color control buttons
   */
  const enableControls = () => {
    elements.controls
      .querySelectorAll('.color-button')
      .forEach((button) => (button.disabled = false));
  };

  /**
   * Sets up all event listeners for the game
   */
  const bindEvents = () => {
    elements.newButton.addEventListener('click', initGame);
    elements.helpButton.addEventListener('click', () => toggleHelpModal(true));
    elements.backButton.addEventListener('click', () => toggleHelpModal(false));
    elements.board.addEventListener('contextmenu', (e) => e.preventDefault());
  };

  /**
   * Initializes all text content from TEXTS constant
   */
  const initializeTexts = () => {
    elements.newButton.textContent = TEXTS.NEW_BUTTON;
    elements.helpTitle.textContent = TEXTS.HELP_TITLE;
    elements.helpDescription.textContent = TEXTS.HELP_DESCRIPTION;
    elements.helpObjective.textContent = TEXTS.HELP_OBJECTIVE;
    elements.helpInstructions.textContent = TEXTS.HELP_INSTRUCTIONS;
    elements.helpControls.textContent = TEXTS.HELP_CONTROLS;
    elements.backButton.textContent = TEXTS.BACK_BUTTON;
    elements.copyright.innerHTML = TEXTS.COPYRIGHT;
  };

  /**
   * Registers the service worker for offline functionality
   */
  const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log(
              'Service Worker registered with scope:',
              registration.scope
            );
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
      });
    }
  };

  /**
   * Starts the game by binding events, initializing texts and game state,
   * and registering service worker
   */
  const startGame = () => {
    bindEvents();
    initializeTexts();
    initGame();
    registerServiceWorker();
  };

  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', startGame);
})();
