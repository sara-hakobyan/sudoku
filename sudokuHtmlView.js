const HTMLUtils = {
    // getParentId: function (id) {
    //     return document.getElementById(id)
    // },

    createParentDiv : function(id) {
        let div = document.querySelector('div')
        div.setAttribute('id', id)
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
        this.onBoardUpdate = this.onBoardUpdate.bind(this)
        this.OnBoardCellClick = this._OnBoardCellClick.bind(this)
        this.onVisibleNumberCellClick = this._onVisibleNumberCellClick.bind(this);
        if (model) {
            this.setModel(model);
        }
    }

    setContainer (parentId) {
        if (this.parentId) {
            document.getElementById(this.parentId).remove(this.gridBoard);
        }

        this.parentId = parentId;
        if (this.parentId) {
            this._createBoardContainer(parentId)
            this._createBoard()
            this._updateBoard()
        }
    }

    setModel (model) {
        if (this.model) {
            this.model.observer.unsubscribe('dataChange', this.onBoardUpdate)
        }
        this.model = model
        if (this.model) {
            this.model.observer.subscribe('dataChange', this.onBoardUpdate)
        }
        this.onBoardUpdate();
    } 

    onBoardUpdate( ) {
        if (this.gridBoard ) {
            this._updateBoard();
        }
    }



    setContainerForVisiblesBoard(visiblesId) {                                               //new function
        if (this.visiblesId) {
            document.getElementById(this.visiblesId).remove(visiblesId)
        }
        this.visiblesId = visiblesId
        if (this.visiblesId) {
            this._createVisiblesBoardContainer()
        }
    }


     _createBoardContainer () {
        this.gridBoard = HTMLUtils.createParentDiv(this.parentId)
        console.log(this.gridBoard )
        SetUpBoardStyles.styleBoard(this.gridBoard)
     }


    _createBoard() {
        for (let i = 0; i < this.model.userBoard.length; i++) {
            let boardCell = HTMLUtils.createElement('number', i)
            boardCell.addEventListener('click', this.OnBoardCellClick)
            SetUpBoardStyles.styleBoardCell(boardCell)
            this.gridBoard.appendChild(boardCell)
        }
        this.boardCells = HTMLUtils.getElementsByClassName('.number')
        
    }

    _removeAllEventListeners(){
        for (let i = 0; i < this.boardCells.length; i++) {
            this.boardCells[i].removeEventListener('click', this.onNumberClick)  
        }
    }

    _updateBoard() {
        for (let i = 0; i < this.model.userBoard.length; i++) {                 
            if (this.model.userBoard[i].flag && this.model.userBoard[i].randomNum === 0) {
                this.boardCells[i].innerHTML = ''
            } else {
                this.boardCells[i].innerHTML = this.model.userBoard[i].randomNum
            }
        }
    }


    _createVisiblesBoardContainer() {                                                       //new function
        this.visibleNumbersBoard = HTMLUtils.createParentElement(this.visiblesId)
        SetUpBoardStyles.styleVisibleNumbersBoard(this.visibleNumbersBoard)
    }

    _createVisibleNumbersBoard() {
        while (this.visibleNumbersBoard.firstChild) {
            this.visibleNumbersBoard.removeChild(this.visibleNumbersBoard.firstChild)
        }
        for (let i = 0; i < this.visibleNumbers.length; i++) {
            let visiblesBoardCell = HTMLUtils.createElement('visible-number',i)
            visiblesBoardCell.addEventListener('click',this.onVisibleNumberCellClick)
            SetUpBoardStyles.styleBoardCell(visiblesBoardCell)
            this.visibleNumbersBoard.appendChild(visiblesBoardCell)
        }
        this.visiblesBoardCells = HTMLUtils.getElementsByClassName('.visible-number')
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
        this.visibleNumbers = this.model.getVisibleNumbers(this.model.userBoard, index)
        // this.setContainerForVisiblesBoard('display')
        this._createVisibleNumbersBoard()
        for (let i = 0; i < this.visibleNumbers.length; i++) {
            this.visiblesBoardCells[i].innerHTML = this.visibleNumbers[i]                            //
            
        }
        this.index = index                                                   //
    }


}
