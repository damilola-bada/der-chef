import { Colors } from '@/src/constants/theme';
import { useFilter } from '@/src/features/recipe/store/filterStore';
import { Ionicons } from '@expo/vector-icons';
import { type Href, router, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

export default function TabLayout() {
  const activeFilter = useFilter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          elevation: 5,
          height: 80,
          paddingTop: 10,
          paddingHorizontal: 14,
        },
        headerStyle: {
          backgroundColor: Colors.surface,
        },
        headerTitleStyle: {
          fontWeight: '600',
          color: Colors.textPrimary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Recipes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => router.push('/filter' as Href)}
              style={{ marginRight: 16 }}
            >
              <Ionicons
                name={activeFilter !== 'All' ? 'options' : 'options-outline'}
                size={22}
                color={
                  activeFilter !== 'All' ? Colors.accent : Colors.textSecondary
                }
              />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
