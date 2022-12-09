export default class Storage {
    constructor(){
    //     this.key = key
    //     this.data = data
    }

    store(key, data){
        let jsonData = JSON.stringify(data)
        localStorage.setItem(key, jsonData)
    }

    retrieve(key) {
       let dataSaved = JSON.parse(localStorage.getItem(key))
       return dataSaved
    }

    clearAll() {
        localStorage.clear()
    }


    removeData(key){
        localStorage.removeItem(key)
    }
    
}