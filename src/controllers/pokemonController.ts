import { Request, Response } from 'express';
import captureService from '../services/captureService.ts';

class PokemonController {
  async capture(req: Request, res: Response) {
    const { id } = req.body;

    try {
      const capturedPokemon = await captureService.capturePokemon(id);
      if (capturedPokemon) {
        res.status(200).json({ message: 'Pokémon capturado com sucesso!', pokemon: capturedPokemon });
      } else {
        res.status(400).json({ message: 'Falha na captura!' });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}

export default new PokemonController();
