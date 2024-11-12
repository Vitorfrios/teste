
/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npx json-server --watch codigo/db/db.json --port 3000
*/


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


{// ------------- Codigo para a roleta ------------- //
    let data;  
    let numerosDisponiveis = [1, 2, 3, 4, 5]; 
    let estaGirando = false;  

    async function carregarDados() {  
        const response = await fetch('/TESTE1/codigo/db/db.json');  
        data = await response.json();  
    }  

    carregarDados(); 

    function girarRoleta() {
        if (estaGirando) {
            return;  
        }

        if (!data) {  
            alert("Os dados ainda estão sendo carregados. Tente novamente mais tarde.");  
            return;  
        }  

        if (numerosDisponiveis.length === 0) {
            numerosDisponiveis = [1, 2, 3, 4, 5];
        }

        estaGirando = true;  

        const randomIndex = Math.floor(Math.random() * numerosDisponiveis.length); 
        const randomNum = numerosDisponiveis[randomIndex]; 

        numerosDisponiveis.splice(randomIndex, 1); 

        const roleta = document.getElementById("roleta-g");  
        const rotacao = randomNum * 72 + 720; 
        
        roleta.style.transition = "transform 2s ease-out";
        roleta.style.transform = `rotate(${rotacao}deg)`; 

        setTimeout(() => {  
            roleta.style.transition = "transform 1s ease-in";  
            roleta.style.transform = "rotate(0deg)";  
            mostrarResultado(randomNum);  
            estaGirando = false; 
        }, 2000);  
    }

    document.getElementById("roleta-g").addEventListener("click", girarRoleta);  

    document.getElementById("girar").addEventListener("click", girarRoleta);  

    function mostrarResultado(num) {  
        const resultadoDiv = document.getElementById("resultado");  
        const mostrarDicasDiv = document.querySelector(".mostrar-dicas"); 
        const itemCorrespondente = data.telas.tela2.find(item => item.num === num);  

        const titulo = itemCorrespondente.titulo || `Número ${num}`;
        document.getElementById("num-sorteado").innerText = titulo;  

        resultadoDiv.innerHTML = ''; 
        for (let i = 1; i <= 5; i++) {
            const texto = itemCorrespondente[`text${i}`];
            if (texto) {
                const li = document.createElement("li");
                li.textContent = texto;
                li.style.marginBottom = "10px"; 
                resultadoDiv.appendChild(li);
            }
        }

        const lastLi = resultadoDiv.lastElementChild;
        if (lastLi) {
            lastLi.style.marginBottom = "10px";
        }

        resultadoDiv.style.display = "block"; 
        mostrarDicasDiv.style.border = "2px solid #00a4cc"; 
        mostrarDicasDiv.style.borderRadius = "30px"; 



    }
} 