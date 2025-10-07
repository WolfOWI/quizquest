import { Pressable, View, Text, Image, ImageBackground } from 'react-native';
import { Chapter } from '@/lib/types/curriculum/Curriculum';
import { UserChapterProgress } from '@/lib/types/user/User';
import { getEnvironmentIcon, getBackground, getEnvironmentTexture } from '@/lib/content/registry';

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
  // const isCompleted = completionPercentage === 100;

  const environmentIcon = getEnvironmentIcon(chapterAndProgress.environmentId);

  const backgroundTexture = getEnvironmentTexture(chapterAndProgress.environmentId);

  return (
    <Pressable onPress={onPress} className="overflow-hidden rounded-2xl">
      <ImageBackground source={backgroundTexture}>
        <View className="absolute inset-0 bg-black/30" />
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
