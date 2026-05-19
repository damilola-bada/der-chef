import { useEffect, useState } from 'react';

import { fetchRecipes } from '../services/recipesApi';
import { Recipe } from '../types/recipe';

let cache: Recipe[] | null = null;
let isFetching = false;
const listeners = new Set<(recipes: Recipe[]) => void>();

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>(cache ?? []);
  const [loading, setLoading] = useState(cache === null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listeners.add(setRecipes);

    if (cache === null && !isFetching) {
      loadRecipes();
    }

    return () => {
      listeners.delete(setRecipes);
    };
  }, []);

  async function loadRecipes() {
    try {
      isFetching = true;
      setLoading(true);
      setError(null);

      const data = await fetchRecipes();

      cache = data;
      listeners.forEach((listener) => listener(data));
    } catch {
      setError('Failed to load recipes');
    } finally {
      isFetching = false;
      setLoading(false);
    }
  }

  return {
    recipes,
    loading,
    error,
    refetch: loadRecipes,
  };
}
