const prisma = require('../prisma/prismaClient');
import { Request, Response } from "express";

class TeamController {
  async getTeam(req: Request, res: Response): Promise<any> {
    try {
      const team = await prisma.pokemon.findMany({
        where: { captured: true },
      });
      return res.status(200).json(team);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao recuperar time de Pokémon.' });
    }
  }
}

export default new TeamController();
