import { useState, useEffect, useRef } from "react";
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from "styled-components/native";
import { Alert, FlatList, View, TextInput } from "react-native";

import { AppError } from '@utils/AppError';

import { ingredientAddByRecipe } from '@storage/ingredient/ingredientAddByRecipe';
import { IngredientStorageDTO } from '@storage/ingredient/IngredientStorageDTO';
import { ingredientsGetByRecipe } from '@storage/ingredient/ingredientsGetByRecipe';
import { recipeRemoveByName } from "@storage/recipe/recipeRemoveByName";
import { ingredientRemoveByRecipe } from "@storage/ingredient/ingredientRemoveByRecipe";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Loading } from "@components/Loading";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { ButtonIcon } from "@components/ButtonIcon";
import { IngredientCard } from "@components/IngredientCard";
import { GeneralContainer } from "@components/Container";

import { Form, HeaderList } from "./styles";

type RouteParams = {
  recipe: string;
}

export function Ingredients() {
  const { COLORS } = useTheme()

  const [isLoading, setIsLoading] = useState(true)

  const [newIngredientName, setNewIngredientName] = useState('')
  const [ingredients, setIngredients] = useState<IngredientStorageDTO[]>([]) 

  const newIngredientNameInputRef = useRef<TextInput>(null)

  const navigation = useNavigation()
  const route = useRoute()
  const { recipe } = route.params as RouteParams;

  // const subtitle = `Adicione os ingredientes da ${recipe}`

  async function handleAddIngredient() {
    if(newIngredientName.trim().length === 0) {
      return Alert.alert('Novo ingrediente', 'Informe o ingrediente para adicionar!')
    }

    const newIngredient = {
      name: newIngredientName
    }

    try {
      await ingredientAddByRecipe(newIngredient, recipe)

      newIngredientNameInputRef.current?.blur()

      setNewIngredientName('')

      fetchIngredientsByRecipe()
    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert('Novo ingrediente', error.message)
      } else {
        Alert.alert('Novo ingrediente', 'Não foi possível adicionar o ingrediente!')
      }
    }
  }

  async function fetchIngredientsByRecipe() {
  try {
    setIsLoading(true)

    const ingredientsByRecipe = await ingredientsGetByRecipe(recipe);

    setIngredients(ingredientsByRecipe)

  } catch (error) {
    Alert.alert('Ingrediente', 'Não foi possível carregar os ingredientes!')
  } finally {
    setIsLoading(false)
  }
}
  
  async function handleIngredientRemove(ingredientName: string) {
    try {
      await ingredientRemoveByRecipe(ingredientName, recipe);
      fetchIngredientsByRecipe()

    } catch (error) {
      Alert.alert('Remover ingrediente', 'Não foi possível remover este ingrediente!')
    }
  }

  async function recipeRemove() {
    try {
      await recipeRemoveByName(recipe)
      navigation.navigate('recipes')
    } catch (error) {
      Alert.alert('Remover receita', 'Não foi possível remover a receita!')
    }
  }

  async function handleRecipeRemove() {
    Alert.alert(
      'Remover receita',
      'Deseja remover a receita?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => recipeRemove() }
      ]
    )
  }

  useEffect(() => {
    fetchIngredientsByRecipe()
  }, [])

  return (
    <GeneralContainer>
      <Header showBackButton />

      <Highlight 
        title={recipe}
        subtitle={`Adicione os ingredientes da receita ${recipe}`}
      />

      <Form>
        <Input
          inputRef={newIngredientNameInputRef}
          onChangeText={setNewIngredientName}
          value={newIngredientName}
          placeholder="Nome do ingrediente"
          autoCorrect={false}
          onSubmitEditing={handleAddIngredient}
          returnKeyType="done"
        />
          
        <ButtonIcon 
          style={{backgroundColor: 'black', borderRadius: 6}}
          icon="add" 
          onPress={handleAddIngredient}
        />
      </Form>

      <HeaderList>
        <View style={{ height: 1, backgroundColor: COLORS.WHITE, alignSelf: 'stretch'}} />
      </HeaderList>

    {
      isLoading ? <Loading /> :
  
      <FlatList
        data={ingredients}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <IngredientCard 
            name={item.name}
            onRemove={() => handleIngredientRemove(item.name)}
          />
        )}

        ListEmptyComponent={() => (
          <ListEmpty message="Não há ingredientes cadastrados nessa receita!" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100}, ingredients.length === 0 && { flex: 1}]}
      />
    }

      <Button
        title="Remover receita"
        type="SECONDARY"
        onPress={handleRecipeRemove}
      />
    </GeneralContainer>
  )
}