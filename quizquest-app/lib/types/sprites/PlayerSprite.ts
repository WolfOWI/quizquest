import { AnimatedSpriteType } from '@darrench3140/react-native-sprite-sheet';

export interface PlayerSpriteProps {
  characterId: string;
  defaultAnimation?: string;
  loop?: boolean;
  fps?: number;
  flip?: boolean;
  autoPlay?: boolean;
  size?: number;
  spriteRef?: React.RefObject<AnimatedSpriteType | null>;
}

export interface SpriteAnimationHook {
  spriteRef: React.RefObject<AnimatedSpriteType | null>;
  playAnimation: (animation: string, loop?: boolean, fps?: number) => void;
  play2AnimationSequence: (
    animations: string[],
    characterId: string,
    loopLast?: boolean,
    fps?: number
  ) => void;
  stopAnimation: () => void;
}
