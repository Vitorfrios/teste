## Introdução

O projeto "Tempo Otimizado" apresenta uma interface com diversas telas que têm como objetivo facilitar a interação do usuário com as funcionalidades da plataforma. Cada tela foi projetada para oferecer uma experiência intuitiva e eficiente, com foco na otimização do tempo e no gerenciamento de tarefas. A seguir, serão apresentadas as principais telas e suas funcionalidades.

- **Projeto**: Tempo otimizado
- **Repositório GitHub**: [ti-1-ppl-cc-m-2024-2-g5-dificuldade-em-otimizacao-do-tempo](https://github.com/ICEI-PUC-Minas-PPLCC-TI/ti-1-ppl-cc-m-2024-2-g5-dificuldade-em-otimizacao-do-tempo)
- **Repositório GitHub Pessoal**: [Trabalho-TI-1-puc-minas](https://github.com/Vitorfrios/Trabalho-TI-1-puc-minas)

- **Membros da equipe**:
    - [Vitor de Freitas Rios](https://github.com/Vitorfrios)
    
### Documentos:
| ✅ [Documentação do projeto](README.md) | [✅ Código do projeto](https://github.com/Vitorfrios/Trabalho-TI-1-puc-minas/raw/main/docs/files/Trabalho-TI-1-puc-minas.zip) | ✅ [Documentação de Design Thinking (MIRO)](/docs/files/processo-dt-G5.pdf) |


## Estrutura do Projeto

A estrutura do projeto está organizada em pastas para facilitar a compreensão e o desenvolvimento.

### Diretórios Principais

- **/assets**: Contém arquivos estáticos.
  - **/css**: Arquivos de estilo que definem a aparência das páginas.
  - **/images**: Imagens utilizadas no design da interface.
  - **/js**: Scripts que adicionam funcionalidades dinâmicas ao sistema.
- **/pages**: Páginas HTML que compõem o sistema.

---

## Telas e Funcionalidades
### 1. Logo (`01_logo.html`)
- Exibe o logotipo do sistema em uma página inicial de carregamento, garantindo uma introdução visual.

---

### 2. Login (`02_Login.html`)
- Permite que os usuários autentiquem suas contas inserindo email e senha.
- Opções de criação de conta para novos usuários.
- Validação de campos com mensagens de erro em tempo real.

---

### 3. Tutorial (`03_Tutorial.html`)
- Apresenta um guia interativo para usuários iniciantes.
- Explicações detalhadas sobre como usar cada funcionalidade do sistema.

---

### 4. Dashboard (`04_Dashboard.html`)
- Menu de navegação com 4 opções principais.
- Área de mostragem de tarefas organizadas.
- Acesso ao calendário para exibir tarefas específicas.
- Mostragem de gráficos detalhados, exibindo o tempo gasto em cada categoria (trabalho, lazer, estudo, etc.).

---

### 5. Cronograma Diário (`05_Cronograma_Diario.html`)
- Exibição de tarefas organizadas por um período de 7 dias.
- Filtros para selecionar a semana desejada dentro de um mês.
- Opção de adicionar tarefas, direcionando para a página de criação.
- Botão para acessar sugestões ou dicas relacionadas às tarefas.

---

### 6. Criação de Tarefas (`06_Criacao_Tarefas.html`)
- Formulário para adicionar tarefas:
  - Nome da tarefa.
  - Escolha dos dias de repetição (opcional).
  - Hora e dia para execução.
  - Definição de prioridade (Alta, Média, Baixa).
  - Seleção de categorias (Lazer, Trabalho, Estudo, etc.).
- Mostragem de tarefas criadas com opções de edição ou exclusão.
- Clique no calendário para exibir as tarefas criadas.
- Visualização de um gráfico que mostra o tempo gasto em cada categoria.

---

### 7. Sugestões (`07_Sugestao.html`)
- Combinação de dicas personalizadas com base nos hábitos do usuário.
- Navegação por categorias, como dicas de estudo, sono e desempenho.

---

#### 7.1 Dicas para Estudo (`07.1_Dicas_para_Estudo.html`)
- Clique na roleta para exibir dicas aleatórias.
- Sugestões de técnicas como método Pomodoro e mapas mentais.
- Organização de tempo e gerenciamento de prazos.

---

#### 7.2 Dicas para Dormir (`07.2_Dicas_para_Dormir.html`)
- Clique na roleta para exibir dicas de sono.
- Calculadora de horários de dormir e acordar, considerando ciclos de sono.
- Entrada de dados para compromissos, exibindo horário ideal para acordar e tempo total de descanso.

---

#### 7.3 Dicas para Desempenho (`07.3_Dicas_para_Desempenho.html`)
- Clique na roleta para acessar dicas de produtividade.
- Avaliação de tarefas por categoria e tempo gasto.

---

### 8. Perfil (`08_Perfil.html`)
- Permite editar informações pessoais:
  - Nome completo.
  - Idade.
  - Email.
  - Nome de usuário.
- Configurações de preferências, como notificações.

---

### 9. Suporte e Feedback (`09_Suporte_Feedback.html`)
- Formulário para envio de dúvidas, relatórios de problemas ou sugestões.
- Integração com o email para notificação direta da equipe de suporte.
- FAQ com respostas para as questões mais frequentes.

---

## Como Executar o Projeto
- DIGITE " npm start " no terminal
- Vá para o arquivo " about.html " e acione o live server
- Leia sobre o projeto e inicie o app clicando no botao " Iniciar App "
- Caso queira saber mais sobre o projeto clique em " Ver Informações ", você será encaminhado a uma pagina que contém todas as telas funcionando, entretanto em miniatura
