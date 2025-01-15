let tasks = []

const saveTasks = ()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const loadTasks = ()=>{
    const savedTasks = localStorage.getItem('tasks');
    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        updateTasksList();
        updateStats();
    }
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim()
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
        updateStats()
        saveTasks()
    }
}


const toggleTaskComplete = (index)=>{
    tasks[index].completed = !tasks[index].completed
    updateTasksList();
    updateStats()
    saveTasks()
}

const deleteTask = (index) =>{
    tasks.splice(index, 1);
    updateTasksList();
    updateStats()
    saveTasks()
}

const editTask = (index) =>{
    const taskInput = document.getElementById('taskInput')
    taskInput.value = tasks[index].text
    tasks.splice(index, 1)
    updateTasksList()
    updateStats()
    saveTasks()
}

const updateStats = ()=>{
    const completedtasks = tasks.filter(task => task.completed).length
    const totaltasks = tasks.length
    const progress = totaltasks !== 0? (completedtasks/ totaltasks) * 100: 0;
    const progressBar = document.getElementById("progress")
    progressBar.style.width = `${progress}%`

    document.getElementById('numbers').innerText = `${completedtasks} / ${totaltasks}`
}

const updateTasksList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''

    tasks.forEach((task,index)=> {
        const listItem = document.createElement('li')
        listItem.innerHTML = `                
                <div class="taskItem">
                    <div class="task ${task.completed ? 'completed': ''}">
                        <input type="checkbox" class="checkbox" ${task.completed ? 'checked': ''}>
                        <p>${task.text}</p>
                    </div>

                    <div class="icons">
                        <img src="images/edit.svg" alt="Edit" onclick= "editTask(${index})">
                        <img src="images/delete.svg" alt="Delete" onclick= "deleteTask(${index})">
                    </div>
                </div>`
        
        const checkbox = listItem.querySelector(".checkbox")
        checkbox.addEventListener("change", ()=>toggleTaskComplete(index))
        taskList.append(listItem)
    })
   
}

document.getElementById('newTask').addEventListener('click', function (e){
    // e.preventDefault();
    addTask();
})


window.addEventListener('load', loadTasks)




