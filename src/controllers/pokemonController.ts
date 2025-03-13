import { Request, Response } from 'express';
import captureService from '../services/captureService.ts';

class PokemonController {
  async capture(req: Request, res: Response) {
    const { id } = req.body;

    try {
      const capturedPokemon = await captureService.capturePokemon(id);
      if (capturedPokemon === false) {
        res.status(400).json({ message: 'Falha na captura!' });
      } else if (capturedPokemon === null) {
        res.status(200).json({ message: 'Pokémon escapou!' });
      } else {
        res.status(200).json({ message: 'Pokémon capturado com sucesso!', pokemon: capturedPokemon });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor!', error: error });
    }
  }
}

export default new PokemonController();
