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

// 1. gameControl() function: Calls either 'player1' or 'player2' at a time to allow them play their turn.

import { accessGameOverFlag, accessCurrentPlayer, accessGameWinnerFoundFlag, delay } from '../utils/constants.js';
import { player1HumanGameLogic } from '../utils/player1HumanGameLogic.js';
import { player2ComputerGameLogic } from '../utils/player2ComputerGameLogic.js';
import { updateGameAnnouncementText } from '../components/gameAnnouncement.js';

const gameControl = async (abortControllerSignal) => {
  let localGameOverFlag = accessGameOverFlag();
  let localCurrentPlayerValue = accessCurrentPlayer();
  let localGameWinnerFoundFlag = accessGameWinnerFoundFlag();

  while(!localGameOverFlag && !localGameWinnerFoundFlag) {
    if(abortControllerSignal.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    switch(localCurrentPlayerValue) {
      case 'player1':
        updateGameAnnouncementText('Your (Player 1) turn.');
        await player1HumanGameLogic(abortControllerSignal);
        break;

      case 'player2':
        updateGameAnnouncementText('Computer\'s (Player 2) turn.');
        await player2ComputerGameLogic(abortControllerSignal);
        break;
    }

    localGameOverFlag = accessGameOverFlag();
    localGameWinnerFoundFlag = accessGameWinnerFoundFlag();
    localCurrentPlayerValue = accessCurrentPlayer();
  }

  if(localGameOverFlag && !localGameWinnerFoundFlag) {
    updateGameAnnouncementText('Match tie!');
    await delay(4000);
  }
};

export { gameControl };
