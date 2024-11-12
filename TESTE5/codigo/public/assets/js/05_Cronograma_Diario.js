
/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npx json-server --watch codigo/db/db.json --port 3000
*/



// ------------------- SIDE BAR CODIGO ------------------- //

// Marcar a aba ativa na sidebar
document.addEventListener("DOMContentLoaded", function() {
    function highlightActiveItem() {
        const currentPage = window.location.pathname.split("/").pop(); 
        const items = document.querySelectorAll('.sidebar ul li');
        items.forEach(item => {
            item.classList.remove('active');
        });
        if (currentPage === '04_Dashboard.html') {
            document.getElementById('dashboard').classList.add('active');
        } else if (currentPage === '05_Cronograma_Diario.html') {
            document.getElementById('cronograma').classList.add('active');
        } else if (currentPage === '06_Criacao_Tarefas.html') {
            document.getElementById('tarefas').classList.add('active');
        } else if (currentPage === '07_Progresso.html') {
            document.getElementById('progresso').classList.add('active');
        } else if (currentPage === '09_Perfil.html') {
            document.getElementById('perfil').classList.add('active');
        } else if (currentPage === '10_Suporte_Feedback.html') {
            document.getElementById('feedback').classList.add('active');
        } else if (currentPage === '08_Sugestao.html') {
            document.getElementById('sugestao').classList.add('active');
        }
    }
    
    
    highlightActiveItem();
});

// ------------------- FIM DA SIDE BAR ------------------- //


// ------------- FILTRO MENU --------------------- //

document.addEventListener('click', (event) => {
    if (!modalFiltro.contains(event.target) && event.target !== botaoFiltro) {
        modalFiltro.style.display = 'none';
    }
});
// ------------- FILTRO MENU --------------------- //
const botaoFiltro = document.getElementById('botaoFiltro');
const modalFiltro = document.getElementById('modalFiltro');
const aplicarFiltro = document.getElementById('aplicarFiltro');


botaoFiltro.addEventListener('click', (event) => {
    event.stopPropagation();
    modalFiltro.style.display = 'block';
    
    const rect = botaoFiltro.getBoundingClientRect();
    modalFiltro.style.left = `${rect.left + rect.width / 2 - modalFiltro.offsetWidth / 2}px`;
    modalFiltro.style.top = `${rect.top - modalFiltro.offsetHeight - 10}px`;
});


aplicarFiltro.addEventListener('click', async () => {
    const mesF = document.getElementById('meses').value;
    let anoF = document.getElementById('ano').value;
    
    
    if (!anoF) {
        anoF = new Date().getFullYear();
    }
    
    console.log("Mês selecionado:", mesF);
    console.log("Ano selecionado:", anoF);
    
    
    if (!mesF || !anoF) {
        alert("Por favor, selecione um mês e ano.");
        return;
    }
    
    try {
        
        const updatedData = {
            id: 2686,           
            value: parseInt(mesF),  
            year: parseInt(anoF)    
        };

        
        const response = await fetch('http://localhost:4000/mes_calendar/2686', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        
        if (response.ok) {
            console.log("Dados atualizados com sucesso!");
            alert("Filtro aplicado com sucesso!");
            modalFiltro.style.display = 'none';
        } else {
            console.error("Erro ao atualizar os dados:", response.statusText);
            alert("Erro ao atualizar os dados no servidor. Tente novamente.");
        }
    } catch (error) {
        console.error('Erro ao aplicar o filtro:', error);
        alert("Erro ao conectar ao servidor. Tente novamente.");
    }
});







// ------------- NAVEGAÇÃO SEMANAS DO MÊS ------------ //

let selectedMonth = new Date().getMonth(); 
let selectedYear = new Date().getFullYear();
let dataAtual = new Date(selectedYear, selectedMonth, 1); 

const diasDaSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];  

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('meses').value = selectedMonth + 1;
    document.getElementById('ano').value = selectedYear; 
    await loadMonthYearFromServer(); 
    desenharCalendario(); 
});
// Função para navegar o ano
function navegarSemana(direcao) {  
    
    dataAtual.setDate(dataAtual.getDate() + (direcao * 7));  
    desenharCalendario();  
}  
function navegarMes(direcao) {  
   
    dataAtual.setMonth(dataAtual.getMonth() + direcao);  
    desenharCalendario();  
}  
desenharCalendario();  

// Inicializar  
document.getElementById("prevSemana").onclick = () => navegarSemana(-1);  
document.getElementById("nextSemana").onclick = () => navegarSemana(1);  
document.getElementById("prev").onclick = () => navegarMes(-1);  
document.getElementById("next").onclick = () => navegarMes(1);  


