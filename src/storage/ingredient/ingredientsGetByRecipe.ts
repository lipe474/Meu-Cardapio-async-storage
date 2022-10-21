import AsyncStorage from '@react-native-async-storage/async-storage';

import { INGREDIENT_COLLECTION } from '@storage/storageConfig';
import { IngredientStorageDTO } from './IngredientStorageDTO';

export async function ingredientsGetByRecipe(recipe: string) {
  try {
    const storage = await AsyncStorage.getItem(
      `${INGREDIENT_COLLECTION}-${recipe}`
    );

    const ingredients: IngredientStorageDTO[] = storage
      ? JSON.parse(storage)
      : [];

    return ingredients;
  } catch (error) {
    throw error;
  }
}
