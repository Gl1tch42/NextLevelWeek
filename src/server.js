const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db.js")

//cofiguraçao da public
server.use(express.static("Public"))

//habilitar uso do req.body
server.use(express.urlencoded({extended:true}))

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
    //query strings da nossa url
    console.log(req.query)
    //res.sendFile(__dirname + "/pages/creatpoint.html")
    return res.render("creatpoint.html")
})

server.post("/savepoint", function(req, res){
    //inserir dados no banco de dados
    //inserir dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
        `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    function afterInsertData(err){//funçao callback
        if(err){
            return console.log(err)
        }
        console.log("cadastrado com sucesso")
        console.log(this)

        return res.render("creatpoint.html", {saved: true})
    }

    db.run(query, values, afterInsertData)//forma de funçao callback
    
})



server.get("/search", function(req, res){
    const search = req.query.search

    if(search == ""){
        return res.render("search.html",{total: 0})
    }

    //pegar dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKe '%${search}%'`, function(err, rows){

        


        if(err){
            return console.log(err)
        }

        const total = rows.length //contar numero de pontos

        //mostrar pagina html com dados do banco
        //res.sendFile(__dirname + "/pages/search.html")
        return res.render("search.html",{ places: rows, total: total})
    })

    
    
})

//ligar servidor
server.listen(3000)