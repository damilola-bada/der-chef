import { useEffect, useState } from 'react';
import { getFavorites, saveFavorites } from '../store/favoritesStore';

let favoriteIds: string[] = [];
let isInitialized = false;
const listeners = new Set<(ids: string[]) => void>();

function notify(ids: string[]) {
  favoriteIds = ids;
  listeners.forEach((listener) => listener(ids));
}

export function useFavorites() {
  const [ids, setIds] = useState<string[]>(favoriteIds);

  useEffect(() => {
    listeners.add(setIds);

    if (!isInitialized) {
      isInitialized = true;
      getFavorites().then((loaded) => notify(loaded));
    }

    return () => {
      listeners.delete(setIds);
    };
  }, []);

  async function toggleFavorite(id: string) {
    const updated = favoriteIds.includes(id)
      ? favoriteIds.filter((item) => item !== id)
      : [...favoriteIds, id];

    notify(updated);
    await saveFavorites(updated);
  }

  function isFavorite(id: string) {
    return ids.includes(id);
  }

  return {
    favoriteIds: ids,
    toggleFavorite,
    isFavorite,
  };
}
