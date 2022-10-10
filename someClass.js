 class Board {
    constructor (){
    }
    
    getBoard(id) {
        let board = document.createElement('div')
        board.setAttribute('id', id)
        document.body.appendChild(board)
        return board
    }
    
    createCell() {
        let boardCell = document.createElement('div')
        return  boardCell
    }

    update(numbers) {
        let board = this.getBoard('board')
        for (let i = 0; i < numbers.length; i++) {
            let boardCell = this.createCell()
            boardCell.innerHTML = numbers[i]
            boardCell.addEventListener('click', () => this.onNumberClick(numbers[i]))
            board.appendChild(boardCell)
            console.log(boardCell)
        }
    }


    onNumberClick(number) {
        let board = this.getBoard('visibles-board')
        let boardCell = this.createCell()
        boardCell.innerText = number
        board.appendChild(boardCell)
        console.log(boardCell)
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


const myBoard = new Board(arr)
// myBoard.update(arr)

