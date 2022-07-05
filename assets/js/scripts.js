const $ = (x) => document.querySelector(x)


const btnAddTask = $("#btn-add-task")
const fieldInputTask = $("#field-input-task")
const ulListTasks = $("#ul-list-tasks")
let numberTasks = 0
let maxTasks = 100
let tasks = []

window.addEventListener('keydown', pressedKey => {
    let wasEnterPressed = pressedKey.key === 'Enter'
    if (wasEnterPressed && fieldInputTask === document.activeElement) {
        addTestTask()
    }
})

btnAddTask.addEventListener('click', addTestTask)


function addTestTask() {
    try {
        if(!fieldInputTask.value) throw new Error('Você não digitou uma tarefa. Digite uma tarefa e tente novamente.')
        if(!fieldInputTask.value.trim()) throw new Error('Você não digitou uma tarefa. Digite uma tarefa e tente novamente.')
        if(numberTasks >= maxTasks) throw new Error(`Você chegou ao limite de ${maxTasks} tarefas. Apague uma tarefa para adicionar outra.`)
        addElement(fieldInputTask.value, ulListTasks)
    }
    catch(e) {
        console.log(e)
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


function addElement(text, ulListTasks) {
    let li = document.createElement('li')
    li.innerHTML = `
        <input type="checkbox" class="input-list" id="input-id-${numberTasks}">
        <label for="input-id-${numberTasks}" class="input-list">
        ${text}
        </label>
        <button class="input-list-button">
        X
        </button>`
    ulListTasks.appendChild(li)
    numberTasks++
}