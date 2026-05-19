import { useEffect, useState } from 'react';

import { fetchRecipeById } from '../services/recipesApi';
import { Recipe } from '../types/recipe';

export function useRecipe(id: string) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- loadRecipe is intentionally excluded; adding it would cause an infinite loop since it's recreated each render
  }, [id]);

  async function loadRecipe() {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchRecipeById(id);

      if (!data) {
        setError('Recipe not found');
      } else {
        setRecipe(data);
      }
    } catch {
      setError('Failed to load recipe');
    } finally {
      setLoading(false);
    }
  }

  return { recipe, loading, error };
}
