
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

const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];  

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('meses').value = selectedMonth + 1; // Preenche o valor do mês no select (1-based)
    document.getElementById('ano').value = selectedYear; // Preenche o valor do ano no input
    await loadMonthYearFromServer(); // Carrega os dados do servidor ao iniciar
    desenharCalendario(); // Inicializa o calendário
});

function desenharCalendario() {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    // Calcula o primeiro dia da semana (domingo)
    const primeiroDiaDaSemana = new Date(ano, mes, dataAtual.getDate() - (dataAtual.getDay() === 0 ? 0 : dataAtual.getDay()));

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
        const diaSpan = document.querySelector(`.dia${ diasDaSemana[i] }`); // Seleciona a classe correspondente  
        diaSpan.innerText = ""; // Limpa o span atual  
    }  

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






// ----------  CARREGAR DADOS DE ADICIONAR TAREFAS ------- //

async function generateSchedule() {
    const scheduleBody = document.getElementById("linhas_calendario");
    const hoursInDay = 24;
    const minutesInterval = 15;

    // Gerar as linhas de horários de 15 em 15 minutos
    for (let hour = 0; hour < hoursInDay; hour++) {
        for (let minute = 0; minute < 60; minute += minutesInterval) {
            const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            
            const row = document.createElement("tr");
            row.innerHTML = `<td id="HOUR">${timeString}</td>` + '<td></td>'.repeat(7);
            
            scheduleBody.appendChild(row);
        }
    }

    // Carregar tarefas do servidor local
    try {
        const response = await fetch("http://localhost:3000/tarefas");
        const data = await response.json();

        console.log(data);  // Exibe o conteúdo carregado para verificar a estrutura

        // Combina `listaDeTarefas` e `adicionarTarefas` em um único array de tarefas
        const tasks = (data.listaDeTarefas || []).concat(data.adicionarTarefas || []);

        populateSchedule(tasks);
    } catch (error) {
        console.error("Erro ao carregar os dados do servidor:", error);
    }
}

// Função para preencher a tabela com as tarefas
function populateSchedule(tasks) {
    const scheduleBody = document.getElementById("linhas_calendario").rows;
    const selectedDate = new Date();  // Data atual ou a ser filtrada

    tasks.forEach(task => {
        const taskTime = task.time;  // Assumindo que a tarefa tem um campo `time` no formato "HH:mm"
        const taskHourMinute = taskTime.split(":");
        const taskHour = parseInt(taskHourMinute[0], 10);
        const taskMinute = parseInt(taskHourMinute[1], 10);
        
        const taskDateExact = task.Udate ? new Date(task.Udate) : null;  // Dia exato se houver
        const taskDaysOfWeek = task.date || [];  // Dias recorrentes da tarefa

        // Localiza a linha da tabela correspondente ao horário da tarefa
        const row = scheduleBody[taskHour * 4 + taskMinute / 15];

        // Mapeamento de cores para prioridade
        const priorityColors = {
            "alta": "#ff0000",  // Vermelho
            "media":"#cc9900", // Amarelo escuro
            "baixa": "#006400"  // Verde escuro
        };

        // Determina a cor da tarefa com base na prioridade
        const taskPriority = task.priority || "media";  // Usa 'media' como valor padrão
        const taskColor = priorityColors[taskPriority.toLowerCase()] || priorityColors["media"];

        // Função para alterar o texto da tarefa com base na prioridade
        function getPriorityText(priority) {
            switch (priority) {
                case "alta":
                    return "Atenção urgente!";
                case "media":
                    return "Atenção necessária.";
                case "baixa":
                    return "Tarefa com baixa prioridade.";
                default:
                    return "Tarefa";
            }
        }

        // Verifica se a tarefa deve ser exibida no dia exato (Udate)
        if (taskDateExact && taskDateExact.toDateString() === selectedDate.toDateString()) {
            const dayColumn = selectedDate.getDay();  // Coluna do dia atual

            if (row && dayColumn >= 0 && dayColumn < 7) {
                // Adiciona a tarefa na data exata, com o nome colorido conforme a prioridade
                if (!row.cells[dayColumn + 1].innerText.includes(task.name)) {
                    row.cells[dayColumn + 1].innerHTML += ` 
                        <div style="color: ${taskColor};">
                            ${task.name || "Nome da Tarefa"}
                        </div>`;
                }
            }
        }

        // Verifica se a tarefa deve ser repetida nos dias da semana especificados em `date`
        taskDaysOfWeek.forEach(dayOfWeek => {
            // Se a tarefa se repete no dia da semana
            if (dayOfWeek >= 1 && dayOfWeek <= 7) {
                const dayColumn = dayOfWeek - 1;  // Mapeia dom=1 para coluna 0, sab=7 para coluna 6

                if (row && dayColumn >= 0 && dayColumn < 7) {
                    // Adiciona a tarefa nos dias recorrentes, com o nome colorido conforme a prioridade
                    if (!row.cells[dayColumn + 1].innerText.includes(task.name)) {
                        row.cells[dayColumn + 1].innerHTML += `
                            <div style="color: ${taskColor};">
                                ${task.name || "Nome da Tarefa"}
                            </div>`;
                    }
                }
            }
        });
    });
}

generateSchedule();



// -------------- MODAL ---------------- //

// Função para fechar o modal
