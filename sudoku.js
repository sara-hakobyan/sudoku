import Observer from "./observer.js"
import  Storage from "./sudokuStorage.js";

export default class Sudoku {
    constructor() {
        this.observer = new Observer()
        this.storage = new Storage()
        this.createAllNumbers();
        this.markNumbersForUser();
        this.countDownInSeconds = 5 * 60
        this.userScore = 0                                           // is this ok in constructur        ????????????????????                 
    }


    createAllNumbers() {                                                                        //the primary board
        this.gameBoard = []
        let randomNum
        for (let i = 0; i < 81; i++) {
            let row = Math.floor(i / 9)
            let column = parseInt(i % 9)
            let possibleNumbers = this.getVisibleNumbers(this.gameBoard, i)
            randomNum = possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)]
            if (possibleNumbers.length) {
                this.gameBoard.push({ row, column, randomNum, flag: false })
            } else {
                i = -1
                this.gameBoard = []
            }
        }
        // this.observer.notify('dataChanged', this.gameBoard)
    }



    checkNumbers(board, index, num) {
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


    markNumbersForUser() {                                                                               //ready board for PLAYER
        this.userBoard = this.cloneCreatedNumbers(this.gameBoard)
        let changedNumbers = []
        for (let i = 81; i >= 0; i--) {
            let index = Math.floor(Math.random() * 81) + 1
            if (this.userBoard[index] && !this.userBoard[index].flag) {
                this.userBoard[index].randomNum = 0
                this.userBoard[index].flag = true
                changedNumbers.push(index)
            } else {
                i++
            }
            if (changedNumbers.length > 40) {
                break
            }
        }
        this.observer.notify('dataChanged', this.userBoard)
    }


    getVisibleNumbers(board, index) {
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let visibleNumbers = []
        for (let i = 0; i < numbers.length; i++) {
            if (this.checkNumbers(board, index, numbers[i])) {
                visibleNumbers.push(numbers[i])
                if (board[index] && !board[index].flag) {
                    visibleNumbers = []
                }
            }
        }
        return visibleNumbers
    }

    fillBoardNumbers(row, column, value) {
        let index = row * 9 + column
        let visibleNums = this.getVisibleNumbers(this.userBoard, index)
        if ((this.userBoard[index].flag && visibleNums.includes(value)) || value === 0) {
            this.userBoard[index].randomNum = value
            this.dataToBeSaved()                                                                             
            this.observer.notify('dataChange', this.userBoard)                      //observer.notify is added
            this.isGameOver()                                                      
        } else {
            return 'invalid number'
        }
        // this.isGameOver()
    }



    isGameOver() {
        for (let i = 0; i < this.userBoard.length; i++) {
            if (this.userBoard[i].randomNum === 0) {
                return false
            }
        }
        return true
    }


    timer() {                                                                   
        this.timeRemained = {
            minutes: Math.floor(this.countDownInSeconds / 60),
            seconds: this.countDownInSeconds % 60,
            timerIsRunning: true
        }
        this.countDownInSeconds--                                             //this.countDownInSeconds IS ASSIGNED IN CONSTRUCTOR  ???
        if (this.countDownInSeconds < -1) {
            this.timeRemained.timerIsRunning = false
            return                                                        
        }
        this.dataToBeSaved()  
    }


    _countScores() {
        let maxScoreLimit = 3000
        if (this.userScore === 0) {                                                 //         this.userScore  IS ASSIGNED IN CONSTRUCTOR           ???????
            this.expectingPoint = 10
            this.currentPoint = this.expectingPoint
        } else {
            this.expectingPoint = Number((this.currentPoint - 0.01).toFixed(2))
            this.currentPoint = this.expectingPoint
        }
        if (this.currentPoint > 0 && this.currentPoint < maxScoreLimit) {
            this.userScore += this.currentPoint
            this.userScore = Number(this.userScore.toFixed(2))
            console.log(this.userScore)
        }
        this.dataToBeSaved()
    }


   dataToBeSaved() {                                               
        this.dataSaved = {
            board: this.userBoard,
            secondsRemained: this.countDownInSeconds,
            scores: this.userScore
        }
        this.storage.store('data', this.dataSaved) 
                                                                     
    }


    retrieveAndContinue() {
        let dataSaved = this.storage.retrieve('data')
        console.log(dataSaved)
        if (dataSaved == null) {
            return true
        } else {
            this.userBoard = dataSaved.board
            this.countDownInSeconds = dataSaved.secondsRemained
            this.userScore = dataSaved.scores
            let gameStatus = this.isGameOver()
            if (gameStatus) {
                return true
            }
        }
        return false
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
                if (board[index] && board[index].row === i && board[index].column === j && board[index].randomNum === num) {
                    return false
                }
            }
        }
        return true
    }

}

