import { Request, Response } from "express";
import { prisma } from "../lib/prisma.ts"; 

class TaskController {

    static async getTasks(req: Request, res: Response) {
        try {
            const tasks = await prisma.task.findMany(); 
            res.status(200).json(tasks);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao buscar tarefas', error });
        }
    }

    static async createTask(req: Request, res: Response) {
        const { title, description, date, status } = req.body;
        try {
            const task = await prisma.task.create({
                data: {
                    title,
                    description,
                    date,
                    status,
                },
            });
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao criar tarefa', error });
        }
    }

    static async updateTask(req: Request, res: Response) {
        const { id } = req.params;
        const { title, description, date, status } = req.body;

        try {
            const task = await prisma.task.update({
                where: { id: parseInt(id) },
                data: { title, description, date, status },
            });

            res.status(200).json(task);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar tarefa', error });
        }
    }

    static async deleteTask(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const task = await prisma.task.delete({
                where: { id: parseInt(id) },
            });

            res.status(200).json({ message: 'Tarefa deletada com sucesso' });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao deletar tarefa', error });
        }
    }
}

export default TaskController;
