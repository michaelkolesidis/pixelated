/*
 *  Pixelated
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

const TEXTS = {
  LOSS_MESSAGE: 'Game over! Out of moves.',
  WINNING_STREAK: 'Winning streak: ',
  MOVES_LEFT: (moves) => `${moves} move${moves === 1 ? '' : 's'} left`,
  WIN_MESSAGE: (moves) =>
    `You won with ${moves === 1 ? '1 move' : `${moves} moves`} left!`,
  HELP_TITLE: 'How to Play',
  HELP_DESCRIPTION:
    'Pixelated is a puzzle-based strategy game that requires a mix of skill and luck.',
  HELP_OBJECTIVE:
    'The objective is to change the colour of the squares until the entire screen is a single solid colour.',
  HELP_INSTRUCTIONS:
    'Starting with the square in the upper left corner you can change the colour of the blocks in order to match that of the surrounding squares. This is done repeatedly until the entire screen is one colour. Under the default settings, you must do so in under 22 moves to win.',
  HELP_CONTROLS:
    'The game is controlled by the large colored blocks at the bottom of the screen.',
  BACK_BUTTON: 'Back',
  NEW_BUTTON: 'New',
  COPYRIGHT: `©<a
              href="https://github.com/michaelkolesidis/pixelated"
              target="_blank"
              >Michael Kolesidis</a
            >
            <br />
            Licensed under the
            <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank"
              >GNU AGPL</a
            >`,
};
