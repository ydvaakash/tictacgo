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

// 1. findBlankBoxIndexToHighlightUpside() function: Returns the index of next box to highlight in the above row or same row.
// 2. findBlankBoxIndexToHighlightBelow() function: Returns the index of next box to highlight in the below row or same row.
// 3. findBlankBoxIndexToHighlightOnLeftSide() function: Returns the index of next box to highlight on the left side or in the same column.
// 4. findBlankBoxIndexToHighlightOnRightSide() function: Returns the index of next box to highlight on the right side or in the same column.
// 5. resetLocalVariables() function: Resets the local variables defined and declared in this module.

import { accessCurrentHighlightedBoxIndex } from './constants.js';
import { accessGameBoardAllBoxesSymbols } from '../components/gameBoard.js';

const row1Indexes = [0, 1, 2];
const row2Indexes = [3, 4, 5];
const row3Indexes = [6, 7, 8];
const column1Indexes = [0, 3, 6];
const column2Indexes = [1, 4, 7];
const column3Indexes = [2, 5, 8];

let localCurrentHighlightedBoxIndex = null;
let currentHighlightedBoxRow = null;
let localNextFirstRowToCheck = null;
let localNextSecondRowToCheck = null;
let localIndexOfNextBoxToHighlight = null;
let finalIndexOfNextBoxToHighlight = null;

let currentHighlightedBoxColumn = null;
let localNextFirstColumnToCheck = null;
let localNextSecondColumnToCheck = null;

let localGameBoardAllBoxesSymbols = null;

let indexesOfBlankGameBoardBoxesInNextFirstRowToCheck = [];
let indexesOfBlankGameBoardBoxesInNextSecondRowToCheck = [];
let indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRow = [];
let indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox = null;

let countOfBlankBoxesInNextFirstRowToCheck = null;
let countOfBlankBoxesInNextSecondRowToCheck = null;
let countOfBlankBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox = null;

