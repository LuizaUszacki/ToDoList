const $ = (x) => document.querySelector(x)

//DOM Elements
const btnAddTask = $("#btn-add-task")
const fieldInputTask = $("#field-input-task")
const ulListTasks = $("#ul-list-tasks")
//Variables
let taskUniqueNumber = 0
let maxTasks = 100
let tasks = []

//Event Listeners
btnAddTask.addEventListener('click', addTask)

window.addEventListener('keydown', pressedKey => {
    let wasEnterPressed = pressedKey.key === 'Enter'
    let elementWithFocus = document.activeElement
    let hasInputFocus = elementWithFocus === fieldInputTask
    let hasCheckboxFocus = elementWithFocus.classList.contains('input-list')

    if (wasEnterPressed && hasInputFocus) {
        addTask()
    } else if (wasEnterPressed && hasCheckboxFocus) {
        elementWithFocus.checked = !elementWithFocus.checked
    }
})

ulListTasks.addEventListener('click', element => {
    if (element.target.classList.contains('input-list-button')) {
        let parentTargetElement = element.target.parentElement
        deleteTask(parentTargetElement)
    }
})

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

function deleteTask(element) {
    let targetRemove = tasks.filter(el => {
        if (el.classList.contains(element.className)) {
            return el
        }
    })
    tasks = tasks.filter(task => task != targetRemove[0])
    ulListTasks.removeChild(element)
}

function createNewElement(text, ulListTasks) {
    let li = document.createElement('li')
    li.classList.add(`li-list-${taskUniqueNumber}`)
    li.classList.add()
        li.innerHTML = `
        <input type="checkbox" class="input-list" id="input-id-${taskUniqueNumber}">
        <label class="input-list" for="input-id-${taskUniqueNumber}">
        ${text}
        </label>
        <button class="input-list-button">
        X
        </button>`
    ulListTasks.appendChild(li)
    tasks.push(li)
    taskUniqueNumber++
}