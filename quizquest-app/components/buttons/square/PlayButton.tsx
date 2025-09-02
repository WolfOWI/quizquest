import React from 'react';
import { Pressable, ImageBackground } from 'react-native';

const idle = require('@/assets/ui-assets/buttons/square/play/play-idle.png');
const down = require('@/assets/ui-assets/buttons/square/play/play-down.png');

type Props = {
  onPress?: () => void;
  width?: number;
  height?: number;
  disabled?: boolean;
};

export function PlayButton({ onPress, width = 64, height = 64, disabled }: Props) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={{ width, height }}>
      {({ pressed }) => (
        <ImageBackground
          source={pressed && !disabled ? down : idle}
          style={{
            width,
            height,
            opacity: disabled ? 0.6 : 1,
          }}></ImageBackground>
      )}
    </Pressable>
  );
}
