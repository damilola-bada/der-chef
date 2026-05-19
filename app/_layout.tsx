import { Colors } from '@/src/constants/theme';
import { isIpad } from '@/src/utils/isIpad';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.surface,
        },
        headerTitleStyle: {
          fontWeight: '600',
          color: Colors.textPrimary,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="recipe/[id]" options={{ headerBackTitle: 'Back' }} />
      <Stack.Screen
        name="filter"
        options={{
          presentation: 'formSheet',
          headerShown: false,
          sheetAllowedDetents: isIpad ? [1] : [0.4],
          headerShadowVisible: false,
          contentStyle: { backgroundColor: Colors.background },
        }}
      />
    </Stack>
  );
}
