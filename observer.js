  export default class Observer {
    constructor() { 
        this.subscribers = []
    }

    _subscribe(name, fn) {
        let subscibersInfo = {
            name: name,
            fn: fn
        }
        this.subscribers.push(subscibersInfo) 
     
    }

    _unsubscribe(name, toBeRemoved) {
        this.subscribers = this.subscribers.filter((obj) => {
            if (toBeRemoved === obj.fn && name === obj.name) {
                return obj
            }
        })
        
    }

    _notify(name, data) {
        for (let i = 0; i < this.subscribers.length; i++) {
            if (this.subscribers[i].name === name) {
              this.subscribers[i].fn(data)
            }
        }
    }

}




// const observer = new Observer()


// console.log(observer)

// const buttons = document.querySelectorAll('.button')
// const textfield = document.getElementById('textfield')


// function demo(value) {
//     textfield.innerHTML = value
//     console.log(value)
// }

// observer.subscribe("demo", demo);

// // let click = function onClickEvent (element) {
// //     element.addEventListener('click', (e) => {
// //         return e.target.innerHTML
// //     })
// // }




//     for (let i = 0; i < buttons.length; i++) {
//     buttons[i].addEventListener('click', (event) => {
//         observer.notify('demo', event.target.innerHTML)
//     })
// }


