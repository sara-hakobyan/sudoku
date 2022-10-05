export default class HtmlView {
    constructor(sudoku) {
        this.sudoku = sudoku
        this.userBoard = sudoku.userBoard
    }

    getParent() {
        let gridBoard = document.getElementById('grid-board')
        gridBoard.style.maxheight = '380px'
        gridBoard.style.maxWidth = '380px'
        gridBoard.style.display = 'flex'
        gridBoard.style.flexWrap = 'wrap'
        return gridBoard
    }

    getBoardNumCell() {
        let numberCell = document.createElement('div')
        numberCell.style.height = '40px'
        numberCell.style.width = '40px'
        numberCell.style.border = '1px solid lightgray'
        numberCell.style.textAlign = 'center' 
        numberCell.style.cursor = 'pointer'    
        return numberCell
    }


   makeBoard() {                                            
    let gridBoard = this.getParent()
        let board = this.userBoard
        for (let i = 0; i < board.length; i++) {
            let numberCell = this.getBoardNumCell()
            if (board[i].flag) {
                numberCell.innerHTML = ''
            } else {
            numberCell.innerHTML = board[i].randomNum
            }
            gridBoard.appendChild(numberCell)
        }
   }


   getVisibleNumsBoard () {
    let visiblesBoard = document.getElementById('display')
    visiblesBoard.style.border = '1px solid gray'
    visiblesBoard.style.height = '100px'
    visiblesBoard.style.width = '376px'
    return visiblesBoard
    }
    
 
    getVisibleNumCell () {
        let visibleCell = document.createElement('div')
        visibleCell.style.border = '1px solid gary'
        visibleCell.style.width = '40px'
        visibleCell.style.height = '40px'
        visibleCell.style.textAlign = 'center'
        visibleCell.style.display = 'flex'
        visibleCell.style.justifyContent = 'space-araound'
        return visibleCell
    }

    
    makeVisiblesBoard () {
        let visiblesBoard = this.getVisibleNumsBoard()
        let board = this.userBoard
        let visibleNums
        for (let i = 0; i < board.length; i++) {
            visibleNums = this.sudoku.getVisibleNumbers(board[i].row, board[i].column)
        }
        for (let i = 0; i < visibleNums.length; i++) {
            let visibleCell = this.getVisibleNumCell()
            visibleCell.innerHTML = visibleNums[i]
            visiblesBoard.appendChild(visibleCell)
        }
    }

}