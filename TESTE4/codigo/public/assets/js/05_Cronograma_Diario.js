
/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npx json-server --watch codigo/db/db.json --port 3000
*/



// ------------------- SIDE BAR CODIGO ------------------- //

// Marcar a aba ativa na sidebar
document.addEventListener("DOMContentLoaded", function() {
    function highlightActiveItem() {
        const currentPage = window.location.pathname.split("/").pop(); // Pega o nome do arquivo da URL

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
// Fecha o modal ao clicar fora dele
document.addEventListener('click', (event) => {
    if (!modalFiltro.contains(event.target) && event.target !== botaoFiltro) {
        modalFiltro.style.display = 'none';
    }
});
// ------------- FILTRO MENU --------------------- //
const botaoFiltro = document.getElementById('botaoFiltro');
const modalFiltro = document.getElementById('modalFiltro');
const aplicarFiltro = document.getElementById('aplicarFiltro');

// Exibir o modal e centralizar em relação ao botão "Filtro"
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

    // Se o ano não for preenchido, usa o ano atual
    if (!anoF) {
        anoF = new Date().getFullYear();
    }

    console.log("Mês selecionado:", mesF);
    console.log("Ano selecionado:", anoF);

    // Se o mês ou ano não forem válidos, mostra um alerta
    if (!mesF || !anoF) {
        alert("Por favor, selecione um mês e ano.");
        return;
    }

    try {
        // Dados a serem atualizados
        const updatedData = {
            id: 2686,           // O ID é fixo e não será alterado
            value: parseInt(mesF),  // Atualiza o valor do mês
            year: parseInt(anoF)    // Atualiza o ano
        };

        // Enviar os dados atualizados para o servidor usando PUT
        const response = await fetch('http://localhost:3000/mes_calendar/2686', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        // Verificar a resposta do servidor
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

let selectedMonth = new Date().getMonth(); // Mês atual (0-based)
let selectedYear = new Date().getFullYear(); // Ano atual
let dataAtual = new Date(selectedYear, selectedMonth, 1); // Define data inicial para o primeiro dia do mês

const diasDaSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];  

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('meses').value = selectedMonth + 1; // Preenche o valor do mês no select (1-based)
    document.getElementById('ano').value = selectedYear; // Preenche o valor do ano no input
    await loadMonthYearFromServer(); // Carrega os dados do servidor ao iniciar
    desenharCalendario(); // Inicializa o calendário
});


function desenharCalendario() {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    // Calcula a segunda-feira da semana atual
    const primeiroDiaDaSemana = new Date(ano, mes, dataAtual.getDate() - (dataAtual.getDay() === 0 ? 6 : dataAtual.getDay() - 1));

    // Obtém o nome do mês
    const nomeMes = primeiroDiaDaSemana.toLocaleString('pt-BR', { month: 'long' });

    // Atualiza o mês no cabeçalho
    document.getElementById("month-year").innerText = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);

    // Atualiza a semana no cabeçalho
    const primeiraData = primeiroDiaDaSemana.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const ultimaData = new Date(primeiroDiaDaSemana);
    ultimaData.setDate(primeiroDiaDaSemana.getDate() + 6);
    const ultimaDataFormatada = ultimaData.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    document.getElementById("semana").innerText = `Semana de ${primeiraData} a ${ultimaDataFormatada}`;

    // Limpa os spans antes de cada desenho
    for (let i = 0; i < 7; i++) {
        const diaSpan = document.querySelector(`.dia${ diasDaSemana[i]}`); // Seleciona a classe correspondente  
        diaSpan.innerText = ""; // Limpa o span atual  
    }  

    // Itera sobre os dias da semana  
    // Itera sobre os dias da semana  
    for (let i = 0; i < 7; i++) {  
        const diaAtual = new Date(primeiroDiaDaSemana);  
        diaAtual.setDate(primeiroDiaDaSemana.getDate() + i);  

        // Exibe a data no formato numérico no <span> correspondente  
        const diaSpan = document.querySelector(`.dia${diasDaSemana[i]}`); // Seleciona a classe correspondente  

        // Formata o dia e o mês com dois dígitos
        const dia = String(diaAtual.getDate()).padStart(2, '0');  // Adiciona zero à esquerda se necessário
        const mes = String(diaAtual.getMonth() + 1).padStart(2, '0');  // Adiciona zero à esquerda se necessário

        diaSpan.innerText = ` ${dia}/${mes} `; // Formato DD/MM  
    }
    carregarTarefas();
    
}  

// Função para carregar as tarefas no calendário
function carregarTarefas() {  
    fetch('/TESTE1/codigo/db/db.json')  
        .then(response => response.json())  
        .then(data => {  
            const tarefas = data.tasks_calendar;  
            const horas = document.querySelectorAll('#linhas_calendario tr');  

            // Limpa as células antes de carregar as novas tarefas
            horas.forEach(hora => {
                for (let i = 1; i < hora.children.length; i++) { // Começa no índice 1 para não limpar a primeira célula que contém a hora
                    hora.children[i].innerHTML = ''; // Limpa o conteúdo da célula
                }
            });

            for (let dia = 0; dia < 7; dia++) {  
                // Verifica se existe alguma tarefa para o dia atual
                tarefas.forEach(tarefa => {
                    if (tarefa.dates.includes(dia + 1)) {  // 'dates' é um array, verificamos se o dia está incluído
                        const horaIndex = Array.from(horas).findIndex(row => row.firstChild.innerText === tarefa.time[0]);  
                        if (horaIndex !== -1) {  
                            const cell = horas[horaIndex].children[dia + 1];  
                            cell.classList.add('cursor-pointer');  

                            const tarefaDiv = document.createElement('div');  
                            tarefaDiv.classList.add('tarefa');  
                            tarefaDiv.style.color = getColorForPriority(tarefa.priority);
                            tarefaDiv.innerText = tarefa.name;  
                            cell.appendChild(tarefaDiv);

                            // Configura o evento de clique na tarefa
                            tarefaDiv.addEventListener('click', () => {
                                abrirModalEdicao(tarefa); // Função para abrir o modal e carregar os dados da tarefa
                            });
                        }  
                    }
                });  
            }  
        })  
        .catch(error => console.error('Erro ao carregar tarefas:', error));  
}


// Função para obter a cor de fundo baseada na prioridade
// Função para obter a cor baseada na prioridade
function getColorForPriority(priority) {
    let color;
    switch (priority) {
        case 'alta': color = 'red'; break;
        case 'media': color = 'darkgoldenrod'; break;
        case 'baixa': color = 'darkgreen'; break;
        default: color = 'gray'; break;
    }
    return color;
}

// Função para aplicar a cor ao texto de um elemento baseado na prioridade
function applyPriorityColor(element, priority) {
    const color = getColorForPriority(priority);
    element.style.color = color; // Aplica a cor ao texto
}


function navegarSemana(direcao) {  
    // Navega entre as semanas  
    dataAtual.setDate(dataAtual.getDate() + (direcao * 7));  
    desenharCalendario();  
}  

function navegarMes(direcao) {  
    // Navega entre os meses  
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
        const response = await fetch('http://localhost:3000/mes_calendar');
        if (response.ok) {
            const data = await response.json();
            const calendarData = data[0];
            selectedMonth = calendarData.value - 1;  // Ajusta para 0-based
            selectedYear = calendarData.year;
            dataAtual = new Date(selectedYear, selectedMonth, 1); // Ajusta a data para o primeiro dia do mês
            desenharCalendario(); // Atualiza o calendário
        } else {
            console.error("Erro ao carregar os dados do servidor:", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao conectar ao servidor:", error);
    }
}


let tarefaEditando = null;  // Variável para armazenar a tarefa a ser editada

// Função para abrir o modal de edição
// Função para abrir o modal de edição
function abrirModalEdicao(tarefa) {
    // Exibe o modal
    document.getElementById('modal-editar-tarefa').style.display = 'flex';
    document.getElementById('modal-overlay').style.display = 'block';  // Exibe o overlay

    // Preenche os campos do modal com os dados da tarefa
    document.getElementById('edit-nome').value = tarefa.name;
    document.getElementById('edit-time').value = tarefa.time[0];  // Assumindo que 'time' é um array com um único valor
    document.getElementById('edit-descricao').value = tarefa.description;
    
    document.getElementById('edit-prioridade').value = tarefa.priority;
    document.getElementById('edit-categoria').value = tarefa.category;

    // Preenche os dias da semana (dates) no modal
    const diasSelecionados = tarefa.dates;  // Array de dias da semana (1 a 7)
    for (let i = 1; i <= 7; i++) {
        const checkbox = document.getElementById(`edit-dias-${diasDaSemana[i - 1].toLowerCase()}`);
        checkbox.checked = diasSelecionados.includes(i);
    }

    // Armazena a tarefa sendo editada
    tarefaEditando = tarefa;
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById('modal-editar-tarefa').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';  // Esconde o overlay
}

// Função para salvar os dados editados
async function salvarDadosEditados() {
    if (!tarefaEditando) {
        console.error('Tarefa não encontrada.');
        alert('Erro: Tarefa não encontrada.');
        return;
    }

    const nome = document.getElementById('edit-nome').value;
    const time = document.getElementById('edit-time').value;  // O valor será no formato "HH:MM"
    const descricao = document.getElementById('edit-descricao').value;
    const prioridade = document.getElementById('edit-prioridade').value;
    const categoria = document.getElementById('edit-categoria').value;

    const diasSelecionados = [];
    for (let i = 1; i <= 7; i++) {
        const checkbox = document.getElementById(`edit-dias-${diasDaSemana[i - 1].toLowerCase()}`);
        if (checkbox.checked) {
            diasSelecionados.push(i);
        }
    }

    const dadosAtualizados = {
        name: nome,
        time: [time],  // O valor de time já está no formato correto
        description: descricao,
        priority: prioridade,
        category: categoria,
        dates: diasSelecionados
    };

    try {
        const response = await fetch(`http://localhost:3000/tasks_calendar/${tarefaEditando.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAtualizados)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao salvar dados: ${errorText}`);
        }

        alert('Tarefa salva com sucesso!');
        fecharModal();  // Fecha o modal
        desenharCalendario();  // Atualiza o calendário, se necessário

    } catch (error) {
        console.error('Erro ao salvar a tarefa:', error.message);
        alert(`Erro ao salvar a tarefa: ${error.message}`);
    }
}

// Eventos para fechar o modal corretamente
document.getElementById("modal-overlay").onclick = fecharModal; // Clique no fundo (overlay)
document.getElementById("fechar-modal").onclick = fecharModal; // Clique no "X"
document.getElementById("btn-salvar").onclick = salvarDadosEditados; // Clique no "Salvar"



// ----------  CARREGAR DADOS DE ADICIONAR TAREFAS ------- //

