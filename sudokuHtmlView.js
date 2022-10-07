export default class HtmlView {
    constructor(sudoku) {
        this.sudoku = sudoku
        this.userBoard = sudoku.userBoard
    }

    getBoard() {
        let gridBoard = document.getElementById('grid-board')
        this.styleBoard(gridBoard)
        return gridBoard
    }

    createBoardCell() {
        let numberCell = document.createElement('div')
        this.styleBoardCell(numberCell)
        return numberCell
    }


    makeBoard() {
        let gridBoard = this.getBoard()
        let board = this.userBoard
        for (let i = 0; i < board.length; i++) {
            let numberCell = this.createBoardCell()
            if (board[i].flag) {
                numberCell.innerHTML = ''
            } else {
                numberCell.innerHTML = board[i].randomNum
            }
            gridBoard.appendChild(numberCell)
        }
    }


    getVisibleNumbersBoard() {
        let visiblesBoard = document.getElementById('display')
        this.styleVisibleNumbersBoard(visiblesBoard)
        return visiblesBoard
    }


    getVisibleNumberCell() {
        let visibleCell = document.createElement('div')
        this.styleVisibleNumberCell(visibleCell)
        return visibleCell
    }


    makeVisibleNumbersBoard() {
        let visiblesBoard = this.getVisibleNumberBoard()
        let board = this.userBoard
        let visibleNums
        for (let i = 0; i < board.length; i++) {
            visibleNums = this.sudoku.getVisibleNumbers(board[i].row, board[i].column)
        }
        for (let i = 0; i < visibleNums.length; i++) {
            let visibleCell = this.getVisibleNumberCell()
            visibleCell.innerHTML = visibleNums[i]
            visiblesBoard.appendChild(visibleCell)
        }
    }


    styleVisibleNumberCell(element) {
        element.style.border = '1px solid gary'
        element.style.width = '40px'
        element.style.height = '40px'
        element.style.textAlign = 'center'
        element.style.display = 'flex'
        element.style.justifyContent = 'space-araound'
    }

    styleVisibleNumbersBoard(element) {
        element.style.border = '1px solid gray'
        element.style.height = '100px'
        element.style.width = '376px'
    }

    styleBoard(element) {
        element.style.maxheight = '380px'
        element.style.maxWidth = '380px'
        element.style.display = 'flex'
        element.style.flexWrap = 'wrap'
    }


    styleBoardCell(element) {
        element.style.height = '40px'
        element.style.width = '40px'
        element.style.border = '1px solid lightgray'
        element.style.textAlign = 'center'
        element.style.cursor = 'pointer'
    }

}