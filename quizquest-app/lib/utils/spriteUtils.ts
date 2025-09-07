// General Sprite Utilities
import { CharacterData } from '@/lib/constants/sprites/PlayerSpriteData';
import { EnemyData } from '@/lib/constants/sprites/EnemySpriteData';

/**
 * Calculate the width of a sprite with a desired height and a frame size (in ratio)
 * @param desiredHeight - The height you want the sprite to be
 * @param frameSize - The original frame dimensions {width, height}
 * @returns The calculated width that maintains the original aspect ratio
 */
export const calculateProportionalWidth = (
  desiredHeight: number,
  frameSize: { width: number; height: number }
) => {
  // console.log('The frame size is', frameSize);
  // console.log('This is the wanted height', wantedHeight);
  // console.log('This would make the width', wantedHeight * (frameSize.width / frameSize.height));
  return desiredHeight * (frameSize.width / frameSize.height);
};

/**
 * Get character type from character ID
 * @param characterId - The full character ID (e.g., 'heavyKnight_red', 'bushMonster_default')
 * @returns The character type key
 */
export const getCharacterType = (characterId: string): string => {
  return characterId.split('_')[0];
};

/**
 * Get sprite data from character ID (works for both players and enemies)
 * @param characterId - The full character ID
 * @returns The sprite data object
 */
export const getSpriteData = (characterId: string) => {
  const characterType = getCharacterType(characterId);

  // Check if it's a player character
  if (CharacterData[characterType as keyof typeof CharacterData]) {
    return CharacterData[characterType as keyof typeof CharacterData];
  }

  // Check if it's an enemy character
  if (EnemyData[characterType as keyof typeof EnemyData]) {
    return EnemyData[characterType as keyof typeof EnemyData];
  }

  // Fallback to heavy knight
  return CharacterData.heavyKnight;
};

/**
 * Get animation duration for a character ID and animation name
 * @param characterId - The full character ID (e.g., 'heavyKnight_red', 'bushMonster_default')
 * @param animationName - The name of the animation
 * @param fps - Frames per second (default: 10)
 * @returns Duration in milliseconds
 */
export const getAnimationDuration = (
  characterId: string,
  animationName: string,
  fps: number = 10
): number => {
  const spriteData = getSpriteData(characterId);
  if (!spriteData) return 1000;

  const animationFrames = (spriteData.animationFrames as Record<string, number[]>)[animationName];
  if (!animationFrames) return 1000;

  // Calculate duration: (frameCount / fps) * 1000ms
  const frameCount = animationFrames.length;
  return Math.round((frameCount / fps) * 1000);
};
