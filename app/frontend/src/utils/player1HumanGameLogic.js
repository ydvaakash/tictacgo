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

// 1. player1HumanGameLogic() function: Enables the 'player1' to play their turn either using mouse, or trackpad, or through keyboard interaction.
// 2. createArrayOfBlankBoxesAndIndexesAsObjects() function: Returns an array of objects where each object comprises of the individual blank box HTML element and it's respective index number in the gameBoard.

import { accessAllBoxesEmptyFlag, modifyAllBoxesEmptyFlag, modifyCurrentHighlightedBoxIndex, accessCurrentHighlightedBoxIndex, modifyCurrentPlayer, delay } from '../utils/constants.js';
import { updateAllBlankGameBoardBoxesIndexes, accessAllBlankGameBoardBoxesIndexes, modifySelectedGameBoardBox } from '../components/gameBoard.js';
import { highlightSelectedGameBoardBox, removeHighlightFromProvidedGameBoardBox, accessGameBoardAllIndividualBoxes } from '../components/gameBoard.js';
import { checkForWinner } from './checkForWinner.js';
import { findBlankBoxIndexToHighlightUpside, findBlankBoxIndexToHighlightBelow, findBlankBoxIndexToHighlightOnLeftSide, findBlankBoxIndexToHighlightOnRightSide } from './findBlankBoxIndexToHighlight.js';

