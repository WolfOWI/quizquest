import { Image } from 'react-native';
import { getFrames } from '@darrench3140/react-native-sprite-sheet';
import { SpriteSheetConfig } from '../types/sprites/SpriteConfig';

// Character 1 (of 3) - Heavy Knight
export const heavyKnight_sprite_data: SpriteSheetConfig = {
  spriteKey: 'pc_heavyKnight_v1',
  kind: 'player',
  frameSize: { width: 364, height: 256 },
  sheetSize: { width: 21840, height: 256 },
  columnRowMapping: [59],
  offset: { x: 0, y: 2 },
  animations: {
    walk: getFrames(0, 7),
    walk_attack: getFrames(8, 15),
    jump: getFrames(16, 21),
    idle: getFrames(22, 26),
    hurt: getFrames(27, 31),
    block_hit: getFrames(32, 36),
    attack: getFrames(37, 45),
    rest: getFrames(46, 50),
    die: getFrames(51, 59),
  },
  defaultAnimation: 'idle',
  variants: {
    heavyKnight_red: Image.resolveAssetSource(
      require('@/assets/sprites/playerCharacters/heavyKnight/heavyKnight_red.png')
    ),
    heavyKnight_blue: Image.resolveAssetSource(
      require('@/assets/sprites/playerCharacters/heavyKnight/heavyKnight_blue.png')
    ),
    heavyKnight_green: Image.resolveAssetSource(
      require('@/assets/sprites/playerCharacters/heavyKnight/heavyKnight_green.png')
    ),
    heavyKnight_yellow: Image.resolveAssetSource(
      require('@/assets/sprites/playerCharacters/heavyKnight/heavyKnight_yellow.png')
    ),
    heavyKnight_purple: Image.resolveAssetSource(
      require('@/assets/sprites/playerCharacters/heavyKnight/heavyKnight_purple.png')
    ),
    heavyKnight_black: Image.resolveAssetSource(
      require('@/assets/sprites/playerCharacters/heavyKnight/heavyKnight_black.png')
    ),
    heavyKnight_white: Image.resolveAssetSource(
      require('@/assets/sprites/playerCharacters/heavyKnight/heavyKnight_white.png')
    ),
    heavyKnight_brown: Image.resolveAssetSource(
      require('@/assets/sprites/playerCharacters/heavyKnight/heavyKnight_brown.png')
    ),
  },
  // getSpriteSource: (skin: string) => {
  //   switch (skin) {
  //     case 'heavyKnight_red':
  //       return Image.resolveAssetSource(
  //         require('@/assets/sprites/playerCharacters/heavyKnight/heavyKnight_red.png')
  //       );
  //     case 'heavyKnight_blue':
  //       return Image.resolveAssetSource(
  //         require('@/assets/sprites/playerCharacters/heavyKnight/heavyKnight_blue.png')
  //       );
  //     case 'heavyKnight_green':
  //       return Image.resolveAssetSource(
  //         require('@/assets/sprites/playerCharacters/heavyKnight/heavyKnight_green.png')
  //       );
  //     case 'heavyKnight_yellow':
  //       return Image.resolveAssetSource(
  //         require('@/assets/sprites/playerCharacters/heavyKnight/heavyKnight_yellow.png')
  //       );
  //     case 'heavyKnight_purple':
  //       return Image.resolveAssetSource(
  //         require('@/assets/sprites/playerCharacters/heavyKnight/heavyKnight_purple.png')
  //       );
  //     case 'heavyKnight_black':
  //       return Image.resolveAssetSource(
  //         require('@/assets/sprites/playerCharacters/heavyKnight/heavyKnight_black.png')
  //       );
  //     case 'heavyKnight_white':
  //       return Image.resolveAssetSource(
  //         require('@/assets/sprites/playerCharacters/heavyKnight/heavyKnight_white.png')
  //       );
  //     case 'heavyKnight_brown':
  //       return Image.resolveAssetSource(
  //         require('@/assets/sprites/playerCharacters/heavyKnight/heavyKnight_brown.png')
  //       );
  //     default:
  //       return Image.resolveAssetSource(
  //         require('@/assets/sprites/playerCharacters/heavyKnight/heavyKnight_red.png')
  //       );
  //   }
  // },
};

