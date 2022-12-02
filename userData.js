import Storage from "./SudokuStorage.js"


// export default class User {
//     constructor () {
//         this.storage = new Storage()                              //????? storing in local storage
//         this.usersList = []
//     }

//     getUserInfo (name, gender) {
//         let userData = {
//             name: name, 
//             gender:gender
//         }
//         if (userData.name == null ||  userData.name.trim().length === 0) {
//             return false
//         } 
//         this.usersList.push(userData)
//         this.storage.store('userData', this.usersList)
//         console.log(this.usersList)
//     }
// }


export default class UserData extends Storage {
    constructor() {
        super()
        // this.usersList = []
    }

    _setUserData(name, gender){
        let userData = {
            name: name,
            gender: gender
        }
        if (userData.name == null ||  userData.name.trim().length === 0) {
            return false
        } 
        let usersList = super._retrieve('userList')
        console.log(usersList)
        if (usersList) {
            usersList.push(userData)
        } else {
            usersList= [userData]
        }
        super._store('userList', usersList)
    }

    
    
}