//importar a dependencia do sqlite
const sqlite3 = require("sqlite3").verbose()

//criar objeto que ira fazer operaçoes no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

db.all(`SELECT * FROM places`, function(err, rows){
    if(err){
        return console.log(err)
    }
    console.log("SEUS REGISTROS: ")
    console.log(rows)
})


//ultilizar objeto de banco de dados para nossas operçoes
/*
db.serialize(()=>{
    //comandos SQL
    //criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
        "colectoria",
        "Tres Rios, Freguesia",
        "Numero 555 ",
        "Rio de Janeiro",
        "Rio de Janeiro",
        "papéis e papelão"
    ]
    function afterInsertData(err){//funçao callback
        if(err){
            return console.log(err)
        }
        console.log("cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, values, afterInsertData)//forma de funçao callback

    //consultar dados
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }
        console.log("SEUS REGISTROS: ")
        console.log(rows)
    })

    //deletar dados

    db.run(`DELETE FROM places WHERE id = ?`, [1], function(err){
        if(err){
            return console.log(err)
       }
        console.log("SEU REGISTRO FOI DELETADO ")
    })
})*/