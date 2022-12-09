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
    }

    _setUserData(name, gender){                              //New
        let userData = {
            name: name,
            gender: gender
        }
        if (userData.name == null ||  userData.name.trim().length === 0) {
            return 
        } 
        return userData
        // let usersList = super.retrieve('userList')
        // console.log(usersList)
        // if (usersList) {
        //     usersList.push(userData)
        // } else {
        //     usersList= [userData]
        // }
        // super.store('userList', usersList)
    }

    _getUserData(name,gender) {                                          //New
        let data = this._setUserData(name, gender)
        let userList = super.retrieve('userList')
        if(userList == null) {
            userList = [data]
        } else {
            userList.push(data)
        }
        super.store('userList', userList)
    }

    
    
}