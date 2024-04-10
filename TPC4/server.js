var http = require('http');
var axios = require('axios');
const {parse} = require('querystring');
var templates = require('./templates');
var static = require('./static');

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var server = http.createServer((req, res) => {

    var d = new Date().toISOString().substring(0,16)
    console.log(d + ' ' + request.method + ' ' + request.url)
    if(static.staticResource(req)){
        static.serveStaticResource(request, response)
    }
    else{
        switch(req.method){
            case "GET":
                if(req.url == "/" || req.url == "/compositores"){
                    axios.get('http://localhost:3000/compositores')
                    .then(function(resp){
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.compositoresPage(resp.data, d))
                        res.end();
                    })
                    .catch (erro => {
                        res.writeHead(503, {'Content-Type':'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de compositores: " + erro + "</p>")
                        res.end()
                    })
                }
                else if(/\/compositores\/C[0-9]+$/.test(req.url)){
                    id = req.url.split("/")[2]
                    axios.get('http://localhost:3000/compositores/' + id)
                    .then(function(resp){
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.compositorPage(resp.data, d))
                        res.end();
                    })
                    .catch (erro => {
                        res.writeHead(503, {'Content-Type':'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter o compositor: " + erro + "</p>")
                        res.end()
                    })
                }
                else if(req.url == "/compositores/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(templates.compositoresForm(d))
                }
                else if(/\/compositores\/edit\/C[0-9]+$/.test(req.url)){
                    id = req.url.split("/")[3]
                    axios.get('http://localhost:3000/compositores/' + id)
                    .then(function(resp){
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.compositoresFormEditPage(resp.data, d))
                        res.end();
                    })
                    .catch (erro => {
                        res.writeHead(503, {'Content-Type':'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter o compositor: " + erro + "</p>")
                        res.end()
                    })
                }
                else if(/\/compositores\/delete\/C[0-9]+$/.test(req.url)){
                    id = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/compositores/' + id)
                    .then(function(resp){
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Registo" + id + "Apagado com Sucesso</p>")
                        res.end();
                    })
                    .catch (erro => {
                        res.writeHead(510, {'Content-Type':'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível eliminar o compositor: " + id + "ERRO:" + erro + "</p>")
                        res.end()
                    })
                }
                else if(req.url == "/periodos"){
                    axios.get('http://localhost:3000/periodos')
                    .then(function(resp){
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.periodosPage(resp.data, d))
                        res.end();
                    })
                    .catch (erro => {
                        res.writeHead(503, {'Content-Type':'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de periodos: " + erro + "</p>")
                        res.end()
                    })
                }
                else if(/\/periodos\/P[0-9]+$/.test(req.url)){
                    id = req.url.split("/")[2]
                    axios.get('http://localhost:3000/periodos/' + id)
                    .then(function(resp){
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.periodoPage(resp.data, d))
                        res.end();
                    })
                    .catch (erro => {
                        res.writeHead(503, {'Content-Type':'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter o periodo: " + erro + "</p>")
                        res.end()
                    })
                }
                else if(req.url == "/periodos/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(templates.periodosForm(d))
                }
                else if(/\/periodos\/edit\/p[0-9]+$/.test(req.url)){
                    id = req.url.split("/")[3]
                    axios.get('http://localhost:3000/periodos/' + id)
                    .then(function(resp){
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.periodosFormEditPage(resp.data, d))
                        res.end();
                    })
                    .catch (erro => {
                        res.writeHead(503, {'Content-Type':'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter o periodo: " + id + "ERRO: " + erro + "</p>")
                        res.end()
                    })
                }
                else if(/\/periodos\/delete\/P[0-9]+$/.test(req.url)){
                    id = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/periodos/' + id)
                    .then(function(resp){
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Registo" + id + "Apagado com Sucesso</p>")
                        res.end();
                    })
                    .catch (erro => {
                        res.writeHead(510, {'Content-Type':'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível eliminar o periodo: " + id + "ERRO: " + erro + "</p>")
                        res.end()
                    })
                }
                else{
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.errorPage("GET " + req.url + " não suportado"))
                }
                break

            case "POST":
                if(req.url == "/compositores/registo"){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post("http://localhost:3000/compositores", result)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write(templates.compositoresFormSaved(result, d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write("<p>Erro no POST: " + erro + "</p>")
                                res.end()
                            })
                        }
                    })
                }
                else if(/\/compositores\/edit\/C[0-9]+$/.test(res.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put("http://localhost:3000/compositores/" + result.id, result)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write(templates.compositorPage(resp.data, d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write("<p>Erro no POST: " + erro + "</p>")
                                res.end()
                            })
                        }
                    })
                }
                else if(req.url == "periodos/registo"){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post("http://localhost:3000/periodos", result)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write(templates.periodoPage(resp.data, d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write("<p>Erro no POST: " + erro + "</p>")
                                res.end()
                            })
                        }
                        else{
                            res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'})   
                            res.write("<p>Erro no POST" + erro + "</p>")
                            res.end()
                        }
                    })
                }
                else if(/\/periodos\/edit\/P[0-9]+$/.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put("http://localhost:3000/periodos/" + result.id, result)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write(templates.periodoPage(resp.data, d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write("<p>Erro no POST: " + erro + "</p>")
                                res.end()
                            })
                        }
                    })
                }
                else{
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.errorPage("POST " + req.url + " não suportado"))
                }
                default:
            }
        }
    })

server.listen(7777, ()=>{
    console.log('Servidor à escuta na porta 7777...')
})
    