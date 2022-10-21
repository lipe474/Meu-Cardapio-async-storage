import { useNavigation } from '@react-navigation/native'
import { BackButton, BackIcon, Container, Logo } from "./styles";

import logoImg from '../../../assets/icon6.png';

type Props = {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.navigate('recipes')
  }

  return (
    <Container>
      { 
        showBackButton &&
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      }

      <Logo source={logoImg} />
    </Container>
  )
}