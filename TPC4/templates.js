exports.compositoresPage = function (compositores,d) {
    var html = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Compositores Management</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-green">
                    <h1><a class="w3-btn w3-round w3-grey" href="/compositores/registo">+</a></h1>        
                </header>
                <div class="w3-container">
                <table class="w3-table w3-striped">
                        <tr>
                            <th>Id</th><th>Nome</th><th>Período</th>
                            <th>Actions</th>
                        </tr>
                `
    for(let i=0; i < compositores.length ; i++){
        html += `
                <tr>
                    <td>${compositores[i].id}</td>
                    <td><a href="/compositores/${compositores[i].id}">${compositores[i].nome}</a></td>
                    <td>${compositores[i].bio}</td>
                    <td>${compositores[i].periodo}</td>
                    <td>
                        [<a href="/compositores/edit/${compositores[i].id}">Edit</a>][<a href="/compositores/delete/${compositores[i].id}">Delete</a>]
                    </td>
                </tr>
        `
    }

    html += `
            </table>
            </div>
                <footer class="w3-container w3-green">
                    <h5>EngWeb2024::A97396::${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return html
}


exports.compositorPage = function (compositor, d) {

        var html = `
        <html>
        <head>
            <title>Compositor: ${compositor.id}</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-green">
                    <h1>Compositor ${compositor.id}</h1>
                </header>
    
                <div class="w3-container">
                    <ul class="w3-ul w3-card-4" style="width:100%">
                        <li><b>Nome: </b>      ${compositor.nome}</li>
                        <li><b>Número: </b>    ${compositor.id}</li>
                        <li><b>Período: </b>   ${compositor.periodo}</li>
                        <li><b>dataNasc: </b>  ${compositor.dataNasc}</li>
                        <li><b>dataObito: </b> ${compositor.dataObito}</li>
                        <li><b>Biografia: </b> ${compositor.bio}</li>
                    </ul>
                </div>
                <footer class="w3-container w3-green">
                    <address>EngWeb2024::A97396::${d} - [<a href="/">Voltar</a>]</address>
                </footer>
            </div>
        </body>
        </html>
        `
        return html
    }
    
exports.periodosPage = function (periodos,d) {
        var pagHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <link rel="icon" href="favicon.png"/>
                <link rel="stylesheet" href="w3.css"/>
                <title>Periodos</title>
            </head>
            <body>
                <div class="w3-card-4">
                    <header class="w3-container w3-green">
                        <h1>Periodos
                        <a class="w3-btn w3-round w3-grey" href="/periodo/registo">+</a>
                        </h1>
                    </header>
            
                    <div class="w3-container">
                        <table class="w3-table w3-striped">
                            <tr>
                                <th>Id</th><th>Nome</th>
                            </tr>
                    `
        for(let i=0; i < periodos.length ; i++){
            html += `
                    <tr>
                        <td>${periodos[i].id}</td>
                        <td><a href='/periodo/${periodos[i].id}' >${periodos[i].nome}</a></td>
                        <td>
                            [<a href="/periodo/edit/${periodos[i].id}">Edit</a>][<a href="/periodo/delete/${periodos[i].id}">Delete</a>]
                        </td>
                    </tr>
            `
        }
    
        html += `
                </table>
                </div>
                    <footer class="w3-container w3-green">
                        <h5>EngWeb2024::A97396::${d} - [<a href="/">Return</a>]</h5>
                    </footer>
                </div>
            </body>
        </html>
        `
        return html
    }

exports.periodoPage = function (periodo, d) {
        var html = `
        <html>
        <head>
            <title>Periodo ${periodo.nome}</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-green">
                    <h1>Periodo ${periodo.id}</h1>
                </header>
    
                <div class="w3-container">
                    <ul class="w3-ul w3-card-4" style="width:100%">
        `

        for(let i=0; i < periodo.compositores.length ; i++){

            html += `
                        <li><a href="/compositores/${periodo.compositores[i].id}">${periodo.compositores[i].nome}</a></li>
                    `
        }

        html += `

                    </ul>
                </div>
                <footer class="w3-container w3-green">
                    <address>EngWeb2024::A97396::${d} - [<a href="/">Voltar</a>]</address>
                </footer>
            </div>
        </body>
        </html>
        `
        return html
    }


    //ACABAR