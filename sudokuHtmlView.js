const HTMLUtils = {
    // getParentId: function (id) {
    //     return document.getElementById(id)
    // },

    createDiv: function (id) {
        let div = document.querySelector('div')
        let element = document.createElement('div')
        element.setAttribute('id', id)
        div.appendChild(element)
        // document.body.firstElementChild.append(element)                //??????????????????
        return document.getElementById(id)
    },


    createButton: function (id) {
        let button = document.createElement('button')
        button.setAttribute('id', id)
        return button
    },

    createElement: function (id, cssClass) {
        let element = document.createElement('div')
        element.setAttribute('id', id)
        element.className = cssClass
        return element
    },

    getElementsByClassName: function (cssClass) {
        return document.querySelectorAll(cssClass)
    }
}




const SetUpBoardStyles = {
    styleVisibleNumbersBoard: function (element) {
        element.style.border = '1px solid lightgray'
        element.style.borderRadius = '35px'
        element.style.height = '65px'
        element.style.width = '376px'
        element.style.display = 'flex'
        element.style.justifyContent = 'space-evenly'
        element.style.alignItems = 'center'
        element.style.margin = '15px auto'
    },

    styleBoard: function (element) {
        element.style.maxWidth = '380px'
        element.style.minWidth = '380px'
        element.style.display = 'flex'
        element.style.flexWrap = 'wrap'
    },

    styleBoardCell: function (element) {
        element.style.height = '40px'
        element.style.width = '40px'
        element.style.border = '1px solid lightgray'
        element.style.borderRadius = '17px'
        element.style.display = 'flex'
        element.style.justifyContent  = 'center'
        element.style.alignItems = 'center'
        element.style.textAlign = 'center'
        element.style.cursor = 'pointer'
    },

    styleCellNumber: function (element) {
        element.style.color = 'red'
    },

    styleTimer: function (element) {
        element.style.border = '1px solid blue'
        element.style.height = '35px'
        element.style.width = '90px'
        element.style.borderRadius = '20px'
        element.style.margin = '30px auto'
        element.style.display = 'flex'
        element.style.justifyContent  = 'center'
        element.style.alignItems = 'center'
        element.style.textAlign = 'center'
    },

    styleScoresContainer: function (element) {
        element.style.border = '1px solid purple'
        element.style.height = '40px'
        element.style.width = '190px'
        element.style.borderRadius = '20px'
        element.style.margin = '30px auto'
        element.style.display = 'flex'
        element.style.justifyContent  = 'center'
        element.style.alignItems = 'center'
        element.style.textAlign = 'center'
    },

    styleButtonsContainer: function (element) {
        // element.style.border = '1px solid green'
        element.style.height = '65px'
        element.style.width = '376px'
        element.style.display = 'flex'
        element.style.justifyContent = 'space-around'
        element.style.alignItems = 'center'
    },

    styleButton: function (element) {
        element.style.height = '35px'
        element.style.width = '95px'
        element.style.borderRadius = '20px'
        element.style.backgroundColor = 'lavender'
        element.style.border = 'none'
        element.style.cursor = 'pointer'
        element.style.boxShadow = '0px 8px 15px rgba(0, 0, 0, 0.1)'
        element.style.color = 'purple' 
    }
}


export default class HtmlView {
    constructor(model) {
        this.userScore = 0                                                            //??????
        this.onBoardUpdate = this.onBoardUpdate.bind(this)
        this.OnBoardCellClick = this._OnBoardCellClick.bind(this)
        this.onVisibleNumberCellClick = this._onVisibleNumberCellClick.bind(this);
        this._retrieveData = this._retrieveData.bind(this)
        this._saveData = this._saveData.bind(this)
        if (model) {
            this.setModel(model);
        }
    }

    setContainer(parentId) {
        if (this.parentId) {
            document.getElementById(this.parentId).remove(this.gridBoard);
            document.getElementById('display').remove(this.visibleNumbersBoard)
        }
        this.parentId = parentId;
        if (this.parentId) {
            this._createBoardContainer()
            this._createBoard()
            this._updateBoard()
            this._createVisiblesBoardContainer()
            this._createTimerContainer()
            this._runningTimer()
            this._createScoresContainer()
            this._createButtonsContainer()
            this.loadGame()
            // this._createResetButton()
        }
    }

