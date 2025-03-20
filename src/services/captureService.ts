import axios from 'axios';
import { prisma } from '../lib/prisma.ts';
import { calculateCaptureChance } from '../utils/captureUtils.ts';


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
    
    let jaFoi = await prisma.pokemon.findUnique({
      where: { id: pokemonId },
    });

    if (jaFoi && jaFoi.captured) {
      return false;
    }
    console.log("AQUIFOI")
    if (!jaFoi) {
      const response = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const pokemonData = response.data;
      
      jaFoi = await prisma.pokemon.create({
        data: {
          id: pokemonData.id,
          name: pokemonData.name,
          species: pokemonData.species.name,
          height: pokemonData.height,
          weight: pokemonData.weight,
          type: pokemonData.types[0].type.name,
          rarity: 0,
          captured: false,
          escapeCount: 0
        }
      });
    }
    console.log("AQUIFOI2")
    const response = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const pokemonData = response.data;

    const chance = calculateCaptureChance(pokemonData);
    const aleatorio = Math.floor(Math.random() * 100) + 1;

    if (chance >= aleatorio) {
      const newPokemon = await prisma.pokemon.update({
        where: { id: pokemonId },
        data: {
          captured: true,
          rarity: chance, 
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

      console.log("FUGIU");

      if (updatedPokemon.escapeCount >= 3) {
        await prisma.pokemon.update({
          where: { id: pokemonId },
          data: { captured: false }, 
        });
        return false;
      }

      return null;
    }
  }
}
export default new CaptureService();
