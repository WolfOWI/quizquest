import { Image } from 'react-native';

// UI Icons (non-content - enemies, items, environments, etc. - icons for UI only)

export const UI_ICONS = {
  // Navigation icons
  nav: {
    library: Image.resolveAssetSource(require('@/assets/icons/ui/nav/library.png')),
    library_active: Image.resolveAssetSource(require('@/assets/icons/ui/nav/library_active.png')),
    shop: Image.resolveAssetSource(require('@/assets/icons/ui/nav/shop.png')),
    achievements: Image.resolveAssetSource(require('@/assets/icons/ui/nav/achievements.png')),
    profile: Image.resolveAssetSource(require('@/assets/icons/ui/nav/profile.png')),
    inventory: Image.resolveAssetSource(require('@/assets/icons/ui/nav/inventory.png')),
  },

  // Currency icons
  currency: {
    gem: Image.resolveAssetSource(require('@/assets/icons/ui/currency/gem.png')),
    gold: Image.resolveAssetSource(require('@/assets/icons/ui/currency/gold.png')),
  },

  // Difficulty level icons
  difficulty: {
    novice: Image.resolveAssetSource(require('@/assets/icons/ui/difficulty/novice.png')),
    apprentice: Image.resolveAssetSource(require('@/assets/icons/ui/difficulty/apprentice.png')),
    master: Image.resolveAssetSource(require('@/assets/icons/ui/difficulty/master.png')),
  },

  // Health icons
  health: {
    default: Image.resolveAssetSource(require('@/assets/icons/ui/health/health_default.png')),
  },

  // Quest stats icons
  stats: {
    deaths: Image.resolveAssetSource(require('@/assets/icons/ui/stats/deaths.png')),
    runs: Image.resolveAssetSource(require('@/assets/icons/ui/stats/runs.png')),
    slain: Image.resolveAssetSource(require('@/assets/icons/ui/stats/slain.png')),
  },
} as const;

// Helper Functions
/**
 * Get difficulty icon for a given level
 * @param level - The audience level (novice, apprentice, master)
 * @returns The source for the difficulty icon
 */
export const getDifficultyIcon = (level: 'novice' | 'apprentice' | 'master') => {
  return UI_ICONS.difficulty[level];
};
