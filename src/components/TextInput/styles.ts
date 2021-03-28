import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.asphalt};
  border-radius: 15px;
  margin: 10px 20px;
`;

export const styles = StyleSheet.create({
  Input: {
    flex: 1,
    fontSize: 20,
    color: colors.white,
    textAlign: 'center',
    paddingRight: 20,
  },
});
