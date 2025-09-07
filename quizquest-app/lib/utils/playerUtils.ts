import { CharacterData } from '@/lib/constants/sprites/PlayerSpriteData';

// Player Sprite Utilities

/**
 * Get player character data from character ID
 * @param characterId - The full character ID
 * @returns The player character data object
 */
export const getPlayerCharacterData = (characterId: string) => {
  const characterType = characterId.split('_')[0];
  return CharacterData[characterType as keyof typeof CharacterData] || CharacterData.heavyKnight;
};
