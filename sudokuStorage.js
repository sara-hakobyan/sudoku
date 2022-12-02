export default class Storage {
    constructor(){
    //     this.key = key
    //     this.data = data
    }

    _store(key, data){
        let dataToSave = data
        localStorage.setItem(key, JSON.stringify(dataToSave))
    }

    _retrieve(key) {
       let dataSaved = JSON.parse(localStorage.getItem(key))
       return dataSaved
    }

    _clearAll() {
        localStorage.clear()
    }


    _removeData(key){
        localStorage.removeItem(key)
    }
    
}