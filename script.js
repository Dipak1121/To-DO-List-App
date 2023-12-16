
let priorityCount = 0;
let completeCount = 0;
let taskCount = 0;
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const taskContainer = document.querySelector(".task-list");
const noTask = document.querySelector(".no-task");

const todo = document.querySelector(".todo");
const priorityElement  = document.querySelector(".priority1");

taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get input values
    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;

    // Call a function to add the task to the list
    addTask(taskName, dueDate);

    // Clear the form fields
    taskForm.reset();
});

// Function to add a task to the list
function addTask(name, date) {
    // Implement the logic to add a task to the list
    taskCount++;
    noTask.classList.add("hide");

    todo.children[0].innerText = `${taskCount}`;

const taskItem = document.createElement('div');
taskItem.classList.add('task-item');

const taskInfo = document.createElement('div');
taskInfo.classList.add('task-info');
taskInfo.innerHTML = `<div class="taskName">${name}</div> <div class="taskDate">${date}</div>`;

const optionsDiv = document.createElement("div");
optionsDiv.classList.add("options");
const priorityDiv = document.createElement("div");
priorityDiv.classList.add("priorityDiv");
const labelName = document.createElement("label");
labelName.innerText = "High Priority";
const checkpriority = document.createElement("input");
checkpriority.type = "checkbox";
checkpriority.checked =  false;
checkpriority.addEventListener("click", priorityCheck);

const completeLabel = document.createElement("label");
completeLabel.innerText = "Completed";
const checkComplete = document.createElement("input");
checkComplete.type = "checkbox";
checkComplete.checked =  false;
checkComplete.addEventListener("click", completeCheck);

priorityDiv.appendChild(checkpriority);
priorityDiv.appendChild(labelName);
priorityDiv.appendChild(checkComplete);
priorityDiv.appendChild(completeLabel);


const taskActions = document.createElement('div');
taskActions.classList.add('task-actions');

const editButton = document.createElement('button');
editButton.classList.add("editBtn");
editButton.innerHTML = `<i class="fa-solid fa-pencil" style="color: #ffffff;"></i>`;
editButton.addEventListener('click', editTask);

const deleteButton = document.createElement('button');
deleteButton.classList.add("deleteBtn");
deleteButton.innerHTML = `<i class="fa-solid fa-trash" style="color: #ffffff;"></i>`;
deleteButton.addEventListener('click', deleteTask);

taskActions.appendChild(editButton);
taskActions.appendChild(deleteButton);

optionsDiv.appendChild(priorityDiv);
optionsDiv.appendChild(taskActions);

taskItem.appendChild(taskInfo);
taskItem.appendChild(optionsDiv);

taskContainer.appendChild(taskItem);
}

// Implement other functionality based on the described features
// ...

function editTask(event) {
    const saveBtn = document.createElement("button");
    saveBtn.classList.add("saveBtn");
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", saveTask);
    let taskBtnDiv = event.target.closest(".task-actions");
    taskBtnDiv.appendChild(saveBtn);
    console.log(taskBtnDiv);
    let arr = event.target.closest(".task-item").children[0].children;
    arr[0].classList.add("editable");
    arr[1].classList.add("editable");
    arr[0].contentEditable = true;
    arr[1].contentEditable = true;
}

function deleteTask(e){
    taskCount--;
    if(taskCount === 0 ){
        noTask.classList.remove("hide");
    }
    todo.children[0].innerText = `${taskCount}`;
    if(e.currentTarget.parentNode.parentNode.children[0].children[0].checked){
        priorityCount--;
        priorityElement.children[0].innerText = `${priorityCount}`;
    }
    let deleteTask = e.target.closest(".task-item");
    deleteTask.remove();
}

function saveTask(e){
    let arr = e.target.closest(".task-item").children[0].children;
    console.log(arr);
    arr[0].classList.remove("editable");
    arr[1].classList.remove("editable");
    arr[0].contentEditable = false;
    arr[1].contentEditable = false;
    e.target.remove();
}

function priorityCheck(event){
    // console.log(event.target.checked);
    event.target.closest(".task-item").classList.toggle("high-priority");
    if(event.target.checked){
        priorityCount++;
    }
    else{
        priorityCount--;
    }
    priorityElement.children[0].innerText = `${priorityCount}`;
}

function completeCheck(event){
    event.target.closest(".task-item").children[0].children[0].classList.toggle("complete");    
}