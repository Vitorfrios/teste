import time
import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
import pyautogui
import os

# Configurações iniciais
caminho_chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
site_url = "https://www.infinityschool.app/area/"
dados_usuario = {
    "cpf": "12055250680",
    "data_nascimento": "21102004"
}



def executar_fluxo():
    selecionar_tela1()
    # Move o mouse para a posição desejada (x=500, y=300)
    pyautogui.moveTo(500, 300)
    # Realiza o clique do mouse
    pyautogui.click()
    
    # Abrir a primeira instância do navegador
    driver1 = webdriver.Chrome()
    driver1.get(site_url)
    # Inserir dados e acessar
    driver1.find_element(By.XPATH, '//*[@id="geral_home"]/form/input[1]').send_keys(dados_usuario["cpf"])
    driver1.find_element(By.XPATH, '//*[@id="data_nascimento"]').send_keys(dados_usuario["data_nascimento"])
    driver1.find_element(By.XPATH, '//*[@id="geral_home"]/form/button').click()
    time.sleep(2)
    
    # Fluxo da primeira aba (presença)
    marcar_presenca(driver1)

    # Fechar o primeiro navegador antes de abrir o segundo
    driver1.quit()

    # Abrir a segunda instância do navegador apenas após o fechamento da primeira
    driver2 = webdriver.Chrome()
    driver2.get(site_url)
    # Inserir dados e acessar
    driver2.find_element(By.XPATH, '//*[@id="geral_home"]/form/input[1]').send_keys(dados_usuario["cpf"])
    driver2.find_element(By.XPATH, '//*[@id="data_nascimento"]').send_keys(dados_usuario["data_nascimento"])
    driver2.find_element(By.XPATH, '//*[@id="geral_home"]/form/button').click()
    time.sleep(2)

    # Fluxo da segunda aba (aulas compartilhadas)
    inscrever_em_aulas(driver2)

    # Finaliza o segundo navegador
    driver2.quit()

    selecionar_extender()
        # Move o mouse para a posição desejada (x=500, y=300)
    pyautogui.moveTo(500, 300)
    # Realiza o clique do mouse
    pyautogui.click()


def marcar_presenca(driver):
    driver.find_element(By.XPATH, '//*[@id="geral_home"]/div[2]/form[1]/button').click()  # Botão "Marcar Presença"
    time.sleep(2)

    # Presença em aula compartilhada
    driver.find_element(By.XPATH, '//*[@id="geral_home"]/form[2]/button').click()
    presenca_compartilhada = processar_presenca(driver)
    time.sleep(5)

    # Presença em supermódulo
    driver.find_element(By.XPATH, '//*[@id="geral_home"]/form[4]/button').click()
    presenca_supermodulo = processar_presenca(driver)
    time.sleep(5)

    # Realizar processamento final apenas se ambas as presenças forem marcadas
    if presenca_compartilhada or presenca_supermodulo:
        realizar_processamento_final(driver)

def processar_presenca(driver):
    if verificar_input(driver, '//*[@id="token"]'):
        token = extrair_token(driver)
        driver.find_element(By.XPATH, '//*[@id="token"]').send_keys(token)
        time.sleep(2)
        driver.find_element(By.XPATH, '//*[@id="submit-button"]').click()
        return True
    else:
        return False

def realizar_processamento_final(driver):
    time.sleep(2)

    driver.maximize_window()
    time.sleep(2)

    rolar_para_baixo(200)
    time.sleep(2)

    dar_zoom_na_tela(3)
    time.sleep(3)

    capturar_tela()
    time.sleep(3)

    abrir_whatsapp()
    time.sleep(3)

    localizar_grupo("Aulas infinity")
    time.sleep(2)

    enviar_imagem()
    time.sleep(2)


def inscrever_em_aulas(driver):
    driver.find_element(By.XPATH, '//*[@id="geral_home"]/div[2]/div[2]/div[1]/form[2]/button').click()  # Botão "Aulas Compartilhadas"
    time.sleep(2)
    driver.maximize_window()

    while True:
        botoes_inscricao = driver.find_elements(By.XPATH, '//*[@id="geral_home"]/form[2]/div/button')
        if not botoes_inscricao:
            break

        for botao in botoes_inscricao:
            botao.click()
            time.sleep(1)
            driver.find_element(By.XPATH, '//*[@id="geral_home"]/form/button').click()  # Botão "Voltar"
            time.sleep(2)
            driver.find_element(By.XPATH, '//*[@id="geral_home"]/div[2]/div[2]/div[1]/form[2]/button').click()  # Botão "Aulas Compartilhadas"
            time.sleep(2)

# Funções auxiliares
def verificar_input(driver, xpath):
    try:
        driver.find_element(By.XPATH, xpath)
        return True
    except:
        return False

def extrair_token(driver):
    script_xpath = '//*[@id="geral_home"]/script'
    script_content = driver.find_element(By.XPATH, script_xpath).get_attribute("innerHTML")
    token = script_content.split('"')[1]
    return token

def selecionar_tela1():
    pyautogui.hotkey('win', 'p')
    time.sleep(1.5)
    for _ in range(2):
        down()
    time.sleep(0.2)
    pyautogui.press('enter')

def selecionar_extender():
    pyautogui.hotkey('win', 'p')
    time.sleep(1.5)
    down()
    time.sleep(0.2)
    pyautogui.press('enter')

def dar_zoom_na_tela(niveis=1):
    for _ in range(niveis):
        pyautogui.hotkey('ctrl', '+')
        time.sleep(1)

def rolar_para_baixo(quantidade=200):
    pyautogui.scroll(-quantidade)

def capturar_tela():
    pyautogui.press('prtsc')
    time.sleep(3)

def abrir_whatsapp():
    caminho_whatsapp = r"C:\\Users\\vitor\\OneDrive\\Área de Trabalho\\WhatsApp.lnk"
    os.startfile(caminho_whatsapp)
    time.sleep(3)

def localizar_grupo(grupo_nome):
    pyautogui.hotkey('ctrl', 'f')
    time.sleep(1)
    pyautogui.hotkey('ctrl', 'a')
    time.sleep(1)
    pyautogui.press('delete')
    time.sleep(1)
    pyautogui.write(grupo_nome)
    time.sleep(2)
    pyautogui.press('tab')
    time.sleep(2)
    pyautogui.press('enter')
    time.sleep(2)

def enviar_imagem():
    dia_atual = datetime.datetime.now().strftime("%d/%m/%Y")
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(2)
    mensagem = f"Aula - {dia_atual}"
    for linha in mensagem.split('\n'):
        pyautogui.write(linha)
        pyautogui.hotkey('shift', 'enter')
    time.sleep(2)
    pyautogui.press('enter')

def down():
    pyautogui.hotkey('win', 'p')
    pyautogui.press('down')

    time.sleep(0.2)  # Breve pausa para garantir que a tecla foi registrada

if __name__ == "__main__":
    executar_fluxo()

