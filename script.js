const inputtarefa = document.querySelector('.input-tarefa');
const bnttarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefa');

function criaLi() {
   const li = document.createElement('li');
   return li; 
}

inputtarefa.addEventListener('keypress', function(e) {
    // verificar qual tecla foi precionada.
    if(e.keyCode === 13){
       // console.log('ENTER precionado');
       if(!inputtarefa.value) return; 
    criaTarefa(inputtarefa.value);

    }
});

function limpaInput() {
    inputtarefa.value = '';
    inputtarefa.focus(); // para o cursos ficar piscando
}

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'Apagar');
    //botaoApagar.setAttribute('title', 'Apagar esta tarefa')
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput){
    const li = criaLi();
    li.innerHTML = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefa();
}

bnttarefa.addEventListener('click', function(){
    if(!inputtarefa.value) return; 
    criaTarefa(inputtarefa.value);   
});

document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('Apagar')){
        el.parentElement.remove();
        salvarTarefa()
    }
});

function salvarTarefa() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];
    
    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
        console.log(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    
    for (let tarefas of listaDeTarefas) {
        criaTarefa(tarefas);
    }
}
adicionaTarefasSalvas();