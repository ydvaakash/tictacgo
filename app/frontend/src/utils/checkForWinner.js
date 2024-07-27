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

// 1. Check if gameBoardBoxes have same symbols as either 'X' or '0' vertically, horizontally, or diagonally.
// 2. If any veritical, or horizontal, or diagonal set of indexes has same symbol as either 'X' or '0', then do the following:
// 2.1 Modify gameWinnerFoundFlag to 'true'.
// 2.2 Modify gameWinnerPlayer to currentPlayer.
// 2.3 Call announceWinner to announce regarding winner of the match.

import { accessGameBoardAllBoxesSymbols } from '../components/gameBoard.js';
import { modifyGameWinnerPlayer, accessCurrentPlayer, modifyGameWinnerFoundFlag } from '../utils/constants.js';
import { announceWinner } from './announceWinner.js';

const checkForWinner = async (symbolToCheck) => {
  const winnerDecidingBoxesIndexes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const localGameBoardAllBoxesSymbols = accessGameBoardAllBoxesSymbols();

  for(let arrayOfWinnerIndexes of winnerDecidingBoxesIndexes) {
    if((localGameBoardAllBoxesSymbols[arrayOfWinnerIndexes[0]].innerText === symbolToCheck) && (localGameBoardAllBoxesSymbols[arrayOfWinnerIndexes[1]].innerText === symbolToCheck) && (localGameBoardAllBoxesSymbols[arrayOfWinnerIndexes[2]].innerText === symbolToCheck)) {
      modifyGameWinnerFoundFlag(true);
      let localCurrentPlayer = accessCurrentPlayer();
      modifyGameWinnerPlayer(localCurrentPlayer);
      await announceWinner(arrayOfWinnerIndexes);
      break;
    }
  }
};

export { checkForWinner };