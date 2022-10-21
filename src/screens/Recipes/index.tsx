import { useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { recipesGetAll } from '@storage/recipe/recipesGetAll';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { RecipeCard } from '@components/RecipeCard';
import { GeneralContainer } from '@components/Container';

export function Recipes() {
  const [isLoading, setIsLoading] = useState(true)
  const [recipes, setRecipes] = useState<string[]>([]);

  const navigation = useNavigation()

  function handleNewRecipe() {
    navigation.navigate('new')
  }

  async function fetchRecipes() {
    try {
      setIsLoading(true)

      const data = await recipesGetAll()
      setRecipes(data)

    } catch (error) {
      Alert.alert('Receitas', 'Não foi possível carregar as receitas!')
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenRecipe(recipe: string) {
    navigation.navigate('ingredients', { recipe })
  }

  useFocusEffect(useCallback(() => {
    fetchRecipes();
  }, []))

  return (
    <GeneralContainer>
      <Header />
      <Highlight 
        title="Meu Cardápio"
        subtitle="Crie suas receitas!"
      />

    {
      isLoading ? <Loading /> :
      <FlatList 
        data={recipes}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <RecipeCard 
            title={item} 
            onPress={() => handleOpenRecipe(item)}
          />
        )}
        contentContainerStyle={recipes.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Cadastre abaixo a sua primeira receita!" />
        )}
        showsVerticalScrollIndicator={false}
      />
    }

      <Button 
        title='Criar nova receita'
        onPress={handleNewRecipe}
      />
    </GeneralContainer>
  );
}