const findBlankBoxIndexToHighlightUpside = async () => {
  finalIndexOfNextBoxToHighlight = null;
  localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();

  // find row of currentHighlightedBox
  if(row1Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxRow = row1Indexes;
  } else if(row2Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxRow = row2Indexes;
  } else if(row3Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxRow = row3Indexes;
  }

  // find column of currentHighlightedBox
  if(column1Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxColumn = column1Indexes;
  } else if(column2Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxColumn = column2Indexes;
  } else if(column3Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxColumn = column3Indexes;
  }

  // find next rows to check for finding next box to highlight
  if(currentHighlightedBoxRow === row1Indexes) {
    localNextFirstRowToCheck = null;
    localNextSecondRowToCheck = null;
  } else if(currentHighlightedBoxRow === row2Indexes) {
    localNextFirstRowToCheck = row1Indexes;
    localNextSecondRowToCheck = null;
  } else if(currentHighlightedBoxRow === row3Indexes) {
    localNextFirstRowToCheck = row2Indexes;
    localNextSecondRowToCheck = row1Indexes;
  }

  // find next columns to check for finding next box to highlight
  if(currentHighlightedBoxColumn === column1Indexes) {
    localNextFirstColumnToCheck = column2Indexes;
    localNextSecondColumnToCheck = column3Indexes;
  } else if(currentHighlightedBoxColumn === column2Indexes) {
    localNextFirstColumnToCheck = column1Indexes;
    localNextSecondColumnToCheck = column3Indexes;
  } else if(currentHighlightedBoxColumn === column3Indexes) {
    localNextFirstColumnToCheck = column2Indexes;
    localNextSecondColumnToCheck = column1Indexes;
  }

  // find indexesOfBlankGameBoardBoxesInNextFirstRowToCheck
  localGameBoardAllBoxesSymbols = accessGameBoardAllBoxesSymbols();
  if(localNextFirstRowToCheck !== null) {
    localNextFirstRowToCheck.forEach((indexValue) => {
      if(localGameBoardAllBoxesSymbols[indexValue].innerText === '-') {
        indexesOfBlankGameBoardBoxesInNextFirstRowToCheck.push(indexValue);
      }
    });
  }

  // find indexesOfBlankGameBoardBoxesInNextSecondRowToCheck
  if(localNextSecondRowToCheck !== null) {
    localNextSecondRowToCheck.forEach((indexValue) => {
      if(localGameBoardAllBoxesSymbols[indexValue].innerText === '-') {
        indexesOfBlankGameBoardBoxesInNextSecondRowToCheck.push(indexValue);
      }
    });
  }

  if(localNextFirstRowToCheck === null && localNextSecondRowToCheck === null) {
    localIndexOfNextBoxToHighlight = localCurrentHighlightedBoxIndex;
  } else if(localNextFirstRowToCheck !== null) {
    countOfBlankBoxesInNextFirstRowToCheck = indexesOfBlankGameBoardBoxesInNextFirstRowToCheck.length;

    if(countOfBlankBoxesInNextFirstRowToCheck > 1) {
      for(const blankBoxIndex of indexesOfBlankGameBoardBoxesInNextFirstRowToCheck) {
        if(currentHighlightedBoxColumn.includes(blankBoxIndex)) {
          localIndexOfNextBoxToHighlight = blankBoxIndex;
          break;
        }
      }

      if(localIndexOfNextBoxToHighlight === null) {
        for(const blankBoxIndex of indexesOfBlankGameBoardBoxesInNextFirstRowToCheck) {
          if(localNextFirstColumnToCheck.includes(blankBoxIndex)) {
            localIndexOfNextBoxToHighlight = blankBoxIndex;
            break;
          }
        }
      }

      if(localIndexOfNextBoxToHighlight === null) {
        for(const blankBoxIndex of indexesOfBlankGameBoardBoxesInNextFirstRowToCheck) {
          if(localNextSecondColumnToCheck.includes(blankBoxIndex)) {
            localIndexOfNextBoxToHighlight = blankBoxIndex;
            break;
          }
        }
      }
    } else if(countOfBlankBoxesInNextFirstRowToCheck === 1) {
      localIndexOfNextBoxToHighlight = indexesOfBlankGameBoardBoxesInNextFirstRowToCheck[0];
    } else if(countOfBlankBoxesInNextFirstRowToCheck === 0) {
      countOfBlankBoxesInNextSecondRowToCheck = indexesOfBlankGameBoardBoxesInNextSecondRowToCheck.length;

      if(countOfBlankBoxesInNextSecondRowToCheck > 1) {
        for(const blankBoxIndex of indexesOfBlankGameBoardBoxesInNextSecondRowToCheck) {
          if(currentHighlightedBoxColumn.includes(blankBoxIndex)) {
            localIndexOfNextBoxToHighlight = blankBoxIndex;
            break;
          }
        }

        if(localIndexOfNextBoxToHighlight === null) {
          for(const blankBoxIndex of indexesOfBlankGameBoardBoxesInNextSecondRowToCheck) {
            if(localNextFirstColumnToCheck.includes(blankBoxIndex)) {
              localIndexOfNextBoxToHighlight = blankBoxIndex;
              break;
            }
          }
        }

        if(localIndexOfNextBoxToHighlight === null) {
          for(const blankBoxIndex of indexesOfBlankGameBoardBoxesInNextSecondRowToCheck) {
            if(localNextSecondColumnToCheck.includes(blankBoxIndex)) {
              localIndexOfNextBoxToHighlight = blankBoxIndex;
              break;
            }
          }
        }
      } else if(countOfBlankBoxesInNextSecondRowToCheck === 1) {
        localIndexOfNextBoxToHighlight = indexesOfBlankGameBoardBoxesInNextSecondRowToCheck[0];
      } else if(countOfBlankBoxesInNextSecondRowToCheck === 0) {
        localIndexOfNextBoxToHighlight = localCurrentHighlightedBoxIndex;
      }
    }
    
  }

  finalIndexOfNextBoxToHighlight = localIndexOfNextBoxToHighlight;
  resetLocalVariables();
  return finalIndexOfNextBoxToHighlight;
};

