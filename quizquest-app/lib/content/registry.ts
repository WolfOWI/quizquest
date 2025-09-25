import { Image } from 'react-native';
import { heavyKnight_sprite_data } from '@/lib/spritesConfig/PlayerSpriteData';
import { bushMonster_sprite_data } from '@/lib/spritesConfig/EnemySpriteData';
import { SpriteSheetConfig } from '@/lib/types/sprites/SpriteConfig';

// Connect sprite sheet to spriteKey
export const SPRITE_SHEETS: Record<string, SpriteSheetConfig> = {
  // Player characters sprite sheets
  [heavyKnight_sprite_data.spriteKey]: heavyKnight_sprite_data,
  //   pc_samurai: CharacterData.samurai,
  //   pc_mage: CharacterData.mage,

  // Enemy sprite sheets
  [bushMonster_sprite_data.spriteKey]: bushMonster_sprite_data,
  //   enemy_skeleton: EnemyData.skeleton,
  //   enemy_goblin: EnemyData.goblin,
};

export const getSpriteSheet = (spriteKey: string) => {
  return SPRITE_SHEETS[spriteKey];
};

export const ICONS: Record<string, any> = {
  // Player characters
  //   pc_heavyKnight_red_icon: Image.resolveAssetSource(
  //     require('@/assets/icons/content/characters/heavyKnight_red.png')
  //   ),
  //   pc_samurai_blue_icon: Image.resolveAssetSource(
  //     require('@/assets/icons/content/characters/samurai_blue.png')
  //   ),
  //   pc_mage_purple_icon: Image.resolveAssetSource(
  //     require('@/assets/icons/content/characters/mage_purple.png')
  //   ),
  // Enemies
  //   enemy_goblin_icon: Image.resolveAssetSource(require('@/assets/icons/content/enemies/goblin.png')),
  // Items
  //   it_red_apple: Image.resolveAssetSource(require('@/assets/icons/content/items/hp_potion_s.png')),
  // Environments
  //   env_castle_dungeon_icon: Image.resolveAssetSource(
  //     require('../../assets/icons/content/environments/castle_dungeon.png')
  //   ),
  //   env_desert_oasis_icon: Image.resolveAssetSource(
  //     require('../../assets/icons/content/environments/desert_oasis.png')
  //   ),

  // Content Icons - Environment icons
  env_temperate_forest: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/temperate_forest.png')
  ),
  env_desert_pyramids: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/desert_pyramids.png')
  ),
};

export const getIcon = (iconKey: string) => {
  return ICONS[iconKey];
};
