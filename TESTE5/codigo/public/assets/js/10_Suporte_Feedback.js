
/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npx json-server --watch codigo/db/db.json --port 3000
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

// ------------------- CODIGO DO SUPORTE -----------------//
let feedbackCount = 1;
let suporteCount = 1;

function enviarFeedback() {
    const tipo = document.getElementById('tipo').value;
    const mensagem = document.getElementById('mensagem').value;

    if (!mensagem) {
        alert("Por favor, escreva sua mensagem antes de enviar.");
        return;
    }

    let id;
    if (tipo === "feedback") {
        id = `feedback${feedbackCount++}`;
    } else if (tipo === "suporte") {
        id = `suporte${suporteCount++}`;
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