const findBlankBoxIndexToHighlightBelow = async () => {
  finalIndexOfNextBoxToHighlight = null;
  localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();

  // find row of currentHighlightedBox
  if(row1Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxRow = row1Indexes;
  } else if(row2Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxRow = row2Indexes;
  } else if(row3Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxRow = row3Indexes;
  }

  // find column of currentHighlightedBox
  if(column1Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxColumn = column1Indexes;
  } else if(column2Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxColumn = column2Indexes;
  } else if(column3Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxColumn = column3Indexes;
  }

  // find next rows to check for finding next box to highlight
  if(currentHighlightedBoxRow === row1Indexes) {
    localNextFirstRowToCheck = row2Indexes;
    localNextSecondRowToCheck = row3Indexes;
  } else if(currentHighlightedBoxRow === row2Indexes) {
    localNextFirstRowToCheck = row3Indexes;
    localNextSecondRowToCheck = null;
  } else if(currentHighlightedBoxRow === row3Indexes) {
    localNextFirstRowToCheck = null;
    localNextSecondRowToCheck = null;
  }

  // find next columns to check for finding next box to highlight
  if(currentHighlightedBoxColumn === column1Indexes) {
    localNextFirstColumnToCheck = column2Indexes;
    localNextSecondColumnToCheck = column3Indexes;
  } else if(currentHighlightedBoxColumn === column2Indexes) {
    localNextFirstColumnToCheck = column1Indexes;
    localNextSecondColumnToCheck = column3Indexes;
  } else if(currentHighlightedBoxColumn === column3Indexes) {
    localNextFirstColumnToCheck = column2Indexes;
    localNextSecondColumnToCheck = column1Indexes;
  }

  // find indexesOfBlankGameBoardBoxesInNextFirstRowToCheck
  localGameBoardAllBoxesSymbols = accessGameBoardAllBoxesSymbols();
  if(localNextFirstRowToCheck !== null) {
    localNextFirstRowToCheck.forEach((indexValue) => {
      if(localGameBoardAllBoxesSymbols[indexValue].innerText === '-') {
        indexesOfBlankGameBoardBoxesInNextFirstRowToCheck.push(indexValue);
      }
    });
  }

  // find indexesOfBlankGameBoardBoxesInNextSecondRowToCheck
  if(localNextSecondRowToCheck !== null) {
    localNextSecondRowToCheck.forEach((indexValue) => {
      if(localGameBoardAllBoxesSymbols[indexValue].innerText === '-') {
        indexesOfBlankGameBoardBoxesInNextSecondRowToCheck.push(indexValue);
      }
    });
  }

  if(localNextFirstRowToCheck === null && localNextSecondRowToCheck === null) {
    localIndexOfNextBoxToHighlight = localCurrentHighlightedBoxIndex;
  } else if(localNextFirstRowToCheck !== null) {
    countOfBlankBoxesInNextFirstRowToCheck = indexesOfBlankGameBoardBoxesInNextFirstRowToCheck.length;

    if(countOfBlankBoxesInNextFirstRowToCheck > 1) {
      for(const blankBoxIndex of indexesOfBlankGameBoardBoxesInNextFirstRowToCheck) {
        if(currentHighlightedBoxColumn.includes(blankBoxIndex)) {
          localIndexOfNextBoxToHighlight = blankBoxIndex;
          break;
        }
      }

      if(localIndexOfNextBoxToHighlight === null) {
        for(const blankBoxIndex of indexesOfBlankGameBoardBoxesInNextFirstRowToCheck) {
          if(localNextFirstColumnToCheck.includes(blankBoxIndex)) {
            localIndexOfNextBoxToHighlight = blankBoxIndex;
            break;
          }
        }
      }

      if(localIndexOfNextBoxToHighlight === null) {
        for(const blankBoxIndex of indexesOfBlankGameBoardBoxesInNextFirstRowToCheck) {
          if(localNextSecondColumnToCheck.includes(blankBoxIndex)) {
            localIndexOfNextBoxToHighlight = blankBoxIndex;
            break;
          }
        }
      }
    } else if(countOfBlankBoxesInNextFirstRowToCheck === 1) {
      localIndexOfNextBoxToHighlight = indexesOfBlankGameBoardBoxesInNextFirstRowToCheck[0];
    } else if(countOfBlankBoxesInNextFirstRowToCheck === 0) {
      countOfBlankBoxesInNextSecondRowToCheck = indexesOfBlankGameBoardBoxesInNextSecondRowToCheck.length;

      if(countOfBlankBoxesInNextSecondRowToCheck > 1) {
        for(const blankBoxIndex of indexesOfBlankGameBoardBoxesInNextSecondRowToCheck) {
          if(currentHighlightedBoxColumn.includes(blankBoxIndex)) {
            localIndexOfNextBoxToHighlight = blankBoxIndex;
            break;
          }
        }

        if(localIndexOfNextBoxToHighlight === null) {
          for(const blankBoxIndex of indexesOfBlankGameBoardBoxesInNextSecondRowToCheck) {
            if(localNextFirstColumnToCheck.includes(blankBoxIndex)) {
              localIndexOfNextBoxToHighlight = blankBoxIndex;
              break;
            }
          }
        }

        if(localIndexOfNextBoxToHighlight === null) {
          for(const blankBoxIndex of indexesOfBlankGameBoardBoxesInNextSecondRowToCheck) {
            if(localNextSecondColumnToCheck.includes(blankBoxIndex)) {
              localIndexOfNextBoxToHighlight = blankBoxIndex;
              break;
            }
          }
        }
      } else if(countOfBlankBoxesInNextSecondRowToCheck === 1) {
        localIndexOfNextBoxToHighlight = indexesOfBlankGameBoardBoxesInNextSecondRowToCheck[0];
      } else if(countOfBlankBoxesInNextSecondRowToCheck === 0) {
        localIndexOfNextBoxToHighlight = localCurrentHighlightedBoxIndex;
      }
    }
  }

  finalIndexOfNextBoxToHighlight = localIndexOfNextBoxToHighlight;
  resetLocalVariables();
  return finalIndexOfNextBoxToHighlight;
};

