import os
import xml.etree.ElementTree as ET

preHtml = """
<!DOCTYPE html>
<html>
    <head>
        <title>Ruas de Braga</title>
        <meta name = "viewport" content = "width = device-width, initial-scale = 1">
        <link rel = "stylesheet" href = "w3.css">
        <meta charset = "UTF-8">
    </head>

    <body>
        <div class = "w3-container w3-green">
            <h1>Ruas de Braga</h1>
        </div>
        <div class = "w3-container">
            <h2>Lista de Ruas</h2>
            <ul class = "w3-ul">
"""

postHtml = """
            </ul>
        </div>
        <footer class = "w3-container w3-green">
            <h5>EMD::EngWeb2024::A97396</h5>
        </footer>
    <div>
</body>
</html>
""" 

dir = os.getcwd()
dir_ruas = os.path.join(dir, "MapaRuas-materialBase/texto")
dir_imagens = os.path.join(dir, "MapaRuas-materialBase/imagem")

lista_ruas = []

for file in os.listdir(dir_ruas):

    if file.endswith(".xml"):
        path = os.path.join(dir_ruas, file)
        tree = ET.parse(path)
        root = tree.getroot()
        for rua in root.findall('meta'):
            lista_ruas.append((rua.find('número').text, rua.find('nome').text, file))

lista_ruas.sort(key=lambda x: int(x[0]))

miolo = ""

for numero, nome, file in lista_ruas:
    
    ss = f"{file.split('.')[0]}.html"
    miolo += f"""
                <li>
                    <a href = "{ss}">{numero} - {nome}</a>
                </li>
    """

finalHtml = preHtml + miolo + postHtml

with open("index.html", "w") as file:
    file.write(finalHtml)
