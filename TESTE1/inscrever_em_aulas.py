import time
import os
import pyautogui

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from datetime import datetime

def salvar_aulas(aulas_info, nome_arquivo='aulas_salvas.txt'):
    """Salva as informações das aulas em um arquivo de texto."""
    with open(nome_arquivo, 'w', encoding='utf-8') as f:
        for info in aulas_info:
            f.write(f"Nome da aula: {info[0]}\n")
            f.write(f"Data da aula: {info[1]}\n")
            f.write(f"Horário da aula: {info[2]}\n")
            f.write("-" * 30 + "\n")
    print(f"As aulas foram salvas em {nome_arquivo}")

def login_e_verificar_aulas(cpf, data_nascimento):
    # Configura o driver do Selenium
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)

    try:
        # Login
        driver.get("https://www.infinityschool.app/area/")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "projectFilePath")))

        # Insira o CPF
        campo_cpf = driver.find_element(By.NAME, "projectFilePath")
        campo_cpf.send_keys(cpf)

        # Insira a data de nascimento
        campo_nascimento = driver.find_element(By.ID, "data_nascimento")
        campo_nascimento.send_keys(data_nascimento)

        # Clica em acessar
        botao_acessar = driver.find_element(By.XPATH, "//button[contains(text(),'Acessar')]")
        botao_acessar.click()
        WebDriverWait(driver, 10).until(EC.url_to_be("https://www.infinityschool.app/handle_data"))
        print("--------------------------------------------")
        print("Login bem-sucedido!")


        driver.execute_script("window.scrollBy(0, 60);")
        time.sleep(5)  # Espera para garantir que a ação foi registrada

        # Clicar no botão para ver as aulas disponíveis
        WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, '//*[@id="geral_home"]/div[2]/div[2]/div[1]/form[2]/button'))
        ).click()


        # Capturar todas as aulas disponíveis e já inscritas
        aulas = driver.find_elements(By.CLASS_NAME, "aulas_compartilhadas")
        print("--------------------------------------------")
        print(f"Total de aulas encontradas: {len(aulas)}")  # Verificar o total de aulas encontradas

        # Lista para armazenar todas as aulas (disponíveis e já inscritas)
        todas_as_aulas_info = []

        # Percorrer as aulas encontradas
        for aula in aulas:
            try:
                titulo_aula = aula.find_element(By.XPATH, ".//h3").text
                data_aula = aula.find_element(By.XPATH, ".//h4/span[contains(text(), 'Data')]/..").text
                horario_aula = aula.find_element(By.XPATH, ".//h4/span[contains(text(), 'Horário')]/..").text
                
                # Converter a data em formato datetime
                data_aula_obj = datetime.strptime(data_aula.split(': ')[1], "%d/%m/%Y")  # Formato esperado "DD/MM/AAAA"
                
                # Adicionar todas as aulas na lista
                todas_as_aulas_info.append((titulo_aula, data_aula, horario_aula, data_aula_obj))

            except Exception as e:
                print("--------------------------------------------")
                print(f"Erro ao capturar dados da aula: {e}")

        # Ordenar todas as aulas pela data
        todas_as_aulas_info.sort(key=lambda x: x[3])  # Ordenar por data

        # Exibir todas as aulas
        print("--------------------------------------------")
        print("\nTodas as aulas (disponíveis e já inscritas):")
        print("--------------------------------------------")
        total_aulas = len(todas_as_aulas_info)  # Contar total de aulas
        for info in todas_as_aulas_info:
            print(f"Nome da aula: {info[0]}")
            print(f"Data da aula: {info[1]}")
            print("-" * 30)

        if total_aulas == 0:
            print("Nenhuma aula encontrada.")
            print("--------------------------------------------")

        driver.execute_script("window.scrollBy(0, 200);")
        time.sleep(5)  # Espera para garantir que a ação foi registrada

        # Inscrição em aulas disponíveis
        try:
            form_aulas_disponiveis = driver.find_element(By.XPATH, '//*[@id="geral_home"]/form[1]')

            # A primeira ação é sempre para o primeiro formulário, que é para cancelar inscrições.
            if form_aulas_disponiveis.get_attribute("action") == "/excluir_workshop":
                print("--------------------------------------------")
                print("O formulário de cancelamento foi encontrado. Nenhuma inscrição pode ser feita aqui.")

            # Agora, encontramos o segundo formulário
            form_aulas_disponiveis = driver.find_element(By.XPATH, '//*[@id="geral_home"]/form[2]')
            print("--------------------------------------------")
            print(f"Ação do segundo formulário: {form_aulas_disponiveis.get_attribute('action')}")

            # Aqui, devemos procurar as aulas disponíveis neste segundo formulário
            aulas = form_aulas_disponiveis.find_elements(By.CLASS_NAME, "aulas_compartilhadas")

            if len(aulas) > 0:
                for aula in aulas:
                    # Rolando a tela para exibir o botão de inscrição
                    driver.execute_script("arguments[0].scrollIntoView(true);", aula)  # Rola a tela para a aula
                    time.sleep(3)  # Espera um pouco para garantir que a rolagem foi concluída

                    print("--------------------------------------------")
                    print("Inscrevendo na aula:", aula.find_element(By.XPATH, ".//h3").text)  # Mostra o nome da aula que está sendo inscrita
                    botao_inscrever = aula.find_element(By.CLASS_NAME, "button2")
                    botao_inscrever.click()
                    time.sleep(2)  # Espera para garantir que a ação foi registrada
            else:
                print("--------------------------------------------")
                print("Não existem aulas disponíveis para inscrição.")

        except Exception as e:
            print("--------------------------------------------")
            print(f"Erro ao localizar formulários: {e}")

        # Chamada da função para salvar as aulas
        salvar_aulas(todas_as_aulas_info)

        # Executar o arquivo calendar.py
    except Exception as e:
        print("--------------------------------------------")
        print(f"Erro em alguma coisa {e}")
    finally:
        driver.quit()
        print("--------------------------------------------")
        print("Programa encerrado.")
        print("--------------------------------------------")

        

    def enviar_mensagem_whatsapp(mensagem):
        caminho_whatsapp = r"C:\Users\vitor\OneDrive\Área de Trabalho\WhatsApp.lnk"
        
        print("Abrindo WhatsApp...")
        os.startfile(caminho_whatsapp)
        time.sleep(5)  # Aumentar o tempo para abrir o WhatsApp

        # Localize o grupo "Aulas Infinity"
        print("Procurando o grupo 'data das aulas'...")
        pyautogui.hotkey('ctrl', 'f')  # Abre a barra de busca
        time.sleep(3)  # Tempo para a barra de busca abrir
        pyautogui.write('data das aulas')  # Digita o nome do grupo
        time.sleep(3)  # Tempo para a busca ser feita

        # Pressiona a tecla Tab para navegar
        pyautogui.press('tab')  # Usa Tab para navegar até o grupo
        time.sleep(3)  # Espera um pouco para garantir que a navegação foi bem-sucedida

        # Pressiona Enter para selecionar o grupo
        pyautogui.press('enter')  # Seleciona o grupo
        time.sleep(3)  # Espera o grupo abrir


        
        # Escreve a mensagem lida do arquivo
        print("Escrevendo a mensagem...")
        for linha in mensagem.split('\n'):  # Quebra a mensagem por linha
            pyautogui.write(linha)  # Escreve a linha
            pyautogui.hotkey('shift', 'enter')  # Desce a linha com shift+enter para continuar na mesma mensagem
        time.sleep(2)  # Espera um pouco para garantir que a mensagem foi escrita
        pyautogui.press('enter')  # Envia a mensagem
        print("Mensagem enviada!")

    def ler_conteudo_arquivo(arquivo):
        """Função para ler o conteúdo de um arquivo e formatar as mensagens."""
        try:
            with open(arquivo, 'r', encoding='utf-8') as f:
                return f.read().strip()  # Lê o arquivo inteiro como uma única string

        except FileNotFoundError:
            print(f"O arquivo {arquivo} não foi encontrado.")
            return ""
        except Exception as e:
            print(f"Ocorreu um erro ao ler o arquivo: {e}")
            return ""

    # Usar as funções
    caminho_arquivo = 'aulas_salvas.txt'  # Especifique o caminho completo se necessário
    mensagem = ler_conteudo_arquivo(caminho_arquivo)

    if mensagem:  # Verifica se a mensagem não está vazia
        enviar_mensagem_whatsapp(mensagem)

        #Apagar o arquivo após o envio da mensagem
        try:
            os.remove(caminho_arquivo)  # Remove o arquivo
            print("Arquivo apagado com sucesso.")
        except Exception as e:
            print(f"Ocorreu um erro ao tentar remover o arquivo: {e}")
    else:
        print("Nenhuma mensagem para enviar.")





# Obter CPF e data de nascimento do usuário


# Realizar login, verificar aulas e exibir datas
login_e_verificar_aulas(12055250680, 21102004)#COLOCAR DADOS DA CONTA AQUI
