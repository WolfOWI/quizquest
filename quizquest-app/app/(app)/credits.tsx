import React from 'react';
import { View, Text, ScrollView, Pressable, Linking } from 'react-native';
import { router } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import Heading from '@/components/typography/Heading';
import Subheading from '@/components/typography/Subheading';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';

// Components for this screen
const CreditBox = ({ children, title }: { children: React.ReactNode; title?: string }) => {
  return (
    <View>
      {title && <Subheading className="mb-2">{title}</Subheading>}
      <View className="gap-1 rounded-2xl bg-black/40 p-4">{children}</View>
    </View>
  );
};

const CreditItem = ({
  mainText,
  subText,
  link,
}: {
  mainText?: string;
  subText?: string;
  link?: string;
}) => {
  return (
    <View className="gap-1 p-3">
      <Text className={`text-center font-pixelify text-base text-white`}>{mainText}</Text>
      <Text className={`text-center font-pixelify text-sm text-gray-300`}>{subText}</Text>
      {link && (
        <Pressable onPress={() => Linking.openURL(link)}>
          <Text className="text-center font-pixelifyBold text-sm text-yellow-400">
            Visit Website
          </Text>
        </Pressable>
      )}
    </View>
  );
};

// Main Credits Screen Component
const CreditsScreen = () => {
  const backgroundTexture = require('@/assets/textures/bricks_castle.png');

  const handleBack = () => {
    router.back();
  };

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={2}>
      <TopAppBar title="Credits" titleCenter titleSize="large" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="gap-8 py-6">
          {/* Game Information */}
          <CreditBox title="Game Info">
            <CreditItem mainText="QuizQuest" subText="An educational RPG adventure game" />
            <View className="mt-2">
              <Text className="text-center font-pixelify text-sm text-gray-300">Version 1.0.0</Text>
            </View>
          </CreditBox>

          {/* Development Team */}
          <CreditBox title="Development Team">
            <CreditItem mainText="Wolf Botha" subText="Lead Developer & Designer" />
          </CreditBox>

          {/* Assets & Resources */}
          <CreditBox title="Assets & Resources">
            <CreditItem
              mainText="Icons from Pixel Icon Library"
              subText="By HackerNoon"
              link="http://pixeliconlibrary.com/"
            />
          </CreditBox>

          {/* Special Thanks */}
          <CreditBox title="Special Thanks">
            <CreditItem mainText="Muchos gracias :D" subText="Thanks for everything." />
          </CreditBox>

          {/* Copyright */}
          <CreditBox>
            <CreditItem mainText="© 2025 QuizQuest. All rights reserved." subText="Made with ❤️" />
          </CreditBox>
        </View>
      </ScrollView>

      {/* Back Button */}
      <View className="px-4 pb-4">
        <PrimaryBtn label="Back" variant="stone" onPress={handleBack} />
      </View>
    </StandardSafeLayout>
  );
};

export default CreditsScreen;
