import express, { Request, Response, Router } from 'express';
import Task from '../models/Task.ts';
const router: Router = express.Router();
import TaskController from "../controllers/TaskController.ts";

// REQUISIÇÃO COM MODELS

router.get("/task", TaskController.getTasks);
router.post("/register", TaskController.createTask);
router.delete("/task/:id", TaskController.deleteTask);
router.put("/task/:id", TaskController.updateTask);
// router.get("/task/:id", TaskController.getTask);

// REQUISIÇÃO COM LISTA SIMPLES

// interface Pessoa {
//     id: number;
//     nome: string;
//     sobrenome: string;
//     email: string;
// }
// const task: Pessoa[] = [];
// var ids = 1;

// .post('/usuarios', (req: Request, res: Response) => {
//     const pessoa = req.body
//     pessoa.id = ids++
//     task.push(pessoa)
//     res.status(200).send(`Pessoa ${pessoa.nome} ${pessoa.sobrenome} | email: ${pessoa.email} recebida com sucesso!`);
// })
// .get('/usuarios', (req: Request, res: Response) => {
//     res.status(200).json(task)
// })
// .get('/usuarios/:id', (req: Request, res: Response) => {
//     const { id } = req.params
//     res.status(200).json(task.find(pessoa => pessoa.id === parseInt(id)))
// })
// .put('/usuarios/:id', (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { nome, sobrenome, email } = req.body;
//     const pessoa = task.find(pessoa => pessoa.id === parseInt(id));
//     if (pessoa) {
//         pessoa.email = email
//         pessoa.nome = nome
//         pessoa.sobrenome = sobrenome
//         res.status(200).send(`Pessoa com o id: ${id} foi atualizado para ${nome} ${sobrenome} - ${email}`)
//     }
// })
// .patch('/atualizar/:id', (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { nome } = req.body;
//     const pessoa = task.find(pessoa => pessoa.id === parseInt(id));
//     if (pessoa) {
//         pessoa.nome = nome
//         res.send(`Nome da pessoa com ID ${id} foi atualizado para: ${nome}`);
//     }
// })
// .delete('/deletar/:id', (req: Request, res: Response) => {
//     const { id } = req.params;
//     task.splice(task.findIndex(pessoa => pessoa.id === parseInt(id)), 1)
//     res.status(200).send(`Pessoa com o id: ${id} foi deletada `)
// })

export default router;