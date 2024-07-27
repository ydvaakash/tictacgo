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

// 1. Show winner announcement as gameAnnouncementText.
// 2. Update winner player points.
// 3. Update gameStatsBoard.
// 4. Highlight gameBoardBoxes with winner moves.
// 5. Wait for 4 seconds.
// 6. Remove highlight from gameBoardBoxes with winner moves.

import { accessGameWinnerPlayer, delay } from './constants.js';
import { updateGameAnnouncementText } from '../components/gameAnnouncement.js';
import { updateGameStatsBoard, updatePlayer1Points, updatePlayer2Points } from '../components/gameStats.js';
import { highlightSelectedGameBoardBox, removeHighlightFromProvidedGameBoardBox } from '../components/gameBoard.js';

const announceWinner = async (localArrayOfWinnerIndexes) => {
  let localGameWinnerPlayer = accessGameWinnerPlayer();

  if(localGameWinnerPlayer === 'player1') {
    updateGameAnnouncementText('Congratulations! You (Player 1) have won the match');
    updatePlayer1Points();
  } else if(localGameWinnerPlayer === 'player2') {
    updateGameAnnouncementText(`Computer (Player2) has won this match.`);
    updatePlayer2Points();
  }

  updateGameStatsBoard();

  highlightSelectedGameBoardBox(localArrayOfWinnerIndexes[0]);
  highlightSelectedGameBoardBox(localArrayOfWinnerIndexes[1]);
  highlightSelectedGameBoardBox(localArrayOfWinnerIndexes[2]);

  await delay(4000);

  removeHighlightFromProvidedGameBoardBox(localArrayOfWinnerIndexes[0]);
  removeHighlightFromProvidedGameBoardBox(localArrayOfWinnerIndexes[1]);
  removeHighlightFromProvidedGameBoardBox(localArrayOfWinnerIndexes[2]);

};

export { announceWinner };