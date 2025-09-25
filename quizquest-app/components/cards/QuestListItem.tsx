import { Pressable, View, Text, Image, ImageBackground } from 'react-native';
import { Chapter } from '@/lib/types/curriculum/Curriculum';
import { UserChapterProgress } from '@/lib/types/user/User';
import { UI_ICONS } from '@/lib/constants/uiIcons';
import { getIcon } from '@/lib/content/registry';

// Quest list item component
interface QuestListItemProps {
  chapterAndProgress: Chapter & UserChapterProgress;
  onPress: () => void;
}

const QuestListItem = ({ chapterAndProgress, onPress }: QuestListItemProps) => {
  const completionPercentage =
    chapterAndProgress.questions.total > 0
      ? (chapterAndProgress.questions.correct / chapterAndProgress.questions.total) * 100
      : 0;
  const isCompleted = completionPercentage === 100;
  const isInProgress = completionPercentage > 0 && completionPercentage < 100;

  //   TODO: Temporary hard-coded icon & background texture
  const forestIcon = getIcon('env_temperate_forest');
  const pyramidIcon = getIcon('env_desert_pyramids');
  const environmentIcon = forestIcon;

  const grassTexture = require('@/assets/textures/grass_green.png');
  const backgroundTexture = grassTexture;

  // Quest Stat Icons
  const deathsIcon = UI_ICONS.stats.deaths;
  const enemiesSlainIcon = UI_ICONS.stats.slain;
  const playThroughsIcon = UI_ICONS.stats.runs;

  return (
    <Pressable onPress={onPress} className={`p-4`}>
      {/* Background Texture */}
      <ImageBackground source={backgroundTexture} className="absolute inset-0" />
      <View className="absolute inset-0 bg-black/20" />

      {/* Quest Icon & Title */}
      <View className="flex-1 flex-row items-center gap-4">
        <Image source={environmentIcon} className="h-12 w-12" />
        <Text className="font-kenney text-lg text-white">{chapterAndProgress.title}</Text>
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