// Character 2 (of 3) - Samurai
// export const samurai_sprite_data = {
//   name: 'Samurai',
//   skins: [
//     'samurai_red',
//     'samurai_blue',
//     'samurai_green',
//     'samurai_yellow',
//     'samurai_purple',
//     'samurai_black',
//     'samurai_white',
//     'samurai_brown',
//   ],
//   animations: [
//     'idle',
//     'run',
//     'walk',
//     'run_attack',
//     'attack',
//     'jump',
//     'fall',
//     'wall_slide',
//     'land',
//     'attack_strong',
//     'hurt',
//     'block_hit',
//     'dash',
//     'rest',
//     'die',
//   ],
//   frameSize: { width: 384, height: 256 },
//   spriteSheetSize: { width: 39552, height: 256 },
//   columnRowMapping: [102],
//   offset: { x: 0, y: 2 },
//   animationFrames: {
//     idle: getFrames(0, 4),
//     run: getFrames(5, 12),
//     walk: getFrames(13, 20),
//     run_attack: getFrames(21, 28),
//     attack: getFrames(29, 36),
//     jump: getFrames(37, 40),
//     fall: getFrames(41, 44),
//     wall_slide: getFrames(45, 48),
//     land: getFrames(49, 53),
//     attack_strong: getFrames(54, 66),
//     hurt: getFrames(67, 70),
//     block_hit: getFrames(71, 74),
//     dash: getFrames(75, 80),
//     rest: getFrames(81, 85),
//     die: getFrames(86, 102),
//   },
//   getSpriteSource: (skin: string) => {
//     switch (skin) {
//       case 'samurai_red':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/samurai/samurai_red.png')
//         );
//       case 'samurai_blue':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/samurai/samurai_blue.png')
//         );
//       case 'samurai_green':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/samurai/samurai_green.png')
//         );
//       case 'samurai_yellow':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/samurai/samurai_yellow.png')
//         );
//       case 'samurai_purple':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/samurai/samurai_purple.png')
//         );
//       case 'samurai_black':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/samurai/samurai_black.png')
//         );
//       case 'samurai_white':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/samurai/samurai_white.png')
//         );
//       case 'samurai_brown':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/samurai/samurai_brown.png')
//         );
//       default:
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/samurai/samurai_red.png')
//         );
//     }
//   },
// };

// Character 3 (of 3) - Mage
// export const mage_sprite_data = {
//   name: 'Mage',
//   skins: [
//     'mage_red',
//     'mage_blue',
//     'mage_green',
//     'mage_yellow',
//     'mage_purple',
//     'mage_black',
//     'mage_white',
//     'mage_brown',
//   ],
//   animations: [
//     'idle',
//     'walk',
//     'walk_attack',
//     'jump',
//     'hurt',
//     'attack',
//     'block',
//     'block_hit',
//     'rest',
//     'die',
//   ],
//   frameSize: { width: 256, height: 256 },
//   spriteSheetSize: { width: 18176, height: 256 },
//   columnRowMapping: [70],
//   offset: { x: 0, y: 2 },
//   animationFrames: {
//     idle: getFrames(0, 4),
//     walk: getFrames(5, 10),
//     walk_attack: getFrames(11, 16),
//     jump: getFrames(17, 24),
//     hurt: getFrames(25, 30),
//     attack: getFrames(31, 42),
//     block: getFrames(43, 47),
//     block_hit: getFrames(48, 52),
//     rest: getFrames(53, 57),
//     die: getFrames(58, 70),
//   },
//   getSpriteSource: (skin: string) => {
//     switch (skin) {
//       case 'mage_red':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/mage/mage_red.png')
//         );
//       case 'mage_blue':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/mage/mage_blue.png')
//         );
//       case 'mage_green':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/mage/mage_green.png')
//         );
//       case 'mage_yellow':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/mage/mage_yellow.png')
//         );
//       case 'mage_purple':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/mage/mage_purple.png')
//         );
//       case 'mage_black':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/mage/mage_black.png')
//         );
//       case 'mage_white':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/mage/mage_white.png')
//         );
//       case 'mage_brown':
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/mage/mage_brown.png')
//         );
//       default:
//         return Image.resolveAssetSource(
//           require('@/assets/sprites/playerCharacters/mage/mage_red.png')
//         );
//     }
//   },
// };
