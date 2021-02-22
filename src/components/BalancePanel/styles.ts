import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

export const BalancePanelLabel = styled.View`
  /* flex: 1; */
  align-items: center;
`;

export const BalancePanelChart = styled.View`
  /* flex: 1; */
`;

export const AddButton = styled.TouchableOpacity`
  background-color: ${colors.green};
  border-radius: 150px;
  width: 50px;
  height: 50px;
  align-self: flex-end;
  margin-top: -25px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
`;
