import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DatetimePicker from 'react-native-modal-datetime-picker';

import {
  BalanceLabel,
  InputMask,
  InputPicker,
  CircularButton,
} from '../../components';
import ActionFooter, { ActionButton } from '../../components/Core/ActionFooter';

import { saveEntry, removeEntry } from '../../services/Entries';
import { IEntry } from '../../interfaces/entry';
import { ICategory } from '../../interfaces/category';
import { checkIfValueIsPositive } from '../../util/checkNumber';

import { Container } from './styles';
import { IProps } from './types';
import { colors } from '../../styles/colors';

const NewEntry: React.FC<IProps> = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { entry } = params as IProps;

  const [amount, setAmount] = useState<string>(`${entry.amount}`);
  const [category, setCategory] = useState<ICategory>(entry.category);
  const [entryAt, setEntryAt] = useState<Date>(entry.entryAt);
  // const [description, setDescription] = useState<string>(entry.description);
  const [debit, setDebit] = useState(
    checkIfValueIsPositive(Number(amount)) ? 1 : -1,
  );
  const [modalDateIsVisible, setModalDateIsVisible] = useState(false);

  function onChangeDate(date: Date) {
    setEntryAt(date);
    setModalDateIsVisible(false);
  }

  function isValidForm() {
    if (parseFloat(amount) !== 0) return true;

    return false;
  }

  async function handleSave() {
    const newEntry: IEntry = {
      amount: Number(amount) * debit,
      description: category.name,
      entryAt,
      category,
    };

    await saveEntry({ currentEntry: entry, newEntryData: newEntry });

    goBack();
  }

  async function handleRemove() {
    Alert.alert(
      'Apagar?',
      'Você deseja realmente apagar este lançamento?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            await removeEntry(entry);
            goBack();
          },
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <Container>
      <BalanceLabel />

      <View
        style={{
          flex: 1,
          paddingVertical: 20,
        }}
      >
        <InputMask
          type="money"
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: '',
            suffixUnit: '',
          }}
          onChangeValue={setAmount}
          value={amount}
          debit={debit}
          setDebit={setDebit}
        />
        <InputPicker
          debit={debit}
          category={category}
          setCategory={setCategory}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 10,
            marginHorizontal: 20,
          }}
        >
          <CircularButton
            icon="today"
            color={colors.asphalt}
            onPressAction={() => setModalDateIsVisible(!modalDateIsVisible)}
          >
            <DatetimePicker
              isVisible={modalDateIsVisible}
              mode="date"
              isDarkModeEnabled
              date={entryAt}
              onConfirm={onChangeDate}
              onCancel={() => setModalDateIsVisible(!modalDateIsVisible)}
            />
          </CircularButton>
          {entry.id && (
            <CircularButton
              icon="delete"
              color={colors.red}
              onPressAction={handleRemove}
            />
          )}
        </View>
      </View>

      <ActionFooter>
        <ActionButton
          type="primary"
          title={entry.id ? 'Salvar' : 'Adicionar'}
          onPress={() => isValidForm() && handleSave()}
        />
        <ActionButton title="Cancelar" onPress={goBack} />
      </ActionFooter>
    </Container>
  );
};

export default NewEntry;
