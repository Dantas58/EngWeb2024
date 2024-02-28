var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {
    var exp = /^\/(c\d+)$/
    var q = url.parse(req.url, true);
    console.log(q.pathname)
    if(exp.test(q.pathname)){
        var path = "paginasIndiv/" + q.pathname.slice(1) + ".html"
        fs.readFile(path, function(err, data) {
            if (err) {
                res.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                res.end("<p>Pedido Não Suportado</p>");
                res.write("<pre>" + q.pathname + "</pre>")
                res.end();
            } 
            else{
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                res.write(data);
                res.end();            
            } 
        })
    }
    else if(q.pathname == "/"){
        fs.readFile("index.html", function(err, data) {
            if(err){
                res.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                res.write("<p>Pedido Não Suportado</p>");
                res.write("<pre>" + q.pathname + "</pre>");
                res.end();
            }
            else{
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                res.write(data);
                res.end();
            }
        })
    }
    else if(q.pathname == "/w3.css"){
        fs.readFile("w3.css", function(err, data) {
            if(err){
                res.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                res.write("<p>Pedido Não Suportado</p>");
                res.write("<pre>" + q.pathname + "</pre>");
                res.end();
            }
            else{
                res.writeHead(200, {"Content-Type": "text/css; charset=utf-8"});
                res.write(data);
                res.end();
            }
        })
    }
}).listen(7777);