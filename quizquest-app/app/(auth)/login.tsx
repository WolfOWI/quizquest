import { View, Text, SafeAreaView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import React from 'react';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { router } from 'expo-router';
import Heading from '@/components/typography/Heading';
import TopAppBar from '@/components/navigation/TopAppBar';

const LoginScreen = () => {
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
          <TopAppBar title="Login" pretitle="Login" titleCenter />
          <TopAppBar title="Login" />
          <TopAppBar title="Login" leftButtonIcon="back" pretitle="Create a" titleCenter />
          <TopAppBar title="Login" leftButtonIcon="back" />
          <TopAppBar title="Login" rightButtonIcon="close" pretitle="Login" titleCenter />
          <TopAppBar title="Login" rightButtonIcon="close" />
          <TopAppBar title="Login" leftButtonIcon="back" rightButtonIcon="close" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
