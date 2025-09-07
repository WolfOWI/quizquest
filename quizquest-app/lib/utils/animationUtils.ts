import { getPlayerCharacterData } from '@/lib/utils/playerUtils';

/**
 * Get animation duration for a character ID and animation name
 * @param characterId - The full character ID (e.g., 'heavyKnight_red')
 * @param animationName - The name of the animation
 * @param fps - Frames per second (default: 10)
 * @returns Duration in milliseconds
 */
export const getAnimationDuration = (
  characterId: string,
  animationName: string,
  fps: number = 10
): number => {
  const characterData = getPlayerCharacterData(characterId);
  if (!characterData) {
    // console.log('The character data is not found, returning 1000ms');
    return 1000;
  }

  const animationFrames = (characterData.animationFrames as Record<string, number[]>)[
    animationName
  ];
  if (!animationFrames) {
    // console.log('The animation frames are not found, returning 1000ms');
    return 1000;
  }

  // Calculate duration: (frameCount / fps) * 1000ms
  const frameCount = animationFrames.length;
  //   console.log('The frame count is', frameCount);
  //   console.log('The fps is', fps);
  //   console.log('The duration is', Math.round((frameCount / fps) * 1000));
  return Math.round((frameCount / fps) * 1000);
};
