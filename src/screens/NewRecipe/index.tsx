import { Alert, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import { Content, Icon } from "./styles";

import { AppError } from '@utils/AppError';
import { recipeCreate } from '@storage/recipe/recipeCreate';

import { Input } from "@components/Input";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { GeneralContainer } from '@components/Container';

export function NewRecipe() {
  const [recipe, setRecipe] = useState('')

  const navigation = useNavigation()

  async function handleNew() {
    try{
      if(recipe.trim().length === 0) {
        return Alert.alert('Nova Receita', 'Informe o nome da receita!')
      }

      await recipeCreate(recipe)
      navigation.navigate('ingredients', { recipe })
      
    } catch(error) {
      if(error instanceof AppError ) {
        Alert.alert('Nova Receita', error.message)
      } else {
        Alert.alert('Nova Receita', 'Não foi possível criar uma nova receita!')
      }
    }
  }

  return (
    <GeneralContainer>
      <Header showBackButton />

      <Content>
        <Icon />
        
        <Highlight 
          title="Nova receita"
          subtitle="Crie aqui uma nova receita!"
        />

        <Input
          placeholder="Nome da receita"
          onChangeText={setRecipe}
          onSubmitEditing={handleNew}
          returnKeyType="done"
        />

      </Content>
        <Button 
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
    </GeneralContainer>
  )
}