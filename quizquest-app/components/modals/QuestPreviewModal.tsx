import React from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import { Chapter } from '@/lib/types/curriculum/Curriculum';
import { PrimaryBtn } from '../buttons/standard/PrimaryBtn';
import { SquareBtn } from '../buttons/square/SquareBtn';
import { UserChapterProgress } from '@/lib/types/user/User';
import { UI_ICONS } from '@/lib/constants/uiIcons';
import { getIcon } from '@/lib/content/registry';
import { getTexture } from '@/lib/content/registry';
import { getEnvironment, getEnvironmentIcon } from '@/lib/content';

interface QuestPreviewModalProps {
  visible: boolean;
  onClose: () => void;
  onModalHide: () => void;
  onStartQuest: () => void;
  chapterAndProgress: Chapter & UserChapterProgress;
}

const QuestPreviewModal = ({
  visible,
  onClose,
  onModalHide,
  onStartQuest,
  chapterAndProgress,
}: QuestPreviewModalProps) => {
  const completionPercentage =
    chapterAndProgress.questions.total > 0
      ? (chapterAndProgress.questions.correct / chapterAndProgress.questions.total) * 100
      : 0;
  const isCompleted = completionPercentage === 100;
  const isInProgress = completionPercentage > 0 && completionPercentage < 100;

  // Quest Stat Icons
  const deathsIcon = UI_ICONS.stats.deaths;
  const enemiesSlainIcon = UI_ICONS.stats.slain;
  const playThroughsIcon = UI_ICONS.stats.runs;

  // console.log('Chapter and Progress:', chapterAndProgress);

  const environmentIcon = getEnvironmentIcon(chapterAndProgress.environmentId);
  const environment = getEnvironment(chapterAndProgress.environmentId);
  // console.log('Environment Icon:', environmentIcon);
  // console.log('Environment:', environment);

  const paperTexture = getTexture('paper_scroll');
  const screenHeight = Dimensions.get('window').height;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      onDismiss={onModalHide}>
      <View className="flex-1 justify-end bg-black/50">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View
          className="mx-4 mb-8 overflow-hidden rounded-2xl p-4"
          style={{ height: screenHeight * 0.7 }}>
          <ImageBackground source={paperTexture} className="absolute inset-0 flex-1" />
          <View className="absolute inset-0 bg-black/20" />
          {/* Header */}
          <View className="border-b border-white/20">
            <View className="flex-row justify-end">
              <SquareBtn icon="close" onPress={onClose} />
            </View>

            <View className="flex-col gap-2 pb-4">
              <View className="flex-row items-center gap-2">
                <Image source={environmentIcon} className="h-6 w-6" />
                <Text className="font-pixelify text-sm text-white/70">
                  {environment?.name || 'Unknown Environment'}
                </Text>
              </View>
              <Text className="font-kenney text-xl text-white">{chapterAndProgress.title}</Text>
            </View>
          </View>

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* Quest Description */}
            <Text className="mb-4 font-pixelify text-base text-white">
              {chapterAndProgress.description}
            </Text>

            {/* Progress Section */}
            <View className="mb-6">
              <View className="mb-2 flex-row items-center justify-between">
                <Text className="font-kenney text-lg text-white">Progress</Text>
                <Text className="font-kenney text-lg text-white">
                  {completionPercentage.toFixed(0)}%
                </Text>
              </View>
              <View className="h-3 rounded-full bg-white/20">
                <View
                  className={`h-full rounded-full ${
                    isCompleted ? 'bg-green-500' : isInProgress ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}
                  style={{ width: `${completionPercentage}%` }}
                />
              </View>
              <Text className="mt-1 font-pixelify text-sm text-white/70">
                {chapterAndProgress.questions.correct} of {chapterAndProgress.questions.total}{' '}
                questions completed
              </Text>
            </View>

            {/* Quest Statistics */}
            <View className="mb-6">
              <Text className="mb-3 font-kenney text-lg text-white">Quest Statistics</Text>
              <View className="flex-row justify-around">
                <View className="flex-col items-center gap-1">
                  <View className="flex-row items-center gap-2">
                    <Image source={playThroughsIcon} className="h-6 w-6" />
                    <Text className="font-kenney text-base text-white">0</Text>
                  </View>

                  <Text className="font-pixelify text-sm text-white/70">Attempts</Text>
                </View>
                <View className="flex-col items-center gap-1">
                  <View className="flex-row items-center gap-2">
                    <Image source={enemiesSlainIcon} className="h-6 w-6" />
                    <Text className="font-kenney text-base text-white">0</Text>
                  </View>
                  <Text className="font-pixelify text-sm text-white/70">Enemies Slain</Text>
                </View>
                <View className="flex-col items-center gap-1">
                  <View className="flex-row items-center gap-2">
                    <Image source={deathsIcon} className="h-6 w-6" />
                    <Text className="font-kenney text-base text-white">0</Text>
                  </View>
                  <Text className="font-pixelify text-sm text-white/70">Deaths</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View className="pb-4">
            <PrimaryBtn
              onPress={onStartQuest}
              label={isCompleted ? 'Replay Quest' : 'Start Quest'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default QuestPreviewModal;
