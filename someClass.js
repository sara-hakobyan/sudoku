// import Sudoku from "./sudoku.js"


const HTMLUtils = {
    getParentId: function(id) {
       let element = document.querySelector("div")
       element.setAttribute('id', id)
    //    document.div.appendChild(element)
       return element
    },

    createParentElement: function(id) {
        let element = document.createElement('div')
        element.setAttribute('id', id)
        return element

    },

    createElement: function(cssClass) {
        let boardCell = document.createElement('div')
        boardCell.className = cssClass
        return  boardCell
    },

    getElementsByClassName: function(cssClass) {
        let cells = document.querySelectorAll(cssClass)
        return cells
    }
}



class Board {
    constructor (parentContainerId){
        this.parentContainerId = parentContainerId
        this.onNumberClick = this.onNumberClick.bind(this)
    }


    createBoard (arr, id) {
        let board = HTMLUtils.getParentId(id)
        for (let i = 0; i < arr.length; i++) {
            let cell = HTMLUtils.createElement('clickable')
            cell.innerHTML = arr[i]
            cell.addEventListener('click', this.onNumberClick)
            board.appendChild(cell)
        }
        return board
    }
    
     
    // createBoard(boardLength) {
    //     let grid = HTMLUtils.createParentDiv()
    //     let board = HTMLUtils.getParentId(this.parentContainerId)
    //     for (let i = 0; i < boardLength.length; i++) {
    //         let cell = HTMLUtils.createElement('clickable-number')
    //         board.appendChild(cell)
    //        cell.addEventListener('click', this.onNumberClick, {once: true})
    //         // boardCells[i].removeEventListener('click', this.onNumberClick)
    //     }
                                                    
        
    // }

    // setNumbers(index, newValue) {     
    //     this.board[index] = newValue
    //     this.update(this.board)                                //?????????
    // }
    
  
    update(numbers) {
        let board = HTMLUtils.getElementsByClassName('.clickable-number')
        for (let i = 0; i < numbers.length; i++) {
            board[i].innerHTML = numbers[i]
            console.log(board[i])
        }
        this.board = numbers                                                              
        // return board                                                            //returns NodeList
    }


    onNumberClick(event) {
        let value = event.target.innerHTML
        let board = HTMLUtils.getParentId('visibles-board')
        let boardCell = HTMLUtils.createElement('clicked-number')
        boardCell.innerText = value
        board.appendChild(boardCell)
        // console.log(boardCell)
    }


    removeAll(){
        let boardCells = HTMLUtils.getElementsByClassName('.number')
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

// const mySudoku = new Sudoku()
const myBoard = new Board('grid-board')
// myBoard.update(mySudoku.userBoard)



