import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Recipes } from '@screens/Recipes'
import { Ingredients } from '@screens/Ingredients'
import { NewRecipe } from '@screens/NewRecipe'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return(
    <Navigator screenOptions={{headerShown: false}}>
      <Screen 
        name="recipes"
        component={Recipes} 
      />
      <Screen 
        name="new"
        component={NewRecipe} 
      />
      <Screen 
        name="ingredients"
        component={Ingredients} 
      />
    </Navigator>
  )

}