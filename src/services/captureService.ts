import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { calculateCaptureChance } from '../utils/captureUtils.ts';

const prisma = new PrismaClient();

interface Pokemon {
  id: number;
  name: string;
  species: {
    name: string;
  };
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
}

class CaptureService {
  async capturePokemon(pokemonId: number): Promise<any | null> {
    const jaFoi = await prisma.pokemon.findUnique({
      where: { id: pokemonId },
    });

    if (jaFoi && jaFoi.captured) {
      throw new Error('Esse pokemon já foi capturado!');
    }

    const response = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const pokemonData = response.data;

    const chance = calculateCaptureChance(pokemonData);

    const aleatorio = Math.floor(Math.random() * 100) + 1;

    if (chance >= aleatorio) {
      const newPokemon = await prisma.pokemon.create({
        data: {
          name: pokemonData.name,
          species: pokemonData.species.name,
          height: pokemonData.height,
          weight: pokemonData.weight,
          type: pokemonData.types[0].type.name,
          rarity: chance,
          captured: true
        }
      });      
      return newPokemon;
    } else {
      const updatedPokemon = await prisma.pokemon.update({
        where: { id: pokemonId },
        data: {
          escapeCount: {
            increment: 1,
          },
        },
      });

      if (updatedPokemon.escapeCount >= 3) {
        await prisma.pokemon.update({
          where: { id: pokemonId },
          data: { captured: false },
        });

        throw new Error('O Pokémon fugiu!');
      }

      return null;
    }
  }
}

export default new CaptureService();
