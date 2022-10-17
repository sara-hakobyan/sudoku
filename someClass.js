// import Sudoku from "./sudoku.js"


const HTMLUtils = {
    createBoard: function(id) {
        let board = document.getElementById(id)
        return board
    },

    createCell: function(cssClass) {
        let boardCell = document.createElement('div')
        boardCell.className = cssClass
        return  boardCell
    },

    collectionOfCells: function(cssClass) {
        let cells = document.querySelectorAll(cssClass)
        return cells
    }
}



class Board {
    constructor (parentContainerId){
        this.parentContainerId = parentContainerId
        this.onNumberClick = this.onNumberClick.bind(this)
    }
    
     
    createBoard(boardLength) {
        let board = HTMLUtils.createBoard(this.parentContainerId)
        for (let i = 0; i < boardLength; i++) {
            let cell = HTMLUtils.createCell('clickable-number')
            board.appendChild(cell)
           cell.addEventListener('click', this.onNumberClick, {once: true})
            // boardCells[i].removeEventListener('click', this.onNumberClick)
        }
                                                    
        
    }

    setNumbers(index, newValue) {     
        // console.log(this.board)                                       
        for (let i = 0; i < this.board.length; i ++) {
            if(i === index) {
              this.board[index].innerHTML = newValue
              console.log(this.board)
            }
        }
        this.update(this.board)          //??????????? return nodelist
    }
    
  
    update(numbers) {
        let board = HTMLUtils.collectionOfCells('.clickable-number')
        for (let i = 0; i < numbers.length; i++) {
            board[i].innerHTML = numbers[i]
            console.log(board[i])
        }
        // console.log(board)
        this.board = board                                                               //???????????????
        // return board                                                            //returns NodeList
    }


    onNumberClick(event) {
        let value = event.target.innerHTML
        let board = HTMLUtils.createBoard('visibles-board')
        let boardCell = HTMLUtils.createCell('clicked-number')
        boardCell.innerText = value
        board.appendChild(boardCell)
        // console.log(boardCell)
    }


    removeAll(){
        let boardCells = HTMLUtils.collectionOfCells('.clickable-number')
        for (let i = 0; i < boardCells.length; i++) {
            console.log(boardCells[i])
            boardCells[i].removeEventListener('click', this.onNumberClick) 
            
        }
        return boardCells
    }

}


function board() {
    let arr = []
    for (let i = 0; i < 10; i++) {
        arr.push(i)
    }
    return arr
}

let arr = board()

// const mySudoku = new Sudoku()
const myBoard = new Board('grid-board')
// myBoard.update(mySudoku.userBoard)

