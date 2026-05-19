import { Colors } from '@/src/constants/theme';
import { useFavorites } from '@/src/features/favorites/hooks/useFavorites';
import { RecipeCard } from '@/src/features/recipe/components/RecipeCard';
import { RecipeLoadingState } from '@/src/features/recipe/components/RecipeLoadingState';
import { useRecipes } from '@/src/features/recipe/hooks/useRecipes';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function FavoritesTab() {
  const { recipes, loading } = useRecipes();
  const { isFavorite } = useFavorites();

  if (loading) return <RecipeLoadingState />;

  const favorites = recipes.filter((r) => isFavorite(r.id));

  if (favorites.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No favorites yet</Text>
        <Text style={styles.emptyHint}>Tap ★ on a recipe to save it here.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 16,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.background,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  emptyHint: {
    fontSize: 14,
    color: Colors.textMuted,
  },
});
