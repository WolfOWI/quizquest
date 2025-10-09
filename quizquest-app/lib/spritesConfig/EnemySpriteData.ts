import { Image } from 'react-native';
import { getFrames } from '@darrench3140/react-native-sprite-sheet';
import { SpriteSheetConfig } from '@/lib/types/sprites/SpriteConfig';

// Bush Monster
export const bushMonster_sprite_data: SpriteSheetConfig = {
  spriteKey: 'enemy_bushMonster_v1',
  kind: 'enemy',
  frameSize: { width: 360, height: 256 },
  sheetSize: { width: 18360, height: 256 },
  columnRowMapping: [50],
  offset: { x: 0, y: 2 },
  animations: {
    attack: getFrames(0, 17),
    die: getFrames(18, 31),
    hit: getFrames(32, 35),
    idle: getFrames(36, 43),
    move: getFrames(44, 50),
  },
  defaultAnimation: 'idle',
  variants: {
    bushMonster_default: Image.resolveAssetSource(
      require('@/assets/sprites/enemies/bushMonster/bushMonster_default.png')
    ),
  },
};

// Goblin
export const goblin_sprite_data: SpriteSheetConfig = {
  spriteKey: 'enemy_goblin_v1',
  kind: 'enemy',
  frameSize: { width: 336, height: 256 },
  sheetSize: { width: 19152, height: 256 },
  columnRowMapping: [56],
  offset: { x: 0, y: 2 },
  animations: {
    run: getFrames(0, 5),
    run_hit: getFrames(6, 11),
    idle: getFrames(12, 16),
    block: getFrames(17, 21),
    hit: getFrames(22, 26),
    idle02: getFrames(27, 31),
    attack: getFrames(32, 38),
    jump: getFrames(39, 45),
    die: getFrames(46, 56),
  },
  defaultAnimation: 'idle',
  variants: {
    goblin_default: Image.resolveAssetSource(
      require('@/assets/sprites/enemies/goblin/goblin_default.png')
    ),
  },
};

// Skeleton
export const skeleton_sprite_data: SpriteSheetConfig = {
  spriteKey: 'enemy_skeleton_v1',
  kind: 'enemy',
  frameSize: { width: 256, height: 256 },
  sheetSize: { width: 16640, height: 256 },
  columnRowMapping: [64],
  offset: { x: 0, y: 2 },
  animations: {
    walk: getFrames(0, 7),
    walk02: getFrames(8, 15),
    walk03: getFrames(16, 23),
    idle: getFrames(24, 28),
    idle02: getFrames(29, 33),
    hit: getFrames(34, 38),
    attack: getFrames(39, 45),
    die: getFrames(46, 56),
    rebirth: getFrames(57, 64),
  },
  defaultAnimation: 'idle',
  variants: {
    skeleton_default: Image.resolveAssetSource(
      require('@/assets/sprites/enemies/skeleton/skeleton_default.png')
    ),
  },
};

// Skeleton
// export const skeleton_sprite_data = {
//   name: 'Skeleton',
//   skins: ['skeleton_default'],
//   animations: ['walk', 'walk02', 'walk03', 'idle', 'idle02', 'hit', 'attack', 'die', 'rebirth'],
//   frameSize: { width: 256, height: 256 },
//   spriteSheetSize: { width: 16640, height: 256 },
//   columnRowMapping: [64],
//   offset: { x: 0, y: 2 },
//   animationFrames: {
//     walk: getFrames(0, 7),
//     walk02: getFrames(8, 15),
//     walk03: getFrames(16, 23),
//     idle: getFrames(24, 28),
//     idle02: getFrames(29, 33),
//     hit: getFrames(34, 38),
//     attack: getFrames(39, 45),
//     die: getFrames(46, 56),
//     rebirth: getFrames(57, 64),
//   },
//   getSpriteSource: (skin: string) => {
//     switch (skin) {
//       case 'skeleton_default':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/enemies/skeleton/skeleton_default.png')
//         );
//       default:
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/enemies/skeleton/skeleton_default.png')
//         );
//     }
//   },
// };

// // Goblin
// export const goblin_sprite_data = {
//   name: 'Goblin',
//   skins: ['goblin_default'],
//   animations: ['run', 'run_hit', 'idle', 'block', 'hit', 'idle02', 'attack', 'jump', 'die'],
//   frameSize: { width: 336, height: 256 },
//   spriteSheetSize: { width: 19152, height: 256 },
//   columnRowMapping: [56],
//   offset: { x: 0, y: 2 },
//   animationFrames: {
//     run: getFrames(0, 5),
//     run_hit: getFrames(6, 11),
//     idle: getFrames(12, 16),
//     block: getFrames(17, 21),
//     hit: getFrames(22, 26),
//     idle02: getFrames(27, 31),
//     attack: getFrames(32, 38),
//     jump: getFrames(39, 45),
//     die: getFrames(46, 56),
//   },
//   getSpriteSource: (skin: string) => {
//     switch (skin) {
//       case 'goblin_default':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/enemies/goblin/goblin_default.png')
//         );
//       default:
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/enemies/goblin/goblin_default.png')
//         );
//     }
//   },
// };

// Skeleton
// export const skeleton_sprite_data = {
//   name: 'Skeleton',
//   skins: ['skeleton_default'],
//   animations: ['walk', 'walk02', 'walk03', 'idle', 'idle02', 'hit', 'attack', 'die', 'rebirth'],
//   frameSize: { width: 256, height: 256 },
//   spriteSheetSize: { width: 16640, height: 256 },
//   columnRowMapping: [64],
//   offset: { x: 0, y: 2 },
//   animationFrames: {
//     walk: getFrames(0, 7),
//     walk02: getFrames(8, 15),
//     walk03: getFrames(16, 23),
//     idle: getFrames(24, 28),
//     idle02: getFrames(29, 33),
//     hit: getFrames(34, 38),
//     attack: getFrames(39, 45),
//     die: getFrames(46, 56),
//     rebirth: getFrames(57, 64),
//   },
//   getSpriteSource: (skin: string) => {
//     switch (skin) {
//       case 'skeleton_default':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/enemies/skeleton/skeleton_default.png')
//         );
//       default:
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/enemies/skeleton/skeleton_default.png')
//         );
//     }
//   },
// };
