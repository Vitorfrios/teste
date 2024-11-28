
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
// ------------------- CODIGO DO SUPORTE -----------------//
let feedbackCount = localStorage.getItem('feedbackCount') ? parseInt(localStorage.getItem('feedbackCount')) : 1;
let suporteCount = localStorage.getItem('suporteCount') ? parseInt(localStorage.getItem('suporteCount')) : 1;

function enviarFeedback() {
    const tipo = document.getElementById('tipo').value;
    const mensagem = document.getElementById('mensagem').value;

    if (!mensagem) {
        alert("Por favor, escreva sua mensagem antes de enviar.");
        return;
    }

    let id;
    if (tipo === "feedback") {
        id = `feedback${feedbackCount}`;
        feedbackCount++;  // Incrementa para a próxima postagem de feedback
        localStorage.setItem('feedbackCount', feedbackCount);  // Salva o contador no localStorage
    } else if (tipo === "suporte") {
        id = `suporte${suporteCount}`;
        suporteCount++;  // Incrementa para a próxima postagem de suporte
        localStorage.setItem('suporteCount', suporteCount);  // Salva o contador no localStorage
    } else {
        alert("Selecione um tipo de feedback antes de enviar.");
        return;
    }

    const feedbackData = {
        id,
        tipo,
        mensagem,
        data: new Date().toISOString()
    };

    fetch('http://localhost:3000/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Seu feedback foi enviado com sucesso!");
        document.getElementById('suporteForm').reset();
    })
    .catch(error => {
        console.error("Erro ao enviar feedback:", error);
        alert("Erro ao enviar feedback. Tente novamente.");
    });
}



// -------------- CODIGO DAS SOLUÇÕES RAPIDAS -------------- //
function exibirConteudo() {
    const opcaoSelecionada = document.getElementById('opcoes').value;

    if (!opcaoSelecionada) {
        document.getElementById('conteudo-exibicao').innerHTML = '';
        document.getElementById('conteudo-exibicao').style.border = 'none';
        return;
    }

    fetch('/codigo/db/db.json')
        .then(response => response.json())
        .then(data => {
            const conteudoExibicao = document.getElementById('conteudo-exibicao');
            conteudoExibicao.innerHTML = '';

            const conteudo = data.conteudo[opcaoSelecionada];
            if (conteudo && conteudo.topicos) {
                conteudoExibicao.style.border = '3px solid #210af3';
                conteudo.topicos.forEach(topico => {
                    const p = document.createElement('p');
                    p.textContent = "• " + topico;
                    conteudoExibicao.appendChild(p);
                });
            } else {
                conteudoExibicao.style.border = 'none';
            }

            conteudoExibicao.style.maxWidth = '100%';
        })
        .catch(error => {
            console.error('Erro ao carregar o conteúdo:', error);
            document.getElementById('conteudo-exibicao').style.border = 'none';
        });
}



