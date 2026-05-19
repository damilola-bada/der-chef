import { Colors } from '@/src/constants/theme';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Recipe } from '../types/recipe';
import { StarRating } from './StarRating';

interface Props {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.97, { damping: 15 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 15 });
        }}
        onPress={() =>
          router.push({
            pathname: '/recipe/[id]',
            params: { id: recipe.id, title: recipe.title },
          })
        }
      >
        <Image source={{ uri: recipe.image }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.title}>{recipe.title}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>{recipe.duration}</Text>
            <Text style={styles.meta}>{recipe.difficulty}</Text>
          </View>
          <StarRating rating={recipe.rating} size={13} />
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 220,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: Colors.textPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  meta: {
    color: Colors.textSecondary,
  },
});
