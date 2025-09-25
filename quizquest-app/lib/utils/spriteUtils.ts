import { CONTENT } from '@/lib/content';
import { getSpriteSheet } from '@/lib/content/registry';
import type { SpriteSheetConfig } from '@/lib/types/sprites/SpriteConfig';

export function getSpriteData(variantId: string) {
  // Find the catalog entry for this variant
  const catalogEntry =
    CONTENT.characters[variantId] ?? CONTENT.enemies[variantId] ?? CONTENT.pets[variantId];

  if (!catalogEntry) {
    throw new Error(`No catalog entry for variantId "${variantId}" in JSON.`);
  }

  // Get the sheet by spriteKey
  const sheet: SpriteSheetConfig | undefined = getSpriteSheet(catalogEntry.spriteKey);
  if (!sheet) throw new Error(`No sheet registered for spriteKey "${catalogEntry.spriteKey}".`);

  // Pick the PNG for this variant (fallback to first)
  const source = sheet.variants[variantId] ?? Object.values(sheet.variants)[0];
  if (!source)
    throw new Error(
      `No variant image for "${variantId}" on spriteKey "${catalogEntry.spriteKey}".`
    );

  return {
    source,
    frameSize: sheet.frameSize,
    spriteSheetSize: sheet.sheetSize, // Renamed to "spriteSheetSize" for AnimatedSprite prop
    offset: sheet.offset,
    columnRowMapping: sheet.columnRowMapping,
    animations: sheet.animations,
    defaultAnimation: sheet.defaultAnimation ?? 'idle',
  };
}

export const calculateProportionalWidth = (
  desiredHeight: number,
  frameSize: { width: number; height: number }
) => desiredHeight * (frameSize.width / frameSize.height);

/**
 * Get animation duration for a variant ID and animation name
 * @param variantId - The variant ID (e.g., 'heavyKnight_red', 'bushMonster_default')
 * @param animationName - The name of the animation
 * @param fps - Frames per second (default: 10)
 * @returns Duration in milliseconds
 */
export const getAnimationDuration = (
  variantId: string,
  animationName: string,
  fps: number = 10
): number => {
  const spriteData = getSpriteData(variantId);
  if (!spriteData) return 1000;

  const animationFrames = (spriteData.animations as Record<string, number[]>)[animationName];
  if (!animationFrames) return 1000;

  // Calculate duration: (frameCount / fps) * 1000ms
  const frameCount = animationFrames.length;
  return Math.round((frameCount / fps) * 1000);
};
