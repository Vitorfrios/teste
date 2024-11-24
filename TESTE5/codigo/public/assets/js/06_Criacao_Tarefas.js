
/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npx json-server --watch TESTE1/codigo/db/db.json --port 3000
*/



// Configuração inicial dos botões de prioridade e carregamento do gráfico e tarefas
document.addEventListener('DOMContentLoaded', () => {
    initializePriorityButtons(); 
    loadChart(); 
    loadTasks(); 
});


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



// ---------------------- TAREFAS ---------------------- //




// --- INICIALIZAÇÃO DE botao dE PRIORIDADES ---
// Inicializar botões de prioridade
function initializePriorityButtons() {
    document.querySelectorAll('.priority-button').forEach(button => {
        button.addEventListener('click', () => selectPriorityButton(button));
    });
}

function selectPriorityButton(selectedButton) {
    document.querySelectorAll('.priority-button').forEach(btn => btn.classList.remove('selected'));
    selectedButton.classList.add('selected');
}

// Recolher dados de tarefa do formulário
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Função para recuperar o maior ID já registrado, garantindo que ele seja tratado como número
function getMaxTaskId(tasks) {
    return tasks.reduce((maxId, task) => {
        const numericId = parseInt(task.id, 10); // Converte a ID para número
        return numericId > maxId ? numericId : maxId;
    }, 0); // Se não houver tarefas, o valor inicial será 0
}


// Função para obter tarefas salvas do servidor ou de algum armazenamento
function fetchSavedTasks() {
    return fetch("http://localhost:4000/adicionarTarefas") // Modifique para seu endpoint real
        .then(response => response.json())
        .catch(() => []);  // Retorna uma lista vazia caso haja erro na busca
}




// Inicializa o ID com base nas tarefas salvas no servidor ou começa com 205 se não houver tarefas
fetchSavedTasks().then(savedTasks => {
    let currentTaskId = savedTasks.length > 0 ? getMaxTaskId(savedTasks) + 1 : 205; 

    function generateTaskId() {
        return currentTaskId++; 
    }

    function gatherTaskDetails() {
        const taskName = document.querySelector('input[placeholder="Nome da tarefa"]').value.trim();
        const taskTime = document.querySelector('input[type="time"]').value.trim();
        const taskUdate = document.querySelector('input[name="dateUsuario"]').value.trim();
        const taskCategory = document.getElementById("category-filter").value.trim();
        const taskRecurrenceDays = getSelectedRecurrenceDays();
        const estimatedDuration = parseInt(document.querySelector('input#estimatedDuration').value) || 0;
        const selectedPriorityButton = document.querySelector(".priority-button.selected");
    
        if (!taskName || !taskTime || !taskUdate || !taskCategory || !taskRecurrenceDays.length) {
            alert("Por favor, preencha todos os campos obrigatórios antes de salvar a tarefa.");
            return null; 
        }
    
        if (estimatedDuration > 1440) {
            alert("A duração estimada não pode ser superior a 1440 minutos (24 horas).");
            return null; 
        }
    
        const taskPriority = selectedPriorityButton 
            ? capitalizeFirstLetter(selectedPriorityButton.getAttribute("data-priority")) 
            : "Não definida";
    
        const taskId = String(generateTaskId());
    
        return { 
            id: taskId, 
            name: taskName, 
            time: taskTime, 
            category: taskCategory, 
            priority: taskPriority, 
            Udate: taskUdate, 
            date: taskRecurrenceDays, 
            estimatedDuration 
        };
    }
    
    
    
    function getSelectedRecurrenceDays() {
        return Array.from(document.querySelectorAll('input[name="recurrenceDays"]:checked'))
            .map(checkbox => parseInt(checkbox.value));
    }

    function atualizarGraficoTempo(taskDetails) {
        const { category, estimatedDuration } = taskDetails;
    
        fetch("http://localhost:4000/grafico")
            .then(response => response.json())
            .then(graficoTempo => {
                // Soma incremental do tempo estimado para a categoria
                graficoTempo[category] = (graficoTempo[category] || 0) + estimatedDuration;
    
                // Envia atualização ao servidor
                return fetch("http://localhost:4000/grafico", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(graficoTempo)
                });
            })
            .then(() => console.log("Gráfico de tempo atualizado com sucesso"))
            .catch(error => console.error("Erro ao atualizar gráfico de tempo:", error));
    }

    function saveTaskToServer() {
        const taskDetails = gatherTaskDetails();
    
        if (!taskDetails) {
            console.error("Os detalhes da tarefa são inválidos ou incompletos.");
            return;
        }
    
        console.log("Enviando tarefa ao servidor:", taskDetails); 
    
        fetch("http://localhost:4000/adicionarTarefas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskDetails)
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao salvar a tarefa no servidor");
            console.log("Tarefa salva com sucesso!");
            return response.json();
        })
        .then(data => {
            console.log("Tarefa salva no servidor:", data);
            atualizarGraficoTempo(taskDetails); 
        })
        .catch(error => console.error("Erro:", error));
    }
    
    document.getElementById('add-task-button').addEventListener('click', (e) => {
        e.preventDefault();
        saveTaskToServer();
    });

});






