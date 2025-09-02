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
  bgTextureSrc,
}: {
  children: React.ReactNode;
  bgTextureSrc?: ImageSourcePropType;
}) => {
  return (
    <SafeAreaView className="flex-1">
      {/* Background Texture */}
      {/* TODO: Get correct copyright-free texture later */}
      {bgTextureSrc && (
        <ImageBackground
          source={bgTextureSrc}
          resizeMode="repeat"
          className="absolute bottom-0 left-0 right-0 top-0"
        />
      )}
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        {/* Screen Content */}
        <View className="mx-4 flex-1">{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StandardSafeLayout;
