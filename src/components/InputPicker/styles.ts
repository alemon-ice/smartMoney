import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.asphalt};
  border-radius: 15px;
  margin: 10px 20px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;
