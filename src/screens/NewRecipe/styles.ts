import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Notepad } from 'phosphor-react-native';

export const Content = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
`;

export const Icon = styled(Notepad).attrs(({ theme }) => ({
  size: 56,
  color: theme.COLORS.RED_700
}))`
  align-self: center;
`;
