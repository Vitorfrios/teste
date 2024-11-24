// Página inicial de Login
const LOGIN_URL = "./public/pages/02_Login.html";

// URL do servidor para o db.json
const SERVER_URL = 'http://localhost:3000/usuarios'; 
const SERVER_URL_SENHAS = 'http://localhost:3000/senhas'; // URL para a seção de senhas

// Objeto para o banco de dados de usuários baseado em JSON
var db_usuarios = { usuarios: [] };

// Objeto para o usuário corrente
var usuarioCorrente = {};

// Função para gerar códigos randômicos a serem utilizados como código de usuário
function generateUUID() { 
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

// Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login
function initLoginApp() {
    // Verifica se o usuário corrente está no sessionStorage
    const usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
    }

    // Requisição GET para carregar usuários do servidor
    fetch(SERVER_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar usuários");
            }
            return response.json();
        })
        .then(data => {
            db_usuarios = data;
        })
        .catch(error => {
            console.error("Erro:", error);
            alert('Erro ao carregar dados de usuários do servidor.');
        });
}
// Função para alternar a visibilidade da senha
document.getElementById('toggle-password').addEventListener('click', function () {
    var passwordField = document.getElementById('password');
    var type = passwordField.type === "password" ? "text" : "password"; // Altera entre 'password' e 'text'
    passwordField.type = type;

    // Muda o ícone do olho para fechado ou aberto
    this.classList.toggle('fa-eye-slash');
});

// Declara uma função para processar o formulário de login
function processaFormLogin (event) {                
    // Cancela a submissão do formulário para tratar sem fazer refresh da tela
    event.preventDefault();

    // Obtem os dados de login e senha a partir do formulário de login
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Valida login e se estiver ok, redireciona para tela inicial da aplicação
    resultadoLogin = loginUser(username, password);
    if (resultadoLogin) {
        window.location.href = '/codigo/index.html';
    } else { // Se login falhou, avisa ao usuário
        // Exibe um popup com a mensagem de erro
        alert('Usuário não identificado. Por favor, crie um novo usuário.');
    }
}

// Função para validar e realizar o login
document.getElementById('btn-login').addEventListener('click', function () {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Verifica se os campos de login e senha estão preenchidos
    if (username === "" || password === "") {
        alert("Preencha todos os campos");
        return;
    }

    // Verifica se o usuário está cadastrado
    var usuarioExistente = loginUser(username, password);

    if (usuarioExistente) {
        // Se o usuário estiver cadastrado, redireciona para a próxima página
        window.location.href = './03_Tutorial.html';
    } else {
        // Caso o usuário não esteja cadastrado, mostra um alerta
        alert("Usuário não cadastrado. Por favor, crie um novo usuário.");
        // Opcional: abrir um modal para criar um novo usuário, caso necessário
    }
});

// Função para verificar se o login existe
function loginUser(username, password) {
    for (let usuario of db_usuarios.usuarios) {
        if (usuario.login === username) {
            // Verifica a senha associada ao usuário
            fetch(`${SERVER_URL_SENHAS}?usuarioIdS=${usuario.id}`)
                .then(response => response.json())
                .then(senhas => {
                    if (senhas.length > 0 && senhas[0].senha === password) {
                        // Se a senha for correta, retorna verdadeiro
                        return true;
                    } else {
                        return false;
                    }
                })
                .catch(error => {
                    console.error('Erro ao verificar a senha:', error);
                    return false;
                });
        }
    }

    return false; // Retorna falso se o usuário não for encontrado
}


// Função para salvar um novo usuário
function salvaLogin (event) {
    // Cancela a submissão do formulário para tratar sem fazer refresh da tela
    event.preventDefault();

    // Obtem os dados do formulário
    let login  = document.getElementById('txt_login').value;
    let nome   = document.getElementById('txt_nome').value;
    let email  = document.getElementById('txt_email').value;
    let senha  = document.getElementById('txt_senha').value;
    let senha2 = document.getElementById('txt_senha2').value;

    if (senha !== senha2) {
        alert('As senhas informadas não conferem.');
        return;
    }

    // Cria um novo usuário
    let usuario = { 
        "id": generateUUID(), 
        "login": login, 
        "nome": nome, 
        "email": email 
    };

    // Cria um objeto de senha
    let senhaObj = {
        "id": generateUUID(), 
        "usuarioIdS": usuario.id, // A senha terá o mesmo ID do usuário
        "senha": senha
    };

    // Adiciona o novo usuário e senha ao banco de dados
    fetch(SERVER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => {
        alert('Usuário salvo com sucesso!');

        // Adiciona a senha para o novo usuário
        fetch(SERVER_URL_SENHAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(senhaObj)
        })
        .then(response => response.json())
        .then(data => {
            alert('Senha salva com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao salvar a senha:', error);
        });
    })
    .catch(error => {
        console.error('Erro ao salvar o usuário:', error);
    });
}

// Função para fazer logout
function logoutUser() {
    usuarioCorrente = {};
    sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
    window.location = LOGIN_URL;
}

// Associa a função processaFormLogin ao evento submit do formulário de login
document.getElementById('login-form').addEventListener('submit', processaFormLogin);

// Associar o botão de salvar ao cadastro de novo usuário
document.getElementById('btn_salvar').addEventListener('click', salvaLogin);
