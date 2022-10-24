const HTMLUtils = {
    getParentId: function (id) {
        return document.getElementById(id)
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
    constructor(sudoku, parentContainerId) {
        this.parentContainerId = parentContainerId
        this.sudoku = sudoku
        this.userBoard = this.sudoku.userBoard
        this.OnBoardCellClick = this.OnBoardCellClick.bind(this)
        this.onVisibleNumberCellClick = this.onVisibleNumberCellClick.bind(this)
        // this.sudoku.observer.subscribe('onDataChanged', this.updateBoard)
    }

    setUp(model) { 
        if (this.boardCells) {
          console.log(this.gridBoard.firstChild)
            while (this.gridBoard.firstChild) {
                console.log('njhbjhbn')
            this.gridBoard.removeChild(this.gridBoard.firstChild)
        }
            // let gridBoard = HTMLUtils.getParentId(this.parentContainerId)
            // gridBoard.parentNode.removeChild(gridBoard)
        }
        this.updateBoard(model)
    }


    createBoard(boardLength) {
        let gridBoard = HTMLUtils.getParentId(this.parentContainerId)
        SetUpBoardStyles.styleBoard(gridBoard)
        for (let i = 0; i < boardLength; i++) {
            let boardCell = HTMLUtils.createElement('number', i)
            boardCell.addEventListener('click', this.OnBoardCellClick)
            SetUpBoardStyles.styleBoardCell(boardCell)
            gridBoard.appendChild(boardCell)
        }
        this.gridBoard = gridBoard
    }

    removeAll(){
        let boardCells = HTMLUtils.getElementsByClassName('.number')
        for (let i = 0; i < boardCells.length; i++) {
            boardCells[i].removeEventListener('click', this.onNumberClick) 
            
        }
        // return boardCells
    }

    updateBoard(model) {
        this.createBoard(model.length)
        let boardCells = HTMLUtils.getElementsByClassName('.number')
        for (let i = 0; i < model.length; i++) {
            this.sudoku.observer.notify('onDataChanged', model)                       //????????????observer
            if (model[i].flag) {
                boardCells[i].innerHTML = ''
            } else {
                boardCells[i].innerHTML = model[i].randomNum
            }
        }
        this.boardCells = boardCells
    }

    createVisibleNumbersBoard(visibleNumbersLength) {
        let visibleNumbersBoard = HTMLUtils.getParentId('display')
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
    }


    onVisibleNumberCellClick(event) {
        let value = event.target.innerHTML
        let number = Number(value)
        for(let i = 0; i < this.userBoard.length; i++) {
            if (i === this.index) {
                this.boardCells[i].innerHTML = value
                this.sudoku.fillBoardNumbers(this.userBoard[i].row, this.userBoard[i].column, number)          //??????????
            }
        }
        console.log(this.userBoard)

    }


    OnBoardCellClick(event) {
        let id = event.target.id
        let index = Number(id)                                                                                     //converting string to number
        let visibleNumbers = this.sudoku.getVisibleNumbers(this.userBoard, index)
        this.createVisibleNumbersBoard(visibleNumbers.length)
        let visiblesBoardCells = HTMLUtils.getElementsByClassName('.visible-number')
        for (let i = 0; i < visibleNumbers.length; i++) {
            this.sudoku.observer.notify( 'dataOfVisibles', visiblesBoardCells[i].innerHTML = visibleNumbers[i])                  //??????????????????
            
        }
        this.index = index                                                   //
    }


}