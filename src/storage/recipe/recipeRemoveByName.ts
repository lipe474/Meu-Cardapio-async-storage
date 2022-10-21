import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  RECIPE_COLLECTION,
  INGREDIENT_COLLECTION
} from '@storage/storageConfig';

import { recipesGetAll } from './recipesGetAll';

export async function recipeRemoveByName(recipeDeleted: string) {
  try {
    const storedRecipes = await recipesGetAll();

    const recipes = storedRecipes.filter((recipe) => recipe !== recipeDeleted);

    await AsyncStorage.setItem(RECIPE_COLLECTION, JSON.stringify(recipes));
    await AsyncStorage.removeItem(`${INGREDIENT_COLLECTION}-${recipeDeleted}`);
  } catch (error) {
    throw error;
  }
}
