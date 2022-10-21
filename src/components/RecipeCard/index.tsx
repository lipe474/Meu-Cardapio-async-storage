import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title, Gradient } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
}

export function RecipeCard({ title, ...rest }: Props) {
  return (
    <Gradient
      colors={['#95322e', '#c5510446']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 1}}
    >
      <Container {...rest}>
        <Icon />
        <Title>
          {title}
        </Title>
      </Container>
    </Gradient>
  )
}