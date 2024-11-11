
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
let semanaAtual = 0; // Inicializando a semana atual (0 pode ser a semana atual)
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

    // Calcula o primeiro dia da semana atual com base em 'semanaAtual'
    const primeiroDiaDaSemana = new Date(ano, mes, dataAtual.getDate() - (dataAtual.getDay() === 0 ? 6 : dataAtual.getDay()) + (semanaAtual * 7));

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
        const diaSpan = document.querySelector(`.dia${diasDaSemana[i]}`);
        diaSpan.innerText = ""; // Limpa o span atual
    }

    // Itera sobre os dias da semana
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


// Função para carregar as tarefas no calendário
// Função para gerar os horários de 15 em 15 minutos no calendário
function gerarHorarios() {
    const horasTable = document.getElementById("linhas_calendario");
    const horarios = [];
    
    // Itera por todas as horas e minutos de 15 em 15 minutos
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
            const horaFormatada = String(h).padStart(2, '0');
            const minutoFormatado = String(m).padStart(2, '0');
            const horario = `${horaFormatada}:${minutoFormatado}`;
            horarios.push(horario);

            // Cria a linha da tabela
            const tr = document.createElement('tr');

            // Cria a célula da hora e aplica o id "HOUR" e a altura de 70px
            const tdHora = document.createElement('td');
            tdHora.textContent = horario;
            tdHora.id = "HOUR"; // Adiciona o id "HOUR"
            tdHora.style.height = '70px'; // Define a altura para 70px
            tdHora.style.textAlign = 'center'; // Alinha o texto no centro
            tdHora.style.verticalAlign = 'middle'; // Alinha verticalmente no meio
            tr.appendChild(tdHora);

            // Cria as células vazias para cada um dos 7 dias da semana
            for (let i = 0; i < 7; i++) {
                const td = document.createElement('td');
                td.style.height = '70px'; // Define a altura das células dos dias
                tr.appendChild(td);
            }

            // Adiciona a linha gerada à tabela
            horasTable.appendChild(tr);
        }
    }
}


// Função para ajustar o horário para o mais próximo de 15 minutos
function ajustarHorarioPara15Minutos(time) {
    const [hora, minuto] = time.split(':').map(Number);
    const novoMinuto = Math.round(minuto / 15) * 15; // Ajusta para o múltiplo de 15 mais próximo

    if (novoMinuto === 60) {
        return `${hora + 1}:00`;
    }

    return `${String(hora).padStart(2, '0')}:${String(novoMinuto).padStart(2, '0')}`;
}

// Função para carregar as tarefas no calendário

// Função para adicionar tarefas no calendário
function adicionarTarefaNoCalendario(time, tarefa, diasDaSemana, horas) {
    const { name, priority } = tarefa;

    // Verifica se 'date' ou 'dates' existe e é um array
    const date = Array.isArray(tarefa.date) ? tarefa.date : (Array.isArray(tarefa.dates) ? tarefa.dates : []);

    // Se nenhum dos campos for válido, retorna
    if (date.length === 0) {
        console.error('A tarefa não tem um campo "date" ou "dates" válido:', tarefa);
        return;
    }

    // Garantir que 'time' seja um array, se não for, tornar um array com um único elemento
    if (!Array.isArray(time)) {
        time = [time]; // Se for uma string, transforma em um array
    }

    // Ajustar o horário para o formato adequado
    const horaFormatada = ajustarHorarioPara15Minutos(time[0]);

    const linhaHorario = Array.from(document.querySelectorAll('#linhas_calendario tr')).find(tr => {
        return tr.querySelector('td').innerText === horaFormatada;
    });

    if (!linhaHorario) return; // Se não encontrar a linha, retorna

    const tdDia = Array.from(linhaHorario.querySelectorAll('td')).slice(1); // Ignora a primeira célula (hora)

    // Adicionar tarefa nos dias especificados
    date.forEach(dia => {
        const diaIndex = dia - 1;  // Ajusta para o índice correto (0-6)

        if (tdDia[diaIndex]) {
            const divTarefa = document.createElement('div');
            divTarefa.classList.add('tarefa');
            divTarefa.style.color = getColorForPriority(priority);
            divTarefa.innerText = name;

            tdDia[diaIndex].appendChild(divTarefa);

            // Adiciona o evento de clique para editar a tarefa
            divTarefa.addEventListener('click', () => {
                abrirModalEdicao(tarefa);
            });
        }
    });
}

