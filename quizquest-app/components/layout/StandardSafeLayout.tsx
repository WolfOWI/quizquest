import { View, KeyboardAvoidingView, ImageBackground, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

const StandardSafeLayout = ({
  children,
  bgTexture,
  bgImage,
  textureScale = 1,
  noHorizontalPadding = false,
  darkenOverlay = 0,
}: {
  children: React.ReactNode;
  bgTexture?: ImageSourcePropType;
  bgImage?: ImageSourcePropType;
  textureScale?: number;
  noHorizontalPadding?: boolean;
  darkenOverlay?: number;
}) => {
  return (
    <View className="flex-1">
      {/* Background Texture */}
      {bgTexture && (
        <ImageBackground
          source={bgTexture}
          resizeMode="repeat"
          className="absolute bottom-0 left-0 right-0 top-0 z-0"
          style={{
            transform: [{ scale: textureScale }],
          }}
        />
      )}
      {bgImage && (
        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          className="absolute bottom-0 left-0 right-0 top-0 z-0"
        />
      )}

      {/* Darkening Overlay - covers entire screen including status bar */}
      {darkenOverlay > 0 && (
        <View
          className="absolute bottom-0 left-0 right-0 top-0"
          style={{
            backgroundColor: `rgba(0,0,0,${darkenOverlay / 100})`,
            zIndex: 1,
          }}
        />
      )}

      <SafeAreaView className="flex-1" style={{ zIndex: 2 }}>
        <KeyboardAvoidingView behavior="padding" className="flex-1">
          {/* Screen Content */}
          <View className={`${noHorizontalPadding ? '' : 'mx-4'} flex-1`}>{children}</View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default StandardSafeLayout;
