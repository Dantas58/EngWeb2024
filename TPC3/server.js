var http = require('http');
var fs = require('fs');
var url = require('url');
var axios = require('axios');


function preHTML(title){
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${title}</title>
        <link rel="stylesheet" href="w3.css">
    </head>
    <body>
    `
}

var posHTML = `<footer class="w3-container w3-pink">
    <h5>EngWeb2024::A97396</h5>
    </footer>
    </body>
    </html>`

var home = preHTML("Filmes") + 
            `<header class="w3-container w3-pink">
                <h3>Filmes</h3>
            </header>
            <div class="w3-container">
                <ul class="w3-ul">
                    <li><a href="/filmes">Filmes</a></li>
                    <li><a href="/generos">Generos</a></li>
                    <li><a href="/atores">Atores</a></li>
                </ul>
            </div>` + posHTML

function movies(data){

    html = preHTML(data.title) + 
        
        `<header class="w3-container w3-pink">
        <h3>Filmes</h3>
        </header>
        <div class="w3-container">
        <table class="w3-table w3-striped">
        <tr>
            <th> Titulo </th>
            <th> Ano </th>
        </tr>`

    data.forEach(elem => {
        html += `<tr>
            <td><a href = '/filmes/${elem._id.$oid}'>${elem.title}</a></td>
            <td>${elem.year}</td>
        </tr>`
    })

    html += `</table>
    </div>` + posHTML

    return html
}

function movie(id, data){

    console.log("ID: " + id)
    var filme = data.find(elem => elem._id.$oid == id)
    console.log(filme)
    if (!filme) {
        console.log('No movie found with the given id.')
    }
    html = preHTML(filme.title) + 
            `<div class="w3-card-4">
                <header class="w3-container w3-pink">
                    <h1>${filme.title}</h1>
                </header>
                <div class="w3-container">
                    <p>ID: ${filme._id.$oid}</p>
                    <p>Ano: ${filme.year}</p>
                    <p>Genero: ${filme.genres}</p>
                    <p>Atores: ${filme.cast}</p>
                </div>
            `
            + posHTML

    return html
}

function genres(data){
    html = preHTML("Lista de Géneros") + 
            `<header class="w3-container w3-pink">
                <h3>Géneros</h3>
            </header>
            <div class="w3-container">
                <ul class="w3-ul">`                                                                                
    
    data.forEach(elem => {
        html += `<li><a href="/generos/${elem.genero}">${elem.genero}</a></li>`
    })

    html += `</ul>
            </div>` + posHTML

    return html
}

function genre(id, data){

    var genre =  data.find(elem => elem.genero == id)

    var html = preHTML(genre.genero) + 
            `
            <div class="w3-card-4">
                <header class="w3-container w3-pink">
                    <h1>Filmes de ${genre.genero}</h1>
                </header>
                <div class="w3-container">
                    <ul class="w3-ul">
            `
    genre.filmes.forEach(elem => {
        html += `<li><a href="/filmes/${elem.id}">${elem.titulo}</a></li>`
    })

    html += `</ul>
                <div>` + posHTML

    return html
}

function actors(data){
    html = preHTML("Atores") + 
            `<header class="w3-container w3-pink">
                <h3>Atores</h3>
            </header>
            <div class="w3-container">
                <ul class="w3-ul">`                                                                                
    
    data.forEach(elem => {
        html += `<li><a href="/atores/${elem.id}">${elem.ator}</a></li>`
    })

    html += `</ul>
            </div>` + posHTML

    return html
}

function actor(id, data){

    var actor =  data.find(elem => elem.id == id)

    html = preHTML(actor.ator) +
            `<div class w3-card-4>
                <header class="w3-container w3-pink">
                    <h1>${actor.ator}</h1>
                </header>
                <div class="w3-container">
                    <ul class="w3-ul">
            `
    actor.filmes.forEach(elem => {
        html += `<li><a href="/filmes/${elem.id}">${elem.titulo}</a></li>`
    })

    html += `</ul>
            </div>` + posHTML
    
    return html
}


http.createServer(function (req, res) {

    var q = url.parse(req.url, true)
    console.log(q.pathname)



    if(q.pathname == "/"){
        fs.readFile('index.html', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(home)
            res.end()
        })
    }
    else if(q.pathname == "/filmes"){
        axios.get('http://localhost:3000/filmes')
                    .then(resp => {
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.write(movies(resp.data))
                        res.end();
                    })
                    .catch(error => {
                        console.log('Erro na obtenção dos filmes: ' + error)
                    })
    }
    else if(q.pathname == "/generos"){
        axios.get('http://localhost:3000/generos')
            .then(resp => {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(genres(resp.data))
                res.end();
            })
            .catch(error => {
                console.log('Erro na obtenção dos géneros: ' + error)
            })
    }
    else if(q.pathname == "/atores"){
        axios.get('http://localhost:3000/atores')
            .then(resp => {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(actors(resp.data))
                res.end();
            })
            .catch(error => {
                console.log('Erro na obtenção dos atores: ' + error)
            })
    }
    else if(q.pathname.includes("/filmes/") && !q.pathname.endsWith("w3.css")){
        var id = q.pathname.split("/")[2]
        axios.get('http://localhost:3000/filmes')
            .then(resp => {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(movie(id, resp.data))
                res.end();
            })
            .catch(error => {
                console.log('Erro na obtenção do filme: ' + error)
            })
    }
    else if(q.pathname.includes("/generos/") && !q.pathname.endsWith("w3.css")){
        var id = q.pathname.split("/")[2]
        axios.get('http://localhost:3000/generos')
            .then(resp => {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(genre(id, resp.data))
                res.end();
            })
            .catch(error => {
                console.log('Erro na obtenção do género: ' + error)
            })
    }
    else if(q.pathname.includes("/atores/") && !q.pathname.endsWith("w3.css")){
        var name = q.pathname.split("/")[2]
        axios.get('http://localhost:3000/atores')
            .then(resp => {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(actor(name, resp.data))
                res.end();
            })
            .catch(error => {
                console.log('Erro na obtenção do ator: ' + error)
            })
    }
    else if(q.pathname.endsWith("w3.css")){
        fs.readFile('w3.css', function(erro, data){
            res.writeHead(200, {'Content-Type': 'text/css'})
            res.write(data)
            res.end()
        })
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.write("404 Not Found")
        res.end()
    }
}).listen(7777)