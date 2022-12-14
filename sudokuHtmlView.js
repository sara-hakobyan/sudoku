const HTMLUtils = {
    getParentDiv: function (id) {
        return document.getElementById(id)
    },


    // getParentdiv: function (id) {
    //     let div = document.querySelector('div')
    //     div.setAttribute('id', id)
    //     return document.getElementById(id)
    // },


    createChildDiv: function (id) {
        let element = document.createElement('div')
        element.setAttribute('id', id)
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

    createRadioButton: function (parentIdOfButtonsContainer) {                         //NEW
        let genders = ['Male', 'Female']
        let group = document.getElementById(parentIdOfButtonsContainer)
        group.innerHTML = genders.map(
            (gender) => `<input type='radio' name='gender' value='${gender}' id='${gender}'>
                        <label for='${gender}'>${gender}</label>`

        ).join(' ')
        let genderButtons = document.querySelectorAll('input[name="gender"]')
        return genderButtons
    },

    createTextNode: function (text) {                                 //NEW
        let message = document.createTextNode(text)
        return message
    },

    createParagraph: function (text) {
        let paragraph = document.createElement('p')
        let message = document.createTextNode(text)
        paragraph.appendChild(message)
        return paragraph
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
        element.style.outline = 'none'
        element.style.cursor = 'pointer'
        element.style.boxShadow = '0px 8px 15px rgba(0, 0, 0, 0.1)'
        element.style.color = 'purple'
    },

    styleModalContainer: function (element) {
        element.style.height = '200px'
        element.style.width = '376px'
        element.style.borderRadius = '25px'
        element.style.border = 'none'
        element.style.backgroundColor = 'rgb(230, 242, 255)'
        element.style.padding = '5px 0px'
        element.style.position = 'fixed'
        element.style.top = '40%'
        element.style.left = '40%'
        element.style.zIndex = '2'
        element.style.display = 'none'
    },


    styleInnerText: function (element) {
        element.style.textAlign = 'center'
        element.style.fontSize = '25px'
        element.style.color = 'purple'
    }, 

    styleModalOverlay:function(element) {
        element.style.zIndex = '1'
        element.style.background = 'rgba(0, 0, 0, 0.5)'
        element.style.width = '100%'
        element.style.height = '100%'
        element.style.backdropFilter = 'blur(3px)'
        element.style.position = 'fixed'
        element.style.inset = '0px'
        element.style.display = 'none'
    },

    styleModalCloseButton: function(element) {
        element.style.border = 'none'
        element.style.borderRadius = '50%'
        element.style.width ='27px'
        element.style.height = '27px'
        element.style.textAlign = 'center'
        element.style.backgroundColor = '#bfbfbf'
        element.style.position = 'absolute'
        element.style.top = '5%'
        element.style.right = '5%'
        element.style.cursor = 'pointer'
        element.style.color = 'white'
    }


}

// import User from "./UserData.js"                      //????????

export default class HtmlView {
    constructor(model) {
        // this.user = new User()
        this._onBoardUpdate = this._onBoardUpdate.bind(this)
        this._OnBoardCellClick = this._OnBoardCellClick.bind(this)
        this._onVisibleNumberCellClick = this._onVisibleNumberCellClick.bind(this);
        this._loadGame = this._loadGame.bind(this)
        this._newGame = this._newGame.bind(this)
        this._choose = this._choose.bind(this)                                  //??????????? .bind method is not working???
        this._closeModal = this._closeModal.bind(this)
        this._openModal = this._openModal.bind(this)
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
            let status = this.model._retrieveAndContinue()
            if (!status) {
                this._onLoadWindow()
            } else {
                this.model.userData.removeData('data')
                this._updateView()
            }
        }
    }

    setModel(model) {
        if (this.model) {
            this.model.observer._unsubscribe('dataChange', this._onBoardUpdate)
        }
        this.model = model
        if (this.model) {
            this.model.observer._subscribe('dataChange', this._onBoardUpdate)
        }
        this._onBoardUpdate();
    }


    _onBoardUpdate() {
        if (this.boardContainer) {
            this._updateBoard();
        }
    }


    _createView() {
        this._createGameBoardContainer()
        this._createBoard()
        this._createBoardCells()
        this._createVisiblesBoardContainer()
        this._createTimerContainer()
        this._createScoresContainer()
        this._createButtonsContainer()
        this._createRadioButton()
        this._createModalContainer()
    }

    _updateView() {
        this._updateBoard()
        this._runTimer()
    }



    _OnBoardCellClick(event) {
        let id = event.target.id
        this.index = Number(id)                                                                                             //converting string to number
        if (this.model.userBoard[this.index].flag && this.model.userBoard[this.index].randomNum !== 0) {
            this.model._fillBoardNumbers(this.model.userBoard[this.index].row, this.model.userBoard[this.index].column, 0)
        }
        this.visibleNumbers = this.model._getVisibleNumbers(this.model.userBoard, this.index)
        this._updateVisiblesBoard()
    }



    _onVisibleNumberCellClick(event) {
        let value = event.target.innerHTML
        let number = Number(value)
        for (let i = 0; i < this.model.userBoard.length; i++) {
            if (i === this.index) {
                this.boardCells[i].innerHTML = value
                this.model._fillBoardNumbers(this.model.userBoard[i].row, this.model.userBoard[i].column, number)
                this.visibleNumbers = this.model._getVisibleNumbers(this.model.userBoard, this.index)                     //notify in sudoku.js file 
                this._updateVisiblesBoard()
                this._updateScoresContainer()
            }
        }
    }


    _loadGame() {
        // this.model.userData._getUserData()
        this._updateBoard()
        this._runTimer()
        this._updateTimerContainer()
        if (this.model.userScore >= 10) {
            this._updateScoresContainer()
        }
    }

    _onLoadWindow() {
        window.addEventListener('load', this._loadGame)
    }


    _newGame() {
        this.model.userData.removeData('data')
        // this.model.userData._getUserData()
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
        this.model._timer()
        if (this.model.timeRemained.timerIsRunning) {
            this.timerContainer.innerHTML = this.model.timeRemained.minutes + " : " + this.model.timeRemained.seconds
        } else {
            this.timerContainer.innerHTML = "0 : 0"
            this._stopTimer()
        }
    }


    _choose(e) {                                                       
        let name, gender
        // console.log(e.value)
        if (e.checked) {
            name = prompt('Please enter your name!')
            gender = e.value
        }
        this.model.userData._getUserData(name, gender)                                //user Data seved here                     
    }

    _openModal(){                                                              //New
        this.overlay.style.display = 'block'
        this.modalContainer.style.display = 'block'
        this._stopTimer()
    }

    _closeModal() {                                                              //New
        this.overlay.style.display = 'none'
        this.modalContainer.style.display = 'none'
        this._runTimer()
        
    }


    _updateVisiblesBoard() {
        this._createVisibleNumbersBoard()
        for (let i = 0; i < this.visibleNumbers.length; i++) {
            this.visiblesBoardCells[i].innerHTML = this.visibleNumbers[i]
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
        parent.addEventListener('keydown', (e) => {                              // ?????????????????????????
            if(e.key === 'Escape') {
                this._closeModal()
            }
        })
    }

    _createBoard() {
        this.gridBoard = HTMLUtils.createChildDiv('gameBoard')
        SetUpBoardStyles.styleBoard(this.gridBoard)
        this.boardContainer.appendChild(this.gridBoard)
    }

    _createBoardCells() {
        for (let i = 0; i < this.model.userBoard.length; i++) {
            let boardCell = HTMLUtils.createElement(i, 'number')
            boardCell.addEventListener('click', this._OnBoardCellClick)
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
            visiblesBoardCell.addEventListener('click', this._onVisibleNumberCellClick)
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

    _createScoresContainer() {
        this.scoresContainer = HTMLUtils.createChildDiv('scores')
        SetUpBoardStyles.styleScoresContainer(this.scoresContainer)
        this.boardContainer.appendChild(this.scoresContainer)
    }


    _createButtonsContainer() {
        this.buttonCntainer = HTMLUtils.createChildDiv('buttons-container')
        SetUpBoardStyles.styleButtonsContainer(this.buttonCntainer)
        this.boardContainer.appendChild(this.buttonCntainer)
        this._createNewGameButton()
        this._createNewViewButton()
    }

    _createNewGameButton() {
        let newGameButton = HTMLUtils.createButton('newGameButton')
        this.buttonCntainer.appendChild(newGameButton)
        newGameButton.innerHTML = 'New Game'
        SetUpBoardStyles.styleButton(newGameButton)
        newGameButton.addEventListener('click', this._newGame)
    }

    _createNewViewButton(){
        let newViewButton = HTMLUtils.createButton('newViewButton')
        this.buttonCntainer.appendChild(newViewButton)
        newViewButton.innerHTML = 'New View'
        SetUpBoardStyles.styleButton(newViewButton)    
        newViewButton.addEventListener('click', this._openModal)                                                          //NEW
    }

    _createRadioButton() {                                                                      
        this.radioButtonContainer = HTMLUtils.createChildDiv('radioButton')
        this.boardContainer.appendChild(this.radioButtonContainer)
        this.genderButtons = HTMLUtils.createRadioButton('radioButton')
        console.log(this.genderButtons)
        for (let i = 0; i < this.genderButtons.length; i++) {
            this.genderButtons[i].addEventListener('change', () => this._choose(this.genderButtons[i]))                //?????? does not work without arrow function
        }
    }

    _createModalContainer() {
        this.modalContainer = HTMLUtils.createChildDiv('modalContainer')
        this.boardContainer.appendChild(this.modalContainer)
        SetUpBoardStyles.styleModalContainer(this.modalContainer)
        let innerText = HTMLUtils.createParagraph('Choose Your Game')
        this.modalContainer.appendChild(innerText)
        SetUpBoardStyles.styleInnerText(innerText)
        this._createModalBtnConatiner()
        this._createModalOverlay()
    }

    _createModalBtnConatiner() {
        this.modalBtnContainer = HTMLUtils.createChildDiv('modalBtnContainer')
        this.modalContainer.appendChild(this.modalBtnContainer)
        SetUpBoardStyles.styleButtonsContainer(this.modalBtnContainer)
        this._createModalNewGameBtns()
        this._creatModalCloseButton()
    }

    _createModalNewGameBtns() {                                                  //// create loop for btns    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        let game1 = HTMLUtils.createButton('modalBtn1') 
        this.modalBtnContainer.appendChild(game1)
        SetUpBoardStyles.styleButton(game1)
        game1.innerHTML = "Game One"
        let game2 = HTMLUtils.createButton('modalBtn2')
        this.modalBtnContainer.appendChild(game2)
        SetUpBoardStyles.styleButton(game2)
        game2.innerHTML = "Game Two"
    }

    _createModalOverlay(){
        this.overlay = HTMLUtils.createChildDiv('overlay')
        this.boardContainer.appendChild(this.overlay)
        SetUpBoardStyles.styleModalOverlay(this.overlay)
        this.overlay.addEventListener('click', this._closeModal)
    }

    _creatModalCloseButton(){
        let closeButton = HTMLUtils.createButton('closeButton')
        this.modalBtnContainer.appendChild(closeButton)
        closeButton.innerHTML = "x"
        SetUpBoardStyles.styleModalCloseButton(closeButton)
        closeButton.addEventListener('click', this._closeModal)
    }
   
    

}