const findBlankBoxIndexToHighlightOnLeftSide = () => {
  finalIndexOfNextBoxToHighlight = null;
  localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();

  // find row of currentHighlightedBox
  if(row1Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxRow = row1Indexes;
  } else if(row2Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxRow = row2Indexes;
  } else if(row3Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxRow = row3Indexes;
  }

  // find column of currentHighlightedBox
  if(column1Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxColumn = column1Indexes;
  } else if(column2Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxColumn = column2Indexes;
  } else if(column3Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxColumn = column3Indexes;
  }

  // find next columns to check for finding next box to highlight
  if(currentHighlightedBoxColumn === column1Indexes) {
    localNextFirstColumnToCheck = null;
    localNextSecondColumnToCheck = null;
  } else if(currentHighlightedBoxColumn === column2Indexes) {
    localNextFirstColumnToCheck = column1Indexes;
    localNextSecondColumnToCheck = null;
  } else if(currentHighlightedBoxColumn === column3Indexes) {
    localNextFirstColumnToCheck = column2Indexes;
    localNextSecondColumnToCheck = column1Indexes;
  }

  // find indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRow
  localGameBoardAllBoxesSymbols = accessGameBoardAllBoxesSymbols();
  currentHighlightedBoxRow.forEach((indexValue) => {
    if(localGameBoardAllBoxesSymbols[indexValue].innerText === '-') {
      indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRow.push(indexValue);
    }
  });

  // find indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox
  if(indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRow.includes(localCurrentHighlightedBoxIndex)) {
    indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox = indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRow.filter(element => element !== localCurrentHighlightedBoxIndex);
  } else {
    indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox = [...indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRow];
  }

  countOfBlankBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox = indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox.length;

  if(countOfBlankBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox === 0) {
    localIndexOfNextBoxToHighlight = localCurrentHighlightedBoxIndex;
  } else if(countOfBlankBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox > 0) {
    if(localNextFirstColumnToCheck === null) {
      localIndexOfNextBoxToHighlight = localCurrentHighlightedBoxIndex;
    } else {
      for(const blankBoxIndex of indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox) {
        if(localNextFirstColumnToCheck.includes(blankBoxIndex)) {
          localIndexOfNextBoxToHighlight = blankBoxIndex;
          break;
        }
      }
    }

    if(localIndexOfNextBoxToHighlight === null) {
      if(localNextSecondColumnToCheck === null) {
        localIndexOfNextBoxToHighlight = localCurrentHighlightedBoxIndex;
      } else {
        for(const blankBoxIndex of indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox) {
          if(localNextSecondColumnToCheck.includes(blankBoxIndex)) {
            localIndexOfNextBoxToHighlight = blankBoxIndex;
            break;
          }
        }
      }
    }
  }

  finalIndexOfNextBoxToHighlight = localIndexOfNextBoxToHighlight;
  resetLocalVariables();
  return finalIndexOfNextBoxToHighlight;
};

