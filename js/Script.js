const input = document.getElementById("todo-input");
const button = document.getElementById("add-button");
const list = document.getElementById("todo-list");

button.addEventListener("click", function (){
    const text = input.value.trim();

    if (text ==="") return;

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = text;

    checkbox.addEventListener("change", function(){
        if(checkbox.checked){
            span.classList.add("completed");
        }else{
            span.classList.remove("completed");
        }
        saveTodos();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function(){
        li.remove();
        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    list.appendChild(li);

    saveTodos();

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

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        const span = document.createElement("span");
        span.textContent = todo.text;

        if(todo.completed){
            span.classList.add("completed");
        }

        checkbox.addEventListener("change", function(){

            if(checkbox.checked){
                span.classList.add("completed");
            }else{
                span.classList.remove("completed");
            }

            saveTodos();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";

        deleteButton.addEventListener("click", function(){
            li.remove();
            saveTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        list.appendChild(li);
    });
}

loadTodos();