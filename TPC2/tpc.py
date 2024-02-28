import json


with open("mapa-virtual.json", "r") as file:
    data = json.load(file)

def get_connections(id):
    
    connections = []
    for city in data["ligacoes"]:
        if (city["origem"] == id):
            connections.append(city)
    
    return connections

def city_by_id(id):
    for city in data["cidades"]:
        if city["id"] == id:
            return city["nome"]

def index_page():

    preHTML = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>TPC</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" charset="utf-8">
        <link rel="stylesheet" href="w3.css">
    </head> 
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-orange">
                <h1>Lista de Cidades</h1>
            </header>
            
            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
    """

    postHTML = """
                </ul>
            </div>
            <footer class="w3-container w3-orange">
                <h5>TPC2::EngWeb2024::A97396</h5>
            </footer>
        </div>    
    </body>
    </html>
    """

    middleHTML = ""

    for city in data["cidades"]:
        middleHTML += f"""
                        <li>
                        <a href="http://localhost:7777/{city["id"]}">{city["nome"]}</a>
                        </li>"""
    
    finalHTML = preHTML + middleHTML + postHTML

    with open("index.html", "w") as file:
        file.write(finalHTML)

def indiv_pages():

    for city in data["cidades"]:
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" charset="utf-8">
            <title>{city["nome"]}</title>
            <link rel="stylesheet" href="w3.css">
        </head> 
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-orange">
                    <h1>{city["nome"]}</h1>
                </header>
                
                <div>
                    <h3>Sobre a Cidade</h3>
                        <p>ID: {city["id"]}</p>
                        <p>Nome: {city["nome"]}</p>
                        <p>Descrição: {city["descrição"]}</p>
                        <p>População: {city["população"]}</p>
                        <p>Distrito: {city["distrito"]}</p>
                    
                    <h3>Ligações</h3>
                        <table class="w3-table-all w3-card-4">
                            <tr class="w3-amber">
                                <th>ID</th>
                                <th>Destino</th>
                                <th>Distância</th>
                            </tr>
    """

        for connection in get_connections(city["id"]):
            html += f"""
                            <tr>
                                <td>{connection["id"]}</td>
                                <td><a href="http://localhost:7777/{connection["destino"]}">{city_by_id(connection["destino"])}</a</td>
                                <td>{connection["distância"]}</td>
                            </tr>
            """

        html += """
                        </table>
                </div>
                <footer class="w3-container w3-orange">
                    <h5>TPC2::EngWeb2024::A97396</h5>
                </footer>
            </div>
        </body>
        </html>
        """

        with open(f"paginasIndiv/{city['id']}.html", "w") as file:
            file.write(html)

index_page()
indiv_pages()
