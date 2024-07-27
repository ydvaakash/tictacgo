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

// 1. decideGameStartingPlayer() function: Decides the gameStartingPlayer.

import { accessCurrentPlayer, modifyCurrentPlayer } from '../utils/constants.js';
import { updateGameAnnouncementText } from '../components/gameAnnouncement.js';

const decideGameStartingPlayer = () => {
  let randomNumberToDecideStartingPlayer = Math.floor(Math.random() * 2);

  if(randomNumberToDecideStartingPlayer === 0) {
    modifyCurrentPlayer('player1');
  } else {
    modifyCurrentPlayer('player2');
  }

  let localGameStartingPlayer = accessCurrentPlayer();

  switch(localGameStartingPlayer) {
    case 'player1':
      updateGameAnnouncementText('You (Player 1) will start the game.');
      break;
    case 'player2':
      updateGameAnnouncementText('Computer (Player 2) will start the game.');
      break;
  }
};

export { decideGameStartingPlayer };