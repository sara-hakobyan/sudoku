export default class Storage {
    constructor(){
    }

    store(key, data){
        let dataToSave = data
        localStorage.setItem(key, JSON.stringify(dataToSave))
    }

    retrieve(key) {
       let dataSaved = JSON.parse(localStorage.getItem(key))
       console.log(dataSaved)
       return dataSaved
    }

    clearAll() {
        localStorage.clear()
    }


    removeData(key){
        localStorage.removeItem(key)
    }
    
}