// Função para carregar o mês e ano do servidor
async function loadMonthYearFromServer() {
    try {
        const response = await fetch('http://localhost:4000/mes_calendar');
        if (response.ok) {
            const data = await response.json();
            const calendarData = data[0];
            selectedMonth = calendarData.value - 1;  
            selectedYear = calendarData.year;
            dataAtual = new Date(selectedYear, selectedMonth, 1); 
            desenharCalendario(); 
        } else {
            console.error("Erro ao carregar os dados do servidor:", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao conectar ao servidor:", error);
    }
}

function desenharCalendario() {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();
    const primeiroDiaDaSemana = new Date(ano, mes, dataAtual.getDate() - (dataAtual.getDay() === 0 ? 6 : dataAtual.getDay() - 1));
    const nomeMes = primeiroDiaDaSemana.toLocaleString('pt-BR', { month: 'long' });
    
    document.getElementById("month-year").innerText = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);
    
    const primeiraData = primeiroDiaDaSemana.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const ultimaData = new Date(primeiroDiaDaSemana);
    ultimaData.setDate(primeiroDiaDaSemana.getDate() + 6);
    const ultimaDataFormatada = ultimaData.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    document.getElementById("semana").innerText = `Semana de ${primeiraData} a ${ultimaDataFormatada}`;
    
    for (let i = 0; i < 7; i++) {
        const diaSpan = document.querySelector(`.dia${diasDaSemana[i]}`); 
        diaSpan.innerText = ""; 
    }  
    
    for (let i = 0; i < 7; i++) {  
        const diaAtual = new Date(primeiroDiaDaSemana);  
        diaAtual.setDate(primeiroDiaDaSemana.getDate() + i);  
        
        const diaSpan = document.querySelector(`.dia${diasDaSemana[i]}`); 
        const dia = String(diaAtual.getDate()).padStart(2, '0'); 
        const mes = String(diaAtual.getMonth() + 1).padStart(2, '0');  

        diaSpan.innerText = ` ${dia}/${mes} `; 
    }
    carregarTarefas();
}

function carregarTarefas() {  
    fetch('/codigo/db/DB2.json')  
        .then(response => response.json())  
        .then(data => {  
            const tarefas = [...data.listaDeTarefas, ...data.adicionarTarefas];
            const horas = document.querySelectorAll('#linhas_calendario tr');  
            
            horas.forEach(hora => {
                for (let i = 1; i < hora.children.length; i++) { 
                    hora.children[i].innerHTML = ''; 
                }
            });

            for (let dia = 0; dia < 7; dia++) {  
                tarefas.forEach(tarefa => {
                    if (tarefa.date.includes(dia + 1)) {  
                        const horaIndex = Array.from(horas).findIndex(row => row.firstChild.innerText === tarefa.time);  
                        if (horaIndex !== -1) {  
                            const cell = horas[horaIndex].children[dia + 1];  
                            cell.classList.add('cursor-pointer');  

                            const tarefaDiv = document.createElement('div');  
                            tarefaDiv.classList.add('tarefa');  
                            tarefaDiv.style.color = getColorForPriority(tarefa.priority);
                            tarefaDiv.innerText = tarefa.name;  
                            cell.appendChild(tarefaDiv);

                            tarefaDiv.addEventListener('click', () => {
                                abrirModalEdicao(tarefa); 
                            });
                        }  
                    }
                });  
            }  
        })  
        .catch(error => console.error('Erro ao carregar tarefas:', error));  
}

function getColorForPriority(priority) {
    let color;
    switch (priority.toLowerCase()) {
        case 'alta': color = 'red'; break;
        case 'média': color = 'darkgoldenrod'; break;
        case 'baixa': color = 'darkgreen'; break;
        default: color = 'gray'; break;
    }
    return color;
}

function abrirModalEdicao(tarefa) {
    document.getElementById('modal-editar-tarefa').style.display = 'flex';
    document.getElementById('modal-overlay').style.display = 'block';

    document.getElementById('edit-nome').value = tarefa.name;
    document.getElementById('edit-time').value = tarefa.time;
    document.getElementById('edit-descricao').value = tarefa.description;
    document.getElementById('edit-prioridade').value = tarefa.priority;
    document.getElementById('edit-categoria').value = tarefa.category;
    document.getElementById('edit-estimated-duration').value = tarefa.estimatedDuration;

    const diasSelecionados = tarefa.date;
    for (let i = 1; i <= 7; i++) {
        const checkbox = document.getElementById(`edit-dias-${diasDaSemana[i - 1].toLowerCase()}`);
        checkbox.checked = diasSelecionados.includes(i);
    }

    tarefaEditando = tarefa;
    console.log('ID da tarefa:', tarefaEditando.id);  // Adicione isso para verificar o id

}


function fecharModal() {
    document.getElementById('modal-editar-tarefa').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';  
}

async function salvarDadosEditados() {
    if (!tarefaEditando) {
        console.error('Tarefa não encontrada.');
        alert('Erro: Tarefa não encontrada.');
        return;
    }

    const nome = document.getElementById('edit-nome').value;
    const time = document.getElementById('edit-time').value;
    const descricao = document.getElementById('edit-descricao').value;
    const prioridade = document.getElementById('edit-prioridade').value;
    const categoria = document.getElementById('edit-categoria').value;
    const duracao = document.getElementById('edit-estimated-duration').value;

    const diasSelecionados = [];
    for (let i = 1; i <= 7; i++) {
        const checkbox = document.getElementById(`edit-dias-${diasDaSemana[i - 1].toLowerCase()}`);
        if (checkbox.checked) {
            diasSelecionados.push(i);
        }
    }

    const dadosAtualizados = {
        name: nome,
        time: time,
        description: descricao,
        priority: prioridade,
        category: categoria,
        date: diasSelecionados,
        estimatedDuration: duracao
    };

    try {
        let response;

        // Se o ID for menor que 205, é para listaDeTarefas, senão é para adicionarTarefas
        if (tarefaEditando.id < 205) {
            // Para listaDeTarefas
            response = await fetch(`http://localhost:4000/listaDeTarefas/${tarefaEditando.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosAtualizados)
            });
        } else {
            // Para adicionarTarefas
            response = await fetch(`http://localhost:4000/adicionarTarefas/${tarefaEditando.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosAtualizados)
            });
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro ao salvar dados:', errorText);
            throw new Error(`Erro ao salvar dados: ${errorText}`);
        }

        alert('Tarefa salva com sucesso!');
        fecharModal();
        desenharCalendario();
    } catch (error) {
        console.error('Erro ao salvar a tarefa:', error.message);
        alert(`Erro ao salvar a tarefa: ${error.message}`);
    }
}



