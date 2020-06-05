const express = require("express")
const server = express()

//cofiguraçao da public
server.use(express.static("Public"))

//usando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/pages", {
    express: server,
    noCache: true
})
//configurar caminhos metodo get
//pagina inicial
// req: requisiçao res: resposta

server.get("/", function(req, res){
    //res.sendFile(__dirname + "/pages/index.html")
    return res.render("index.html")
})
server.get("/creatpoint", function(req, res){
    //res.sendFile(__dirname + "/pages/creatpoint.html")
    return res.render("creatpoint.html")
})
server.get("/search", function(req, res){
    //res.sendFile(__dirname + "/pages/search.html")
    return res.render("search.html")
})

//ligar servidor
server.listen(3000)