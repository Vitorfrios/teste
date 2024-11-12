
/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npx json-server --watch TESTE3/codigo/db/db.json --port 3000
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
            addTaskToTable(taskDetails);
            clearTaskInputs();
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


// Função para salvar tarefas no servidor
async function saveTaskToServer(task) {
    try {
        const response = await fetch('http://localhost:3000/tarefas');
        if (!response.ok) throw new Error('Erro ao carregar tarefas');
        
        const data = await response.json();
        
        if (!Array.isArray(data.adicionarTarefas)) {
            data.adicionarTarefas = []; 
        }
        
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

// Função para remover uma tarefa do servidor
async function removeTaskFromServer(task) {
    try {
        const response = await fetch('http://localhost:3000/tarefas');
        if (!response.ok) throw new Error('Erro ao carregar tarefas');
        
        const data = await response.json();
        
        data.adicionarTarefas = data.adicionarTarefas.filter(t => t.name !== task.name);
        
        const updateResponse = await fetch('http://localhost:3000/tarefas', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!updateResponse.ok) throw new Error('Erro ao remover tarefa');
        console.log(`Tarefa ${task.name} removida com sucesso.`);
    } catch (error) {
        console.error('Erro ao remover tarefa:', error);
    }
    updateGrafico();

}


// --- CARREGAMENTO DE TAREFAS E CRONOGRAMA ---


// Função para verificar se a tabela de tarefas está vazia
function checkEmptyTasks() {
    const tasksTable = document.querySelector('.task-list');
    const notice = document.querySelector('.empty');
    notice.innerHTML = tasksTable.children.length === 0 ? 'Nenhuma tarefa para este dia.' : '';
}

// Função para capitalizar a primeira letra de uma string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Função para criar uma linha de tarefa
function createTaskRow(task) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${task.time}</td>
        <td>${task.name}</td>
        <td>${task.category}</td>
        <td>${task.priority}</td>
        <td><button class="remove-task" style="font-size: 22px">Remover</button></td>
    `;

    row.querySelector('.remove-task').addEventListener('click', async () => {
        await removeTaskFromServer(task); 
        row.remove(); 
        checkEmptyTasks(); 
    });
    return row;
}




// Função para carregar tarefas do JSON com ajuste nos dias da semana
async function loadTasks(dayOfWeek) {
    try {
        const response = await fetch('/TESTE3/codigo/db/db.json');
        if (!response.ok) throw new Error(`Erro ao carregar tarefas: status ${response.status}`);

        const data = await response.json();
        
        if (!data || !data.tarefas) {
            throw new Error("Estrutura de dados 'tarefas' não encontrada no JSON.");
        }

        const taskList = document.querySelector(".task-list");
        const notice = document.querySelector('.empty');
        
        taskList.innerHTML = '';
        notice.innerHTML = '';  
        
        let tasksFound = false;
        let tasksForTheDay = [];
        let categoryDurations = {
            Lazer: 0,
            Estudo: 0,
            Trabalho: 0,
        };

        // Ajusta o dayOfWeek para Domingo ser 1 e Sábado ser 7
        const adjustedDayOfWeek = (dayOfWeek === 0) ? 1 : (dayOfWeek === 6) ? 7 : dayOfWeek + 1;

        if (Array.isArray(data.tarefas.listaDeTarefas)) {
            data.tarefas.listaDeTarefas.forEach(task => {
                task.Udate = task.Udate || ""; // Define Udate como "" se não existir

                if (task.date.includes(adjustedDayOfWeek)) {
                    tasksForTheDay.push(task);
                    tasksFound = true;
                    categoryDurations[task.category] += task.estimatedDuration;
                }
            });
        }

        if (Array.isArray(data.tarefas.adicionarTarefas)) {
            const selectedDay = new Date(currentYear, currentMonth, parseInt(document.querySelector('.selected-day').textContent));
            const selectedDate = selectedDay.toISOString().split('T')[0]; 

            data.tarefas.adicionarTarefas.forEach(task => {
                task.Udate = task.Udate || ""; // Define Udate como "" se não existir

                const taskUdate = task.Udate; 
                const taskRecurrenceDays = task.date;

                if (taskUdate === selectedDate) {
                    tasksForTheDay.push(task);
                    tasksFound = true;
                    categoryDurations[task.category] += task.estimatedDuration;
                }

                if (Array.isArray(taskRecurrenceDays) && taskRecurrenceDays.includes(adjustedDayOfWeek)) {
                    tasksForTheDay.push(task); 
                    tasksFound = true;
                    categoryDurations[task.category] += task.estimatedDuration;
                }
            });
        }

        console.log("Tarefas encontradas:", tasksForTheDay);

        tasksForTheDay.sort((a, b) => convertTimeToNumber(a.time) - convertTimeToNumber(b.time));

        tasksForTheDay.forEach(task => {
            taskList.appendChild(createTaskRow(task)); 
        });

        if (!tasksFound) {
            notice.innerHTML = 'Nenhuma tarefa para este dia.';
        }

        updateChart(categoryDurations);
        
    } catch (error) {
        document.querySelector('.empty').innerHTML = 'Selecione um dia para ver as tarefas e atualizar o grafico';
    }
}





// Função para adicionar tarefas na tabela
function addTaskToTable(task) {
    console.log(task); 
    const selectedDay = document.querySelector('.selected-day');
    if (!selectedDay) return; 
    
    const selectedDate = new Date(currentYear, currentMonth, parseInt(selectedDay.textContent)).toISOString().split('T')[0];
    const dayOfWeek = new Date(currentYear, currentMonth, parseInt(selectedDay.textContent)).getDay();

    const taskUdate = task.Udate; 
    const taskRecurrenceDays = task.date;  
    
    if (taskUdate === selectedDate || (Array.isArray(taskRecurrenceDays) && taskRecurrenceDays.includes(dayOfWeek + 1))) {
        const taskList = document.querySelector(".task-list");
        const taskRow = createTaskRow(task);
        taskList.appendChild(taskRow);
    }
}



function convertTimeToNumber(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
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

// Função para atualizar o gráfico com base nas tarefas (----------  SE DER ERRO PODE SER REMOVIDA ---------- )
async function updateGrafico() {
    try {
        // Carregar o JSON do servidor
        const response = await fetch('http://localhost:3000/tarefas');
        if (!response.ok) throw new Error('Erro ao carregar tarefas');
        
        const data = await response.json();
        console.log(data);  // Verifique a estrutura do objeto retornado

        // Verifique a estrutura correta com base no log
        if (!data.tarefas || !Array.isArray(data.tarefas.listaDeTarefas)) {
            return;
        }

        // Inicializar um objeto para armazenar as durações por categoria
        let categoryDurations = {
            "Trabalho": 0,
            "Estudo": 0,
            "Lazer": 0
        };

        // Iterar sobre a lista de tarefas e somar as durações por categoria
        data.tarefas.listaDeTarefas.forEach(task => {
            const category = task.category;
            const estimatedDuration = task.estimatedDuration || 0;

            if (categoryDurations.hasOwnProperty(category)) {
                categoryDurations[category] += estimatedDuration;
            }
        });

        // Atualizar o gráfico com as novas durações
        data.tarefas.grafico = categoryDurations;

        // Salvar as mudanças no servidor
        const updateResponse = await fetch('http://localhost:3000/tarefas', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!updateResponse.ok) throw new Error('Erro ao salvar gráfico');
        const updateResult = await updateResponse.json();
        console.log("Gráfico atualizado com sucesso:", updateResult);

    } catch (error) {
        console.error('Erro ao atualizar gráfico:', error);
    }
}

// Chamar a função para atualizar o gráfico
updateGrafico();


