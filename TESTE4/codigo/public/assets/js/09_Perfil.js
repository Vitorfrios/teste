
/*
DIGITAR npm start NO TERMINAL PARA INICIALIZAR O JSON SERVER
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

// Função para carregar os dados do usuário logado
async function carregarDadosUsuario() {
    try {
        const usuarioLogadoResponse = await fetch('http://localhost:3000/usuario_logado');
        const usuarioLogado = await usuarioLogadoResponse.json();

        if (!usuarioLogadoResponse.ok || usuarioLogado.length === 0) {
            alert('Usuário não encontrado!');
            return;
        }

        
        const usuario = usuarioLogado[0];
        document.getElementById('nome-completo').textContent = usuario.nome || 'N/A';
        document.getElementById('email').textContent = usuario.email || 'N/A';
        document.getElementById('nome-usuario').textContent = usuario.login || 'N/A';

        
        document.getElementById('notification-toggle').checked = usuario.notificacoes || false;

        
        document.getElementById('edit-nome').value = usuario.nome || '';
        document.getElementById('edit-email').value = usuario.email || '';
        document.getElementById('edit-login').value = usuario.login || '';

        
        document.getElementById('new-password').value = usuario.senha || '';  
    } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error);
    }
}

// Função para salvar o estado de notificações
async function salvarEstadoNotificacoes(ativo) {
    const usuarioLogadoResponse = await fetch('http://localhost:3000/usuario_logado');
    const usuarioLogado = await usuarioLogadoResponse.json();

    if (!usuarioLogadoResponse.ok || usuarioLogado.length === 0) {
        alert('Usuário não encontrado!');
        return;
    }

    const usuarioId = usuarioLogado[0].id; 

    try {
        
        const responseUsuarios = await fetch(`http://localhost:3000/usuarios/${usuarioId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: usuarioId,
                nome: usuarioLogado[0].nome, 
                email: usuarioLogado[0].email, 
                login: usuarioLogado[0].login, 
                senha: usuarioLogado[0].senha, 
                notificacoes: ativo 
            })
        });

        if (!responseUsuarios.ok) {
            throw new Error('Erro ao atualizar notificações no endpoint usuarios');
        }

        
        const responseUsuarioLogado = await fetch(`http://localhost:3000/usuario_logado/${usuarioId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: usuarioId,
                nome: usuarioLogado[0].nome, 
                email: usuarioLogado[0].email, 
                login: usuarioLogado[0].login, 
                senha: usuarioLogado[0].senha, 
                notificacoes: ativo 
            })
        });

        if (!responseUsuarioLogado.ok) {
            throw new Error('Erro ao atualizar notificações no endpoint usuario_logado');
        }

    } catch (error) {
        console.error('Erro ao salvar o estado de notificações:', error);
        alert(`Erro ao salvar as notificações: ${error.message}`);
    }
}


document.getElementById('notification-toggle').onclick = function() {
    const isAtivo = this.checked;
    salvarEstadoNotificacoes(isAtivo);
};


carregarDadosUsuario();

// Função para salvar os dados editados
async function salvarDadosEditados() {
    const usuarioLogadoResponse = await fetch('http://localhost:3000/usuario_logado');
    const usuarioLogado = await usuarioLogadoResponse.json();

    if (!usuarioLogadoResponse.ok || usuarioLogado.length === 0) {
        alert('Usuário não encontrado!');
        return;
    }

    const usuarioId = usuarioLogado[0].id; 
    const novoNome = document.getElementById('edit-nome').value;
    const novoEmail = document.getElementById('edit-email').value;
    const novoLogin = document.getElementById('edit-login').value;

    
    const notificacoesAtivas = usuarioLogado[0].notificacoes;

    try {
        
        const response = await fetch(`http://localhost:3000/usuarios/${usuarioId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: usuarioId, 
                nome: novoNome, 
                email: novoEmail, 
                login: novoLogin, 
                senha: document.getElementById('new-password').value, 
                notificacoes: notificacoesAtivas 
            })
        });
        if (!response.ok) throw new Error('Erro ao salvar dados no endpoint usuarios');

        
        const updateUsuarioLogadoResponse = await fetch(`http://localhost:3000/usuario_logado/${usuarioId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: usuarioId, 
                nome: novoNome,
                email: novoEmail,
                login: novoLogin,
                senha: document.getElementById('new-password').value, 
                notificacoes: notificacoesAtivas 
            })
        });

        if (!updateUsuarioLogadoResponse.ok) throw new Error('Erro ao salvar dados no endpoint usuario_logado');

        
        document.getElementById('nome-completo').textContent = novoNome;
        document.getElementById('email').textContent = novoEmail;
        document.getElementById('nome-usuario').textContent = novoLogin;

        
        document.getElementById('edit-form').style.display = 'none';
        alert('Alterações salvas com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar os dados do usuário:', error);
        alert(`Erro ao salvar os dados: ${error.message}`);
    }
}


// Função para salvar a nova senha no endpoint 'usuarios' e atualizar a senha no 'usuario_logado'
async function salvarNovaSenha() {
    const usuarioLogadoResponse = await fetch('http://localhost:3000/usuario_logado');
    const usuarioLogado = await usuarioLogadoResponse.json();

    if (!usuarioLogadoResponse.ok || usuarioLogado.length === 0) {
        alert('Usuário não encontrado!');
        return;
    }

    const usuarioId = usuarioLogado[0].id; 
    const novaSenha = document.getElementById('new-password').value;

    
    const notificacoesAtivas = usuarioLogado[0].notificacoes;

    try {
        
        const response = await fetch(`http://localhost:3000/usuarios/${usuarioId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: usuarioId, 
                nome: document.getElementById('edit-nome').value, 
                email: document.getElementById('edit-email').value, 
                login: document.getElementById('edit-login').value, 
                senha: novaSenha, 
                notificacoes: notificacoesAtivas 
            })
        });

        if (!response.ok) {
            throw new Error(`Erro ao alterar a senha no endpoint usuarios. Status: ${response.status}`);
        }

        
        const updateUsuarioLogadoResponse = await fetch(`http://localhost:3000/usuario_logado/${usuarioId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: usuarioId,
                nome: document.getElementById('edit-nome').value,
                email: document.getElementById('edit-email').value,
                login: document.getElementById('edit-login').value,
                senha: novaSenha,
                notificacoes: notificacoesAtivas 
            })
        });

        if (!updateUsuarioLogadoResponse.ok) {
            throw new Error(`Erro ao atualizar a senha no endpoint usuario_logado. Status: ${updateUsuarioLogadoResponse.status}`);
        }

        alert('Senha alterada com sucesso!');
        document.getElementById('password-modal').style.display = 'none';
    } catch (error) {
        console.error('Erro ao alterar a senha:', error);
        alert(`Erro ao alterar a senha: ${error.message}`);
    }
}


// Eventos de clique para abrir e fechar os modais
document.getElementById('edit-profile').onclick = () => {
    document.getElementById('edit-form').style.display = 'flex';
};
document.getElementById('change-password').onclick = () => {
    document.getElementById('password-modal').style.display = 'flex';
    carregarDadosUsuario(); 
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
