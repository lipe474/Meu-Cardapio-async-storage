import AsyncStorage from '@react-native-async-storage/async-storage';

import { RECIPE_COLLECTION } from '@storage/storageConfig';

export async function recipesGetAll() {
  try {
    const storage = await AsyncStorage.getItem(RECIPE_COLLECTION);

    const recipes: string[] = storage ? JSON.parse(storage) : [];

    return recipes;
  } catch (error) {
    throw error;
  }
}