async function removeTaskFromServer(taskId) {
    try {
        const normalizedTaskId = typeof taskId === 'number' ? taskId.toString() : taskId;

        // Determinar o endpoint correto
        const endpointMap = {
            adicionarTarefas: parseInt(normalizedTaskId, 10) >= 205,
            listaDeTarefas: parseInt(normalizedTaskId, 10) < 205
        };

        const endpoint = endpointMap.adicionarTarefas ? 'adicionarTarefas' : 'listaDeTarefas';
        const url = `http://localhost:4000/${endpoint}/${normalizedTaskId}`;

        // Recupera a tarefa para obter a categoria e o tempo estimado antes de excluí-la
        const taskResponse = await fetch(url);
        if (!taskResponse.ok) {
            throw new Error(`Erro ao recuperar a tarefa: ${taskResponse.statusText}`);
        }
        const taskDetails = await taskResponse.json();

        // Exclui a tarefa do servidor
        const response = await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
        if (response.ok) {
            console.log(`Tarefa com ID ${normalizedTaskId} removida de ${url}`);

            // Atualiza graficoTempo subtraindo a duração da tarefa removida
            atualizarGraficoTempoRemocao(taskDetails.category, taskDetails.estimatedDuration);
        } else {
            console.error(`Erro ao remover tarefa de ${url}:`, response.statusText);
            const errorMessage = await response.text();
            console.error(`Detalhes do erro: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Erro ao remover a tarefa:', error);
    }
}

// Função para subtrair o tempo da categoria no gráfico de tempo
async function atualizarGraficoTempoRemocao(category, estimatedDuration) {
    try {
        const response = await fetch("http://localhost:4000/grafico");
        const graficoTempo = await response.json();

        if (graficoTempo[category] !== undefined) {
            graficoTempo[category] = Math.max(0, graficoTempo[category] - estimatedDuration); // Evita valores negativos

            await fetch("http://localhost:4000/grafico", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(graficoTempo)
            });
            console.log("Gráfico de tempo atualizado após remoção.");
        }
    } catch (error) {
        console.error("Erro ao atualizar gráfico de tempo após remoção:", error);
    }
}




async function loadTasks(dayOfWeek) {
    try {
        const response = await fetch('/codigo/db/DB2.json');
        if (!response.ok) throw new Error(`Erro ao carregar tarefas: status ${response.status}`);
        
        const data = await response.json();
        if (!data.adicionarTarefas || !data.listaDeTarefas) throw new Error("Estrutura de dados não encontrada no JSON.");

        const taskList = document.querySelector(".task-list");
        const notice = document.querySelector('.empty');
        
        taskList.innerHTML = '';
        notice.innerHTML = '';

        let tasksFound = false;
        let allTasks = [];
        let categoryDurations = { Lazer: 0, Estudo: 0, Trabalho: 0 };
        const selectedDate = new Date(currentYear, currentMonth, parseInt(document.querySelector('.selected-day').textContent)).toISOString().split('T')[0];

        data.listaDeTarefas.forEach(task => {
            if (task.date.includes(dayOfWeek + 1)) {
                allTasks.push(task);
                categoryDurations[task.category] += task.estimatedDuration;
                tasksFound = true;
            }
        });

        data.adicionarTarefas.forEach(task => {
            const matchByExactDate = task.Udate === selectedDate;
            const matchByRecurrence = Array.isArray(task.date) && task.date.includes(dayOfWeek + 1);
            if (matchByExactDate || matchByRecurrence) {
                allTasks.push(task);
                categoryDurations[task.category] += task.estimatedDuration;
                tasksFound = true;
            }
        });

        taskList.append(...sortTasksByTime(allTasks).map(createTaskRow));
        notice.innerHTML = tasksFound ? '' : 'Nenhuma tarefa para este dia.';
        updateChart(categoryDurations);
        
    } catch (error) {
        document.querySelector('.empty').innerHTML = 'Selecione um dia para ver as tarefas';
    }
}

function sortTasksByTime(tasks) {
    return tasks.sort((a, b) => getTimeInMinutes(a.time) - getTimeInMinutes(b.time));
}

function getTimeInMinutes(time) {
    if (typeof time === 'string' && time.includes(':')) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }
    console.warn(`Formato de hora inválido: ${time}`);
    return Infinity;
}

function createTaskRow(task) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${Array.isArray(task.time) ? task.time[0] : task.time}</td>
        <td>${task.name}</td>
        <td>${task.category}</td>
        <td>${task.priority}</td>
        <td><button class="remove-task" style="font-size: 22px">Remover</button></td>
    `;

    row.querySelector('.remove-task').addEventListener('click', async (event) => {
        event.stopPropagation();
        await removeTaskFromServer(task.id);
        row.remove();
        checkEmptyTasks();
    });

    return row;
}

function checkEmptyTasks() {
    const tasksTable = document.querySelector('.task-list');
    const notice = document.querySelector('.empty');
    notice.innerHTML = tasksTable.children.length === 0 ? 'Nenhuma tarefa para este dia.' : '';
}


// ---------------------- CALENDÁRIO ---------------------- //


// --- GERAÇÃO E NAVEGAÇÃO DO CALENDÁRIO ---

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const calendarBody = document.getElementById("calendar-body");
const monthYearSpan = document.getElementById("month-year");

// Gerar o calendário mensal
function generateCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();

    let html = '';
    let dayCounter = 1;
    let week = '';

    for (let i = 0; i < firstDayOfWeek; i++) {
        week += "<td></td>";
    }

    for (let i = firstDayOfWeek; dayCounter <= daysInMonth; i++) {
        if (i % 7 === 0 && week !== '') {
            html += `<tr>${week}</tr>`;
            week = '';
        }

        week += `<td>${dayCounter}</td>`;
        dayCounter++;

        if (dayCounter > daysInMonth && week !== '') {
            html += `<tr>${week}</tr>`;
        }
    }

    calendarBody.innerHTML = html;
    addClickEventsToDays();
}

function addClickEventsToDays() {
    document.querySelectorAll('#calendar-body td').forEach(td => {
        td.addEventListener('click', function () {

            document.querySelectorAll('#calendar-body td').forEach(day => {
                day.classList.remove('selected-day');
            });

            this.classList.add('selected-day');

            const day = parseInt(this.textContent);
            const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();
            loadTasks(dayOfWeek);
            updateSelectedDay(day);
        });
    });
}

function updateSelectedDay(day) {
    const month = (currentMonth + 1).toString().padStart(2, '0');
    document.getElementById("selected-day").textContent = ` - ${day}/${month}/${currentYear}`;
}


// Navegação do calendário
monthYearSpan.textContent = `${monthNames[currentMonth]} ${currentYear}`;
generateCalendar();

document.getElementById("prev").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    monthYearSpan.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    generateCalendar();
});

