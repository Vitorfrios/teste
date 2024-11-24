
/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npm start 
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

// Função para carregar os dados do usuário, configurações e senha
async function carregarDadosUsuario() {
    try {
        const usuarioResponse = await fetch('http://localhost:3000/usuarios/1');
        const configResponse = await fetch('http://localhost:3000/configuracoes?usuarioId=1');
        const senhaResponse = await fetch('http://localhost:3000/senhas?usuarioId=1');  
        if (!usuarioResponse.ok || !configResponse.ok || !senhaResponse.ok) throw new Error('Erro ao buscar dados');

        const usuario = await usuarioResponse.json();
        const configuracao = await configResponse.json();
        const senha = await senhaResponse.json();

                document.getElementById('nome-completo').textContent = usuario.nome || 'N/A';
        document.getElementById('email').textContent = usuario.email || 'N/A';
        document.getElementById('nome-usuario').textContent = usuario.login || 'N/A';

               document.getElementById('notification-toggle').checked = configuracao[0]?.notificacoes || false;

                document.getElementById('edit-nome').value = usuario.nome || '';
        document.getElementById('edit-email').value = usuario.email || '';
        document.getElementById('edit-login').value = usuario.login || '';

                document.getElementById('new-password').value = senha[0]?.senha || '';
    } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error);
    }
}

// Função para salvar o estado de notificações
async function salvarEstadoNotificacoes(ativo) {
    try {
        const response = await fetch('http://localhost:3000/configuracoes/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuarioId: "1", notificacoes: ativo })
        });
        if (!response.ok) throw new Error('Erro ao salvar estado de notificações');
    } catch (error) {
        console.error('Erro ao salvar o estado de notificações:', error);
    }
}

// Função para salvar apenas os dados editados (nome, email, login), sem alterar a senha
async function salvarDadosEditados() {
    const novoNome = document.getElementById('edit-nome').value;
    const novoEmail = document.getElementById('edit-email').value;
    const novoLogin = document.getElementById('edit-login').value;

    try {
        const response = await fetch('http://localhost:3000/usuarios/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: "1",
                nome: novoNome, 
                email: novoEmail, 
                login: novoLogin 
            })
        });
        if (!response.ok) throw new Error('Erro ao salvar dados');

                document.getElementById('nome-completo').textContent = novoNome;
        document.getElementById('email').textContent = novoEmail;
        document.getElementById('nome-usuario').textContent = novoLogin;

        document.getElementById('edit-form').style.display = 'none';
    } catch (error) {
        console.error('Erro ao salvar os dados do usuário:', error);
    }
}


// Função para salvar a nova senha sem alterar os outros dados
async function salvarNovaSenha() {
    const novaSenha = document.getElementById('new-password').value;

    try {
                const senhaResponse = await fetch('http://localhost:3000/senhas?usuarioIdS=1');
        const senhaExistente = await senhaResponse.json();

        if (!senhaResponse.ok) {
            throw new Error(`Erro ao buscar senha existente. Status: ${senhaResponse.status}`);
        }

        if (senhaExistente.length > 0) {
                        const senhaId = senhaExistente[0].id;

            console.log('ID da senha:', senhaId);  
                        const response = await fetch(`http://localhost:3000/senhas/${senhaId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: senhaId,                      usuarioIdS: "1",                      senha: novaSenha                  })
            });

            if (!response.ok) {
                throw new Error(`Erro ao alterar a senha. Status: ${response.status}`);
            }

            console.log('Senha alterada com sucesso');
            alert('Senha alterada com sucesso!');
        } else {
            throw new Error('Senha não encontrada para o usuário.');
        }

                document.getElementById('password-modal').style.display = 'none';
    } catch (error) {
        console.error('Erro ao alterar a senha:', error);
        alert(`Erro ao alterar a senha: ${error.message}`);
    }
}



// Evento de clique no toggle de notificações
document.getElementById('notification-toggle').onclick = function() {
    const isAtivo = this.checked;
    salvarEstadoNotificacoes(isAtivo);
};

// Eventos de clique para abrir e fechar os modais
document.getElementById('edit-profile').onclick = () => {
    document.getElementById('edit-form').style.display = 'flex';
};
document.getElementById('change-password').onclick = () => {
    document.getElementById('password-modal').style.display = 'flex';
};
document.getElementById('close-edit-form').onclick = () => {
    document.getElementById('edit-form').style.display = 'none';
};
document.getElementById('close-password-modal').onclick = () => {
    document.getElementById('password-modal').style.display = 'none';
};

document.getElementById('save-changes').onclick = salvarDadosEditados;
document.getElementById('save-password').onclick = salvarNovaSenha;

carregarDadosUsuario();
