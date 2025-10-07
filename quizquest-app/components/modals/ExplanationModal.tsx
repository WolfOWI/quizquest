import React from 'react';
import { View, Text, Pressable, ImageBackground, Modal, Dimensions } from 'react-native';
import { SquareBtn } from '../buttons/square/SquareBtn';
import Heading from '../typography/Heading';

interface ExplanationModalProps {
  visible: boolean;
  onClose: () => void;
  onModalHide: () => void;
  explanationText: string;
}

const ExplanationModal = ({
  visible,
  onClose,
  onModalHide,
  explanationText,
}: ExplanationModalProps) => {
  const paperTexture = require('@/assets/textures/paper_scroll.png');
  const screenHeight = Dimensions.get('window').height;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      onDismiss={onModalHide}>
      <View className="flex-1 justify-center bg-black/50">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View className="mx-4 overflow-hidden rounded-2xl" style={{ height: screenHeight * 0.5 }}>
          <ImageBackground source={paperTexture} className="flex-1">
            <View className="absolute inset-0" />

            {/* Header */}
            <View className="flex-row items-center justify-between p-4">
              <Heading size="large" color="text-amber-900">
                Explanation
              </Heading>
              <SquareBtn icon="close" onPress={onClose} variant="wood" />
            </View>

            {/* Content */}
            <View className="flex-1 px-4 pb-4">
              <Text className="font-pixelify text-base leading-6 text-amber-900">
                {explanationText}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default ExplanationModal;
