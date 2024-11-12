
/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npx json-server --watch codigo/db/db.json --port 3000
*/

// ------------------- SIDE BAR CODIGO ------------------- //

document.addEventListener("DOMContentLoaded", function() {
    function highlightActiveItem() {
        const currentPage = window.location.pathname.split("/").pop(); 

        const items = document.querySelectorAll('.sidebar ul li, .sub-itens li');
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
        } else if (currentPage === '08_Sugestao.html') {
            document.getElementById('sugestao').classList.add('active');
        } else if (currentPage === '08.1_Dicas_para_Estudo.html') {
            document.getElementById('dicas-estudo').classList.add('active');
            document.getElementById('sugestao').classList.add('active'); 
        } else if (currentPage === '08.2_Dicas_para_Dormir.html') {
            document.getElementById('dicas-dormir').classList.add('active');
            document.getElementById('sugestao').classList.add('active'); 
        } else if (currentPage === '08.3_Dicas_para_Desempenho.html') {
            document.getElementById('dicas-desempenho').classList.add('active');
            document.getElementById('sugestao').classList.add('active'); 
        } else if (currentPage === '09_Perfil.html') {
            document.getElementById('perfil').classList.add('active');
        } else if (currentPage === '10_Suporte_Feedback.html') {
            document.getElementById('feedback').classList.add('active');
        }
    }

    highlightActiveItem();
});


// ------------------- FIM DA SIDE BAR ------------------- //


function exibirConteudo() {
    const opcaoSelecionada = document.getElementById('opcoes').value;

    if (!opcaoSelecionada) {
        document.getElementById('conteudo-exibicao').innerHTML = '';
        document.getElementById('conteudo-exibicao').style.border = 'none';
        return;
    }

    fetch('/TESTE1/codigo/db/db.json')
        .then(response => response.json())
        .then(data => {
            const conteudoExibicao = document.getElementById('conteudo-exibicao');
            conteudoExibicao.innerHTML = '';

            const conteudo = data.conteudo2[opcaoSelecionada];
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
