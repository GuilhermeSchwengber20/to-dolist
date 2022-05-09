let inputNovaTarefa = document.querySelector("#inputNovaTarefa");
let btnAdicionarTarefa = document.querySelector("#btnAdicionarTarefa");
let listaTarefas = document.querySelector("#listaTarefas");
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');
let btnFinalizar = document.querySelector('#btnFinalizar');


inputNovaTarefa.addEventListener('keypress', (e) =>{

    if(e.keyCode ==13){
        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarId(),
        }
        adicionarTarefa(tarefa);
    }
});


btnAdicionarTarefa.addEventListener('click', (e) =>{
    let tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarId(),
    }
    adicionarTarefa(tarefa);
});

btnAtualizarTarefa.addEventListener('click', (e) =>{
    e.preventDefault();

    let idTarefa= idTarefaEdicao.innerHTML.replace('#', '');

    let tarefa ={
        nome:inputTarefaNomeEdicao.value,
        id: idTarefa,
    }

    let tarefaAtual = document.getElementById(''+idTarefa+'');

    if(tarefaAtual){
        let li = criarTagLI(tarefa);
        listaTarefas.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
    }else{
        alert('Nenhum elemento encontrado')
    }
})

janelaEdicaoBtnFechar.addEventListener('click', (e) =>{
    alternarJanelaEdicao();
})



function gerarId(){
    return Math.floor(Math.random() * 3000);
}


function adicionarTarefa(tarefa){
    let li = criarTagLI(tarefa);
    listaTarefas.appendChild(li);
    inputNovaTarefa.value = '';
}


function criarTagLI(tarefa){
    let li = document.createElement('li');
    li.classList.add('textoTarefa');
    li.innerHTML = tarefa.nome
    li.id = tarefa.id;


    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')');
    
    
    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');


    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);



    li.appendChild(div);
    return li
};

function editar(idTarefa){

    let li = document.getElementById(''+idTarefa+'');
    if(li){
        idTarefaEdicao.innerHTML = '#' + idTarefa;
        inputTarefaNomeEdicao.value = li.innerText;
        alternarJanelaEdicao();
    }else{
        alert('Elemento não encontrado');
    }

}

function excluir(idTarefa){
    let confirmacao = window.confirm('Tem certeza que deseja excluir?');
    if(confirmacao){
        let li = document.getElementById(''+idTarefa+'');
        if(li){
            listaTarefas.removeChild(li);
        }else{
            alert('Nenhum elemento encontrado')
        }
    }

}


function alternarJanelaEdicao(){
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}
