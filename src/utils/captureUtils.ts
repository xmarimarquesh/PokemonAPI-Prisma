export function calculateCaptureChance(pokemonData: any): number {
    const baseChance = 50;
    const rarityModifier = 100 / pokemonData.weight;
  
    return baseChance - rarityModifier;
  }
  