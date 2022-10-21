import Sudoku from './sudoku.js'
import HtmlView from './sudokuHtmlView.js'



const mySudoku = new Sudoku()
const htmlView = new HtmlView(mySudoku, 'grid-board')


// htmlView.createBoard(mySudoku.userBoard.length)
htmlView.updateBoard(mySudoku.userBoard)
// htmlView.createVisibleNumbersBoard()


mySudoku.observer.subscribe('onDataChanged', htmlView.updateBoard)                 

function print() {
    let board = mySudoku.userBoard
    let numbers = ''
    for (let i = 0; i < board.length; i++) {
        if (i % 9 !== 0 || i === 0) {
            numbers += board[i].randomNum + ' '
        } else {
            numbers += '\n' + board[i].randomNum + ' '
        }
    }
    console.log(numbers)
}


print();


console.log(mySudoku.observer)