import { ButtonIcon } from '@components/ButtonIcon';
import { Container, Icon, Name, Gradient} from './styles';

type Props = {
  name: string
  onRemove: () => void
}

export function IngredientCard({ name, onRemove }: Props) {
  return (
    <Gradient
      colors={['#1a1717', '#33333387']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 1}}
    >
      <Container>
        <Icon
          name="cutlery"
        />

        <Name>
          {name}
        </Name>

        <ButtonIcon
          icon="close"
          type="SECONDARY"
          onPress={onRemove}
        />
      </Container>
    </Gradient>
  );
}