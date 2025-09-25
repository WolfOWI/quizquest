import React from 'react';
import { AnimatedSprite } from '@darrench3140/react-native-sprite-sheet';
import { SpriteProps } from '@/lib/types/sprites/Sprite';
import { getSpriteData, calculateProportionalWidth } from '@/lib/utils/spriteUtils';

const EnemySprite: React.FC<SpriteProps> = ({
  variantId,
  defaultAnimation = 'idle',
  loop = true,
  fps = 10,
  flip = false,
  autoPlay = true,
  size,
  spriteRef,
  styles,
}) => {
  const ref = spriteRef;

  const data = getSpriteData(variantId);

  // Calculate sprite size
  const spriteSize = size
    ? {
        width: calculateProportionalWidth(size, data.frameSize),
        height: size,
      }
    : data.frameSize;

  return (
    <AnimatedSprite
      ref={ref}
      source={data.source}
      spriteSheetSize={data.spriteSheetSize}
      size={spriteSize}
      offset={data.offset}
      columnRowMapping={data.columnRowMapping}
      frameSize={data.frameSize}
      defaultAnimationName={defaultAnimation}
      animations={data.animations}
      inLoop={loop}
      fps={fps}
      autoPlay={autoPlay}
      styles={[styles, { transform: [{ scaleX: flip ? -1 : 1 }] }]}
    />
  );
};

export default EnemySprite;
