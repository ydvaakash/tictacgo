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

// 1. Access gameBoard all individual boxes.
// 2. Reset gameBoard all individual boxes.
// 3. Access gameBoard all boxes symbols.
// 4. Modify symbol in selected gameBoardBox.
// 5. Highlight selected gameBoardBox.
// 6. Remove highlight from selected gameBoardBox.
// 7. Update all blank gameBoardBoxes indexes.
// 8. Access all blank gameBoardBoxes indexes.
// 9. Modidfy blank gameBoardBoxes count.
// 10. Access blank gameBoardBoxes count.

import { modifyGameOverFlag } from '../utils/constants.js';

const gameBoardAllBoxesSymbols = Array.from(document.getElementsByClassName('game-board-boxes'));
const gameBoardAllIndividualBoxes = Array.from(document.getElementsByClassName('game-board-individual-box'));

let allBlankGameBoardBoxesIndexes = [];
let blankGameBoardBoxesCount = null;

const accessGameBoardAllIndividualBoxes = () => {
  return gameBoardAllIndividualBoxes;
};

const resetgameBoardAllBoxesSymbols = () => {
  gameBoardAllBoxesSymbols.forEach((gameBoardBoxSymbol) => {
    gameBoardBoxSymbol.innerText = '-';
  });
};

const accessGameBoardAllBoxesSymbols = () => {
  return gameBoardAllBoxesSymbols;
};

const modifySelectedGameBoardBox = (indexOfSelectedGameBoardBox, newValueOfSelectedGameBoardBox) => {
  gameBoardAllBoxesSymbols[indexOfSelectedGameBoardBox].innerText = newValueOfSelectedGameBoardBox;
};

const highlightSelectedGameBoardBox = (indexOfBoxToHighlight) => {
  gameBoardAllIndividualBoxes[indexOfBoxToHighlight].classList.add('highlight-individual-box');
};

const removeHighlightFromProvidedGameBoardBox = (indexOfBoxToNormalize) => {
  gameBoardAllIndividualBoxes[indexOfBoxToNormalize].classList.remove('highlight-individual-box');
};

const updateAllBlankGameBoardBoxesIndexes = () => {
  allBlankGameBoardBoxesIndexes.length = 0;
  let tempGameBoardAllBoxesSymbols = accessGameBoardAllBoxesSymbols();
  tempGameBoardAllBoxesSymbols.forEach((individualGameBoardBoxSymbol, index) => {
    if(individualGameBoardBoxSymbol.innerText === '-') {
      allBlankGameBoardBoxesIndexes.push(index);
    }
  });

  modifyBlankGameBoardBoxesCount(allBlankGameBoardBoxesIndexes.length);

  let localBlankGameBoardBoxesCount = accessBlankGameBoardBoxesCount();

  if(localBlankGameBoardBoxesCount === 0) {
    modifyGameOverFlag(true);
  } else {
    modifyGameOverFlag(false);
  }
};

const accessAllBlankGameBoardBoxesIndexes = () => {
  return allBlankGameBoardBoxesIndexes;
};

const modifyBlankGameBoardBoxesCount = (newCountValue) => {
  blankGameBoardBoxesCount = newCountValue;
};

const accessBlankGameBoardBoxesCount = () => {
  return blankGameBoardBoxesCount;
};

export { modifySelectedGameBoardBox, accessGameBoardAllBoxesSymbols, resetgameBoardAllBoxesSymbols, highlightSelectedGameBoardBox, removeHighlightFromProvidedGameBoardBox, accessAllBlankGameBoardBoxesIndexes, accessGameBoardAllIndividualBoxes, updateAllBlankGameBoardBoxesIndexes, accessBlankGameBoardBoxesCount };