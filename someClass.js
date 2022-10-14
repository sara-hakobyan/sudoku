

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
        let buttons = document.querySelectorAll(cssClass)
        return buttons
    }
}



class Board {
    constructor (parentContainerId){
        this.parentContainerId = parentContainerId
        this.onNumberClick = this.onNumberClick.bind(this)
    }
    
     
    createBoard(value) {
        let board = HTMLUtils.createBoard(this.parentContainerId)
        let cell = HTMLUtils.createCell('clickable-number')
        cell.innerHTML = value
        board.appendChild(cell)
        let boardCells = HTMLUtils.collectionOfCells('.clickable-number')
        for (let i = 0; i < boardCells.length; i++) {
            boardCells[i].addEventListener('click', this.onNumberClick, {once: true})
            // boardCells[i].removeEventListener('click', this.onNumberClick)
        }
        console.log(cell)                                              
        return boardCells
    }
    
  
    update(numbers) {
        console.log('njn jn', this.boardCells)
        for (let i = 0; i < numbers.length; i++) {
            board = this.createBoard(numbers[i])
        }
        return board
    }


    onNumberClick(event) {
        let value = event.target.innerHTML
        let board = HTMLUtils.createBoard('visibles-board')
        let boardCell = HTMLUtils.createCell('clicked-number')
        boardCell.innerText = value
        board.appendChild(boardCell)
        console.log(boardCell)
    }


    removeAll(){
        let boardCells = HTMLUtils.collectionOfCells('.clickable-number')
        for (let i = 0; i < boardCells.length; i++) {
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


const myBoard = new Board('grid-board')
// myBoard.update(arr)

