const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(3000);
let id = 2;
let livros = [
{
id: 1,
titulo: "Pequeno principe",
descricao: "infantil",
edicao: "Edit. Aster",
autor: "Antoine de S.",
isbn: "651616516",
},
{
    id: 2,
    titulo: "Agatha Christie - O Assasinato de R. A.",
    descricao: "mistério",
    edicao: "Edit. Saraiva",
    autor: "Agatha Christie.",
    isbn: "978852504843I",
}
];

//tratamento de requisições POST
app.post ("/livros", (req, res, next) => {
    const livro = {
    id: id +=1,
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    edicao: req.body.edicao,
    autor: req.body.autor,
    isbn: req.body.isbn
    }
    livros.push (livro)
    res.status(201).json(livro);
    })

//tratamento de requisições GET
app.get ("/livros", (req, res, next) => {
    res.status(200).json(livros);
    });

//tratamento de requisições PUT
app.put("/livros", (req, res, next) => {
    livros.forEach ((livro) => {
    if (livro.id === req.body.id){
    livro.titulo = req.body.titulo,
    livro.descricao = req.body.descricao,
    livro.edicao = req.body.edicao,
    livro.autor = req.body.autor,
    livro.isbn = req.body.isbn

    }
    })
    res.status(204).end();
    });

//tratamento de requisições delete por parâmetro
app.delete('/livros/:id', (req, res, next) => {
    const idLivroDel = req.params.id;
    livros.forEach((livro, index) => {
        if(livro.id == idLivroDel) livros.splice (index,1)
    })
    res.status(200).json(livros);
})
