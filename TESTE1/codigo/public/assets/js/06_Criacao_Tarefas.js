
/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npx json-server --watch TESTE1/codigo/db/db.json --port 3000
*/



// Configuração inicial dos botões de prioridade e carregamento do gráfico e tarefas
document.addEventListener('DOMContentLoaded', () => {
    initializePriorityButtons(); 
    initializeTaskCreation(); 
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

// Função para inicializar os botões de prioridade
function initializePriorityButtons() {
    document.querySelectorAll('.priority-button').forEach(button => {
        button.addEventListener('click', () => {
            selectPriorityButton(button);
        });
    });
}

// Função para selecionar um botão de prioridade
function selectPriorityButton(selectedButton) {
    document.querySelectorAll('.priority-button').forEach(btn => btn.classList.remove('selected'));
    selectedButton.classList.add('selected');
}

// --- Criação , salvamento e remoção de tarefas ---

// Função para criar tarefas
function initializeTaskCreation() {
    document.getElementById("add-task-button").addEventListener("click", async (event) => {
        event.preventDefault(); 
        const taskDetails = gatherTaskDetails();
        if (taskDetails) {
            await saveTaskToServer(taskDetails); 
            sortTasksByTime();
        }
    });
}

// Função para coletar detalhes da tarefa
function gatherTaskDetails() {
    const taskName = document.querySelector('input[placeholder="Nome da tarefa"]').value;
    const taskTime = document.querySelector('input[type="time"]').value;
    const taskUdate = document.querySelector('input[name="dateUsuario"]').value;
    const taskCategory = document.getElementById("category-filter").value;
    const taskRecurrenceDays = getSelectedRecurrenceDays(); 
    const estimatedDuration = parseInt(document.querySelector('input#estimatedDuration').value) || 0; 
    
    const selectedPriorityButton = document.querySelector(".priority-button.selected");
    const taskPriority = selectedPriorityButton 
        ? capitalizeFirstLetter(selectedPriorityButton.getAttribute("data-priority")) 
        : "Não definida";
    
    return {
        name: taskName,
        time: taskTime,
        category: taskCategory,
        priority: taskPriority,
        Udate: taskUdate,
        date: taskRecurrenceDays,  
        estimatedDuration: estimatedDuration  
    };
}

// Função para obter os dias de recorrência selecionados
function getSelectedRecurrenceDays() {
    const daysCheckboxes = document.querySelectorAll('input[name="recurrenceDays"]:checked');
    const selectedDays = Array.from(daysCheckboxes).map(checkbox => parseInt(checkbox.value));
    return selectedDays;
}


async function saveTaskToServer(task) {
    try {
        const response = await fetch('http://localhost:3000/tarefas');
        if (!response.ok) throw new Error('Erro ao carregar tarefas');
        
        const data = await response.json();

        
        if (!Array.isArray(data.adicionarTarefas)) {
            data.adicionarTarefas = [];
        }

        
        const validTasks = data.adicionarTarefas.filter(t => typeof t.id === 'number' && t.id > 0);

        
        const nextId = validTasks.length > 0 
            ? Math.max(...validTasks.map(t => t.id)) + 1 
            : 1;

        
        task = { id: nextId, ...task };

        
        data.adicionarTarefas.push(task);
        
        const estimatedDuration = task.estimatedDuration;
        const category = task.category;
        
        if (!data.grafico) {
            data.grafico = {};
        }
        
        if (!data.grafico[category]) {
            data.grafico[category] = estimatedDuration;
        } else {
            data.grafico[category] += estimatedDuration;
        }

        
        const updateResponse = await fetch('http://localhost:3000/tarefas', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), 
        });
        
        if (!updateResponse.ok) throw new Error('Erro ao salvar tarefa');
    } catch (error) {
        console.error('Erro ao salvar tarefa:', error);
    }
}