    setModel(model) {
        if (this.model) {
            this.model.observer.unsubscribe('dataChange', this.onBoardUpdate)
        }
        this.model = model
        if (this.model) {
            this.model.observer.subscribe('dataChange', this.onBoardUpdate)
        }
        this.onBoardUpdate();
    }


    onBoardUpdate() {
        if (this.gridBoard) {
            this._updateBoard();
        }
    }

    _createBoardContainer() {
        this.gridBoard = HTMLUtils.createDiv(this.parentId)
        SetUpBoardStyles.styleBoard(this.gridBoard)
    }


    _createBoard() {
        for (let i = 0; i < this.model.userBoard.length; i++) {
            let boardCell = HTMLUtils.createElement(i, 'number')
            boardCell.addEventListener('click', this.OnBoardCellClick)
            SetUpBoardStyles.styleBoardCell(boardCell)
            this.gridBoard.appendChild(boardCell)
        }
        this.boardCells = HTMLUtils.getElementsByClassName('.number')

    }


    _removeAllEventListeners() {
        for (let i = 0; i < this.boardCells.length; i++) {
            this.boardCells[i].removeEventListener('click', this.onNumberClick)
        }
    }


    _updateBoard() {
        for (let i = 0; i < this.model.userBoard.length; i++) {
            if (this.model.userBoard[i].flag && this.model.userBoard[i].randomNum === 0) {
                this.boardCells[i].innerHTML = ''
                SetUpBoardStyles.styleCellNumber(this.boardCells[i])
            } else {
                this.boardCells[i].innerHTML = this.model.userBoard[i].randomNum
            }
        }
    }

    _OnBoardCellClick(event) {
        let id = event.target.id
        this.index = Number(id)                                                                                            //converting string to number
        if (this.model.userBoard[this.index].flag && this.model.userBoard[this.index].randomNum !== 0) {
            this.model.fillBoardNumbers(this.model.userBoard[this.index].row, this.model.userBoard[this.index].column, 0)
        }
        this.visibleNumbers = this.model.getVisibleNumbers(this.model.userBoard, this.index)
        this._updateVisiblesBoard()
    }


    _createVisiblesBoardContainer() {                                                        //new function
        this.visibleNumbersBoard = HTMLUtils.createDiv('display')
        SetUpBoardStyles.styleVisibleNumbersBoard(this.visibleNumbersBoard)
    }

    _createVisibleNumbersBoard() {
        while (this.visibleNumbersBoard.firstChild) {
            this.visibleNumbersBoard.removeChild(this.visibleNumbersBoard.firstChild)
        }
        for (let i = 0; i < this.visibleNumbers.length; i++) {
            let visiblesBoardCell = HTMLUtils.createElement(i, 'visible-number')
            visiblesBoardCell.addEventListener('click', this.onVisibleNumberCellClick)
            SetUpBoardStyles.styleBoardCell(visiblesBoardCell)
            this.visibleNumbersBoard.appendChild(visiblesBoardCell)
        }
        this.visiblesBoardCells = HTMLUtils.getElementsByClassName('.visible-number')
    }


    _updateVisiblesBoard() {
        this._createVisibleNumbersBoard()
        for (let i = 0; i < this.visibleNumbers.length; i++) {
            this.visiblesBoardCells[i].innerHTML = this.visibleNumbers[i]                                              //
        }
    }


    _onVisibleNumberCellClick(event) {
        let value = event.target.innerHTML
        let number = Number(value)
        for (let i = 0; i < this.model.userBoard.length; i++) {
            if (i === this.index) {
                this.boardCells[i].innerHTML = value
                this.model.fillBoardNumbers(this.model.userBoard[i].row, this.model.userBoard[i].column, number)          //??????????
                this.visibleNumbers = this.model.getVisibleNumbers(this.model.userBoard, this.index)                     //notify in sudoku.js file ?? 
                this._updateVisiblesBoard()
                this._countScores()
                this._saveData()                                    //?????????????????
            }
        }
    }