// Função para carregar as tarefas no calendário
function carregarTarefas() {
    const diaAtual = new Date();
    const currentYear = diaAtual.getFullYear();
    const currentMonth = diaAtual.getMonth();

    const primeiroDiaDaSemana = new Date(currentYear, currentMonth, diaAtual.getDate() - (diaAtual.getDay() === 0 ? 6 : diaAtual.getDay()));

    const diasDaSemana = [];
    for (let i = 0; i < 7; i++) {
        const dia = new Date(primeiroDiaDaSemana);
        dia.setDate(primeiroDiaDaSemana.getDate() + i);
        diasDaSemana.push(dia);
    }

    const dayOfWeek = (diaAtual.getDay() === 0 ? 7 : diaAtual.getDay());

    console.log('Dia Atual:', diaAtual);
    console.log('Day of Week:', dayOfWeek);

    // Verifica se o DOM está pronto antes de começar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', carregarTarefas);
        return;
    }

    fetch('/codigo/db/db.json')
        .then(response => response.json())
        .then(data => {
            const horas = document.querySelectorAll('#linhas_calendario tr');

            // Limpar as células existentes
            horas.forEach(hora => {
                for (let i = 1; i < hora.children.length; i++) {
                    hora.children[i].innerHTML = ''; // Limpa o conteúdo
                }
            });

            console.log('Dados recebidos do servidor:', data);

            // Processar tarefas da listaDeTarefas
            if (Array.isArray(data.tarefas.listaDeTarefas)) {
                console.log('listaDeTarefas:', data.tarefas.listaDeTarefas);
                data.tarefas.listaDeTarefas.forEach(task => {
                    const taskDates = Array.isArray(task.date) ? task.date : (Array.isArray(task.dates) ? task.dates : []);
                    taskDates.forEach(dia => {
                        if (dia === dayOfWeek) {
                            if (Array.isArray(task.time)) {
                                task.time.forEach(t => {
                                    adicionarTarefaNoCalendario(t, task, diasDaSemana, horas);
                                });
                            } else {
                                adicionarTarefaNoCalendario(task.time, task, diasDaSemana, horas);
                            }
                        }
                    });
                });
            }

            // Processar tarefas de adicionarTarefas
            if (Array.isArray(data.tarefas.adicionarTarefas)) {
                console.log('adicionarTarefas:', data.tarefas.adicionarTarefas);
                data.tarefas.adicionarTarefas.forEach(task => {
                    const taskDates = Array.isArray(task.date) ? task.date : (Array.isArray(task.dates) ? task.dates : []);
                    taskDates.forEach(dia => {
                        if (dia === dayOfWeek) {
                            if (Array.isArray(task.time)) {
                                task.time.forEach(t => {
                                    adicionarTarefaNoCalendario(t, task, diasDaSemana, horas);
                                });
                            } else {
                                adicionarTarefaNoCalendario(task.time, task, diasDaSemana, horas);
                            }
                        }
                    });
                });
            }

            // Processar tarefas de tasks_calendar
            if (Array.isArray(data.tasks_calendar)) {
                console.log('tasks_calendar:', data.tasks_calendar);
                data.tasks_calendar.forEach(task => {
                    const taskDates = Array.isArray(task.dates) ? task.dates : (Array.isArray(task.date) ? task.date : []);
                    taskDates.forEach(dia => {
                        if (dia === dayOfWeek) {
                            if (Array.isArray(task.time)) {
                                task.time.forEach(t => {
                                    adicionarTarefaNoCalendario(t, task, diasDaSemana, horas);
                                });
                            } else {
                                adicionarTarefaNoCalendario(task.time, task, diasDaSemana, horas);
                            }
                        }
                    });
                });
            }

        })
        .catch(error => console.error('Erro ao carregar tarefas:', error));
}





// Função para ajustar a hora para o múltiplo de 15 minutos mais próximo
function ajustarHorarioPara15Minutos(hora) {
    const [horaNum, minutoNum] = hora.split(':').map(Number);
    const novoMinuto = Math.round(minutoNum / 15) * 15; // Ajusta para múltiplo de 15

    // Se o minuto for 60, avança uma hora
    if (novoMinuto === 60) {
        return `${horaNum + 1}:00`;
    }

    return `${String(horaNum).padStart(2, '0')}:${String(novoMinuto).padStart(2, '0')}`;
}



function getColorForPriority(priority) {
    // Define uma cor com base na prioridade da tarefa
    const cores = {
        Alta: 'red',
        Media: 'orange',
        Baixa: 'green'
    };
    return cores[priority] || 'black';
}

function applyPriorityColor(element, priority) {
    const color = getColorForPriority(priority);
    element.style.color = color; // Aplica a cor ao texto
}

// Função auxiliar para converter o horário em minutos para facilitar a ordenação
function convertTimeToMinutes(time) {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;  // Converte para minutos
}

// Inicializa o calendário e gera os horários
gerarHorarios();





// Função para aplicar a cor ao texto de um elemento baseado na prioridade



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
function navegarSemana(semana) {
    semanaAtual += semana;  // Atualiza semanaAtual com o valor passado
    desenharCalendario();    // Atualiza o calendário
}

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