const player1HumanGameLogic = async (abortControllerSignal) => {
  let moveAlreadyMadeFlag = false;

  let localAllBoxesEmptyFlag = accessAllBoxesEmptyFlag();
  let localCurrentHighlightedBoxIndex = null;
  let localAllBlankGameBoardBoxesIndexes = null;
  let localGameBoardAllIndividualBoxes = null;
  let localBlankGameBoardAllIndividualBoxes = null;
  let localArrayOfBlankBoxesAndIndexesAsObjects = null;
  let localIndexOfNextBoxToHighlight = null;

  // if it's first turn of the game, highlight the first box in the top-left
  if(localAllBoxesEmptyFlag) {
    modifyCurrentHighlightedBoxIndex(0);
    localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();
    highlightSelectedGameBoardBox(localCurrentHighlightedBoxIndex);
  }

  updateAllBlankGameBoardBoxesIndexes();

  localAllBlankGameBoardBoxesIndexes = accessAllBlankGameBoardBoxesIndexes();
  localGameBoardAllIndividualBoxes = accessGameBoardAllIndividualBoxes();

  localBlankGameBoardAllIndividualBoxes = localGameBoardAllIndividualBoxes.filter((individualBox, index) => {
    return localAllBlankGameBoardBoxesIndexes.includes(index);
  });

  await new Promise((resolve) => {
    localArrayOfBlankBoxesAndIndexesAsObjects = createArrayOfBlankBoxesAndIndexesAsObjects(localGameBoardAllIndividualBoxes, localAllBlankGameBoardBoxesIndexes);

    const handleClickEventInBox = async (event) => {
      if(!moveAlreadyMadeFlag) {
        if(abortControllerSignal.aborted) {
          throw new DOMException('Aborted', 'AbortError');
          return;
        }

        moveAlreadyMadeFlag = true;

        let clickedElement = event.currentTarget;
  
        const elementToTarget = localArrayOfBlankBoxesAndIndexesAsObjects.find((obj) => obj.htmlElement === clickedElement);
  
        if(elementToTarget) {
          const indexOfBoxClicked = elementToTarget.indexOfHtmlElement;
  
          localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();
          removeHighlightFromProvidedGameBoardBox(localCurrentHighlightedBoxIndex);
          modifyCurrentHighlightedBoxIndex(indexOfBoxClicked);
          localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();
          highlightSelectedGameBoardBox(localCurrentHighlightedBoxIndex);
          modifySelectedGameBoardBox(localCurrentHighlightedBoxIndex, 'X');
          await delay(800);
          removeHighlightFromProvidedGameBoardBox(localCurrentHighlightedBoxIndex);
  
          localArrayOfBlankBoxesAndIndexesAsObjects.forEach((obj) => {
            obj.htmlElement.removeEventListener('click', handleClickEventInBox);
          });
  
          document.removeEventListener('keydown', handleKeyDownEventToNavigateBoxesInDocument);
          moveAlreadyMadeFlag = false;

          resolve();
  
        }
      }
    };
    
    localArrayOfBlankBoxesAndIndexesAsObjects.forEach((element) => {
      let targetElement = element.htmlElement;
      targetElement.addEventListener('click', handleClickEventInBox);
    });

    const handleKeyDownEventToNavigateBoxesInDocument = async (keyDownEvent) => {
      if((keyDownEvent.key === 'W' || keyDownEvent.key === 'w' || keyDownEvent.key === 'ArrowUp') && (!moveAlreadyMadeFlag)) {
        localIndexOfNextBoxToHighlight = await findBlankBoxIndexToHighlightUpside();
        localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();
        removeHighlightFromProvidedGameBoardBox(localCurrentHighlightedBoxIndex);
        modifyCurrentHighlightedBoxIndex(localIndexOfNextBoxToHighlight);
        localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();
        highlightSelectedGameBoardBox(localCurrentHighlightedBoxIndex);
      } else if((keyDownEvent.key === 'A' || keyDownEvent.key === 'a' || keyDownEvent.key === 'ArrowLeft') && (!moveAlreadyMadeFlag)) {
        localIndexOfNextBoxToHighlight = await findBlankBoxIndexToHighlightOnLeftSide();
        localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();
        removeHighlightFromProvidedGameBoardBox(localCurrentHighlightedBoxIndex);
        modifyCurrentHighlightedBoxIndex(localIndexOfNextBoxToHighlight);
        localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();
        highlightSelectedGameBoardBox(localCurrentHighlightedBoxIndex);
      } else if((keyDownEvent.key === 'S' || keyDownEvent.key === 's' || keyDownEvent.key === 'ArrowDown') && (!moveAlreadyMadeFlag)) {
        localIndexOfNextBoxToHighlight = await findBlankBoxIndexToHighlightBelow();
        localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();
        removeHighlightFromProvidedGameBoardBox(localCurrentHighlightedBoxIndex);
        modifyCurrentHighlightedBoxIndex(localIndexOfNextBoxToHighlight);
        localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();
        highlightSelectedGameBoardBox(localCurrentHighlightedBoxIndex);
      } else if((keyDownEvent.key === 'D' || keyDownEvent.key === 'd' || keyDownEvent.key === 'ArrowRight') && (!moveAlreadyMadeFlag)) {
        localIndexOfNextBoxToHighlight = await findBlankBoxIndexToHighlightOnRightSide();
        localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();
        removeHighlightFromProvidedGameBoardBox(localCurrentHighlightedBoxIndex);
        modifyCurrentHighlightedBoxIndex(localIndexOfNextBoxToHighlight);
        localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();
        highlightSelectedGameBoardBox(localCurrentHighlightedBoxIndex);
      } else if((keyDownEvent.key === ' ') && (!moveAlreadyMadeFlag)) {
        moveAlreadyMadeFlag = true;
        localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();
        modifySelectedGameBoardBox(localCurrentHighlightedBoxIndex, 'X');
        await delay(800);
        removeHighlightFromProvidedGameBoardBox(localCurrentHighlightedBoxIndex);

        localArrayOfBlankBoxesAndIndexesAsObjects.forEach((obj) => {
          obj.htmlElement.removeEventListener('click', handleClickEventInBox);
        });

        document.removeEventListener('keydown', handleKeyDownEventToNavigateBoxesInDocument);
        moveAlreadyMadeFlag = false;

        resolve();
      }
    };

    document.addEventListener('keydown', handleKeyDownEventToNavigateBoxesInDocument);

    if (abortControllerSignal.aborted) {
      resolve();
    }  

    abortControllerSignal.addEventListener('abort', () => {
      localArrayOfBlankBoxesAndIndexesAsObjects.forEach((obj) => {
        obj.htmlElement.removeEventListener('click', handleClickEventInBox);
      });

      document.removeEventListener('keydown', handleKeyDownEventToNavigateBoxesInDocument);
      resolve();
    });
  });

  updateAllBlankGameBoardBoxesIndexes();
  await checkForWinner('X');
  modifyAllBoxesEmptyFlag(false);
  modifyCurrentPlayer('player2');
};

const createArrayOfBlankBoxesAndIndexesAsObjects = (gameBoardAllBoxes, blankGameBoxesIndexes) => {
  let arrayOfBlankBoxesAndIndexesAsObjects = [];

  gameBoardAllBoxes.forEach((box, indexOfBox) => {
    if(blankGameBoxesIndexes.includes(indexOfBox)) {
      arrayOfBlankBoxesAndIndexesAsObjects.push(
        {
          htmlElement: box,
          indexOfHtmlElement: indexOfBox
        }
      );
    }
  });

  return arrayOfBlankBoxesAndIndexesAsObjects;
};

export { player1HumanGameLogic };