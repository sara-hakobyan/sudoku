import Storage from "./sudokuStorage.js"


export default class User {
    constructor () {
        this.storage = new Storage()                              //????? storing in local storage
        this.usersList = []
    }

    getUserInfo (name, gender) {
        let userData = {
            name: name, 
            gender:gender
        }
        if (userData.name == null ||  userData.name.trim().length === 0) {
            return false
        } 
        this.usersList.push(userData)
        this.storage.store('userData', this.usersList)
        console.log(this.usersList)
    }
}