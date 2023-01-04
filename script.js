const newTask = document.getElementById("newTask");
const containerAddTask = document.getElementById("addTaskContainer");
const btnAddTask = document.getElementById("btnAdicionarTarefa");
const btnSaveTask = document.getElementById("btnSalvar");
const category = document.getElementById("selectCategory");
const date = document.getElementById("taskDate");
const descript = document.getElementById("descriptTask");
const ul = document.getElementById("listaTarefas");
const titleTask = document.getElementById("inputNovaTarefa");
const inputTask = document.getElementById("checkTask");
const buttons = document.querySelector(".containerButtons");
const btnDelete = document.getElementById("btnDeleteTask");
const btnComplete = document.getElementById("btnCompleteTask");

const tarefas = []

newTask.addEventListener("click", (e) => {
    date.value = "";
    descript.value = "";
    category.value = "work"
    titleTask.value = "";
    containerAddTask.classList.toggle("abrir");
    newTask.style.display = "none";
    btnAddTask.style.display = "flex";
    btnSaveTask.style.display = "none";
});

btnAddTask.addEventListener("click", () => {
    let task = {
        id: gerarId(),
        title: titleTask.value,
        category: category.value,
        date: date.value,
        descript: descript.value
    }
    
    limparElementos();
    adicionarTarefa(task);
});


function limparElementos(){
    containerAddTask.classList.toggle("abrir");
    newTask.style.display = "flex";
    date.value = "";
    descript.value = "";
    category.value = "work"
    titleTask.value = "";
    buttons.style.display = "none";
}


function adicionarTarefa(task){
    tarefas.push(task);
    let li = criarTagLI(task);
    ul.appendChild(li);
}

function gerarId(){
    return Math.floor(Math.random() * 3000);
}

function criarTagLI(task){
    let li = document.createElement("li");
    let div = document.createElement("div");
    let label = document.createElement("label");
    let input = document.createElement("input");
    input.setAttribute("onchange", "editar("+task.id+")")
    input.id = `input-${task.id}`;
    label.setAttribute("for", `input-${task.id}`);
    let flex = document.createElement("div");
    input.setAttribute("type", "checkbox");
    flex.classList.add("flexRow");
    div.classList.add(`${task.category}`);

    label.innerHTML = task.title;
    li.id = task.id

    li.appendChild(div);
    flex.appendChild(input);
    flex.appendChild(label);
    li.appendChild(flex);
    return li;
}

function editar(id){
    newTask.style.display = "none"
    btnAddTask.style.display = "none";
    btnSaveTask.style.display = "block";
    buttons.style.display = "flex";
    ul.style.display = "none";

    containerAddTask.classList.toggle("abrir");
    btnSaveTask.setAttribute("onclick", "salvar("+id+")");
    btnDelete.setAttribute("onclick", "deleteTask("+id+")");
    btnComplete.setAttribute("onclick", "completeTask("+id+")");

    const task = tarefas.find(element => element.id == id);
    titleTask.value = task.title;
    category.value = task.category;
    date.value = task.date;
    descript.value = task.descript;
}

function completeTask(id){
    const li = document.getElementById(`${id}`);
    if(li){
        li.style.textDecoration = "line-through"
    }
    limparElementos();
    buttons.style.display = "none";
    newTask.style.display = "flex";
    ul.style.display = "flex";
}

function deleteTask(id){
    const li = document.getElementById(`${id}`);
    tarefas.forEach((tarefa, index) => {
        if(tarefa.id == id){
            tarefas.splice(index, 1)
        }
    });
    if(li){
        ul.removeChild(li);
    }
    containerAddTask.classList.toggle("abrir");
    buttons.style.display = "none";
    ul.style.display = "flex";
    newTask.style.display = "flex"
}

function salvar(id){
    ul.style.display = "flex";
    let tarefaAtual = document.getElementById(`${id}`);

    let task = tarefas.find(element => element.id == id);
    task = {
        title: titleTask.value,
        category: category.value,
        date: date.value,
        descript: descript.value
    }

    let li = criarTagLI(task);
    if(tarefaAtual){
        ul.replaceChild(li, tarefaAtual);
    }
    containerAddTask.classList.toggle("abrir");
    newTask.style.display = "flex";
    buttons.style.display = "none";
}
