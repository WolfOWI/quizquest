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

  // Environment icons
  env_abandoned_mine_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/abandoned_mine.png')
  ),
  env_ancient_library_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/ancient_library.png')
  ),
  env_autumn_woods_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/autumn_woods.png')
  ),
  env_bamboo_grove_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/bamboo_grove.png')
  ),
  env_beach_lighthouse_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/beach_lighthouse.png')
  ),
  env_castle_courtyard_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/castle_courtyard.png')
  ),
  env_castle_dungeon_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/castle_dungeon.png')
  ),
  env_crystal_cavern_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/crystal_cavern.png')
  ),
  env_dark_swamp_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/dark_swamp.png')
  ),
  env_desert_oasis_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/desert_oasis.png')
  ),
  env_desert_pyramids_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/desert_pyramids.png')
  ),
  env_desert_wastelands_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/desert_wastelands.png')
  ),
  env_dwarven_ruins_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/dwarven_ruins.png')
  ),
  env_forgotten_graveyard_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/forgotten_graveyard.png')
  ),
  env_frozen_glaciers_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/frozen_glaciers.png')
  ),
  env_grassy_meadows_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/grassy_meadows.png')
  ),
  env_green_forest_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/green_forest.png')
  ),
  env_jungle_temple_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/jungle_temple.png')
  ),
  env_medieval_village_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/medieval_village.png')
  ),
  env_mushroom_biome_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/mushroom_biome.png')
  ),
  env_mystic_forest_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/mystic_forest.png')
  ),
  env_sandy_island_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/sandy_island.png')
  ),
  env_snowy_mountains_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/snowy_mountains.png')
  ),
  env_tropical_rainforest_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/tropical_rainforest.png')
  ),
  env_tundra_forest_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/tundra_forest.png')
  ),
  env_volcanic_caldera_icon: Image.resolveAssetSource(
    require('@/assets/icons/content/environments/volcanic_caldera.png')
  ),
};

export const getIcon = (iconKey: string) => {
  return ICONS[iconKey];
};

// Environment background images registry
export const BACKGROUNDS: Record<string, any> = {
  // Environment backgrounds
  env_abandoned_mine_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/abandoned_mine.png')
  ),
  env_ancient_library_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/ancient_library.png')
  ),
  env_autumn_woods_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/autumn_woods.png')
  ),
  env_bamboo_grove_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/bamboo_grove.png')
  ),
  env_beach_lighthouse_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/beach_lighthouse.png')
  ),
  env_castle_courtyard_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/castle_courtyard.png')
  ),
  env_castle_dungeon_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/castle_dungeon.png')
  ),
  env_crystal_cavern_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/crystal_cavern.png')
  ),
  env_dark_swamp_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/dark_swamp.png')
  ),
  env_desert_oasis_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/desert_oasis.png')
  ),
  env_desert_pyramids_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/desert_pyramids.png')
  ),
  env_desert_wastelands_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/desert_wastelands.png')
  ),
  env_dwarven_ruins_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/dwarven_ruins.png')
  ),
  env_forgotten_graveyard_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/forgotten_graveyard.png')
  ),
  env_frozen_glaciers_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/frozen_glaciers.png')
  ),
  env_grassy_meadows_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/grassy_meadows.png')
  ),
  env_green_forest_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/green_forest.png')
  ),
  env_jungle_temple_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/jungle_temple.png')
  ),
  env_medieval_village_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/medieval_village.png')
  ),
  env_mushroom_biome_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/mushroom_biome.png')
  ),
  env_mystic_forest_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/mystic_forest.png')
  ),
  env_sandy_island_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/sandy_island.png')
  ),
  env_snowy_mountains_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/snowy_mountains.png')
  ),
  env_tropical_rainforest_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/tropical_rainforest.png')
  ),
  env_tundra_forest_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/tundra_forest.png')
  ),
  env_volcanic_caldera_img: Image.resolveAssetSource(
    require('@/assets/images/backgrounds/volcanic_caldera.png')
  ),
};

export const getBackground = (imgKey: string) => {
  return BACKGROUNDS[imgKey];
};
