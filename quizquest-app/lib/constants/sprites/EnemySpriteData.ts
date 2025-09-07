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
