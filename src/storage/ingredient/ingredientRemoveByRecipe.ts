import AsyncStorage from '@react-native-async-storage/async-storage';

import { INGREDIENT_COLLECTION } from '@storage/storageConfig';
import { ingredientsGetByRecipe } from './ingredientsGetByRecipe';

export async function ingredientRemoveByRecipe(
  ingredientName: string,
  recipe: string
) {
  try {
    const storage = await ingredientsGetByRecipe(recipe);

    const filtered = storage.filter(
      (ingredient) => ingredient.name !== ingredientName
    );
    const ingredients = JSON.stringify(filtered);

    await AsyncStorage.setItem(
      `${INGREDIENT_COLLECTION}-${recipe}`,
      ingredients
    );
  } catch (error) {
    throw error;
  }
}
