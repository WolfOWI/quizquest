import { Tabs } from 'expo-router';
import { BookOpen, Store, Scroll, User } from 'lucide-react-native';
import { Image, View } from 'react-native';

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
        name="stories"
        options={{
          title: 'Stories',
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
                source={require('@/assets/icons/navigation/purpleBook.png')}
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
              <Image
                className="h-12 w-12"
                source={require('@/assets/icons/navigation/trade.png')}
              />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="knowledgeScroll"
        options={{
          title: 'Knowledge',
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
                source={require('@/assets/icons/navigation/blueScroll.png')}
              />
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
              <Image
                className="h-12 w-12"
                source={require('@/assets/icons/navigation/armour.png')}
              />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
