import express from 'express';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const app = express()
app.use(express.json());


const usuarios = [];


// Criando uma nova rota
app.post('/usuarios', async (req, res) => {
    await prisma.usuarios.create({
        data: {
            email: req.body.email,
            nome: req.body.nome,
            idade: req.body.idade
        }
    });

    res.status(201).json(req.body);
});

// Rotas
app.get('/cadastro', (req, res) => {
    //res.send('Hello World from the /cadastro route!');
    res.json(usuarios);
})

app.post('/cadastro', (req, res) => {
    // console.log(req.body)
    usuarios.push(req.body)
    //res.status(201).send('Post request received at /cadastro');
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
})


// Porta local do servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})