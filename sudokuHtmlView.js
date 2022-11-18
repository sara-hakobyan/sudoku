const HTMLUtils = {
    getParentDiv: function (id) {
        return document.getElementById(id)
    },


    getParentdiv: function (id) {
        let div = document.querySelector('div')
        div.setAttribute('id', id)
        return document.getElementById(id)
    },


    createChildDiv: function (id) {
        let element = document.createElement('div')
        element.setAttribute('id', id)                 //
        return element
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
    },

    createRadioButton: function(id) {
        let input = document.createElement('input')
        input.type ='radio'
        input.name= id
        input.id = id
        let label = document.createElement('label')
        label.setAttribute('for', input.id)
        return input
    },

    createTextNode: function(text) {
        let message = document.createTextNode(text)
        return message
    }

}


const SetUpBoardStyles = {
    styleContainer: function (element) {
        element.style.maxWidth = '380px'
        element.style.minWidth = '380px'
        element.style.padding = '20px'
    },

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
        element.style.justifyContent = 'center'
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
        element.style.justifyContent = 'center'
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
        element.style.justifyContent = 'center'
        element.style.alignItems = 'center'
        element.style.textAlign = 'center'
    },

    styleButtonsContainer: function (element) {
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
        this.onBoardUpdate = this.onBoardUpdate.bind(this)
        this.OnBoardCellClick = this._OnBoardCellClick.bind(this)
        this.onVisibleNumberCellClick = this._onVisibleNumberCellClick.bind(this);
        this.loadGame = this.loadGame.bind(this)
        if (model) {
            this.setModel(model);
        }
    }

    setContainer(parentId) {  
        if (this.parentId) {
            document.getElementById(this.parentId).remove(this.boardContainer)
        }                                                                
        // while(this.boardContainer && this.boardContainer.firstChild){
        //     this.boardContainer.removeChild(this.boardContainer.firstChild)
        // }
      
        this.parentId = parentId;
        if (this.parentId) {
            this._createView()
            let status = this.model.retrieveAndContinue()
            if (!status) {
                this.onLoadWindow()
            } else {
                this.model.storage.clearAll()
                this._updateView()
            }
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
        if (this.boardContainer) {
            this._updateBoard();
        }
    }


    _createView() {                                                                         // NEWW
        this._createGameBoardContainer()
        this._createBoard()
        this._createBoardCells()
        this._createVisiblesBoardContainer()
        this._createTimerContainer()
        this._createScoresContainer()
        this._createButtonsContainer()
        this._createRadioButton()
    }

    _updateView() {                                                                          //NEW
        this._updateBoard()
        this._runTimer()
    }



    _OnBoardCellClick(event) {
        let id = event.target.id
        this.index = Number(id)                                                                                             //converting string to number
        if (this.model.userBoard[this.index].flag && this.model.userBoard[this.index].randomNum !== 0) {
            this.model.fillBoardNumbers(this.model.userBoard[this.index].row, this.model.userBoard[this.index].column, 0)
        }
        this.visibleNumbers = this.model.getVisibleNumbers(this.model.userBoard, this.index)
        this._updateVisiblesBoard()
    }



    _onVisibleNumberCellClick(event) {
        let value = event.target.innerHTML
        let number = Number(value)
        for (let i = 0; i < this.model.userBoard.length; i++) {
            if (i === this.index) {
                this.boardCells[i].innerHTML = value
                this.model.fillBoardNumbers(this.model.userBoard[i].row, this.model.userBoard[i].column, number)
                this.visibleNumbers = this.model.getVisibleNumbers(this.model.userBoard, this.index)                     //notify in sudoku.js file 
                this._updateVisiblesBoard()
                this._updateScoresContainer()                                
            }
        }
    }


    loadGame() {                                                                              //NEW ?????????????????????????????
        this._updateBoard()
        this._runTimer()
        this._updateTimerContainer()
        if (this.model.userScore >= 10) {
            this._updateScoresContainer()
        }
    }

    onLoadWindow() {                                                                          //NEW
        window.addEventListener('load', this.loadGame)
    }


    _newGame() {                                                                          //NEW
        this.model.storage.clearAll()
        location.reload()
    }



    _runTimer() {
        this.stop = setInterval(this._updateTimerContainer.bind(this), 1000)
    }


    _stopTimer() {
        clearInterval(this.stop)
    }


    _removeAllEventListeners() {
        for (let i = 0; i < this.boardCells.length; i++) {
            this.boardCells[i].removeEventListener('click', this.onNumberClick)
        }
    }


    _updateScoresContainer() {
        if (this.model.timeRemained.timerIsRunning) {
            this.model._countScores()
            this.scoresContainer.innerHTML = this.model.userScore
        } else {
            this.scoresContainer.innerHTML = this.model.userScore
        }
    }


    _updateTimerContainer() {
        this.model.timer()                                                                          // this.model.storeDataToBeSaved
        if (this.model.timeRemained.timerIsRunning) {
            this.timerContainer.innerHTML = this.model.timeRemained.minutes + " : " + this.model.timeRemained.seconds
        } else {
            this.timerContainer.innerHTML = "0 : 0"
            this._stopTimer()
        }

    }


    _updateVisiblesBoard() {
        this._createVisibleNumbersBoard()
        for (let i = 0; i < this.visibleNumbers.length; i++) {
            this.visiblesBoardCells[i].innerHTML = this.visibleNumbers[i]                                              //
        }
    }


    _updateBoard() {
        for (let i = 0; i < this.model.userBoard.length; i++) {
            if (this.model.userBoard[i].flag && this.model.userBoard[i].randomNum === 0) {
                this.boardCells[i].innerHTML = ''
            } else {
                this.boardCells[i].innerText = this.model.userBoard[i].randomNum
            }
            if (this.model.userBoard[i].flag) {
                SetUpBoardStyles.styleCellNumber(this.boardCells[i])
            }
        }
    }

    _createGameBoardContainer() {
        const parent = HTMLUtils.getParentDiv('sudoku')
        this.boardContainer = HTMLUtils.createChildDiv(this.parentId)
        parent.append(this.boardContainer)
        SetUpBoardStyles.styleContainer(this.boardContainer)

    }

    _createBoard() {
        this.gridBoard = HTMLUtils.createChildDiv('gameBoard')
        SetUpBoardStyles.styleBoard(this.gridBoard)
        this.boardContainer.appendChild(this.gridBoard)
    }

    _createBoardCells() {
        for (let i = 0; i < this.model.userBoard.length; i++) {
            let boardCell = HTMLUtils.createElement(i, 'number')
            boardCell.addEventListener('click', this.OnBoardCellClick)
            SetUpBoardStyles.styleBoardCell(boardCell)
            this.gridBoard.appendChild(boardCell)
        }
        this.boardCells = HTMLUtils.getElementsByClassName('.number')
    }


    _createVisiblesBoardContainer() {
        this.visibleNumbersBoard = HTMLUtils.createChildDiv('display')
        SetUpBoardStyles.styleVisibleNumbersBoard(this.visibleNumbersBoard)
        this.boardContainer.appendChild(this.visibleNumbersBoard)
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

    _createTimerContainer() {
        this.timerContainer = HTMLUtils.createChildDiv('timer')
        SetUpBoardStyles.styleTimer(this.timerContainer)
        this.boardContainer.appendChild(this.timerContainer)
    }

    _createScoresContainer() {                                                                   //NEW
        this.scoresContainer = HTMLUtils.createChildDiv('scores')
        SetUpBoardStyles.styleScoresContainer(this.scoresContainer)
        this.boardContainer.appendChild(this.scoresContainer)
    }


    _createButtonsContainer() {                                                                     //NEW
        this.buttonCntainer = HTMLUtils.createChildDiv('buttons-container')
        SetUpBoardStyles.styleButtonsContainer(this.buttonCntainer)
        this.boardContainer.appendChild(this.buttonCntainer)
        this._createNewGameButton()
    }

    _createNewGameButton() {                                                                        //NEW
        let newGameButton = HTMLUtils.createButton('newGameButton')
        this.buttonCntainer.appendChild(newGameButton)
        newGameButton.innerHTML = 'New Game'
        SetUpBoardStyles.styleButton(newGameButton)
        newGameButton.addEventListener('click', () => this._newGame())
    }

    _createRadioButton() {
        let radioButtonContainer = HTMLUtils.createChildDiv('radioButton')
        this.boardContainer.appendChild(radioButtonContainer)
        let radioButton = HTMLUtils.createRadioButton('user')
        radioButtonContainer.appendChild(radioButton)    
        let buttonText = HTMLUtils.createTextNode('Choose')
        radioButtonContainer.appendChild(buttonText)
        radioButton.addEventListener('change', this.choose)
    }


    choose(e) {
        if (this.checked) {
            console.log(this.value)
        }
    }

    
}
