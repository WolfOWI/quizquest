// Icon Utilities
import { AudienceLevel } from '@/lib/types/curriculum/Curriculum';

/**
 * Get the difficulty icon for a given audience level
 * @param level - The audience level (novice, apprentice, master)
 * @returns The source for the difficulty icon
 */
export const getDifficultyIcon = (level: AudienceLevel) => {
  switch (level) {
    case 'novice':
      return require('@/assets/icons/difficulty/dagger.png');
    case 'apprentice':
      return require('@/assets/icons/difficulty/sword.png');
    case 'master':
      return require('@/assets/icons/difficulty/sword_flaming.png');
    default:
      return require('@/assets/icons/difficulty/dagger.png');
  }
};
