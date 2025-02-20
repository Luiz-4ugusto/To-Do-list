const button = document.querySelector(".botão_clica"); 
const input = document.querySelector("input"); 
const taskList = document.querySelector("#taskList");

//localStorage
function saveTasks() {
    const tasks = [];
    const lis = taskList.querySelectorAll("li");
    lis.forEach(li => {
        tasks.push(li.textContent.replace("Deletar Tarefa", "").trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Salva como string JSON
}

// Função para carregar as tarefas do localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        savedTasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task;

            const deletar_bu = document.createElement("button");
            deletar_bu.textContent = "Deletar Tarefa";
            deletar_bu.classList.add("deletar_bu"); // Aqui está a diferença!

            deletar_bu.addEventListener("click", function () {
                li.remove();
                saveTasks(); // Atualiza as tarefas salvas
            });

            li.appendChild(deletar_bu);
            taskList.appendChild(li);
        });
    }
}



button.addEventListener("click", function () {
    const taskText = input.value; 
    if (taskText.trim() === "") return; 

    const li = document.createElement("li"); 
    li.textContent = taskText; 

    const deletar_bu = document.createElement("button");
    deletar_bu.textContent = "Deletar Tarefa";
    deletar_bu.classList.add("deletar_bu"); 
    

    deletar_bu.addEventListener("click", function () {
        li.remove(); 
        saveTasks(); 
    });

    li.appendChild(deletar_bu);
    taskList.appendChild(li);

    input.value = ""; 
    saveTasks(); 
});

loadTasks();
