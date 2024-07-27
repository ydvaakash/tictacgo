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

// 1. player2ComputerGameLogic() function: Enables the 'player2', i.e. computer to play it's turn.
// 2. findNearestLargerOrSmallest() function: Returns the index of nearest largest or smallest blank box to highlight after 'player2' has made it's move.

import { updateAllBlankGameBoardBoxesIndexes, accessAllBlankGameBoardBoxesIndexes, removeHighlightFromProvidedGameBoardBox, highlightSelectedGameBoardBox, modifySelectedGameBoardBox } from '../components/gameBoard.js';
import { accessCurrentHighlightedBoxIndex, modifyAllBoxesEmptyFlag, modifyCurrentHighlightedBoxIndex, modifyCurrentPlayer, accessGameWinnerFoundFlag, delay } from '../utils/constants.js';
import { checkForWinner } from './checkForWinner.js';

const player2ComputerGameLogic = async (abortControllerSignal) => {
  let localAllBlankGameBoardBoxesIndexes = null;
  let localCurrentHighlightedBoxIndex = null;
  let randomNumberForChoosingTargetBoxIndex = null;
  let indexOfNextBoxToHighlight = null;

  if(abortControllerSignal.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();
  removeHighlightFromProvidedGameBoardBox(localCurrentHighlightedBoxIndex);

  await delay(800);

  updateAllBlankGameBoardBoxesIndexes();
  localAllBlankGameBoardBoxesIndexes = accessAllBlankGameBoardBoxesIndexes();
  randomNumberForChoosingTargetBoxIndex = generateRandomNumberForChoosingTargetId(localAllBlankGameBoardBoxesIndexes.length);
  highlightSelectedGameBoardBox(localAllBlankGameBoardBoxesIndexes[randomNumberForChoosingTargetBoxIndex]);
  modifyCurrentHighlightedBoxIndex(localAllBlankGameBoardBoxesIndexes[randomNumberForChoosingTargetBoxIndex]);
  localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();

  await delay(800);

  modifySelectedGameBoardBox(localCurrentHighlightedBoxIndex, '0');

  await delay(800);

  removeHighlightFromProvidedGameBoardBox(localCurrentHighlightedBoxIndex);

  updateAllBlankGameBoardBoxesIndexes();
  await checkForWinner('0');
  localAllBlankGameBoardBoxesIndexes = accessAllBlankGameBoardBoxesIndexes();
  let localGameWinnerFoundFlag = accessGameWinnerFoundFlag();

  if((localAllBlankGameBoardBoxesIndexes.length > 0) && (!localGameWinnerFoundFlag)) {
    localAllBlankGameBoardBoxesIndexes.sort((a, b) => a-b);
    indexOfNextBoxToHighlight = findNearestLargerOrSmallest(localAllBlankGameBoardBoxesIndexes, localCurrentHighlightedBoxIndex);
    modifyCurrentHighlightedBoxIndex(indexOfNextBoxToHighlight);
    localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();
    highlightSelectedGameBoardBox(localCurrentHighlightedBoxIndex);
  }

  modifyAllBoxesEmptyFlag(false);
  modifyCurrentPlayer('player1');
};

const generateRandomNumberForChoosingTargetId = (countOfBlankBoxes) => {
  return Math.floor(Math.random()*countOfBlankBoxes);
};

const findNearestLargerOrSmallest = (sortedArray, targetValue) => {
// function findNearestLargerOrSmallest(arr, value) {
  let left = 0;
  let right = sortedArray.length - 1;

  // If the value is greater than or equal to the last element, return the smallest element.
  if (targetValue >= sortedArray[right]) {
    return sortedArray[0];
  }

  // Perform binary search to find the nearest larger number
  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (sortedArray[mid] > targetValue) {
      right = mid;  // Possible candidate, search left part for smaller larger number
    } else {
      left = mid + 1;  // Search in the right part
    }
  }

  // The loop exits when left === right, and arr[left] is the smallest number greater than value
  return sortedArray[left];
}

export { player2ComputerGameLogic };