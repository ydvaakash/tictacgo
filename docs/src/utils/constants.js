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

// 1. Access and Modify the value of currentPlayer.
// 2. Access and Modify the valueu of gameOverFlag.
// 3. Access and Modify the value of allBoxesEmptyFlag.
// 4. Access and Modify the value of currentHighlightedBoxIndex.
// 5. Access and Modify the value of gameWinnerPlayer.
// 6. Access and Modify the value of gameWinnerFoundFlag.
// 7. delay() function: To pause the game play for provided amount of milliseconds.
// 8. Access and Modify the value of restartGameRequestFlag.

let currentPlayer = null;
let gameOverFlag = false;
let allBoxesEmptyFlag = true;
let currentHighlightedBoxIndex = null;
let gameWinnerPlayer = null;
let gameWinnerFoundFlag = false;
let restartGameRequestFlag = false;

const accessCurrentPlayer = () => {
  return currentPlayer;
};

const modifyCurrentPlayer = (currentPlayerNewValue) => {
  currentPlayer = currentPlayerNewValue;
};

const accessGameOverFlag = () => {
  return gameOverFlag;
};

const modifyGameOverFlag = (gameOverFlagNewValue) => {
  gameOverFlag = gameOverFlagNewValue;
};

const accessAllBoxesEmptyFlag = () => {
  return allBoxesEmptyFlag;
};

const modifyAllBoxesEmptyFlag = (allBoxesEmptyFlagNewValue) => {
  allBoxesEmptyFlag = allBoxesEmptyFlagNewValue;
};

const accessCurrentHighlightedBoxIndex = () => {
  return currentHighlightedBoxIndex;
};

const modifyCurrentHighlightedBoxIndex = (currentHighlightedBoxIndexNewValue) => {
  currentHighlightedBoxIndex = currentHighlightedBoxIndexNewValue;
};

const accessGameWinnerPlayer = () => {
  return gameWinnerPlayer;
};

const modifyGameWinnerPlayer = (newGameWinnerValue) => {
  gameWinnerPlayer = newGameWinnerValue;
};

const accessGameWinnerFoundFlag = () => {
  return gameWinnerFoundFlag;
};

const modifyGameWinnerFoundFlag = (gameWinnerFoundFlagNewValue) => {
  gameWinnerFoundFlag = gameWinnerFoundFlagNewValue;
};

const delay = (timeToDelayInMilliSeconds) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, timeToDelayInMilliSeconds);
});

const accessRestartGameRequestFlag = () => {
  return restartGameRequestFlag;
};

const modifyRestartGameRequestFlag = (restartGameRequestFlagNewValue) => {
  restartGameRequestFlag = restartGameRequestFlagNewValue;
};


export { accessCurrentPlayer, modifyCurrentPlayer, accessGameOverFlag, modifyGameOverFlag, accessAllBoxesEmptyFlag, modifyAllBoxesEmptyFlag, accessCurrentHighlightedBoxIndex, modifyCurrentHighlightedBoxIndex, accessGameWinnerPlayer, modifyGameWinnerPlayer, accessGameWinnerFoundFlag, modifyGameWinnerFoundFlag, delay, accessRestartGameRequestFlag, modifyRestartGameRequestFlag };
