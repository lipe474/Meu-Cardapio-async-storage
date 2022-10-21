import { Notepad } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Gradient = styled(LinearGradient)`
  width: 100%;
  height: 70px;

  border-radius: 6px;

  flex-direction: row;
  align-items: flex-start;

  margin-bottom: 12px;
`;

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 70px;
  border-radius: 6px;

  justify-content: flex-start;
  flex-direction: row;
  align-items: center;

  padding: 24px;
  margin-bottom: 12px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
`;

export const Icon = styled(Notepad).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.WHITE,
  weight: 'fill'
}))`
  margin-right: 20px;
`;
