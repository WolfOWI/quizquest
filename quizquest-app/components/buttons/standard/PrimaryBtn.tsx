import React from 'react';
import { Pressable, ImageBackground, View, Image, Text } from 'react-native';
import { BtnMaterialVariants } from '@/lib/types/ui-related/UIButtons';

const woodBackground = require('@/assets/ui-assets/buttons/standard/primary-wood.png');
const stoneBackground = require('@/assets/ui-assets/buttons/standard/primary-stone.png');

type Props = {
  onPress?: () => void;
  disabled?: boolean;
  label: string;
  variant?: BtnMaterialVariants;
};

export function PrimaryBtn({ onPress, disabled, label, variant = 'wood' }: Props) {
  const btnHeight = 72;
  const btnWidth = 300; // Fixed width that matches typical button image dimensions

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="self-center"
      style={{ height: btnHeight, width: btnWidth }}>
      <ImageBackground
        source={variant === 'wood' ? woodBackground : stoneBackground}
        resizeMode="stretch"
        style={{
          height: btnHeight,
          width: btnWidth,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: disabled ? 0.6 : 1,
        }}>
        <Text className="mb-2 text-center font-kenney text-2xl text-white">{label}</Text>
      </ImageBackground>
    </Pressable>
  );
}
