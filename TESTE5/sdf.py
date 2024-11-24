import os

def contar_linhas_diretorio(diretorio):
    total_linhas = 0
    linhas_por_arquivo = {}

    # Percorre todos os arquivos do diretório
    for root, dirs, files in os.walk(diretorio):
        for file in files:
            # Caminho completo do arquivo
            caminho_arquivo = os.path.join(root, file)

            # Verifica se é um arquivo de código (extensões comuns)
            if caminho_arquivo.endswith(('.js', '.html', '.css','.json')):
                with open(caminho_arquivo, 'r', encoding='utf-8') as f:
                    linhas = f.readlines()
                    num_linhas = len(linhas)

                    # Armazena o número de linhas do arquivo
                    linhas_por_arquivo[caminho_arquivo] = num_linhas
                    total_linhas += num_linhas

    return linhas_por_arquivo, total_linhas

# Caminho do diretório
diretorio = 'codigo'

# Chama a função e imprime o resultado
linhas_por_arquivo, total_linhas = contar_linhas_diretorio(diretorio)
print("Linhas por arquivo:")
for arquivo, linhas in linhas_por_arquivo.items():
    print(f"{arquivo}: {linhas} linhas")
print(f"\nTotal de linhas de código: {total_linhas}")




def substituir_texto_em_arquivos(diretorio, mapeamento, extensoes):
    for raiz, _, arquivos in os.walk(diretorio):
        for arquivo in arquivos:
            if any(arquivo.endswith(ext) for ext in extensoes):
                caminho_arquivo = os.path.join(raiz, arquivo)
                with open(caminho_arquivo, 'r', encoding='utf-8') as file:
                    conteudo = file.read()
                
                conteudo_original = conteudo
                for texto_antigo, texto_novo in mapeamento.items():
                    conteudo = conteudo.replace(texto_antigo, texto_novo)
                
                if conteudo != conteudo_original:
                    with open(caminho_arquivo, 'w', encoding='utf-8') as file:
                        file.write(conteudo)
                    print(f"Alterado: {caminho_arquivo}")

# Configurações

# Mapear textos antigos e novos para cada tipo de comentário
mapeamento = {
    """<!--
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npx json-server --watch codigo/db/db.json --port 3000
-->""": """<!--
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npm start 
-->""",
    """/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npx json-server --watch codigo/db/db.json --port 3000
*/""": """/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npm start 
*/""",
    """//
// COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
// npx json-server --watch codigo/db/db.json --port 3000
//""": """//
// COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
// npm start 
//"""
}

# Extensões de arquivos que serão processadas
extensoes_alvo = ['.html', '.js', '.css']

# Executar a substituição
substituir_texto_em_arquivos(diretorio, mapeamento, extensoes_alvo)





import os
import re

def processar_arquivos_html(diretorio):
    for raiz, _, arquivos in os.walk(diretorio):
        for arquivo in arquivos:
            if arquivo.endswith('.html'):
                caminho_arquivo = os.path.join(raiz, arquivo)
                
                with open(caminho_arquivo, 'r', encoding='utf-8') as file:
                    conteudo = file.read()
                
                # Remover o item com ID "progresso"
                conteudo_atualizado = re.sub(
                    r'\s*<li id="progresso">.*?</li>', 
                    '', 
                    conteudo, 
                    flags=re.DOTALL
                )
                
                # Reordenar os IDs restantes
                conteudo_atualizado = re.sub(
                    r'<li id="sugestao"><a href="../pages/\d{2}_Sugestao\.html">',
                    '<li id="sugestao"><a href="../pages/07_Sugestao.html">',
                    conteudo_atualizado
                )
                conteudo_atualizado = re.sub(
                    r'<li id="perfil"><a href="../pages/\d{2}_Perfil\.html">',
                    '<li id="perfil"><a href="../pages/08_Perfil.html">',
                    conteudo_atualizado
                )
                conteudo_atualizado = re.sub(
                    r'<li id="feedback"><a href="../pages/\d{2}_Suporte_Feedback\.html">',
                    '<li id="feedback"><a href="../pages/9_Suporte_Feedback.html">',
                    conteudo_atualizado
                )
                
                # Se algo mudou, salva as alterações
                if conteudo != conteudo_atualizado:
                    with open(caminho_arquivo, 'w', encoding='utf-8') as file:
                        file.write(conteudo_atualizado)
                    print(f"Alterado: {caminho_arquivo}")

# Configurações
diretorio_alvo = 'codigo'  # Substitua pelo caminho do diretório onde estão os arquivos HTML

# Executar a função
processar_arquivos_html(diretorio_alvo)
