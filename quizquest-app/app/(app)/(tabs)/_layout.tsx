import { Tabs } from 'expo-router';
import { BookOpen, Store, Scroll, User } from 'lucide-react-native';
import { Image, View } from 'react-native';
import { UI_ICONS } from '@/lib/constants/uiIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFCC13',
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: 'transparent',
          paddingTop: 16,
        },
      }}>
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                opacity: focused ? 1 : 0.5,
                shadowColor: focused ? color : 'transparent',
                shadowOpacity: focused ? 0.5 : 0,
                shadowRadius: 8,
              }}>
              <Image
                className="h-12 w-12"
                source={focused ? UI_ICONS.nav.library_active : UI_ICONS.nav.library}
              />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: 'Store',
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                opacity: focused ? 1 : 0.5,
                shadowColor: focused ? color : 'transparent',
                shadowOpacity: focused ? 0.5 : 0,
                shadowRadius: 8,
              }}>
              <Image className="h-12 w-12" source={UI_ICONS.nav.shop} />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: 'Achievements',
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                opacity: focused ? 1 : 0.5,
                shadowColor: focused ? color : 'transparent',
                shadowOpacity: focused ? 0.5 : 0,
                shadowRadius: 8,
              }}>
              <Image className="h-12 w-12" source={UI_ICONS.nav.achievements} />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                opacity: focused ? 1 : 0.5,
                shadowColor: focused ? color : 'transparent',
                shadowOpacity: focused ? 0.5 : 0,
                shadowRadius: 8,
              }}>
              <Image className="h-12 w-12" source={UI_ICONS.nav.profile} />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
