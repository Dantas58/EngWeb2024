import os
import xml.etree.ElementTree as ET


page_infos = []

def get_description(file):
    tree = ET.parse(file)
    root = tree.getroot()

    descriptions = []
    for child in root:
        if child.tag == "corpo":
            for corpo in child:
                if corpo.tag == "para":
                    lugar = next(corpo.iterfind('lugar'), None)
                    data = next(corpo.iterfind('data'), None)
                    entidade = next(corpo.iterfind('entidade'), None)
                    text = ''.join(text for text in corpo.itertext())
                    if lugar is not None:
                        text = text.replace(lugar.text, f'<b>{lugar.text}</b>')
                    if data is not None:
                        text = text.replace(data.text, f'<i>{data.text}</i>')
                    if entidade is not None:
                        text = text.replace(entidade.text, f'<b>{entidade.text}</b>')
                    descriptions.append(f"<p>{text}</p>\n")

    description = "".join(descriptions)
    return description

def get_images(num):
    
    images = []
    for file in os.listdir("../atual"):
        if(file.startswith(num + "-")):
            images.append(file)
    
    return images


def get_houses(house):

    num, owner, price, desc = "", "", "", ""
    for t in house:
        if t.tag == "número":
            num = t.text
        if t.tag == "enfiteuta":
            owner = t.text
        if t.tag == "foro":
            price = t.text
        if t.tag == "desc":
            para_t = t.find('para')
            if para_t is not None:
                para = "".join(para_t.itertext())
                for lugar in para_t.findall('lugar'):
                    para = para.replace(lugar.text, f"<b>{lugar.text}</b>")
                for data in para_t.findall('data'):
                    para = para.replace(data.text, f"<i>{data.text}</i>")
                for entidade in para_t.findall('entidade'):
                    para = para.replace(entidade.text, f"<b>{entidade.text}</b>")
                desc = "<p>" + para + "</p>\n"
    return (num, owner, price, desc)

os.chdir("MapaRuas-materialBase/texto")

for file in os.listdir():
    
    if file.endswith(".xml"):
        tree = ET.parse(file)
        root = tree.getroot()

        name = ""
        num = None
        desciption = get_description(file)
        houses = []
        images = []

        for child in root:
            if child.tag == "meta":
                
                for second_child in child:
                    if second_child.tag == "nome":
                        name = second_child.text
                    if second_child.tag == "número":
                        num = second_child.text
                        images = get_images(num)

            elif child.tag == "corpo":
                for corpo in child:
                    if corpo.tag == "lista-casas":
                        for list in corpo:
                            if list.tag == "casa":
                                houses.append(get_houses(list))

            elif child.tag == "imagem":
                images = get_images(file)
    
        page_infos.append((name, num, desciption, houses, images))


page_infos.sort(key=lambda x: int(x[1]))

os.chdir("..")

for page in page_infos:

    file = open("../paginasIndiv/" + page[0] + ".html", "w")

    preHtml = f"""
    <!DOCTYPE html>
    <html>
        <head>
            <title>{page[0]}</title>
            <meta name = "viewport" content = "width = device-width, initial-scale = 1">
            <link rel = "stylesheet" href = "w3.css">
            <meta charset = "UTF-8">
        </head>
        <body>
            <div class = "w3-container w3-center w3-green">
                <h1>{page[0]}</h1>
                <button class="w3-button w3-hover-green w3-lime w3-round-xxlarge"><a href="../index.html">Voltar à Página Inicial</a></button>
            </div>
            <div class="w3-container w3-center w3-lime">
                <h3><b>Fotos da Rua</b></h3>
            </div>
            <div class="w3-row-padding w3-margin-top">
    """

    for image in page[4]:
        preHtml += f"""
            <div class="w3-third">
                <div class="w3-card">
                    <img src="atual/{image}" style="width:100%">
                </div>
            </div>
        """

    preHtml += f"""
            </div>
        </div>    
        <br></br>
        <div class="example">
            <div class="w3-container w3-center w3-green">
            <h3><b>Descrição</b></h3>
            </div>
            {page[2]}
        </div>
        
        <div class="w3-container w3-center w3-green">
              <h3><b>Casas</b></h3>
            </div>

            <table class="w3-table-all">
              <thead>
                <tr class="w3-lime">
                  <th>Casa</th>
                  <th>Dono</th>
                  <th>Custo</th>
                  <th>Sobre</th>
                </tr>
              </thead>    
    """

    for house in page[3]:
        preHtml += f"""
              <tr>
                <td>{house[0]}</td>
                <td>{house[1]}</td>
                <td>{house[2]}</td>
                <td>{house[3]}</td>
              </tr>
        """

    postHtml = f"""
            </table>
        <br></br>
        <footer class="w3-container w3-green">
            <h5>EMD::EngWeb2024::A97396</h5>
        </footer>            
    </div>
    </body>
    </html> 
    """

    final_page = preHtml + postHtml;
    file.write(final_page)
    file.close()

