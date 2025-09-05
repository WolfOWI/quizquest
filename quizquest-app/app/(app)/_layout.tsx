import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="start"
        options={{
          title: 'Start',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
