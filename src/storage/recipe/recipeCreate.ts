import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError';

import { recipesGetAll } from './recipesGetAll';
import { RECIPE_COLLECTION } from '@storage/storageConfig';

export async function recipeCreate(newRecipe: string) {
  try {
    const storedRecipes = await recipesGetAll();

    const recipeAlreadyExists = storedRecipes.includes(newRecipe);

    if (recipeAlreadyExists) {
      throw new AppError('Já existe uma receita cadastrada com esse nome!');
    }

    const storage = JSON.stringify([...storedRecipes, newRecipe]);

    await AsyncStorage.setItem(RECIPE_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