// Função para remover uma tarefa do servidor usando o ID da tarefa
async function removeTaskFromServer(task) {
    try {
        const response = await fetch('http://localhost:3000/tarefas');
        if (!response.ok) throw new Error('Erro ao carregar tarefas');
        
        const data = await response.json();
        
        
        data.adicionarTarefas = data.adicionarTarefas.filter(t => t.id !== task.id);
        
        const updateResponse = await fetch('http://localhost:3000/tarefas', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!updateResponse.ok) throw new Error('Erro ao remover tarefa');
        console.log(`Tarefa com ID ${task.id} removida com sucesso.`);
    } catch (error) {
        console.error('Erro ao remover tarefa:', error);
    }
}


// --- CARREGAMENTO DE TAREFAS E CRONOGRAMA ---



// Função para capitalizar a primeira letra de uma string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// Função para carregar as tarefas do JSON
async function loadTasks(dayOfWeek) {
    try {
        const response = await fetch('/TESTE1/codigo/db/db.json');
        if (!response.ok) throw new Error(`Erro ao carregar tarefas: status ${response.status}`);

        const data = await response.json();

        if (!data || !data.tarefas || !data.tasks_calendar) {
            throw new Error("Estrutura de dados 'tarefas' ou 'tasks_calendar' não encontrada no JSON.");
        }

        const taskList = document.querySelector(".task-list");
        const notice = document.querySelector('.empty');
        
        taskList.innerHTML = ''; 
        notice.innerHTML = '';  

        let tasksFound = false;
        let allTasks = [];
        let categoryDurations = {
            Lazer: 0,
            Estudo: 0,
            Trabalho: 0,
        };

        // Carregar tarefas de 'listaDeTarefas' (tarefas já programadas)
        if (Array.isArray(data.tarefas.listaDeTarefas)) {
            data.tarefas.listaDeTarefas.forEach(task => {
                if (task.date.includes(dayOfWeek + 1)) {
                    allTasks.push(task);
                    tasksFound = true;
                    categoryDurations[task.category] += task.estimatedDuration;
                }
            });
        }

        // Carregar tarefas de 'adicionarTarefas' (tarefas a adicionar)
        if (Array.isArray(data.tarefas.adicionarTarefas)) {
            const selectedDay = new Date(currentYear, currentMonth, parseInt(document.querySelector('.selected-day').textContent));
            const selectedDate = selectedDay.toISOString().split('T')[0]; 

            data.tarefas.adicionarTarefas.forEach(task => {
                const taskUdate = task.Udate; 
                const taskRecurrenceDays = task.date;

                if (taskUdate === selectedDate) {
                    allTasks.push(task);
                    tasksFound = true;
                    categoryDurations[task.category] += task.estimatedDuration;
                }

                if (Array.isArray(taskRecurrenceDays) && taskRecurrenceDays.includes(dayOfWeek + 1)) {
                    allTasks.push(task); 
                    tasksFound = true;
                    categoryDurations[task.category] += task.estimatedDuration;
                }
            });
        }

        // Carregar tarefas de 'tasks_calendar' (tarefas do calendário)
        if (Array.isArray(data.tasks_calendar)) {
            data.tasks_calendar.forEach(task => {
                task.dates.forEach(date => {
                    if (date === dayOfWeek + 1) {
                        allTasks.push(task);
                        tasksFound = true;
                        categoryDurations[task.category] += task.estimatedDuration;
                    }
                });
            });
        }

        console.log("Tarefas encontradas:", allTasks);

        
        allTasks = sortTasksByTime(allTasks);

        
        allTasks.forEach(task => {
            taskList.appendChild(createTaskRow(task)); 
        });

        
        if (!tasksFound) {
            notice.innerHTML = 'Nenhuma tarefa para este dia.';
        } else {
            
            notice.innerHTML = '';
        }

        updateChart(categoryDurations);
        
    } catch (error) {
        document.querySelector('.empty').innerHTML = 'Selecione um dia para ver as tarefas';
    }
}
// Função para ordenar todas as tarefas pela hora (de 00:00 a 23:59)
function sortTasksByTime(tasks) {
    return tasks.sort((a, b) => {
        const timeA = getTimeInMinutes(a.time);
        const timeB = getTimeInMinutes(b.time);

        console.log(`Comparando ${timeA} vs ${timeB}`);  

        return timeA - timeB;  
    });
}
// Função para converter o horário (em formato 'HH:MM' ou array) para minutos
function getTimeInMinutes(time) {
    
    if (Array.isArray(time)) {
        time = time[0];
    }

    
    if (typeof time === 'string' && time.includes(':')) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;  
    }

    
    console.warn(`Formato de hora inválido: ${time}`);
    return Infinity;  
}
// Função para criar uma linha de tarefa
function createTaskRow(task) {
    const row = document.createElement("tr");
    const time = Array.isArray(task.time) ? task.time[0] : task.time;  

    row.innerHTML = `
        <td>${time}</td>
        <td>${task.name}</td>
        <td>${task.category}</td>
        <td>${task.priority}</td>
        <td><button class="remove-task" style="font-size: 22px">Remover</button></td>
    `;

    
    row.addEventListener('click', () => openEditModal(task));

    
    row.querySelector('.remove-task').addEventListener('click', async (event) => {
        event.stopPropagation(); 
        await removeTaskFromServer(task);
        row.remove();
        checkEmptyTasks();
    });

    return row;
}
// Função para verificar se as tarefas estão vazias
function checkEmptyTasks() {
    const tasksTable = document.querySelector('.task-list');
    const notice = document.querySelector('.empty');
    notice.innerHTML = tasksTable.children.length === 0 ? 'Nenhuma tarefa para este dia.' : '';
}

