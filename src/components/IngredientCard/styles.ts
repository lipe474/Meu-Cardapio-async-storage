import styled, { css } from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const Gradient = styled(LinearGradient)`
  width: 100%;
  height: 56px;

  border-radius: 6px;

  margin-bottom: 12px;
`;

export const Container = styled.View`
  width: 100%;
  height: 56px;

  /* background-color: ${({ theme }) => theme.COLORS.GRAY_500}; */
  border-radius: 6px;

  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const Name = styled.Text`
  flex: 1;

  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_200};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`;

export const Icon = styled(FontAwesome).attrs(({ theme }) => ({
  size: 24,
  color: theme.COLORS.GRAY_200
}))`
  margin-left: 16px;
  margin-right: 12px;
`;
