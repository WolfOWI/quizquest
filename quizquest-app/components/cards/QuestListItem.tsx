import { Pressable, View, Text, Image, ImageBackground } from 'react-native';
import { SubtopicDoc } from '@/lib/types/curriculum/Curriculum';

// Quest list item component
interface QuestListItemProps {
  subtopic: SubtopicDoc;
  completedQuestions: number;
  totalQuestions: number;
  onPress: () => void;
}

const QuestListItem = ({
  subtopic,
  completedQuestions,
  totalQuestions,
  onPress,
}: QuestListItemProps) => {
  const completionPercentage = totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0;
  const isCompleted = completionPercentage === 100;
  const isInProgress = completionPercentage > 0 && completionPercentage < 100;

  //   TODO: Temporary hard-coded icon & background texture
  const forestIcon = require('@/assets/icons/environments/temperate_forest.png');
  const pyramidIcon = require('@/assets/icons/environments/desert_pyramids.png');
  const environmentIcon = forestIcon;

  const grassTexture = require('@/assets/textures/grass_green.png');
  const backgroundTexture = grassTexture;

  // Quest Stat Icons
  const deathsIcon = require('@/assets/icons/questStats/deaths.png');
  const enemiesSlainIcon = require('@/assets/icons/questStats/enemiesSlain.png');
  const playThroughsIcon = require('@/assets/icons/questStats/playThroughs.png');

  return (
    <Pressable onPress={onPress} className={`p-4`}>
      {/* Background Texture */}
      <ImageBackground source={backgroundTexture} className="absolute inset-0" />
      <View className="absolute inset-0 bg-black/20" />

      {/* Quest Icon & Title */}
      <View className="flex-1 flex-row items-center gap-4">
        <Image source={environmentIcon} className="h-12 w-12" />
        <Text className="font-kenney text-lg text-white">{subtopic.subtopicTitle}</Text>
      </View>

      {/* Progress & Stats */}
      <View className="mt-4 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-4">
          <View className="flex flex-row items-center gap-1">
            <Image source={playThroughsIcon} className="h-6 w-6" />
            <Text className="font-kenney text-lg text-white">0</Text>
          </View>
          <View className="flex flex-row items-center gap-1">
            <Image source={enemiesSlainIcon} className="h-6 w-6" />
            <Text className="font-kenney text-lg text-white">0</Text>
          </View>
          <View className="flex flex-row items-center gap-1">
            <Image source={deathsIcon} className="h-6 w-6" />
            <Text className="font-kenney text-lg text-white">0</Text>
          </View>
        </View>

        <Text className="font-kenney text-lg text-white">{completionPercentage}%</Text>
      </View>
      {/* Progress Bar */}
      <View className="mt-2 h-2 rounded-full bg-white/20">
        <View
          className={`h-full rounded-full ${
            isCompleted ? 'bg-green-500' : isInProgress ? 'bg-yellow-500' : 'bg-gray-500'
          }`}
          style={{ width: `${completionPercentage}%` }}
        />
      </View>
    </Pressable>
  );
};

export default QuestListItem;
