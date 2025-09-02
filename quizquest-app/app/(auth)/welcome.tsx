import { View, Text, Pressable, ImageBackground } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { SquareBtn } from '@/components/buttons/square/SquareBtn';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';

const WelcomeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ImageBackground
        source={require('@/assets/textures/texture-16.png')}
        resizeMode="repeat"
        className="absolute bottom-0 left-0 right-0 top-0"
      />
      <Text>Welcome</Text>
      <Pressable onPress={() => console.log('login')}>
        <Text>Login</Text>
      </Pressable>
      <Pressable onPress={() => console.log('signup')}>
        <Text>Signup</Text>
      </Pressable>
      <SquareBtn onPress={() => console.log('play')} variant="stone" icon="play" />
      <PrimaryBtn onPress={() => console.log('hello')} label="Hello" variant="stone" />
    </View>
  );
};

export default WelcomeScreen;
