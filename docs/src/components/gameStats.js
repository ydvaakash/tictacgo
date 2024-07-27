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

// 1. Access player1Points.
// 2. Access player2Points.
// 3. Modify player1Points.
// 4. Modify player2Points.
// 5. Update player1Points.
// 6. Update player2Points.
// 7. Reset player1Points.
// 8. Reset player2Points.
// 9. Update gameStatsBoard.
// 10. Reset gameStatsBoard.

const player1WinCountElement = document.getElementById('player1-win-count');
const player2WinCountElement = document.getElementById('player2-win-count');

let player1Points = null;
let player2Points = null;

const accessPlayer1Points = () => {
  return player1Points;
};

const accessPlayer2Points = () => {
  return player2Points;
};

const modifyPlayer1Points = (player1NewPointsValue) => {
  player1Points = player1NewPointsValue;
};

const modifyPlayer2Points = (player2NewPointsValue) => {
  player2Points = player2NewPointsValue;
};

const updatePlayer1Points = () => {
  let tempPlayer1Points = accessPlayer1Points();

  modifyPlayer1Points(tempPlayer1Points + 1);
};

const updatePlayer2Points = () => {
  let tempPlayer2Points = accessPlayer2Points();

  modifyPlayer2Points(tempPlayer2Points + 1);
};

const resetPlayer1Points = () => {
  modifyPlayer1Points(0);
};

const resetPlayer2Points = () => {
  modifyPlayer2Points(0);
};

const updateGameStatsBoard = () => {
  player1WinCountElement.innerText = accessPlayer1Points();
  player2WinCountElement.innerText = accessPlayer2Points();
};

const resetGameStatsBoard = () => {
  resetPlayer1Points();
  resetPlayer2Points();
  player1WinCountElement.innerText = accessPlayer1Points();
  player2WinCountElement.innerText = accessPlayer2Points();
};

export { resetGameStatsBoard, updatePlayer1Points, updatePlayer2Points, updateGameStatsBoard };