const findBlankBoxIndexToHighlightOnRightSide = () => {
  finalIndexOfNextBoxToHighlight = null;
  localCurrentHighlightedBoxIndex = accessCurrentHighlightedBoxIndex();

  // find row of currentHighlightedBox
  if(row1Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxRow = row1Indexes;
  } else if(row2Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxRow = row2Indexes;
  } else if(row3Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxRow = row3Indexes;
  }

  // find column of currentHighlightedBox
  if(column1Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxColumn = column1Indexes;
  } else if(column2Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxColumn = column2Indexes;
  } else if(column3Indexes.includes(localCurrentHighlightedBoxIndex)) {
    currentHighlightedBoxColumn = column3Indexes;
  }

  // find next columns to check for finding next box to highlight
  if(currentHighlightedBoxColumn === column1Indexes) {
    localNextFirstColumnToCheck = column2Indexes;
    localNextSecondColumnToCheck = column3Indexes;
  } else if(currentHighlightedBoxColumn === column2Indexes) {
    localNextFirstColumnToCheck = column3Indexes;
    localNextSecondColumnToCheck = null;
  } else if(currentHighlightedBoxColumn === column3Indexes) {
    localNextFirstColumnToCheck = null;
    localNextSecondColumnToCheck = null;
  }

  // find indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRow
  localGameBoardAllBoxesSymbols = accessGameBoardAllBoxesSymbols();
  currentHighlightedBoxRow.forEach((indexValue) => {
    if(localGameBoardAllBoxesSymbols[indexValue].innerText === '-') {
      indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRow.push(indexValue);
    }
  });

  // find indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox
  if(indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRow.includes(localCurrentHighlightedBoxIndex)) {
    indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox = indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRow.filter(element => element !== localCurrentHighlightedBoxIndex);
  } else {
    indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox = [...indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRow];
  }

  countOfBlankBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox = indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox.length;

  if(countOfBlankBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox === 0) {
    localIndexOfNextBoxToHighlight = localCurrentHighlightedBoxIndex;
  } else if(countOfBlankBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox > 0) {
    if(localNextFirstColumnToCheck === null) {
      localIndexOfNextBoxToHighlight = localCurrentHighlightedBoxIndex;
    } else {
      for(const blankBoxIndex of indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox) {
        if(localNextFirstColumnToCheck.includes(blankBoxIndex)) {
          localIndexOfNextBoxToHighlight = blankBoxIndex;
          break;
        }
      }
    }

    if(localIndexOfNextBoxToHighlight === null) {
      if(localNextSecondColumnToCheck === null) {
        localIndexOfNextBoxToHighlight = localCurrentHighlightedBoxIndex;
      } else {
        for(const blankBoxIndex of indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox) {
          if(localNextSecondColumnToCheck.includes(blankBoxIndex)) {
            localIndexOfNextBoxToHighlight = blankBoxIndex;
            break;
          }
        }
      }
    }
  }

  finalIndexOfNextBoxToHighlight = localIndexOfNextBoxToHighlight;
  resetLocalVariables();
  return finalIndexOfNextBoxToHighlight;
};

const resetLocalVariables = () => {
  localCurrentHighlightedBoxIndex = null;
  currentHighlightedBoxRow = null;
  localNextFirstRowToCheck = null;
  localNextSecondRowToCheck = null;
  localIndexOfNextBoxToHighlight = null;

  currentHighlightedBoxColumn = null;
  localNextFirstColumnToCheck = null;
  localNextSecondColumnToCheck = null;

  localGameBoardAllBoxesSymbols = null;

  indexesOfBlankGameBoardBoxesInNextFirstRowToCheck.length = 0;
  indexesOfBlankGameBoardBoxesInNextSecondRowToCheck.length = 0;
  indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRow.length = 0;
  indexesOfBlankGameBoardBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox = null;

  countOfBlankBoxesInNextFirstRowToCheck = null;
  countOfBlankBoxesInNextSecondRowToCheck = null;
  countOfBlankBoxesInCurrentHighlightedBoxRowExcludingCurrentHighlightedBox = null;
};

export { findBlankBoxIndexToHighlightUpside, findBlankBoxIndexToHighlightBelow, findBlankBoxIndexToHighlightOnLeftSide, findBlankBoxIndexToHighlightOnRightSide };