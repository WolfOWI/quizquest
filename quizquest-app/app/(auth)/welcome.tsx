import { View, Text, Pressable, ImageBackground, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { SquareBtn } from '@/components/buttons/square/SquareBtn';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import Heading from '@/components/typography/Heading';

const WelcomeScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      {/* Background Texture */}
      {/* TODO: Get correct copyright-free texture later */}
      <ImageBackground
        source={require('@/assets/textures/texture-16.png')}
        resizeMode="repeat"
        className="absolute bottom-0 left-0 right-0 top-0"
      />
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        {/* Screen Content */}
        <View className="m-4 flex-1 items-center justify-center">
          <Heading>Welcome</Heading>
          <PrimaryBtn onPress={() => router.push('/(auth)/signup')} label="Join" variant="stone" />
          <PrimaryBtn onPress={() => router.push('/(auth)/login')} label="Log In" variant="stone" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
