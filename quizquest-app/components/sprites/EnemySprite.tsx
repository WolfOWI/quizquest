import React, { useRef } from 'react';
import { AnimatedSprite, type AnimatedSpriteType } from '@darrench3140/react-native-sprite-sheet';
import { SpriteProps } from '@/lib/types/sprites/Sprite';
import { getSpriteData } from '@/lib/utils/spriteUtils';
import { calculateProportionalWidth } from '@/lib/utils/spriteUtils';

const EnemySprite: React.FC<SpriteProps> = ({
  characterId,
  defaultAnimation = 'idle',
  loop = true,
  fps = 10,
  flip = false,
  autoPlay = true,
  size,
  spriteRef,
}) => {
  const ref = spriteRef;

  // Get character data from characterId
  const characterData = getSpriteData(characterId);

  // Calculate sprite size
  const spriteSize = size
    ? {
        width: calculateProportionalWidth(size, characterData.frameSize),
        height: size,
      }
    : characterData.frameSize;

  return (
    <AnimatedSprite
      ref={ref}
      source={characterData.getSpriteSource(characterId)}
      spriteSheetSize={characterData.spriteSheetSize}
      size={spriteSize}
      offset={characterData.offset}
      columnRowMapping={characterData.columnRowMapping}
      frameSize={characterData.frameSize}
      defaultAnimationName={defaultAnimation}
      animations={characterData.animationFrames}
      inLoop={loop}
      fps={fps}
      autoPlay={autoPlay}
      styles={{ transform: [{ scaleX: flip ? -1 : 1 }] }}
    />
  );
};

export default EnemySprite;