    _createTimerContainer() {                                                     //NEW
        let timerContainer = HTMLUtils.createDiv('timer')
        SetUpBoardStyles.styleTimer(timerContainer)
    }

    _runningTimer() {                                                                               //NEW
        let startMinutes = 5
        this.countDownInSeconds = startMinutes * 60
        this.stopWatch = setInterval(this._timer.bind(this), 1000)
    }

    _timer() {                                                                               //NEW
        // console.log(this.timerRunning)
        let minutes = Math.floor(this.countDownInSeconds / 60)
        let seconds = this.countDownInSeconds % 60
        if (minutes >= 0 && seconds >= 0) {
            this.timerRunning = true
            document.getElementById('timer').innerText = minutes + ' : ' + seconds
        } else {
            this.timerRunning = false
            clearInterval(this.stopWatch)
        }
        // console.log(minutes + ' : ' + seconds)
        this.countDownInSeconds--
    }


    _createScoresContainer() {                                                                   //NEW
        let scoresContainer = HTMLUtils.createDiv('scores')
        SetUpBoardStyles.styleScoresContainer(scoresContainer)
    }


    _countScores() {                                                                      //NEW
        let maxScores = 3000
        if (this.userScore === 0) {
            this.expectingPoint = 10
            this.currentPoint = this.expectingPoint
        } else {
            this.expectingPoint = Number((this.currentPoint - 0.01).toFixed(2))
            this.currentPoint = this.expectingPoint
        }
        if (this.currentPoint > 0 && this.currentPoint < maxScores && this.timerRunning) {
            this.userScore += this.currentPoint
            this.userScore = Number(this.userScore.toFixed(2))
            document.getElementById('scores').innerText = this.userScore
            console.log(this.userScore)
        }
    }

    _createButtonsContainer(){                                                                     //NEW
        let buttonCntainer = HTMLUtils.createDiv('buttons-container')
        SetUpBoardStyles.styleButtonsContainer(buttonCntainer)
        this._createResetButton()
        this._createNewGameButton()
    }
 
    _createResetButton(){                                                                        //NEW
        let resetButton = HTMLUtils.createButton('resetButton')
        document.getElementById('buttons-container').appendChild(resetButton)
        SetUpBoardStyles.styleButton(resetButton)
        resetButton.innerHTML = 'Reset Game'
    }

    _createNewGameButton(){                                                                        //NEW
        let newGameButton = HTMLUtils.createButton('newGameButton')
        document.getElementById('buttons-container').appendChild(newGameButton)
        newGameButton.innerHTML = 'New Game'
        SetUpBoardStyles.styleButton(newGameButton)
    }


    loadGame() {                                                                            //new
        let gameStatus = this.model.isGameOver()
        if (!gameStatus) {
            // window.onload = () => this._retrieveData()
            window.addEventListener('load', this._retrieveData)
        }
    }

    _saveData() {                                                 // NEW              bind() method in constructor ?????
        let dataToBeSaved = {
            board: this.model.userBoard,
            secondsRemained: this.countDownInSeconds,
            currentScore: this.userScore
        }
        this.dataToBeSaved = dataToBeSaved
        localStorage.setItem('dataToBeSaved', JSON.stringify(this.dataToBeSaved))    
        // // let dataSaved = JSON.parse(localStorage.getItem('dataToBeSaved'))
        console.log( this.dataToBeSaved.board[0].randomNum)
        
    }

    _retrieveData() {
        console.log(this.dataToBeSaved)                                           //NEW                 undefinied ???????????         bind() method in constructor ????
        for (let i = 0; i < this.model.userBoard.length; i++) {
        //    document.getElementById(i).innerHTML =  this.dataToBeSaved.board[i].randomNum
        }
        let datasaved = localStorage.getItem('datatoBeSaved')
        JSON.parse(datasaved)
    }

}
