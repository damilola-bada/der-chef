import { Colors } from '@/src/constants/theme';
import { FavoriteButton } from '@/src/features/favorites/components/FavoriteButton';
import { useFavorites } from '@/src/features/favorites/hooks/useFavorites';
import { RecipeErrorState } from '@/src/features/recipe/components/RecipeErrorState';
import { RecipeLoadingState } from '@/src/features/recipe/components/RecipeLoadingState';
import { StarRating } from '@/src/features/recipe/components/StarRating';
import { useRecipe } from '@/src/features/recipe/hooks/useRecipe';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RecipeScreen() {
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
  const { recipe, loading, error } = useRecipe(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title }} />
        <RecipeLoadingState />
      </>
    );
  }

  if (error || !recipe) {
    return <RecipeErrorState message={error ?? 'Recipe not found'} />;
  }

  return (
    <>
      <Stack.Screen options={{ title: recipe.title }} />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView>
          <Image source={{ uri: recipe.image }} style={styles.image} />

          <View style={styles.content}>
            <Text style={styles.title}>{recipe.title}</Text>

            <View style={styles.metaRow}>
              <View style={styles.metaBadge}>
                <Text style={styles.metaText}>{recipe.duration}</Text>
              </View>
              <View style={styles.metaBadge}>
                <Text style={styles.metaText}>{recipe.difficulty}</Text>
              </View>
              <StarRating rating={recipe.rating} size={15} />
            </View>

            <Text style={styles.sectionHeading}>About</Text>
            <Text style={styles.description}>{recipe.description}</Text>

            <Text style={styles.sectionHeading}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {recipe.ingredients.map((ingredient) => (
                <View key={ingredient} style={styles.ingredientRow}>
                  <View style={styles.bullet} />
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionHeading}>Instructions</Text>
            <View style={styles.instructionsList}>
              {recipe.cookingInstructions.map((step, index) => (
                <View key={index} style={styles.instructionRow}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.instructionText}>{step}</Text>
                </View>
              ))}
            </View>

            <FavoriteButton
              isFavorite={isFavorite(recipe.id)}
              onPress={() => toggleFavorite(recipe.id)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: '100%',
    height: 280,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 12,
    color: Colors.textPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  metaBadge: {
    backgroundColor: Colors.surfaceMuted,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  metaText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 16,
    color: Colors.textPrimary,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  ingredientsList: {
    marginBottom: 12,
    gap: 10,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  ingredientText: {
    fontSize: 15,
    color: Colors.textPrimary,
  },
  instructionsList: {
    gap: 16,
    marginBottom: 12,
  },
  instructionRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  stepNumberText: {
    color: Colors.textInverse,
    fontSize: 13,
    fontWeight: '700',
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
});