// FUNÇÃO DO MODAL //

// Função para abrir o modal de edição
function openEditModal(task) {
    // Preencher o modal com os dados da tarefa
    document.getElementById('edit-task-name').value = task.name;
    document.getElementById('edit-task-category').value = task.category;
    document.getElementById('edit-task-priority').value = task.priority;
    document.getElementById('edit-task-time').value = task.time;
    document.getElementById('edit-task-duration').value = task.estimatedDuration;

    // Mostrar o modal
    document.getElementById('editModal').style.display = "block";

    // Fechar o modal ao no x
    document.querySelector('.close-btn').onclick = function() {
        document.getElementById('editModal').style.display = "none";
    }

    // Fechar o modal se clicar fora dele
    window.onclick = function(event) {
        if (event.target == document.getElementById('editModal')) {
            document.getElementById('editModal').style.display = "none";
        }
    }
}

// Função para salvar a tarefa atualizada
document.getElementById('editTaskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obter os novos valores do formulário
    const updatedTask = {
        name: document.getElementById('edit-task-name').value,
        category: document.getElementById('edit-task-category').value,
        priority: document.getElementById('edit-task-priority').value,
        time: document.getElementById('edit-task-time').value,
        estimatedDuration: document.getElementById('edit-task-duration').value
    };

   
    updateTaskOnServer(updatedTask);

   
    document.getElementById('editModal').style.display = "none";

    
    updateTaskInTable(updatedTask);
});

// Função para atualizar a tarefa na tabela
function updateTaskInTable(updatedTask) {
    console.log("Tarefa atualizada na tabela:", updatedTask);
}

async function updateTaskOnServer(task) {
    // Enviar a tarefa atualizada para o servidor
    const response = await fetch('/TESTE1/codigo/db/db.json', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tarefa: task }) 
    });

    if (!response.ok) {
        console.error("Erro ao atualizar tarefa no servidor");
    } else {
        console.log("Tarefa atualizada com sucesso no servidor");
    }
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





// ----------------------GRAFICO---------------------- //

//Função para gerear o grafico 
async function loadChart() {
    try {
        const response = await fetch('http://localhost:3000/tarefas'); 
        if (!response.ok) throw new Error(`Erro ao carregar dados: status ${response.status}`);

        const data = await response.json();

        const chartData = {
            Trabalho: 0,
            Estudo: 0,
            Lazer: 0,
        };

        if (data.grafico) {
            for (const category in data.grafico) {
                if (chartData.hasOwnProperty(category)) {
                    chartData[category] += data.grafico[category]; 
                }
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
            window.progressChart.destroy(); 
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
        if (chartData.hasOwnProperty(category)) {
            chartData[category] += categoryDurations[category]; 
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
        window.progressChart.destroy(); 
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
