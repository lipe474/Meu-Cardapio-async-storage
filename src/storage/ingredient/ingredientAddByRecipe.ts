import AsynStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError';

import { INGREDIENT_COLLECTION } from '@storage/storageConfig';
import { ingredientsGetByRecipe } from './ingredientsGetByRecipe';
import { IngredientStorageDTO } from './IngredientStorageDTO';

export async function ingredientAddByRecipe(
  newIngredient: IngredientStorageDTO,
  recipe: string
) {
  try {
    const storedIngredients = await ingredientsGetByRecipe(recipe);

    const ingredientAlreadyExists = storedIngredients.filter(
      (ingredient) => ingredient.name === newIngredient.name
    );

    if (ingredientAlreadyExists.length > 0) {
      throw new AppError('Esse ingrediente já está cadastrado!');
    }

    const storage = JSON.stringify([...storedIngredients, newIngredient]);

    await AsynStorage.setItem(`${INGREDIENT_COLLECTION}-${recipe}`, storage);
  } catch (error) {
    throw error;
  }
}
