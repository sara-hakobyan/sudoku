class Sudoku {
    constructor() {
        this.gameBoard = this.createAllNumbers()
        this.userBoard = this.setNumbersForUser()
    }

    createAllNumbers() {                                                //the primer board 
        let gameBoard = []
        let row, column, randomNum
        let notMatchingNums = []
        for (let i = 0; i < 81; i++) {
            randomNum = Math.floor(Math.random() * 9) + 1
            row = Math.floor(i / 9)
            column = parseInt(i % 9)
            if (this.numbersCheck(gameBoard, row, column, randomNum)) {
                gameBoard.push({ row, column, randomNum, flag: false })
            } else {
                notMatchingNums.push(i)
                i--
                if (notMatchingNums.length > 800) {
                    console.log('....')
                    i = -1
                    gameBoard = []
                    notMatchingNums = []
                }
            }
        }
        return gameBoard
    }


    numbersCheck(arrOfNums, row, column, num) {
        if (this.box3x3Check(arrOfNums, row, column, num) &&
            this.horizontalCheck(arrOfNums, row, num) &&
            this.verticalCheck(arrOfNums, column, num)) {
            return true
        }
        return false
    }


    cloneCreatedNums(arr) {
        return arr.map(obj => ({ ...obj }))
    }


    setNumbersForUser() {                                                                               //ready board for user
        let userBoard = this.cloneCreatedNums(this.gameBoard)
        let changedNumbers = []
        for (let i = 81; i >= 0; i--) {
            let index = Math.floor(Math.random() * 81) + 1
            if (userBoard[index] && userBoard[index].randomNum !== 0) {
                userBoard[index].randomNum = 0
                userBoard[index].flag = true
                changedNumbers.push(index)
            } else {
                i++
            }
            if (changedNumbers.length > 40) {
                break
            }
        }
        return userBoard
    }


    getVisibleNumbers(row, column) {
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let visibleNumbers = []
        let board = this.userBoard
        // console.log(board)
        let index = row * 9 + column
        for (let i = 0; i < numbers.length; i++) {
            if (board[index] && board[index].randomNum === 0 && this.numbersCheck(board, row, column, numbers[i])) {
                visibleNumbers.push(numbers[i])
            }
        }
        return visibleNumbers
    }

    updateBoardNums(row, column, value) {
        let visibleNums = this.getVisibleNumbers(row, column)
        let board = this.userBoard
        let index = row * 9 + column
        if (board[index] && board[index].flag && visibleNums.includes(value)) {
            board[index].randomNum = value
        } else {
            console.log('invalid number')
        }
        this.isGameOver()
    }



    isGameOver() {
        let gameStatus = this.completedBoard(this.userBoard)
        if (gameStatus) {
            console.log('game is over: u won!')
        } else {
            console.log('next move')
        }
    }


    completedBoard(board) {
        for (let i = 0; i < board.length; i++) {
            if (board[i].randomNum == 0) {
                return false
            }
        }
        return true
    }



    horizontalCheck(arrOfNums, row, num) {
        for (let i = row; i < arrOfNums.length; i++) {
            if (arrOfNums[i].row === row && arrOfNums[i].randomNum === num) {
                return false
            }
        }
        return true
    }


    verticalCheck(arrofNums, column, num) {
        for (let i = column; i < arrofNums.length; i += 9) {
            if (arrofNums[i].column === column && arrofNums[i].randomNum === num) {
                return false
            }
        }
        return true
    }


    box3x3Check(arrOfNums, row, column, num) {
        let boxRow = row - row % 3
        let boxColumn = column - column % 3
        // console.log({boxRow, boxColumn})
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxColumn; j < boxColumn + 3; j++) {
                let index = i * 9 + j
                if (arrOfNums[index] && arrOfNums[index].row === i && arrOfNums[index].column === j && arrOfNums[index].randomNum === num) {
                    return false
                }
            }
        }
        return true
    }


}




const mySudoku = new Sudoku()



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