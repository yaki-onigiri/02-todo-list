const input = document.getElementById("todo-input");
const button = document.getElementById("add-button");
const list = document.getElementById("todo-list");

button.addEventListener("click", function (){
    const text = input.value;

    if (text ==="") return;

    const li = document.createElement("li");
    li.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function(){
        li.remove();
    });

    li.appendChild(deleteButton);

    list.appendChild(li);

    input.value = "";
});

input.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        button.click();
    }
});