document.getElementById("next").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    monthYearSpan.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    generateCalendar();
});





// Função para gerar o gráfico
async function loadChart() {
    try {
        const response = await fetch('http://localhost:4000/grafico');
        if (!response.ok) throw new Error(`Erro ao carregar dados: status ${response.status}`);

        const data = await response.json();

        // Inicializando os dados do gráfico
        const chartData = {
            Trabalho: 0,
            Estudo: 0,
            Lazer: 0,
        };

        if (data) {
            for (const category in data) {
                // Somando os dados de cada categoria, garantindo que o valor seja numérico e válido
                const value = parseInt(data[category], 10);
                if (!isNaN(value) && value >= 0) {
                    chartData[category] += value;
                }
            }
        }

        // Preparando os dados para o gráfico
        const formattedChartData = {
            labels: Object.keys(chartData),
            datasets: [{
                data: Object.values(chartData),
                backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0'],
            }]
        };

        const ctx = document.getElementById('progressChart').getContext('2d');
        if (window.progressChart instanceof Chart) {
            window.progressChart.destroy(); // Destrói o gráfico existente, se houver
        }

        // Criando um novo gráfico com os dados formatados
        window.progressChart = new Chart(ctx, {
            type: 'doughnut',
            data: formattedChartData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `${context.label}: ${context.raw} minutos`;
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Erro ao carregar o gráfico:', error);
    }
}

loadChart();

// Atualiza o gráfico com a soma das durações estimadas
function updateChart(categoryDurations) {
    const chartData = {
        Trabalho: 0,
        Estudo: 0,
        Lazer: 0,
    };

    for (const category in categoryDurations) {
        // Verificando se a duração é válida antes de adicionar
        const duration = categoryDurations[category];
        if (typeof duration === 'number' && !isNaN(duration) && duration >= 0) {
            chartData[category] += duration;
        }
    }

    const formattedChartData = {
        labels: Object.keys(chartData),
        datasets: [{
            data: Object.values(chartData),
            backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0'],
        }]
    };

    const ctx = document.getElementById('progressChart').getContext('2d');
    if (window.progressChart instanceof Chart) {
        window.progressChart.destroy(); // Destrói o gráfico existente, se houver
    }

    window.progressChart = new Chart(ctx, {
        type: 'doughnut',
        data: formattedChartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.label}: ${context.raw} minutos`;
                        }
                    }
                }
            }
        }
    });
}
