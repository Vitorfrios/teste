
/*
DIGITAR npm start NO TERMINAL PARA INICIALIZAR O JSON SERVER
npm start 
*/

// Configuração inicial dos botões de prioridade e carregamento do gráfico e tarefas
document.addEventListener('DOMContentLoaded', () => {
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
        if (currentPage === '05_Dashboard.html') {
            document.getElementById('dashboard').classList.add('active');
        } else if (currentPage === '06_Cronograma_Diario.html') {
            document.getElementById('cronograma').classList.add('active');
        } else if (currentPage === '07_Criacao_Tarefas.html') {
            document.getElementById('tarefas').classList.add('active');
        } else if (currentPage === '08_Sugestao.html') {
            document.getElementById('sugestao').classList.add('active');
        } else if (currentPage === '09_Perfil.html') {
            document.getElementById('perfil').classList.add('active');
        } else if (currentPage === '10_Suporte_Feedback.html') {
            document.getElementById('feedback').classList.add('active');
        }
    }


    highlightActiveItem();
});

// Função para carregar o nome do usuário logado
async function carregarNomeUsuarioLogado() {
    try {
        const usuarioLogadoResponse = await fetch('http://localhost:3000/usuario_logado');
        const usuarioLogado = await usuarioLogadoResponse.json();

        if (!usuarioLogadoResponse.ok || usuarioLogado.length === 0) {
            console.error('Usuário logado não encontrado!');
            return;
        }

        document.querySelector('.name').textContent = usuarioLogado[0].nome || 'Nome não encontrado';
    } catch (error) {
        console.error('Erro ao carregar o nome do usuário logado:', error);
    }
}

carregarNomeUsuarioLogado();



// ------------------- FIM DA SIDE BAR ------------------- //



// --- CARREGAMENTO DE TAREFAS E CRONOGRAMA ---


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
// Função auxiliar para ordenar as tarefas por hora
function convertTimeToNumber(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

// Função para criar uma linha de tarefa (para exibir no cronograma)
function createTaskRow(task) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${task.time}</td>
    <td>${task.name}</td>
    <td>${task.category}</td>
    <td>${task.priority}</td>
    <td>${task.estimatedDuration} min</td>
    `;
    return row;
}

// Função para carregar tarefas do JSON e atualizar o cronograma
async function loadTasks(dayOfWeek) {
    try {
        const response = await fetch('/codigo/db/DB2.json');
        if (!response.ok) throw new Error(`Erro ao carregar tarefas: status ${response.status}`);

        const data = await response.json();
        
        if (!data) {
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

        if (Array.isArray(data.listaDeTarefas)) {
            data.listaDeTarefas.forEach(task => {
                if (task.date.includes(dayOfWeek + 1)) {
                    tasksForTheDay.push(task);
                    tasksFound = true;
                    categoryDurations[task.category] += task.estimatedDuration;
                }
            });
        }

        if (Array.isArray(data.adicionarTarefas)) {
            const selectedDay = new Date(currentYear, currentMonth, parseInt(document.querySelector('.selected-day').textContent));
            const selectedDate = selectedDay.toISOString().split('T')[0]; 

            data.adicionarTarefas.forEach(task => {
                const taskUdate = task.Udate; 
                const taskRecurrenceDays = task.date;

                if (taskUdate === selectedDate) {
                    tasksForTheDay.push(task);
                    tasksFound = true;
                    categoryDurations[task.category] += task.estimatedDuration;
                }

                if (Array.isArray(taskRecurrenceDays) && taskRecurrenceDays.includes(dayOfWeek + 1)) {
                    tasksForTheDay.push(task);
                    tasksFound = true;
                    categoryDurations[task.category] += task.estimatedDuration;
                }
            });
        }

        tasksForTheDay.sort((a, b) => convertTimeToNumber(a.time) - convertTimeToNumber(b.time));

        tasksForTheDay.forEach(task => {
            taskList.appendChild(createTaskRow(task)); 
        });

        if (!tasksFound) {
            notice.innerHTML = 'Nenhuma tarefa para este dia.';
        }

        updateChart(categoryDurations);
        
    } catch (error) {
document.querySelector('.empty').innerHTML = 'Selecione um dia do calendário para ver as tarefas e gerar o gráfico';    }
}

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

// Adiciona eventos de clique aos dias do calendário
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
        });
    });
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
        const response = await fetch('http://localhost:4000/grafico'); 
        if (!response.ok) throw new Error(`Erro ao carregar dados: status ${response.status}`);

        const data = await response.json();

        const chartData = {
            Trabalho: 0,
            Estudo: 0,
            Lazer: 0,
        };

        if (data) {
            for (const category in data) {
                if (chartData.hasOwnProperty(category)) {
                    chartData[category] += data[category]; 
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
