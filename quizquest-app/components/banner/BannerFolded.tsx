import { View, Text, ImageBackground } from 'react-native';
import React from 'react';

interface BannerFoldedProps {
  text: string;
  className?: string;
  height?: number;
  textBottomMargin?: number;
  textSize?: number;
}

const BannerFolded = ({
  text,
  className = '',
  height = 120,
  textBottomMargin = 4,
  textSize = 24,
}: BannerFoldedProps) => {
  const bannerImage = require('@/assets/ui-assets/banners/banner_folded.png');

  return (
    <ImageBackground
      source={bannerImage}
      className={`w-full items-center justify-center ${className}`}
      resizeMode="contain"
      style={{ height: height }}>
      <View className="items-center justify-center">
        <Text
          className="font-pixelifyBold text-center text-yellow-900"
          style={{ marginBottom: textBottomMargin, fontSize: textSize }}>
          {text}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default BannerFolded;
