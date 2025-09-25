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

  //   TODO: Temporary hard-coded icon & background texture
  const forestIcon = getIcon('env_temperate_forest');
  const pyramidIcon = getIcon('env_desert_pyramids');
  const environmentIcon = forestIcon;

  const grassTexture = require('@/assets/textures/grass_green.png');
  const backgroundTexture = grassTexture;

  return (
    <Pressable onPress={onPress} className="overflow-hidden rounded-2xl">
      {/* Background Texture */}
      <ImageBackground source={backgroundTexture}>
        <View className="inset-0 bg-black/20" />

        {/* Quest Icon & Title */}
        <View className="min-h-24 flex-1 flex-row items-center p-4">
          <View className="min-w-0 flex-1 flex-row items-center gap-2">
            <Image source={environmentIcon} className="h-12 w-12" />
            <Text
              className="line-clamp-1 flex-1 font-pixelify text-base text-white"
              numberOfLines={2}
              ellipsizeMode="tail">
              {chapterAndProgress.title}
            </Text>
          </View>
          <View className="ml-4 flex-shrink-0">
            <Text className="font-kenney text-base text-white">{completionPercentage}%</Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default QuestListItem;
