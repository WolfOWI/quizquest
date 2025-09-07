import { Image } from 'react-native';
import { getFrames } from '@darrench3140/react-native-sprite-sheet';

// Bush Monster
export const bushMonster_data = {
  name: 'Bush Monster',
  skins: ['bushMonster_default'],
  animations: ['attack', 'die', 'hit', 'idle', 'move'],
  frameSize: { width: 360, height: 256 },
  spriteSheetSize: { width: 18360, height: 256 },
  columnRowMapping: [50],
  offset: { x: 0, y: 2 },
  animationFrames: {
    attack: getFrames(0, 17),
    die: getFrames(18, 31),
    hit: getFrames(32, 35),
    idle: getFrames(36, 43),
    move: getFrames(44, 50),
  },
  getSpriteSource: (skin: string) => {
    switch (skin) {
      case 'bushMonster_default':
        return Image.resolveAssetSource(
          require('@/assets/sprites/enemies/bushMonster/bushMonster_default.png')
        );
      default:
        return Image.resolveAssetSource(
          require('@/assets/sprites/enemies/bushMonster/bushMonster_default.png')
        );
    }
  },
};

// Skeleton
export const skeleton_data = {
  name: 'Skeleton',
  skins: ['skeleton_default'],
  animations: ['walk', 'walk02', 'walk03', 'idle', 'idle02', 'hit', 'attack', 'die', 'rebirth'],
  frameSize: { width: 256, height: 256 },
  spriteSheetSize: { width: 16640, height: 256 },
  columnRowMapping: [64],
  offset: { x: 0, y: 2 },
  animationFrames: {
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
  getSpriteSource: (skin: string) => {
    switch (skin) {
      case 'skeleton_default':
        return Image.resolveAssetSource(
          require('@/assets/sprites/enemies/skeleton/skeleton_default.png')
        );
      default:
        return Image.resolveAssetSource(
          require('@/assets/sprites/enemies/skeleton/skeleton_default.png')
        );
    }
  },
};

// Goblin
export const goblin_data = {
  name: 'Goblin',
  skins: ['goblin_default'],
  animations: ['run', 'run_hit', 'idle', 'block', 'hit', 'idle02', 'attack', 'jump', 'die'],
  frameSize: { width: 336, height: 256 },
  spriteSheetSize: { width: 19152, height: 256 },
  columnRowMapping: [56],
  offset: { x: 0, y: 2 },
  animationFrames: {
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
  getSpriteSource: (skin: string) => {
    switch (skin) {
      case 'goblin_default':
        return Image.resolveAssetSource(
          require('@/assets/sprites/enemies/goblin/goblin_default.png')
        );
      default:
        return Image.resolveAssetSource(
          require('@/assets/sprites/enemies/goblin/goblin_default.png')
        );
    }
  },
};

// Enemy Character Data Collection
export const EnemyData = {
  bushMonster: bushMonster_data,
  skeleton: skeleton_data,
  goblin: goblin_data,
};
