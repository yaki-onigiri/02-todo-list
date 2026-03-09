// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// ①　「要素(const・DOM系)」の取得
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const input = document.getElementById("todo-input");
const button = document.getElementById("add-button");
const list = document.getElementById("todo-list");
const clearButton = document.getElementById("clear-Button");
const taskCount = document.getElementById("task-count");
const clearCompletedBtn = document.getElementById("clearCompleted");

const filterAll = document.getElementById("filter-all");
const filterActive = document.getElementById("filter-active");
const filterCompleted = document.getElementById("filter-completed");

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// ②　「イベント」設定の場所
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

button.addEventListener("click", function (){
    const text = input.value.trim();

    if (text ==="") return;

    createTodo(text, false);
    saveTodos();
    updateTaskCount();

    input.value = "";
});

input.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        button.click();
    }
});

function saveTodos(){

    const todos = [];

    document.querySelectorAll("#todo-list li").forEach(function(li){

        const text = li.querySelector("span").textContent;
        const completed = li.querySelector("input").checked;

        todos.push({
            text: text,
            completed: completed
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}


function loadTodos(){

    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.forEach(function(todo){

        createTodo(todo.text, todo.completed);

    });
}

loadTodos();
updateTaskCount();

function createTodo(text, completed){

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    const span = document.createElement("span");
    span.textContent = text;

    if(completed){
        span.classList.add("completed");
    }

    checkbox.addEventListener("change", function(){

        if(checkbox.checked){
            span.classList.add("completed");
        }else{
            span.classList.remove("completed");
        }

        saveTodos();
        updateTaskCount();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function(){
        li.remove();
        saveTodos();
        updateTaskCount();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    list.appendChild(li);
}

clearButton.addEventListener("click", function(){

    if(confirm("本当にすべて削除しますか？")){
        list.innerHTML = "";
        saveTodos();
        updateTaskCount();
    }
});

function updateTaskCount(){

    const total = document.querySelectorAll("#todo-list li").length;
    const completed = document.querySelectorAll("#todo-list input:checked").length;
    const remaining = total - completed;

    taskCount.textContent = "残りタスク：" + remaining;
}

clearCompletedBtn.addEventListener("click", clearCompletedTasks);

function clearCompletedTasks(){
    const tasks = document.querySelectorAll("#todo-list li");

    tasks.forEach(function(task){

        const checkbox = task.querySelector("input[type='checkbox']");

        if (checkbox.checked){
            task.remove();
        }
    });

    saveTodos();
    updateTaskCount();
}

filterAll.addEventListener("click", function(){
    filterTodos("all");
});

filterActive.addEventListener("click", function(){
    filterTodos("active");
});

filterCompleted.addEventListener("click", function(){
    filterTodos("completed");
});

function filterTodos(type){

    const todos = document.querySelectorAll("#todo-list li");

    todos.forEach(function(todo){

        const checkbox = todo.querySelector("input[type='checkbox']");
        const completed = checkbox.checked;

        if(type === "all"){
            todo.style.display = "";
        }

        if(type === "active"){
            todo.style.display = completed ? "none" : "";
        }

        if(type === "completed"){
            todo.style.display = completed ? "" : "none";
        }
    });
}