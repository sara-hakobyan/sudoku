 class Board {
    constructor(arrayOfNumbers) {
        // this.id = id
        this.numbers = arrayOfNumbers
    }
    
    // getSudokuBoard() {
    //     let board = document.getElementById('this.id')
    //     return board
    // }
    
    createSudokuCell() {
        let boardCell = document.createElement('div')
        return  boardCell
    }

    update() {
        // let board = this.getSudokuBoard()
        for (let i = 0; i < this.numbers.length; i++) {
            let boardCell = this.createSudokuCell()
            let value = this.numbers[i].toString()
            // board.innerHtml = this.numbers[i]
            boardCell.append(value)
        }
    }

}

function board() {
    let arr = []
    for (let i = 0; i < 81; i++) {
        arr.push(i)
    }
    return arr
}

let arr = board()


const myBoard = new Board(arr)

