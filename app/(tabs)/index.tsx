import { Colors } from '@/src/constants/theme';
import { RecipeCard } from '@/src/features/recipe/components/RecipeCard';
import { RecipeErrorState } from '@/src/features/recipe/components/RecipeErrorState';
import { RecipeLoadingState } from '@/src/features/recipe/components/RecipeLoadingState';
import { useRecipes } from '@/src/features/recipe/hooks/useRecipes';
import { setFilter, useFilter } from '@/src/features/recipe/store/filterStore';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function RecipesTab() {
  const { recipes, loading, error } = useRecipes();
  const activeFilter = useFilter();

  if (loading) return <RecipeLoadingState />;
  if (error) return <RecipeErrorState message={error} />;

  const filtered =
    activeFilter === 'All'
      ? recipes
      : recipes.filter((recipe) => recipe.difficulty === activeFilter);

  return (
    <View style={styles.container}>
      {activeFilter !== 'All' && (
        <Pressable style={styles.filterBadge} onPress={() => setFilter('All')}>
          <Text style={styles.filterBadgeText}>
            {filtered.length} {activeFilter} recipe
            {filtered.length !== 1 ? 's' : ''}
          </Text>
          <Ionicons name="close" size={15} color={Colors.accent} />
        </Pressable>
      )}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No {activeFilter} recipes found.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filterBadge: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.surfaceMuted,
    borderRadius: 20,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterBadgeText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.accent,
  },
  listContent: {
    padding: 16,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textMuted,
  },
});
