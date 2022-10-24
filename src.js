import Sudoku from './sudoku.js'
import HtmlView from './sudokuHtmlView.js'


const mySudoku = new Sudoku()
const htmlView = new HtmlView(mySudoku, 'grid-board')


// htmlView.updateBoard(mySudoku.userBoard)
htmlView.setUp(mySudoku.userBoard)

// htmlView.createVisibleNumbersBoard()


// mySudoku.observer.subscribe('onDataChanged', htmlView.updateBoard)     
// mySudoku.observer.subscribe('dataOfVisibles', htmlView.)             

// function print() {
//     let board = mySudoku.userBoard
//     let numbers = ''
//     for (let i = 0; i < board.length; i++) {
//         if (i % 9 !== 0 || i === 0) {
//             numbers += board[i].randomNum + ' '
//         } else {
//             numbers += '\n' + board[i].randomNum + ' '
//         }
//     }
//     console.log(numbers)
// }


// print();


// // console.log(mySudoku.observer)
// // console.log(mySudoku)
// console.log(htmlView)
