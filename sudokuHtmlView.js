const HTMLUtils = {
    getParentId: function (id) {
        return document.getElementById(id)
    },

    createParentElement: function(id) {
        let element = document.createElement('div')
        element.setAttribute('id', id)
        document.body.append(element)
        return element
    },

    createElement: function (cssClass, id) {
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
    styleVisibleNumbersBoard: function(element) {
        element.style.border = '1px solid gray'
        element.style.height = '100px'
        element.style.width = '376px'
        element.style.display = 'flex'
        element.style.justifyContent = 'space-evenly'
    },

    styleBoard: function(element) {
        element.style.maxWidth = '380px'
        element.style.minWidth = '380px'
        element.style.display = 'flex'
        element.style.flexWrap = 'wrap'
    },

    styleBoardCell: function(element) {
        element.style.height = '40px'
        element.style.width = '40px'
        element.style.border = '1px solid lightgray'
        element.style.textAlign = 'center'
        element.style.cursor = 'pointer'
    }
}


export default class HtmlView {
    constructor(model) {
        // this.model = model
        this.OnBoardCellClick = this._OnBoardCellClick.bind(this)
        this.onVisibleNumberCellClick = this._onVisibleNumberCellClick.bind(this)
    }

    setModel (model,parentId) {
        this.model = model
        this._createBoardContainer(parentId)
        this._createBoard(this.model)
        this._updateBoard(this.model)
    } 


    setParentContainer() {
        this._removeAllEventListeners()
        this.gridBoard.remove()
    }

    setUp(model, parentId) {
        if (this.model) {
            this.setParentContainer()
        }
        this.setModel(model,parentId)
    }

    // setUp(model, parentId) { 
    //         // while (this.gridBoard.firstChild) 
    //         while (this.boardCells) {
    //         this.gridBoard.removeChild(this.gridBoard.firstChild)
    //     }
    //         // let gridBoard = HTMLUtils.getParentId(this.parentContainerId)
    //         // gridBoard.parentNode.removeChild(gridBoard)
    //         this.updateBoard(model)
    // }


     _createBoardContainer (parentId) {
        let gridBoard = HTMLUtils.createParentElement(parentId)
        SetUpBoardStyles.styleBoard(gridBoard)
        this.gridBoard = gridBoard
     }


    _createBoard(model) {
        for (let i = 0; i < model.length; i++) {
        let boardCell = HTMLUtils.createElement('number', i)
        boardCell.addEventListener('click', this.OnBoardCellClick)
        SetUpBoardStyles.styleBoardCell(boardCell)
        this.gridBoard.appendChild(boardCell)
        }
        let boardCells = HTMLUtils.getElementsByClassName('.number')
        this.boardCells = boardCells
        
    }

    _removeAllEventListeners(){
        // let boardCells = HTMLUtils.getElementsByClassName('.number')
        for (let i = 0; i < this.boardCells.length; i++) {
            this.boardCells[i].removeEventListener('click', this.onNumberClick)  
        }
    }

    _updateBoard(model) {
        for (let i = 0; i < model.length; i++) {                 
            if (model[i].flag) {
                this.boardCells[i].innerHTML = ''
            } else {
                this.boardCells[i].innerHTML = model[i].randomNum
            }
        }
    }


    _createVisibleNumbersBoard(visibleNumbersLength) {
        let visibleNumbersBoard = HTMLUtils.createParentElement('display')
        while (visibleNumbersBoard.firstChild) {
            visibleNumbersBoard.removeChild(visibleNumbersBoard.firstChild)
        }
        SetUpBoardStyles.styleVisibleNumbersBoard(visibleNumbersBoard)
        for (let i = 0; i < visibleNumbersLength; i++) {
            let visiblesBoardCell = HTMLUtils.createElement('visible-number',i)
            visiblesBoardCell.addEventListener('click',this.onVisibleNumberCellClick)
            SetUpBoardStyles.styleBoardCell(visiblesBoardCell)
            visibleNumbersBoard.appendChild(visiblesBoardCell)
        }
        let visiblesBoardCells = HTMLUtils.getElementsByClassName('.visible-number')
        this.visiblesBoardCells = visiblesBoardCells
    }


    _onVisibleNumberCellClick(event) {
        let value = event.target.innerHTML
        let number = Number(value)
        for(let i = 0; i < this.model.userBoard.length; i++) {
            if (i === this.index) {
                this.boardCells[i].innerHTML = value
                this.model.fillBoardNumbers(this.model.userBoard[i].row, this.model.userBoard[i].column, number)          //??????????
            }
        }
        console.log(this.model.userBoard)

    }


    _OnBoardCellClick(event) {
        let id = event.target.id
        let index = Number(id)                                                                                     //converting string to number
        let visibleNumbers = this.model.getVisibleNumbers(this.model.userBoard, index)
        this.createVisibleNumbersBoard(visibleNumbers.length)
        // let visiblesBoardCells = HTMLUtils.getElementsByClassName('.visible-number')
        for (let i = 0; i < visibleNumbers.length; i++) {
            this.model.observer.notify( 'dataOfVisibles', this.visiblesBoardCells[i].innerHTML = visibleNumbers[i])                  //??????????????????
            
        }
        this.index = index                                                   //
    }


}
