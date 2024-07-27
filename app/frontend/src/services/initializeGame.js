/*
TicTacGo: Experience classic Tic-Tac-Toe against the computer. Play using
a mouse, trackpad, or even your keyboard keys (WASD or arrow keys)!
Copyright (C) [2024]  [Aakash Yadav]
This file is part of [TicTacGo].

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// 1. initializeGame() function: Resets various elements of the game for a fresh start of the game.
// 2. Modify gameOverFlag to 'false'.
// 3. Modify gameWinnerFoundFlag to 'false'.
// 4. Modify allBoxesEmptyFlag to 'true'.
// 5. Reset gameStatsBoard.
// 6. Reset gameBoard all boxes symbols.
// 7. Modify currentHighlightedBoxIndex.
// 8. Decide gameStartingPlayer.

import { resetGameStatsBoard } from '../components/gameStats.js';
import { resetgameBoardAllBoxesSymbols } from '../components/gameBoard.js';
import { decideGameStartingPlayer } from '../utils/decideGameStartingPlayer.js';
import { modifyCurrentHighlightedBoxIndex, modifyGameWinnerFoundFlag, modifyGameOverFlag, modifyAllBoxesEmptyFlag, delay } from '../utils/constants.js';

const initializeGame = async () => {
  modifyGameOverFlag(false);
  modifyGameWinnerFoundFlag(false);
  modifyAllBoxesEmptyFlag(true);
  resetGameStatsBoard();
  resetgameBoardAllBoxesSymbols();
  modifyCurrentHighlightedBoxIndex(0);
  decideGameStartingPlayer();
  await delay(4000);
};

export { initializeGame };