// Função para salvar os dados editados
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-salvar').addEventListener('click', function() {
        const nome = document.getElementById('edit-nome').value;
        const horario = document.getElementById('edit-time').value;
        const descricao = document.getElementById('edit-descricao').value || "-";  // Se a descrição estiver vazia, coloca "-"
        const prioridade = document.getElementById('edit-prioridade').value;
        const categoria = document.getElementById('edit-categoria').value;
        const estimatedDuration = parseInt(document.getElementById('edit-estimated-duration').value) || 0; // Valor de duração (em minutos)
        
        // Recupera os dias selecionados
        const diasSelecionados = [];
        if (document.getElementById('edit-dias-seg').checked) diasSelecionados.push(1);
        if (document.getElementById('edit-dias-ter').checked) diasSelecionados.push(2);
        if (document.getElementById('edit-dias-qua').checked) diasSelecionados.push(3);
        if (document.getElementById('edit-dias-qui').checked) diasSelecionados.push(4);
        if (document.getElementById('edit-dias-sex').checked) diasSelecionados.push(5);
        if (document.getElementById('edit-dias-sab').checked) diasSelecionados.push(6);
        if (document.getElementById('edit-dias-dom').checked) diasSelecionados.push(7);

        // Atualiza a tarefa com os novos valores
        tarefaEditando.name = nome;
        tarefaEditando.time = horario;
        tarefaEditando.description = descricao;
        tarefaEditando.priority = prioridade;
        tarefaEditando.category = categoria;
        tarefaEditando.estimatedDuration = estimatedDuration;
        tarefaEditando.date = diasSelecionados;

        // Atualiza o armazenamento local ou banco de dados aqui, se necessário
        // localStorage.setItem('tarefas', JSON.stringify(tarefas));

        // Fecha o modal após salvar
        document.getElementById('modal-editar-tarefa').style.display = 'none';
        document.getElementById('modal-overlay').style.display = 'none';
        
        // Atualiza a interface de acordo com a tarefa editada
        carregarTarefas(tarefaEditando);  // Função que você usa para atualizar a lista de tarefas na tela
    });
    
});


document.getElementById("modal-overlay").onclick = fecharModal;
document.getElementById("fechar-modal").onclick = fecharModal;
document.getElementById("btn-salvar").onclick = salvarDadosEditados;

