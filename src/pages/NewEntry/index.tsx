import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BalanceLabel, InputMask, InputPicker } from '../../components';

import { saveEntry, removeEntry } from '../../services/Entries';
import { IEntry } from '../../interfaces/entry';
import { ICategory } from '../../interfaces/category';
import { checkIfValueIsPositive } from '../../util/checkNumber';

import { Container } from './styles';
import { IProps } from './types';

const NewEntry: React.FC<IProps> = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { entry } = params as IProps;

  const [amount, setAmount] = useState<string>(`${entry.amount}`);
  const [category, setCategory] = useState<ICategory>(entry.category);
  // const [description, setDescription] = useState<string>(entry.description);
  const [debit, setDebit] = useState(
    checkIfValueIsPositive(Number(amount)) ? 1 : -1,
  );

  function isValidForm() {
    if (parseFloat(amount) !== 0) return true;

    return false;
  }

  async function handleSave() {
    const newEntry: IEntry = {
      amount: Number(amount) * debit,
      description: 'Descrição',
      entryAt: entry.entryAt,
      category,
    };

    await saveEntry({ currentEntry: entry, newEntryData: newEntry });

    goBack();
  }

  async function handleRemove() {
    await removeEntry(entry);
    goBack();
  }

  return (
    <Container>
      <BalanceLabel />

      <View>
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
        <Button title="GPS" onPress={() => console.log('button press')} />
        <Button title="Câmera" onPress={() => console.log('button press')} />
      </View>
      <View>
        <Button
          title="Adicionar"
          onPress={() => isValidForm() && handleSave()}
        />
        <Button title="Excluir" onPress={handleRemove} />
        <Button title="Cancelar" onPress={goBack} />
      </View>
    </Container>
  );
};

export default NewEntry;
