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
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function(){
        li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    list.appendChild(li);

    input.value = "";
});

input.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        button.click();
    }
});