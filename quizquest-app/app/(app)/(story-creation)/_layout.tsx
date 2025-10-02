import { Stack } from 'expo-router';

export default function StoryCreationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="subjectInput" options={{ headerShown: false }} />
      <Stack.Screen name="loadingAiValidate" options={{ headerShown: false }} />
      <Stack.Screen name="storyOptions" options={{ headerShown: false }} />
      <Stack.Screen name="loadingAiGen" options={{ headerShown: false }} />
      <Stack.Screen name="storyCreateSuccess" options={{ headerShown: false }} />
      <Stack.Screen name="storyAlreadyExists" options={{ headerShown: false }} />
      <Stack.Screen name="subjectExistsDifferentLevels" options={{ headerShown: false }} />
    </Stack>
  );
}
