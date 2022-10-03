import Sudoku from "./sudoku";

const sudoku = new Sudoku()


const board = mySudoku.checkedNums
const gameBoard = mySudoku.gameBoard


function print(value) {
  let numbers = ''
  for (i = 0; i < value.length; i++) {
    if (i % 9 === 0) {
      numbers += '\n'
    }
    numbers += value[i].num + "  "
  }
  console.log(numbers)
}

print(board);
print(gameBoard) 