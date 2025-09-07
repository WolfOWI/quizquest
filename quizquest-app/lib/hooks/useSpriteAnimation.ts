import { useRef, useCallback } from 'react';
import { AnimatedSpriteType } from '@darrench3140/react-native-sprite-sheet';
import { SpriteAnimationHook } from '@/lib/types/sprites/Sprite';
import { getAnimationDuration } from '@/lib/utils/spriteUtils';

export const useSpriteAnimation = (): SpriteAnimationHook => {
  const spriteRef = useRef<AnimatedSpriteType | null>(null);

  const playAnimation = useCallback((animation: string, loop: boolean = true, fps: number = 10) => {
    spriteRef.current?.startAnimation(animation, loop, fps);
  }, []);

  const stopAnimation = useCallback(() => {
    spriteRef.current?.stopAnimation();
  }, []);

  const play2AnimationSequence = useCallback(
    (animations: string[], characterId: string, loopLast: boolean = true, fps: number = 10) => {
      if (animations.length === 0) {
        console.log('The animations array is empty, returning');
        return;
      }
      if (animations.length === 1) {
        console.log('The animations array has only one animation, playing it');
        playAnimation(animations[0], loopLast, fps);
        return;
      }

      // Play first animation
      playAnimation(animations[0], false, fps);

      // Wait for first animation to complete (based on calc duration), then play next
      const firstDuration = getAnimationDuration(characterId, animations[0], fps);
      setTimeout(() => {
        playAnimation(animations[1], loopLast, fps);
      }, firstDuration);
    },
    [playAnimation]
  );

  return {
    spriteRef,
    playAnimation,
    play2AnimationSequence,
    stopAnimation,
  };
};
