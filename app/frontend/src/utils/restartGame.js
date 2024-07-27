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

// 1. restartGame() function: Does the following to restart the game:
// 1.1 Modify restartGameRequestFlag to 'false'.
// 1.2 Modify gameOverFlag to 'false'.
// 1.3 Modify gameWinnerFoundFlag to 'false'.
// 1.4 Modify gameWinnerPlayer to 'null'.
// 1.5 Modify allBoxesEmptyFlag to 'true'.
// 1.6 Update gameAnnouncementText.
// 1.7 Remove highlight from currently provided gameBoardBox.
// 1.8 Reset gameBoard all boxes symbols.
// 1.9 Modify currentHighlightedBoxIndex.

import { modifyGameOverFlag, modifyGameWinnerFoundFlag, modifyGameWinnerPlayer, accessCurrentHighlightedBoxIndex, modifyCurrentHighlightedBoxIndex, modifyRestartGameRequestFlag, modifyAllBoxesEmptyFlag } from './constants.js';
import { updateGameAnnouncementText } from '../components/gameAnnouncement.js';
import { resetgameBoardAllBoxesSymbols, removeHighlightFromProvidedGameBoardBox } from '../components/gameBoard.js';

const restartGame = async () => {
  modifyRestartGameRequestFlag(false);
  modifyGameOverFlag(false);
  modifyGameWinnerFoundFlag(false);
  modifyGameWinnerPlayer(null);
  modifyAllBoxesEmptyFlag(true);
  updateGameAnnouncementText('Game restarted!');
  let localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();
  removeHighlightFromProvidedGameBoardBox(localCurrentHighlightedBoxIndex);
  resetgameBoardAllBoxesSymbols();
  modifyCurrentHighlightedBoxIndex(0);
};

export { restartGame };