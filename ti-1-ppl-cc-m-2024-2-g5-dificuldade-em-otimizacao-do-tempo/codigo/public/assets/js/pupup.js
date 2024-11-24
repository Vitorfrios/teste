HTMLAllCollection

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Página</title>
    <script src="popup.js" defer></script>
</head>
<body>
    <h1>Criar Lembrete</h1>
    <label for="mensagem">Mensagem:</label>
    <input type="text" id="mensagem" placeholder="Ex: Beber água">
    
    <label for="tempo">Tempo (minutos):</label>
    <input type="number" id="tempo" min="1" placeholder="Minutos">
    
    <button id="criar-lembrete">Criar Lembrete</button>

    <script>
        // Carregar o popup HTML
        fetch('popup.html')
            .then(response => response.text())
            .then(data => {
                document.body.insertAdjacentHTML('beforeend', data);
            });

        // Adicionar evento para criar lembrete
        document.getElementById('criar-lembrete').addEventListener('click', () => {
            const mensagem = document.getElementById('mensagem').value;
            const tempo = document.getElementById('tempo').value;
            if (mensagem && tempo) {
                addReminder(mensagem, tempo);
                alert('Lembrete criado com sucesso!');
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    </script>
</body>
</html>



// popup.js
function showPopup(message) {
    const popup = document.getElementById('notification-popup');
    const notificationMessage = document.getElementById('notification-message');
    
    notificationMessage.textContent = message; // Mensagem personalizada
    popup.style.display = 'block'; // Mostra o popup

    // Oculta o popup após 5 segundos
    setTimeout(() => {
        popup.style.display = 'none';
    }, 5000);
}

function closePopup() {
    const popup = document.getElementById('notification-popup');
    popup.style.display = 'none'; // Fecha o popup
}

// Função para verificar lembretes
function checkReminders() {
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    const now = new Date().getTime();

    reminders.forEach((reminder, index) => {
        if (now >= reminder.time) {
            showPopup(reminder.message);
            reminders.splice(index, 1); // Remove o lembrete após exibir
        }
    });

    localStorage.setItem('reminders', JSON.stringify(reminders)); // Atualiza o armazenamento
}

// Função para adicionar um novo lembrete
function addReminder(message, minutes) {
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    const time = new Date().getTime() + minutes * 60000; // Converte minutos para milissegundos
    reminders.push({ message, time });
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

// Chama a função para verificar lembretes a cada minuto
setInterval(checkReminders, 60000);


<!-- popup.html -->
<div id="notification-popup" class="notification-popup">
    <span id="notification-message">Esta é uma notificação!</span>
    <button onclick="closePopup()">Fechar</button>
</div>

<style>
.notification-popup {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #f9c2c2;
    padding: 15px;
    border: 1px solid #d9534f;
    border-radius: 5px;
    display: none; /* Inicialmente escondido */
    z-index: 1000; /* Para garantir que fique acima de outros elementos */
}
</style>