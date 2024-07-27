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

// 1. JavaScript starting file for the application.
// 2. Call initializeGame() to initialize the game.
// 3. Call gameControl() in loop to keep game play in continuous mode.

import { initializeGame } from '../src/services/initializeGame.js';
import { gameControl } from './services/gameControl.js';
import { modifyGameOverFlag, modifyGameWinnerFoundFlag, modifyGameWinnerPlayer, delay, modifyCurrentHighlightedBoxIndex, modifyRestartGameRequestFlag, accessRestartGameRequestFlag, accessGameOverFlag, accessGameWinnerFoundFlag, modifyAllBoxesEmptyFlag } from './utils/constants.js';
import { resetgameBoardAllBoxesSymbols } from './components/gameBoard.js';
import { updateGameAnnouncementText } from './components/gameAnnouncement.js';
import { decideGameStartingPlayer } from './utils/decideGameStartingPlayer.js';
import { restartGame } from './utils/restartGame.js';
import { resetGameStatsBoard } from './components/gameStats.js';

const restartGameButton = document.getElementById('restart-game-button');
const resetStatsButton = document.getElementById('reset-stats-button');

document.addEventListener('DOMContentLoaded', async () => {
  await initializeGame();

  let abortController;
  let abortControllerSignal;
  let localRestartGameRequestFlag = null;
  let localGameOverFlag = null;
  let localGameWinnerFoundFlag = null;

  const initializeAbortController = () => {
    abortController = new AbortController();
    abortControllerSignal = abortController.signal;
  };

  initializeAbortController();

  restartGameButton.addEventListener('click', () => {
    abortController.abort();
    modifyRestartGameRequestFlag(true);
  });

  resetStatsButton.addEventListener('click', () => {
    resetGameStatsBoard();
  });

  while(true) {
    localRestartGameRequestFlag = accessRestartGameRequestFlag();
    if(localRestartGameRequestFlag) {
      await restartGame();
      initializeAbortController();
    }

    try {
      await gameControl(abortControllerSignal);
    } catch (e) {
      if(e.name === 'AbortError') {
        await restartGame();
        initializeAbortController();
        modifyRestartGameRequestFlag(false);
      } else {
        throw e;
      }
    }

    localRestartGameRequestFlag = accessRestartGameRequestFlag();
    if(localRestartGameRequestFlag) {
      await restartGame();
      initializeAbortController();
    }

    localGameOverFlag = accessGameOverFlag();
    localGameWinnerFoundFlag = accessGameWinnerFoundFlag();

    if(localGameOverFlag || localGameWinnerFoundFlag) {
      modifyGameOverFlag(false);
      modifyGameWinnerFoundFlag(false);
      modifyGameWinnerPlayer(null);
      modifyAllBoxesEmptyFlag(true);
      resetgameBoardAllBoxesSymbols();
      updateGameAnnouncementText('Next match starts!');
    }

    await delay(2500);
    modifyCurrentHighlightedBoxIndex(0);
    decideGameStartingPlayer();
    await delay(2500);
  }
});