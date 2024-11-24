import json

# Função para ler o arquivo JSON e calcular a duração estimada por categoria
def calculate_duration_by_category(file_path):
    try:
        # Abrir e carregar o arquivo JSON com a codificação utf-8
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        
        # Verificar se a estrutura do JSON é válida
        if 'tarefas' not in data or 'listaDeTarefas' not in data['tarefas']:
            print("Estrutura de dados inválida no arquivo JSON.")
            return
        
        tarefas = data['tarefas']['listaDeTarefas']
        
        # Inicializar um dicionário para armazenar as durações por categoria
        category_durations = {}

        # Iterar pelas tarefas e somar a estimatedDuration por categoria
        for task in tarefas:
            category = task.get('category', 'Desconhecida')
            estimated_duration = task.get('estimatedDuration', 0)
            
            if category in category_durations:
                category_durations[category] += estimated_duration
            else:
                category_durations[category] = estimated_duration
        
        # Exibir o resultado no terminal
        print("Duração estimada por categoria:")
        for category, duration in category_durations.items():
            print(f"{category}: {duration} minutos")

    except FileNotFoundError:
        print(f"Arquivo {file_path} não encontrado.")
    except json.JSONDecodeError:
        print("Erro ao decodificar o arquivo JSON.")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")

# Caminho para o arquivo JSON
file_path = 'TESTE3/codigo/db/db.json'

# Chamar a função para calcular e exibir as durações
calculate_duration_by_category(file_path)
