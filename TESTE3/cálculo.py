import json

# Dados JSON embutidos diretamente no código
tarefas_json = {
    "tasks": [
      {
        "id": 1,
        "name": "Projeto App",
        "description": "Desenvolvimento do aplicativo.",
        "Udate": "",
        "time": "12:30",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          7,
          6,
          1
        ],
        "estimatedDuration": 120
      },
      {
        "id": 2,
        "name": "Planejamento de semana",
        "description": "Planejar as atividades da semana.",
        "Udate": "",
        "time": "14:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          4,
          1
        ],
        "estimatedDuration": 60
      },
      {
        "id": 3,
        "name": "Revisão de metas",
        "description": "Revisar as metas estabelecidas.",
        "Udate": "",
        "time": "05:15",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          1,
          3
        ],
        "estimatedDuration": 30
      },
      {
        "id": 4,
        "name": "Reunião de Início de Projeto",
        "description": "Iniciar o projeto com a equipe.",
        "Udate": "",
        "time": "10:00",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          4,
          2
        ],
        "estimatedDuration": 60
      },
      {
        "id": 5,
        "name": "Sessão de Brainstorming",
        "description": "Brainstorming para novas ideias.",
        "Udate": "",
        "time": "14:15",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          4,
          2,
          5
        ],
        "estimatedDuration": 45
      },
      {
        "id": 6,
        "name": "Jantar em Família",
        "description": "Jantar com a família.",
        "Udate": "",
        "time": "08:30",
        "priority": "Baixa",
        "category": "Lazer",
        "date": [
          2,
          1,
          6
        ],
        "estimatedDuration": 120
      },
      {
        "id": 7,
        "name": "Reunião de Feedback",
        "description": "Coletar feedback sobre o projeto.",
        "Udate": "",
        "time": "07:15",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          1,
          3
        ],
        "estimatedDuration": 60
      },
      {
        "id": 8,
        "name": "Caminhada Noturna",
        "description": "Caminhada para relaxar.",
        "Udate": "",
        "time": "01:00",
        "priority": "Baixa",
        "category": "Lazer",
        "date": [
          5,
          3
        ],
        "estimatedDuration": 60
      },
      {
        "id": 9,
        "name": "Reunião",
        "description": "Reunião de alinhamento.",
        "Udate": "",
        "time": "21:15",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          1,
          4
        ],
        "estimatedDuration": 60
      },
      {
        "id": 10,
        "name": "Reunião de Avaliação",
        "description": "Avaliar o desempenho da equipe.",
        "Udate": "",
        "time": "18:30",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          4,
          1,
          7
        ],
        "estimatedDuration": 60
      },
      {
        "id": 11,
        "name": "Estudo de UX",
        "description": "Aprimorar conhecimentos em design de experiência do usuário.",
        "Udate": "",
        "time": "03:30",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          7,
          2
        ],
        "estimatedDuration": 120
      },
      {
        "id": 12,
        "name": "Feedback de Projeto",
        "description": "Coletar feedback sobre o projeto atual.",
        "Udate": "",
        "time": "03:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          6,
          2,
          5
        ],
        "estimatedDuration": 60
      },
      {
        "id": 13,
        "name": "Café da Manhã com Clientes",
        "description": "Reunião informal com clientes para discutir projetos.",
        "Udate": "",
        "time": "11:45",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          7,
          5
        ],
        "estimatedDuration": 60
      },
      {
        "id": 14,
        "name": "Análise de Resultados de Vendas",
        "description": "Analisar os resultados das vendas do mês.",
        "Udate": "",
        "time": "17:15",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          1,
          2,
          6
        ],
        "estimatedDuration": 60
      },
      {
        "id": 15,
        "name": "Revisão de Código",
        "description": "Revisar o código desenvolvido pela equipe.",
        "Udate": "",
        "time": "06:45",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          3,
          5
        ],
        "estimatedDuration": 60
      },
      {
        "id": 16,
        "name": "Reunião de Kickoff",
        "description": "Iniciar o projeto com a equipe.",
        "Udate": "",
        "time": "01:15",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          6,
          7,
          1
        ],
        "estimatedDuration": 60
      },
      {
        "id": 17,
        "name": "Estudo de UX",
        "description": "Aprimorar conhecimentos em design de experiência do usuário.",
        "Udate": "",
        "time": "00:30",
        "priority": "Média",
        "category": "Lazer",
        "date": [
          4,
          1,
          6
        ],
        "estimatedDuration": 820
      },
      {
        "id": 18,
        "name": "Feedback de Projeto",
        "description": "Coletar feedback sobre o projeto atual.",
        "Udate": "",
        "time": "23:45",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          3,
          6
        ],
        "estimatedDuration": 60
      },
      {
        "id": 19,
        "name": "Café da Manhã com Clientes",
        "description": "Reunião informal com clientes para discutir projetos.",
        "Udate": "",
        "time": "18:15",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          1,
          6
        ],
        "estimatedDuration": 60
      },
      {
        "id": 20,
        "name": "Revisão de Código",
        "description": "Revisar o código desenvolvido pela equipe.",
        "Udate": "",
        "time": "02:30",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          7,
          1
        ],
        "estimatedDuration": 60
      },
      {
        "id": 21,
        "name": "Análise de Mercado",
        "description": "Analisar o mercado para identificar oportunidades.",
        "Udate": "",
        "time": "17:45",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          4,
          3,
          2
        ],
        "estimatedDuration": 60
      },
      {
        "id": 22,
        "name": "Revisão de Metas",
        "description": "Revisar as metas estabelecidas.",
        "Udate": "",
        "time": "19:00",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          4,
          5
        ],
        "estimatedDuration": 30
      },
      {
        "id": 23,
        "name": "Análise de Concorrência",
        "description": "Analisar a concorrência e suas estratégias.",
        "Udate": "",
        "time": "10:30",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          7,
          3,
          2
        ],
        "estimatedDuration": 60
      },
      {
        "id": 24,
        "name": "Estudo de SEO",
        "description": "Aprimorar conhecimentos em SEO.",
        "Udate": "",
        "time": "18:00",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          5,
          2
        ],
        "estimatedDuration": 120
      },
      {
        "id": 25,
        "name": "Workshop de Inovação",
        "description": "Participar de um workshop sobre inovação.",
        "Udate": "",
        "time": "02:00",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          3,
          7,
          1
        ],
        "estimatedDuration": 120
      },
      {
        "id": 26,
        "name": "Reunião de Alinhamento",
        "description": "Alinhar as expectativas da equipe.",
        "Udate": "",
        "time": "09:45",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          7,
          1
        ],
        "estimatedDuration": 60
      },
      {
        "id": 27,
        "name": "Workshop de Criatividade",
        "description": "Participar de um workshop para estimular a criatividade.",
        "Udate": "",
        "time": "05:45",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          3,
          7,
          2
        ],
        "estimatedDuration": 90
      },
      {
        "id": 28,
        "name": "Feedback de Clientes",
        "description": "Coletar feedback dos clientes sobre os serviços.",
        "Udate": "",
        "time": "22:45",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          6,
          5,
          7
        ],
        "estimatedDuration": 60
      },
      {
        "id": 29,
        "name": "Análise de Resultados",
        "description": "Analisar os resultados das atividades realizadas.",
        "Udate": "",
        "time": "20:30",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          4,
          2,
          5
        ],
        "estimatedDuration": 60
      },
      {
        "id": 30,
        "name": "Estudo de Novas Tecnologias",
        "description": "Aprimorar conhecimentos sobre novas tecnologias.",
        "Udate": "",
        "time": "12:15",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          5,
          3
        ],
        "estimatedDuration": 120
      },
      {
        "id": 31,
        "name": "Workshop de Criatividade",
        "description": "Participar de um workshop para estimular a criatividade.",
        "Udate": "",
        "time": "11:00",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          5,
          2,
          3
        ],
        "estimatedDuration": 90
      },
      {
        "id": 32,
        "name": "Planejamento de Metas",
        "description": "Definir as metas para o próximo período.",
        "Udate": "",
        "time": "23:30",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          4,
          1
        ],
        "estimatedDuration": 60
      },
      {
        "id": 33,
        "name": "Reunião de Alinhamento",
        "description": "Alinhar as expectativas da equipe.",
        "Udate": "",
        "time": "06:15",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          1,
          5,
          4
        ],
        "estimatedDuration": 60
      },
      {
        "id": 34,
        "name": "Revisão de Documentos",
        "description": "Revisar documentos importantes.",
        "Udate": "",
        "time": "16:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          2,
          1
        ],
        "estimatedDuration": 60
      },
      {
        "id": 35,
        "name": "Reunião de Revisão de Projetos",
        "description": "Revisar o andamento dos projetos em curso.",
        "Udate": "",
        "time": "22:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          5,
          6
        ],
        "estimatedDuration": 60
      },
      {
        "id": 36,
        "name": "Estudo de Tendências",
        "description": "Estudar as tendências do mercado.",
        "Udate": "",
        "time": "05:30",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          3,
          1
        ],
        "estimatedDuration": 120
      },
      {
        "id": 37,
        "name": "Reunião de Planejamento",
        "description": "Planejar as atividades da semana.",
        "Udate": "",
        "time": "13:30",
        "priority": "Alta",
        "category": "Trabalho",
        "date ": [
          3
        ],
        "estimatedDuration": 60,
        "date": [
          3,
          5,
          7
        ]
      },
      {
        "id": 38,
        "name": "Almoço de Integração",
        "description": "Almoço para integrar a equipe.",
        "Udate": "",
        "time": "19:45",
        "priority": "Baixa",
        "category": "Lazer",
        "date": [
          6,
          2
        ],
        "estimatedDuration": 60
      },
      {
        "id": 39,
        "name": "Reunião de Resultados",
        "description": "Discutir os resultados das atividades.",
        "Udate": "",
        "time": "13:15",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          6,
          5,
          3
        ],
        "estimatedDuration": 60
      },
      {
        "id": 40,
        "name": "Estudo de Marketing Digital",
        "description": "Aprimorar conhecimentos em marketing digital.",
        "Udate": "",
        "time": "09:30",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          7,
          2,
          4
        ],
        "estimatedDuration": 120
      },
      {
        "id": 41,
        "name": "Análise de Resultados",
        "description": "Analisar os resultados das atividades realizadas.",
        "Udate": "",
        "time": "10:30",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          7,
          1,
          3
        ],
        "estimatedDuration": 60
      },
      {
        "id": 42,
        "name": "Reunião de Planejamento de Conteúdo",
        "description": "Planejar o conteúdo a ser produzido.",
        "Udate": "",
        "time": "17:30",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          4,
          5
        ],
        "estimatedDuration": 60
      },
      {
        "id": 43,
        "name": "Feedback de Performance",
        "description": "Coletar feedback sobre a performance da equipe.",
        "Udate": "",
        "time": "12:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          1,
          5
        ],
        "estimatedDuration": 60
      },
      {
        "id": 44,
        "name": "Reunião de Estratégia",
        "description": "Definir a estratégia para o próximo período.",
        "Udate": "",
        "time": "12:00",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          4,
          7
        ],
        "estimatedDuration": 60
      },
      {
        "id": 45,
        "name": "Revisão de Documentos Legais",
        "description": "Revisar documentos legais importantes.",
        "Udate": "",
        "time": "12:30",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          6,
          1
        ],
        "estimatedDuration": 60
      },
      {
        "id": 46,
        "name": "Reunião de Planejamento Estratégico",
        "description": "Planejar a estratégia da empresa.",
        "Udate": "",
        "time": "09:00",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          5,
          6,
          4
        ],
        "estimatedDuration": 60
      },
      {
        "id": 47,
        "name": "Almoço de Integração",
        "description": "Almoço para integrar a equipe.",
        "Udate": "",
        "time": "12:30",
        "priority": "Baixa",
        "category": "Lazer",
        "date": [
          6,
          4,
          2
        ],
        "estimatedDuration": 60
      },
      {
        "id": 48,
        "name": "Reunião de Resultados",
        "description": "Discutir os resultados das atividades.",
        "Udate": "",
        "time": "15:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          3,
          1,
          7
        ],
        "estimatedDuration": 60
      },
      {
        "id": 49,
        "name": "Estudo de Análise de Dados",
        "description": "Aprimorar conhecimentos em análise de dados.",
        "Udate": "",
        "time": "10:30",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          7,
          1,
          6
        ],
        "estimatedDuration": 120
      },
      {
        "id": 50,
        "name": "Feedback de Clientes",
        "description": "Coletar feedback dos clientes sobre os serviços.",
        "Udate": "",
        "time": "14:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          6,
          3
        ],
        "estimatedDuration": 60
      },
      {
        "id": 51,
        "name": "Reunião de Alinhamento de Equipe",
        "description": "Alinhar as expectativas da equipe.",
        "Udate": "",
        "time": "11:15",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          7,
          6
        ],
        "estimatedDuration": 60
      },
      {
        "id": 52,
        "name": "Revisão de Projetos em Andamento",
        "description": "Revisar o andamento dos projetos em curso.",
        "Udate": "",
        "time": "10:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          6,
          3
        ],
        "estimatedDuration": 60
      },
      {
        "id": 53,
        "name": "Reunião de Feedback",
        "description": "Coletar feedback sobre o projeto.",
        "Udate": "",
        "time": "14:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          1,
          3,
          2
        ],
        "estimatedDuration": 60
      },
      {
        "id": 54,
        "name": "Estudo de SEO",
        "description": "Aprimorar conhecimentos em SEO.",
        "Udate": "",
        "time": "16:00",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          2,
          3
        ],
        "estimatedDuration": 120
      },
      {
        "id": 55,
        "name": "Caminhada Matinal",
        "description": "Caminhada para começar o dia.",
        "Udate": "",
        "time": "08:30",
        "priority": "Baixa",
        "category": "Lazer",
        "date": [
          1,
          6
        ],
        "estimatedDuration": 60
      },
      {
        "id": 56,
        "name": "Café da Manhã com o Time",
        "description": "Reunião informal com a equipe.",
        "Udate": "",
        "time": "08:30",
        "priority": "Baixa",
        "category": "Lazer",
        "date": [
          5,
          3,
          6
        ],
        "estimatedDuration": 60
      },
      {
        "id": 57,
        "name": "Reunião de Kickoff",
        "description": "Iniciar o projeto com a equipe.",
        "Udate": "",
        "time": "09:00",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          1,
          4,
          2
        ],
        "estimatedDuration": 60
      },
      {
        "id": 58,
        "name": "Revisão de Metas",
        "description": "Revisar as metas estabelecidas.",
        "Udate": "",
        "time": "09:30",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          1,
          4
        ],
        "estimatedDuration": 30
      },
      {
        "id": 59,
        "name": "Análise de Resultados",
        "description": "Analisar os resultados das atividades realizadas.",
        "Udate": "",
        "time": "10:30",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          1,
          3
        ],
        "estimatedDuration": 60
      },
      {
        "id": 60,
        "name": "Estudo de Marketing Digital",
        "description": "Aprimorar conhecimentos em marketing digital.",
        "Udate": "",
        "time": "09:30",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          5,
          4,
          7
        ],
        "estimatedDuration": 120
      },
      {
        "id": 61,
        "name": "Reunião de Planejamento de Marketing",
        "description": "Planejar as estratégias de marketing.",
        "Udate": "",
        "time": "09:00",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          1,
          3
        ],
        "estimatedDuration": 60
      },
      {
        "id": 62,
        "name": "Estudo de Análise de Dados",
        "description": "Aprimorar conhecimentos em análise de dados.",
        "Udate": "",
        "time": "10:30",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          6,
          1,
          3
        ],
        "estimatedDuration": 120
      },
      {
        "id": 63,
        "name": "Feedback de Performance",
        "description": "Coletar feedback sobre a performance da equipe.",
        "Udate": "",
        "time": "12:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          4,
          2
        ],
        "estimatedDuration": 60
      },
      {
        "id": 64,
        "name": "Reunião de Feedback de Clientes",
        "description": "Coletar feedback dos clientes sobre os serviços.",
        "Udate": "",
        "time": "14:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          2,
          3,
          1
        ],
        "estimatedDuration": 60
      },
      {
        "id": 65,
        "name": "Reunião de Revisão de Projetos",
        "description": "Revisar o andamento dos projetos em curso.",
        "Udate": "",
        "time": "14:30",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          7,
          4
        ],
        "estimatedDuration": 60
      },
      {
        "id": 66,
        "name": "Workshop de Desenvolvimento Pessoal",
        "description": "Participar de um workshop sobre desenvolvimento pessoal.",
        "Udate": "",
        "time": "09:45",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          1,
          6,
          7
        ],
        "estimatedDuration": 120
      },
      {
        "id": 67,
        "name": "Reunião de Alinhamento",
        "description": "Alinhar as expectativas da equipe.",
        "Udate": "",
        "time": "11:15",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          2,
          6
        ],
        "estimatedDuration": 60
      },
      {
        "id": 68,
        "name": "Análise de Resultados de Vendas",
        "description": "Analisar os resultados das vendas do mês.",
        "Udate": "",
        "time": "11:30",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          4,
          7
        ],
        "estimatedDuration": 60
      },
      {
        "id": 69,
        "name": "Reunião de Início de Projeto",
        "description": "Iniciar o projeto com a equipe.",
        "Udate": "",
        "time": "10:00",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          5,
          1
        ],
        "estimatedDuration": 60
      },
      {
        "id": 70,
        "name": "Sessão de Brainstorming",
        "description": "Brainstorming para novas ideias.",
        "Udate": "",
        "time": "10:15",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          7,
          3
        ],
        "estimatedDuration": 45
      },
      {
        "id": 71,
        "name": "Jantar em Família",
        "description": "Jantar com a família.",
        "Udate": "",
        "time": "11:00",
        "priority": "Baixa",
        "category": "Lazer",
        "date": [
          1,
          4
        ],
        "estimatedDuration": 120
      },
      {
        "id": 72,
        "name": "Reunião de Feedback",
        "description": "Coletar feedback sobre o projeto.",
        "Udate": "",
        "time": "14:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          1,
          4,
          5
        ],
        "estimatedDuration": 60
      },
      {
        "id": 73,
        "name": "Caminhada Noturna",
        "description": "Caminhada para relaxar.",
        "Udate": "",
        "time": "18:00",
        "priority": "Baixa",
        "category": "Lazer",
        "date": [
          3,
          1,
          7
        ],
        "estimatedDuration": 60
      },
      {
        "id": 74,
        "name": "Reunião",
        "description": "Re união de alinhamento.",
        "Udate": "",
        "time": "21:00",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          3,
          7,
          6
        ],
        "estimatedDuration": 60
      },
      {
        "id": 75,
        "name": "Reunião de Avaliação",
        "description": "Avaliar o desempenho da equipe.",
        "Udate": "",
        "time": "15:30",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          2,
          6
        ],
        "estimatedDuration": 60
      },
      {
        "id": 76,
        "name": "Reunião de Planejamento de Conteúdo",
        "description": "Planejar o conteúdo a ser produzido.",
        "Udate": "",
        "time": "09:00",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          7,
          1,
          6
        ],
        "estimatedDuration": 60
      },
      {
        "id": 77,
        "name": "Estudo de UX",
        "description": "Aprimorar conhecimentos em design de experiência do usuário.",
        "Udate": "",
        "time": "10:30",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          6,
          1,
          2
        ],
        "estimatedDuration": 120
      },
      {
        "id": 78,
        "name": "Feedback de Projeto",
        "description": "Coletar feedback sobre o projeto atual.",
        "Udate": "",
        "time": "11:30",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          2,
          4
        ],
        "estimatedDuration": 60
      },
      {
        "id": 79,
        "name": "Café da Manhã com Clientes",
        "description": "Reunião informal com clientes para discutir projetos.",
        "Udate": "",
        "time": "09:15",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          3,
          6
        ],
        "estimatedDuration": 60
      },
      {
        "id": 80,
        "name": "Revisão de Código",
        "description": "Revisar o código desenvolvido pela equipe.",
        "Udate": "",
        "time": "10:00",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          4,
          3
        ],
        "estimatedDuration": 60
      },
      {
        "id": 81,
        "name": "Análise de Mercado",
        "description": "Analisar o mercado para identificar oportunidades.",
        "Udate": "",
        "time": "12:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          3,
          1
        ],
        "estimatedDuration": 60
      },
      {
        "id": 82,
        "name": "Revisão de Metas",
        "description": "Revisar as metas estabelecidas.",
        "Udate": "",
        "time": "09:30",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          6,
          2
        ],
        "estimatedDuration": 30
      },
      {
        "id": 83,
        "name": "Análise de Concorrência",
        "description": "Analisar a concorrência e suas estratégias.",
        "Udate": "",
        "time": "11:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          2,
          6,
          5
        ],
        "estimatedDuration": 60
      },
      {
        "id": 84,
        "name": "Estudo de SEO",
        "description": "Aprimorar conhecimentos em SEO.",
        "Udate": "",
        "time": "16:00",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          3,
          7
        ],
        "estimatedDuration": 120
      },
      {
        "id": 85,
        "name": "Workshop de Inovação",
        "description": "Participar de um workshop sobre inovação.",
        "Udate": "",
        "time": "13:00",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          3,
          6,
          5
        ],
        "estimatedDuration": 120
      },
      {
        "id": 86,
        "name": "Reunião de Alinhamento",
        "description": "Alinhar as expectativas da equipe.",
        "Udate": "",
        "time": "11:15",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          1,
          7,
          3
        ],
        "estimatedDuration": 60
      },
      {
        "id": 87,
        "name": "Workshop de Criatividade",
        "description": "Participar de um workshop para estimular a criatividade.",
        "Udate": "",
        "time": "09:45",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          1,
          4,
          2
        ],
        "estimatedDuration": 90
      },
      {
        "id": 88,
        "name": "Feedback de Clientes",
        "description": "Coletar feedback dos clientes sobre os serviços.",
        "Udate": "",
        "time": "14:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          5,
          7,
          1
        ],
        "estimatedDuration": 60
      },
      {
        "id": 89,
        "name": "Análise de Resultados",
        "description": "Analisar os resultados das atividades realizadas.",
        "Udate": "",
        "time": "10:30",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          4,
          3,
          2
        ],
        "estimatedDuration": 60
      },
      {
        "id": 90,
        "name": "Estudo de Novas Tecnologias",
        "description": "Aprimorar conhecimentos sobre novas tecnologias.",
        "Udate": "",
        "time": "15:30",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          4,
          3,
          5
        ],
        "estimatedDuration": 120
      },
      {
        "id": 91,
        "name": "Reunião de Kickoff",
        "description": "Iniciar o projeto com a equipe.",
        "Udate": "",
        "time": "09:00",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          7,
          5,
          4
        ],
        "estimatedDuration": 60
      },
      {
        "id": 92,
        "name": "Estudo de UX",
        "description": "Aprimorar conhecimentos em design de experiência do usuário.",
        "Udate": "",
        "time": "10:30",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          4,
          3
        ],
        "estimatedDuration": 120
      },
      {
        "id": 93,
        "name": "Feedback de Projeto",
        "description": "Coletar feedback sobre o projeto atual.",
        "Udate": "",
        "time": "11:30",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          1,
          7,
          3
        ],
        "estimatedDuration": 60
      },
      {
        "id": 94,
        "name": "Café da Manhã com Clientes",
        "description": "Reunião informal com clientes para discutir projetos.",
        "Udate": "",
        "time": "09:15",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          5,
          3
        ],
        "estimatedDuration": 60
      },
      {
        "id": 95,
        "name": "Revisão de Código",
        "description": "Revisar o código desenvolvido pela equipe.",
        "Udate": "",
        "time": "10:00",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          4,
          7,
          2
        ],
        "estimatedDuration": 60
      },
      {
        "id": 96,
        "name": "Análise de Mercado",
        "description": "Analisar o mercado para identificar oportunidades.",
        "Udate": "",
        "time": "12:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          4,
          2,
          3
        ],
        "estimatedDuration": 60
      },
      {
        "id": 97,
        "name": "Revisão de Metas",
        "description": "Revisar as metas estabelecidas.",
        "Udate": "",
        "time": "09:30",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          2,
          1,
          4
        ],
        "estimatedDuration": 30
      },
      {
        "id": 98,
        "name": "Análise de Concorrência",
        "description": "Analisar a concorrência e suas estratégias.",
        "Udate": "",
        "time": "11:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          5,
          1,
          3
        ],
        "estimatedDuration": 60
      },
      {
        "id": 99,
        "name": "Estudo de SEO",
        "description": "Aprimorar conhecimentos em SEO.",
        "Udate": "",
        "time": "16:00",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          2,
          6
        ],
        "estimatedDuration": 120
      },
      {
        "id": 100,
        "name": "Workshop de Inovação",
        "description": "Participar de um workshop sobre inovação.",
        "Udate": "",
        "time": "13:00",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          6,
          4,
          1
        ],
        "estimatedDuration": 120
      },
      {
        "id": 101,
        "name": "Reunião de Alinhamento",
        "description": "Alinhar as expectativas da equipe.",
        "Udate": "",
        "time": "11:15",
        "priority": "Alta",
        "category": "Trabalho",
        "date": [
          3,
          6
        ],
        "estimatedDuration": 60
      },
      {
        "id": 102,
        "name": "Workshop de Criatividade",
        "description": "Participar de um workshop para estimular a criatividade.",
        "Udate": "",
        "time": "09:45",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          7,
          6,
          3
        ],
        "estimatedDuration": 90
      },
      {
        "id": 103,
        "name": "Feedback de Clientes",
        "description": "Coletar feedback dos clientes sobre os serviços.",
        "Udate": "",
        "time": "14:00",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          1,
          3
        ],
        "estimatedDuration": 60
      },
      {
        "id": 104,
        "name": "Análise de Resultados",
        "description": "Analisar os resultados das atividades realizadas.",
        "Udate": "",
        "time": "10:30",
        "priority": "Média",
        "category": "Trabalho",
        "date": [
          2,
          6
        ],
        "estimatedDuration": 60
      },
      {
        "id": 105,
        "name": "Estudo de Novas Tecnologias",
        "description": "Aprimorar conhecimentos sobre novas tecnologias.",
        "Udate": "",
        "time": "15:30",
        "priority": "Média",
        "category": "Estudo",
        "date": [
          4,
          5,
          2
        ],
        "estimatedDuration": 120
      }
        # Adicione mais tarefas conforme necessário
    ]
}

# Função para somar a duração estimada por categoria
def somar_duracao_por_categoria(tarefas):
    # Dicionário para armazenar a soma das durações por categoria
    duracao_por_categoria = {}
    
    for tarefa in tarefas:
        categoria = tarefa.get("category")
        duracao = tarefa.get("estimatedDuration", 0)
        
        if categoria not in duracao_por_categoria:
            duracao_por_categoria[categoria] = 0
        
        duracao_por_categoria[categoria] += duracao
    
    return duracao_por_categoria

# Somar a duração das tarefas por categoria
duracao_categoria = somar_duracao_por_categoria(tarefas_json["tasks"])

# Exibir o relatório da duração por categoria
for categoria, duracao_total in duracao_categoria.items():
    print(f"Categoria: {categoria}, Duração Total: {duracao_total} minutos")
