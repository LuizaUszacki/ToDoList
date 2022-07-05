const $ = (x) => document.querySelector(x)

//DOM Elements
const btnAddTask = $("#btn-add-task")
const fieldInputTask = $("#field-input-task")
const ulListTasks = $("#ul-list-tasks")
//Variables
let maxTasks = 100
let tasks = []


//Event Listeners
window.addEventListener('keydown', pressedKey => {
    let wasEnterPressed = pressedKey.key === 'Enter'
    let hasInputFocus = document.activeElement === fieldInputTask
    let elementWithFocus = document.activeElement
    let hasCheckboxFocus = elementWithFocus.classList.contains('input-list') 

    if (wasEnterPressed && hasInputFocus) {
        addTask()
    } else if (wasEnterPressed && hasCheckboxFocus) {
        elementWithFocus.checked = !elementWithFocus.checked
    }
})
btnAddTask.addEventListener('click', addTask)


//Save in localStorage

//Delete from localStorage

//Press X to delete Task

function saveLocalStorage(obj) {
    //localStorage.setItem(`task${tasks.length}`)

}

function deleteLocalStorage() {
    
}


//Functions
function addTask() {
    try {
        if(!fieldInputTask.value) throw new Error('Você não digitou uma tarefa. Digite uma tarefa e tente novamente.')
        if(!fieldInputTask.value.trim()) throw new Error('Você não digitou uma tarefa. Digite uma tarefa e tente novamente.')
        if(tasks.length >= maxTasks) throw new Error(`Você chegou ao limite de ${maxTasks} tarefas. Apague uma tarefa para adicionar outra.`)
        createNewElement(fieldInputTask.value, ulListTasks)
    }
    catch(e) {
        swal({
            title:"Ops... Algo deu errado😥", 
            text: `${e.message}`,
            })
    }
    finally {
        fieldInputTask.value = ''
        fieldInputTask.focus()
    }
}

function createNewElement(text, ulListTasks) {
    let li = document.createElement('li')
    li.innerHTML = `
        <input type="checkbox" class="input-list" id="input-id-${tasks.length}">
        <label for="input-id-${tasks.length}" class="input-list">
        ${text}
        </label>
        <button class="input-list-button" id="input-list-button-${tasks.length}">
        X
        </button>`
    ulListTasks.appendChild(li)
    tasks.push(li)
    console.log(tasks)
}
