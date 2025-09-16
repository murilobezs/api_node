import express from 'express';
import cors from 'cors';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const app = express()
app.use(express.json());
app.use(cors());


// Criando uma nova rota

//Método PUT para atualizar um usuário existente
app.put('/usuarios/:id', async (req, res) => {
    //console.log(req.params.id);

    await prisma.usuario.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            nome: req.body.nome,
            idade: String(req.body.idade) // Gambiarra: converte int para string
        }
    });

    res.status(201).json({message: "Usuário atualizado com sucesso!"});
});

//Método DELETE para deletar um usuário existente
app.delete('/usuarios/:id', async (req, res) => {
    await prisma.usuario.delete({
        where: {
            id: req.params.id
        }
    });

    res.status(200).json({message: "Usuário deletado com sucesso!"});
});

//Método POST para criar um novo usuário
app.post('/usuarios', async (req, res) => {
    await prisma.usuario.create({
        data: {
            email: req.body.email,
            nome: req.body.nome,
            idade: String(req.body.idade) // Gambiarra: converte int para string
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