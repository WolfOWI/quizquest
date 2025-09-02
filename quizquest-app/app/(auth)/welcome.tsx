import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { PlayButton } from '@/components/buttons/square/PlayButton';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';

const WelcomeScreen = () => {
  return (
    <View>
      <Text>Welcome</Text>
      <Pressable onPress={() => console.log('login')}>
        <Text>Login</Text>
      </Pressable>
      <Pressable onPress={() => console.log('signup')}>
        <Text>Signup</Text>
      </Pressable>
      <PlayButton onPress={() => console.log('play')} />
      <PrimaryBtn onPress={() => console.log('hello')} label="Hello" disabled />
    </View>
  );
};

export default WelcomeScreen;
