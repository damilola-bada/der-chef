import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorite_recipes';

export async function getFavorites(): Promise<string[]> {
  try {
    const value = await AsyncStorage.getItem(FAVORITES_KEY);

    if (!value) {
      return [];
    }

    return JSON.parse(value);
  } catch (error) {
    console.error('Failed to load favorites', error);
    return [];
  }
}

export async function saveFavorites(ids: string[]) {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error('Failed to save favorites', error);
  }
}
