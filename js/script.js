let tasks = []

let imgDone, imgCorrect, imgTrash

imgDone = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
</svg>`

imgCorrect = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>`

imgTrash = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>`

let output = document.getElementById('output')

const addTodo = () =>{
    let input = document.getElementById('inputText')
    const todo = {
        id: tasks.length + 1,
        name: input.value, 
        completed: false
    }
    tasks.push(todo)
    addToLocalStorage()
    input.value = ''
    // renderToDos()заменяем
}

const renderToDos = () => {
    output.innerHTML = ""
    tasks.forEach(el => {
        let card = document.createElement('div')
        let h = document.createElement('h2')
        let btns = document.createElement('div')
        let done = document.createElement('button')
        let correct = document.createElement('button')
        let trash = document.createElement('button')
        btns.classList.add('btns')
        card.classList = el.completed == true ? 'active' : 'card'

        h.innerHTML = el.name
        done.innerHTML = imgDone
        correct.innerHTML = imgCorrect
        trash.innerHTML = imgTrash

        card.append(h)
        card.append(btns)
        btns.append(done)
        btns.append(correct)
        btns.append(trash)
        output.append(card)

    let id = el.id
    done.addEventListener('click', () => {
        tasks.forEach(el => {
            if(el.id == id){
            el.completed = !el.completed
                }
        })
            // renderToDos()
            addToLocalStorage()
        })
    
    // trash.addEventListener('click', () => {
    //     tasks.forEach(el => {
    //         if(el.id == id){
    //             el.completed = !el.completed
    //             tasks = tasks.filter(item => item != el)
    //         }
    //     })
    //     renderToDos()
    // })

    trash.addEventListener('click', () => {
        let con = confirm('Действительно ли хотите удалить запись?')
        if (con) {
            tasks = tasks.filter(el => el.id != id)
        }
        // renderToDos()
        addToLocalStorage()
    })

    // correct.addEventListener('click', () => {
    //     tasks.forEach(el => {
    //         if(el.id == id){
    //             let pr = prompt('Correct word')
    //             el.name = pr
    //         }
    //     })
    //     renderToDos()
    // })

    correct.addEventListener('click', () => {
        let cor = prompt('Введите новый запись!')
        tasks.forEach(el => {
            if(el.id == id) {
                 let p = confirm('Действительно ли хотите поменять запись?')
                 if (p) {
                     el.name = cor
                }
            }
            // renderToDos()
            addToLocalStorage()
        })
    })
})
}


const addToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderToDos()
    // заменяли рендер на addToLocalStorage поэтому везде поменяем на ЛОКАЛ
}

const getFromLocalStorage = () => {
    const reference = localStorage.getItem('tasks')
    if (reference) {
       tasks = JSON.parse(reference)
       renderToDos()
    }
}

getFromLocalStorage()


