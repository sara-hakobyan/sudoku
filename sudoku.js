import Observer from "./observer.js"

export default class Sudoku {
    constructor() {
        this.observer = new Observer()
        this.gameBoard = this.createAllNumbers()
        this.userBoard = this.markNumbersForUser()
    }

    createAllNumbers() {                                                //the primer board 
        let gameBoard = []
        let randomNum
        for (let i = 0; i < 81; i++) {
            let row = Math.floor(i / 9)
            let column = parseInt(i % 9)
            let possibleNumbers = this.getVisibleNumbers(gameBoard, i)                       //
            randomNum = possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)]
            if (possibleNumbers.length) {
                gameBoard.push({ row, column, randomNum, flag: false })
                } else {
                    i = -1
                    gameBoard = []
                }
            }
            return gameBoard
        }
        


    checkNumbers(board, index, num) {               ///
        let row = Math.floor(index / 9)
        let column = parseInt(index % 9)
        if (this.box3x3Check(board, row, column, num) &&
            this.horizontalCheck(board, row, num) &&
            this.verticalCheck(board, column, num)) {
            return true
        }
        return false
    }


    cloneCreatedNumbers(arr) {
        return arr.map(obj => ({ ...obj }))
    }


    markNumbersForUser() {                                                                               //ready board for user
        let userBoard = this.cloneCreatedNumbers(this.gameBoard)
        let changedNumbers = []
        for (let i = 81; i >= 0; i--) {
            let index = Math.floor(Math.random() * 81) + 1
            if (userBoard[index] && !userBoard[index].flag) {
                userBoard[index].randomNum = 0                                  // 
                userBoard[index].flag = true
                changedNumbers.push(index)
            } else {
                i++
            }
            if (changedNumbers.length > 40) {
                break
            }
        }
        // this.userBoard = userBoard
        this.observer.notify('onDataChanged', userBoard)
        return userBoard                                                           // no return ???
    }


    getVisibleNumbers(board, index) {
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let visibleNumbers = []
        for (let i = 0; i < numbers.length; i++) {
            if (this.checkNumbers(board, index, numbers[i])) {
                visibleNumbers.push(numbers[i])
                if(board[index] && !board[index].flag) {
                    visibleNumbers= []
                }
            }
        }
        this.observer.notify('dataOfVisibles', visibleNumbers)
        return visibleNumbers
    }

    fillBoardNumbers(row, column, value) {
        let index = row * 9 + column
        let visibleNums = this.getVisibleNumbers(this.userBoard, index)
        if (this.userBoard[index].flag && visibleNums.includes(value)) {
            this.userBoard[index].randomNum = value
            this.isGameOver()                                                    //........
        } else {
            return 'invalid number'
        }
        // this.isGameOver()
    }



    isGameOver() {                                                    /// 
        for (let i = 0; i < this.userBoard.length; i++) {
            if (this.userBoard[i].randomNum === 0) {
                return false
            }
        }
        return true
    }



    horizontalCheck(board, row, num) {
        for (let i = row; i < board.length; i++) {
            if (board[i].row === row && board[i].randomNum === num) {
                return false
            }
        }
        return true
    }


    verticalCheck(board, column, num) {
        for (let i = column; i < board.length; i += 9) {
            if (board[i].column === column && board[i].randomNum === num) {
                return false
            }
        }
        return true
    }


    box3x3Check(board, row, column, num) {
        let boxRow = row - row % 3
        let boxColumn = column - column % 3
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxColumn; j < boxColumn + 3; j++) {
                let index = i * 9 + j
                if (board[index] && board[index].row === i && board[index].column === j && board [index].randomNum === num) {
                    return false
                }
            }
        }
        return true
    }


}

 console.log()


