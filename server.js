import express from 'express';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const app = express()
app.use(express.json());


// Criando uma nova rota
app.post('/usuarios', async (req, res) => {
    await prisma.usuario.create({
        data: {
            email: req.body.email,
            nome: req.body.nome,
            idade: req.body.idade
        }
    });

    res.status(201).json(req.body);
});

// Rotas
app.get('/usuarios',  async(req, res) => {
    const usuarios_db = await prisma.usuario.findMany();

    res.status(200).json(usuarios_db);
})




// Porta local do servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})