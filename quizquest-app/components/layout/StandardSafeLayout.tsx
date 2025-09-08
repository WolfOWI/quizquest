import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';

const StandardSafeLayout = ({
  children,
  bgTexture,
  bgImage,
  textureScale = 1,
  noHorizontalPadding = false,
}: {
  children: React.ReactNode;
  bgTexture?: ImageSourcePropType;
  bgImage?: ImageSourcePropType;
  textureScale?: number;
  noHorizontalPadding?: boolean;
}) => {
  return (
    <SafeAreaView className="flex-1">
      {/* Background Texture */}
      {/* TODO: Get correct copyright-free texture later */}
      {bgTexture && (
        <ImageBackground
          source={bgTexture}
          resizeMode="repeat"
          className="absolute bottom-0 left-0 right-0 top-0"
          style={{
            transform: [{ scale: textureScale }],
          }}
        />
      )}
      {bgImage && (
        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          className="absolute bottom-0 left-0 right-0 top-0"
        />
      )}
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        {/* Screen Content */}
        <View className={`${noHorizontalPadding ? '' : 'mx-4'} flex-1`}>{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StandardSafeLayout;
