import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },
  formView: {
    flex: 1,
    paddingBottom: 20,
  },
  circularButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
