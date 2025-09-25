import type { ImageResolvedAssetSource } from 'react-native';

export interface SpriteSheetConfig {
  spriteKey: string;
  kind: 'enemy' | 'player' | 'pet';

  // Sheet geometry
  frameSize: { width: number; height: number };
  sheetSize: { width: number; height: number };
  columnRowMapping: number[];
  offset?: { x: number; y: number };

  // E.g. attack: getFrames(0, 17)
  animations: Record<string, number[]>;

  // E.g. bushMonster_default: Image.resolveAssetSource(
  //   require('@/assets/sprites/enemies/bushMonster/bushMonster_default.png')
  // )
  variants: Record<string, ImageResolvedAssetSource>;

  defaultAnimation?: string;
}
