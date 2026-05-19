import { Colors } from '@/src/constants/theme';
import { setFilter, useFilter } from '@/src/features/recipe/store/filterStore';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'] as const;

export default function FilterSheet() {
  const active = useFilter();

  function select(value: string) {
    setFilter(value);
    router.back();
  }

  return (
    <View style={styles.container}>
      <View style={styles.handle} />

      <Text style={styles.heading}>Filter by Difficulty</Text>

      <View style={styles.options}>
        {DIFFICULTIES.map((level) => {
          const isActive = active === level;
          return (
            <Pressable
              key={level}
              style={[styles.option, isActive && styles.optionActive]}
              onPress={() => select(level)}
            >
              <Text
                style={[styles.optionText, isActive && styles.optionTextActive]}
              >
                {level}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.surfaceMuted,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 28,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  options: {
    gap: 10,
    backgroundColor: Colors.background,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 999,
    backgroundColor: Colors.background,
  },
  optionActive: {
    backgroundColor: Colors.accent,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  optionTextActive: {
    color: Colors.textInverse,
    fontWeight: '600',
  },
});
